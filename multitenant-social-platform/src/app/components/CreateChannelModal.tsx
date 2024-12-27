import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface CreateChannelModalProps {
    isOpen: boolean
    onClose: () => void
    tenantId: string
}

async function createChannel(tenantId: string, data: { name: string; type: string; }) {
    const response = await axios.post(`http://localhost:3001/api/${tenantId}`, { ...data, serverId: tenantId }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    if (response.data.StatusCode !== 201) {
        throw new Error('Failed to create channel')
    }
    return response.data;
}

export function CreateChannelModal({ isOpen, onClose, tenantId }: CreateChannelModalProps) {
    const [channelName, setChannelName] = useState('')
    const [channelType, setChannelType] = useState('text')
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (newChannel: { name: string; type: string; }) =>
            createChannel(tenantId, newChannel),
        onSuccess: () => {
            queryClient.invalidateQueries(['channels', tenantId])
            onClose()
            setChannelName('')
            setChannelType('text')
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutation.mutate({ name: channelName, type: channelType, tenantId })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                    <DialogDescription>
                        Add a new channel to your server. Choose a name for your channel.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="channelName" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="channelName"
                                value={channelName}
                                onChange={(e) => setChannelName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={mutation.isLoading}>
                            {mutation.isLoading ? 'Creating...' : 'Create Channel'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

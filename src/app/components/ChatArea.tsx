'use client'

import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from './ui/loader'
import axios from 'axios'

async function fetchMessages(tenantId: string, channelId: string) {
  try {
    const res = await axios.get(`https://multitenant-social-platform-backend.vercel.app/api/${tenantId}/${channelId}/messages`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    if (res.data.statusCode === 200) {
      return res.data.responseObject.data;
    }
  } catch (error) {
    console.log("error Occurred: ", error);
    throw error;
  }
}

async function sendMessage(userId: string, tenantId: string, channelId: string, content: string) {
  try {
    const res = await axios.post(`https://multitenant-social-platform-backend.vercel.app/api/${tenantId}/${channelId}`,
      { content, channelId, userId },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    if (res.data.statusCode === 201) {
      return res.data.responseObject;
    }
  } catch (error) {
    console.log("error Occurred: ", error);
    throw error;
  }
}

export default function ChatArea({ tenantId, channelId }: { tenantId: string, channelId: string }) {
  const [message, setMessage] = useState('')
  const userId = localStorage.getItem("userId");
  const queryClient = useQueryClient()

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', tenantId, channelId],
    queryFn: () => fetchMessages(tenantId, channelId),
  })

  const mutation = useMutation({
    mutationFn: (newMessage: string) => sendMessage(userId, tenantId, channelId, newMessage),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['messages', userId, tenantId, channelId])
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(message)
    setMessage('')
  }

  if (isLoadingMessages) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-700">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-700">
      <div className="p-4 border-b border-gray-600">
        <h2 className="text-xl font-bold text-white">#{channelId}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="flex items-start">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarImage src={`/placeholder-${msg.userId.name.toLowerCase()}.jpg`} alt={msg.userId.name} />
              <AvatarFallback>{msg.userId.name}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-baseline">
                <span className="font-bold text-white mr-2">{msg.userId.name}</span>
                <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-100">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-600">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-600 text-white border-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" size="icon" className="ml-2" disabled={mutation.isLoading}>
            {mutation.isLoading ? <Loader size="sm" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}

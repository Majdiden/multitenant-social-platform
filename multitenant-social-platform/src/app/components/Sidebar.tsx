'use client'

import { useState } from 'react'
import { Plus, LogOut } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CreateChannelModal } from './CreateChannelModal'
import { useRouter } from 'next/navigation'

export default function Sidebar({ tenantId }: { tenantId: string }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/signup')
  }

  return (
    <div className="w-[72px] bg-gray-900 p-3 flex flex-col items-center justify-between h-screen">
      <div className="space-y-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-green-500 transition-colors"
                aria-label="Create new channel"
              >
                <Plus className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Create new channel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CreateChannelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        tenantId={tenantId}
      />
    </div>
  )
}

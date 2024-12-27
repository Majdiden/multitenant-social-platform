'use client'

import React, { useEffect } from 'react'
import { Hash, Volume2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Loader } from './ui/loader'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { cn } from '@/lib/utils'

async function fetchChannels(tenantId: string) {
  try {
    const res = await axios.get(`http://localhost:3001/api/${tenantId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    if (res.data.statusCode === 200) {
      console.log("res:", res.data.responseObject)
      return res.data.responseObject.data;
    }
  } catch (error) {
    console.log("error Occurred: ", error);
    throw error;
  }
}

export default function ChannelList({ tenantId }: { tenantId: string }) {
  const router = useRouter();
  const params = useParams();
  const currentChannelId = params.channelId as string;
  const { data: channels = [], isLoading, isError } = useQuery({
    queryKey: ['channels', tenantId],
    queryFn: () => fetchChannels(tenantId),
  })

  useEffect(() => {
    if (channels.length > 0 && !currentChannelId) {
      router.push(`/${tenantId}/${channels[0]._id}`)
    }
  }, [channels, router, tenantId, currentChannelId])

  if (isLoading) {
    return (
      <div className="w-60 bg-gray-800 text-gray-100 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-60 bg-gray-800 text-gray-100 flex items-center justify-center">
        <p>Error loading channels</p>
      </div>
    )
  }

  const textChannels = channels.filter(channel => channel.type === 'text');
  const voiceChannels = channels.filter(channel => channel.type === 'voice');

  return (
    <div className="w-60 bg-gray-800 text-gray-100 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-bold">{tenantId}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase">
            Text Channels
          </h3>
          {textChannels.length > 0 ? (
            textChannels.map(channel => (
              <Link
                href={`/${tenantId}/${channel._id}`}
                key={channel._id}
                className={cn(
                  "flex items-center mt-1 px-2 py-1 rounded hover:bg-gray-700 cursor-pointer",
                  currentChannelId === channel._id && "bg-gray-700"
                )}
              >
                <Hash className="w-5 h-5 mr-2 text-gray-400" />
                <span>{channel.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-1 px-2">No text channels</p>
          )}
        </div>
      </div>
    </div>
  )
}

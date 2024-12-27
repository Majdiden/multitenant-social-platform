'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import ChannelList from '../components/ChannelList'

export default function TenantLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { tenantId: string }
}) {
    const pathname = usePathname()
    const isLoginPage = pathname.endsWith('/login')
    const tenantId = React.use(params).tenantId

    if (isLoginPage) {
        return <>{children}</>
    }

    return (
        <div className="flex h-screen">
            <Sidebar tenantId={tenantId} />
            <ChannelList tenantId={tenantId} />
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}

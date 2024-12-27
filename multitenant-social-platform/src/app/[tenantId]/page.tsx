import React from 'react'
import ChannelList from '../components/ChannelList'
import ChatArea from '../components/ChatArea'

export default function TenantPage({ params }: { params: { tenantId: string } }) {
    const tenantId = React.use(params).tenantId;
    return (
        <>
            {/* <ChannelList tenantId={tenantId} /> */}
            <ChatArea tenantId={tenantId} />
        </>
    )
}

"use client";

import React from 'react';
import ChatArea from '../../components/ChatArea'

export default function TenantPage({ params }: { params: { tenantId: string, channelId: string } }) {
  const tenantId = React.use(params).tenantId;
  const channelId = React.use(params).channelId;
  return (
    <>
      <ChatArea tenantId={tenantId} channelId={channelId} />
    </>
  )
}

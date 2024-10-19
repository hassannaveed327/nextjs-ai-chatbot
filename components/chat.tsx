'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { Message} from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import Image from "next/image";
import UserImg from "@/public/user_img.jpg";
import {Separator} from "@/components/ui/separator";
import * as React from "react";
import {SyncLoader} from "react-spinners";

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, className }: ChatProps) {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<any>([{
    from: 'ai',
    message: <div className={'text-left'}>This is the OverMind, sentient AI over the universe
      How may I help you</div>
  }])
  const [msgLoader, setMsgLoader] = useState(false);
  const [_, setNewChatId] = useLocalStorage('newChatId', id)


  useEffect(() => {
    setNewChatId(id)
  })


  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  return (
    <div
      className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn('pb-[200px] pt-4 md:pt-10', className)}
        ref={messagesRef}
      >
        {messages.length ? (
              <ChatList messages={messages} loader={msgLoader} />
         ) : (
            <EmptyScreen/>
        )}
        <div className="w-full h-px" ref={visibilityRef}/>
      </div>
      <ChatPanel
          messages={messages}
          msgLoader={msgLoader}
          setMsgLoader={(val) => setMsgLoader(val)}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
          setMessages={(val) => setMessages(val)}
      />
    </div>
  )
}

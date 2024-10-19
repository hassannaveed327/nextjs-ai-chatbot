import * as React from 'react'

import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { ChatShareDialog } from '@/components/chat-share-dialog'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { submitUserMessage} from '@/lib/chat/res'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import {useState} from "react";

export interface ChatPanelProps {
  input: string
  setInput: (value: string) => void
  messages?: any
  isAtBottom: boolean
  scrollToBottom: () => void
  msgLoader: boolean
  setMsgLoader: (value: boolean) => void
  setMessages: (value: any) => void
}

export function ChatPanel({
  input,
  setInput,
  messages,
  setMessages,
  msgLoader,
  setMsgLoader,
  isAtBottom,
  scrollToBottom
}: ChatPanelProps) {


  const exampleMessages = [
    {
      heading: 'What is',
      subheading: 'What is Solar Studios?',
      message: `What is Solar Studios?`
    },
    {
      heading: 'Tell Me',
      subheading: 'Tell me about the team behind Solar',
      message: 'Tell me about the team behind Solar'
    },
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages?.length < 2 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={async () => {
                  if (setMessages) {
                    setMsgLoader(true);
                    setMessages((currentMessages: any) => [
                      ...currentMessages,
                      {
                        from: 'user',
                        message: <UserMessage>{example.message}</UserMessage>,
                      }
                    ])
                  }
                  const responseMessage = await submitUserMessage( example.message )
                  setMsgLoader(false);
                  if (responseMessage) {
                    setMessages((currentMessages: any) => [
                      ...currentMessages,
                      {
                        from: 'ai',
                        message: responseMessage
                      }
                    ])
                  }
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} setMessages={(val) =>  setMessages(val) } setMsgLoader={(v) => setMsgLoader(v)}/>
         </div>
      </div>
    </div>
  )
}

import { Separator } from '@/components/ui/separator'
import Image from "next/image";
import UserImg from "@/public/user_img.jpg";
import * as React from "react";


export function ChatList({messages}: any) {
  if (!messages.length) {
    return null
  }
  console.log('jamal',messages);
  //msg tile
  return (
      <div className={`relative mx-auto max-w-2xl px-4`}>
        {messages.map((message: any, index: number) => (
        <div key={index} className={` ${message.from === 'ai' ? 'text-left' : 'text-right' }`}>
          {message.from === 'ai' && <Image src={UserImg} width={30} height={10} alt={'user-img'}/>} {message.message}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}

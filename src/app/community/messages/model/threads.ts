import { Message } from './message'
import { Member } from './member'

export interface Thread {
    threadName: string,
    participants: Member[],
    theradId: string,
    threadDocId: string,
    createTs: Date,
    lastMessage: string,
    lastMessageTime: Date,
    messages: Message[],
    unreadCount: number,

}



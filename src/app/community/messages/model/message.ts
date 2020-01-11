import { Member } from './member';

export interface Message {
    messageId: string,
    threadId: string,
    message: string,
    from: Member,
    timeStamp: Date,
    isRead: boolean
}

export interface MessageReceived {
    threadId: string,
    threadName: string,
    participants: Member[],
    threadDocId: string
    createTs: Date,
    lastMessage: string,
    lastMessageTime: Date,
    message: Message,
    unreadCount: number
}

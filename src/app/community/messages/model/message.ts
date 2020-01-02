import { ChatUser } from './threads';

export interface Messages {
    messageId: string,
    message: string,
    from: ChatUser,
    to: ChatUser,
}
export interface Message {
    messageId: string,
    threadId: string,
    message: string,
    from: ChatUser,
    timeStamp: Date,
    isRead: boolean
}

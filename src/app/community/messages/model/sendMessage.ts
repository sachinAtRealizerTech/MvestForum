import { Message } from '@angular/compiler/src/i18n/i18n_ast'
import { ChatUser } from './threads';

export interface SendMessage {
    threadId: string,
    threadName: string,
    createdTs: Date,
    createdBy: ChatUser,
    createdWith: any,
    messages: Message[],
    lastMessage: string,
    lastMessageTime: Date,
    IsOnetoOne: boolean,
    isInvite: true
    inviteTo: any
}
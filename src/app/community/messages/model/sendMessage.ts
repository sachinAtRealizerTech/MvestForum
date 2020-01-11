import { Message } from '@angular/compiler/src/i18n/i18n_ast'
import { Member } from './member';

export interface SendMessage {
    threadId: string,
    threadName: string,
    createdTs: Date,
    createdBy: Member,
    createdWith: any,
    messages: Message[],
    lastMessage: string,
    lastMessageTime: Date,
    IsOnetoOne: boolean,
    isInvite: true
    inviteTo: any
}
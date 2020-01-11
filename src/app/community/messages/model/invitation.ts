import { Member } from './member';

export interface Invitation {
    threadId: string,
    threadName: string,
    inviteTo: Member[],
    isInvite?: boolean
}


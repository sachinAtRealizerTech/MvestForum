import { userProfile } from 'src/app/models/Auth'
import { Message } from './message'

// export interface Threads {
//     _id: string,
//     roomId: string,
//     name: string,
//     createdAt: string,
//     createdBy: ChatUser,
//     createdWith: ChatUser,
//     isOnetoOne: boolean,
//     messages: [Message]
// }
export interface Thread {
    threadName: string,
    participants: ChatUser[],
    theradId: string,
    threadDocId: string,
    createTs: Date,
    lastMessage: string,
    lastMessageTime: string,
    messages: Message[],
    unreadCount: number,

}

export interface ChatUser {
    memberId: number,
    userName: string,
    userEmailId: string
}

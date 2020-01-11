import { Injectable } from '@angular/core';
import { Thread } from '../model/threads';
import { Auth } from 'src/app/models/Auth';
import { Member } from '../model/member';


@Injectable({
    providedIn: 'root'
})
export class MessageUtils {

    constructor() { }


    public static isThreadOneToOne(thread: Thread) {
        return thread.participants.length == 2;
    }

    public static getThreadNameForLoggedInUser(originalThreadName: string, loggedInUser: Auth): string {
        let newThreadName: string[] = [];
        originalThreadName.split(",").map(name => {
            if (name != `${loggedInUser.f_name} ${loggedInUser.l_name}`) {
                newThreadName.push(name);
                return name;
            }
        });
        return newThreadName.toString();
    }

    public static isThreadExist(threads: Thread[], selectedMemberToChat: Member[]): Thread {
        let existTread = false;
        let existThread;
        threads.forEach(thread => {
            let participantEmailsArr = thread.participants.map(p => p.userEmailId.toLowerCase());
            let selectedMemberEmailArr = selectedMemberToChat.map(s => s.userEmailId.toLowerCase());
            console.log(participantEmailsArr, selectedMemberEmailArr);

            if (JSON.stringify(participantEmailsArr.sort()) == JSON.stringify(selectedMemberEmailArr.sort())) {
                existTread = true;
                existThread = thread;
                return false;
            } else {
                if (existTread) { return false; }
                existTread == false;
            }
        });
        console.log('Thread exist checking:', existTread);

        return existThread;
    }

    public static getLoggedInUser(loggedInUser): Member {
        return {
            memberId: loggedInUser.member_id,
            userName: loggedInUser.f_name + " " + loggedInUser.l_name,
            userEmailId: loggedInUser.email_id
        }
    }
    public static getThreadEmailforLoggedInUser(participants: Member[], loggedInUser: Auth): string {
        let participantEmailId: string;
        if (participants.length == 2) {
            participants.forEach((participant => {

                if (participant.userEmailId != loggedInUser.email_id) {
                    participantEmailId = participant.userEmailId;
                }
            }))
        } else {

        }
        return participantEmailId.toString();
    }
}
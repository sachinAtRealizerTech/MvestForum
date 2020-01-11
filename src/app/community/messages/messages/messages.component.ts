import { Component, OnInit, ViewChildren } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { MessageService } from '../services/messages.service';
import { WebSocketServiceService } from '../services/web-socket-service.service';
import { Thread } from '../model/threads';
import { Message } from '../model/message';
import { v4 as uuid } from 'uuid';
import { Auth } from 'src/app/models/Auth';
import { ScrollToBottomDirective } from './../ScrollToBottomDirective';
import { MessageUtils } from './MessageUtils';
import { Member } from '../model/member';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {
  @ViewChildren(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;

  loading = false;
  searchText: any;
  public threadName: any;
  loggedInUser: Auth
  members: any;
  selectedMemberToChat: Member[] = [];

  public myThreads: Array<Thread> = [];
  public selectedThread: Thread;

  public typingData;
  imagePrependUrl: string;
  png: string;

  constructor(
    private messagesService: MessageService,
    private socketService: WebSocketServiceService) { }

  ngOnInit() {
    //#region Load Initial Data
    this.imagePrependUrl = environment.IMAGEPREPENDURL;
    this.png = '.png'
    this.loggedInUser = Utils.GetCurrentUser();
    this.getAllThreads();
    //#endregion Load Initial Data

    //#region InvitaionReceived
    //Event occured when someone send invitaions
    this.socketService.invitationRequest().subscribe(invitaion => {

      //join the room if its for me
      if (invitaion.inviteTo.some(i => i.userEmailId.toLowerCase() == this.loggedInUser.email_id.toLowerCase())) {
        this.socketService.joinRoom({
          threadId: invitaion.threadId,
          threadName: invitaion.threadName,
          inviteTo: invitaion.inviteTo,
          isInvite: false
        });
        console.log(`Invitation accepted going to join the room:`, invitaion);
      } else {
        console.log('ingnored..');
      }
    });
    //#endregion InvitaionReceived

    //#region NewMessageRecieved
    this.socketService.newMessageReceived().subscribe(messageReceived => {
      console.log('New message recieved: ', messageReceived);

      let threadExist = this.myThreads.find(t => t.threadDocId == messageReceived.threadId);

      console.log("Thread exist", threadExist);

      if (threadExist) {
        let index = this.myThreads.findIndex(t => t.threadDocId == messageReceived.threadId);
        //last message update
        this.myThreads[index].lastMessage = messageReceived.message.message;

        //if incoming message for selected thread
        if (this.selectedThread && this.selectedThread.threadDocId == messageReceived.threadId) {
          this.selectedThread.participants = messageReceived.participants;
          this.selectedThread.messages.push(messageReceived.message);
        } else {
          this.myThreads[index].unreadCount = Number(this.myThreads[index].unreadCount) ? Number(this.myThreads[index].unreadCount) + 1 : 1;
        }

        // if thread not selected increase iunread count
      } else {
        // create thread with incoming message and push to threadlist

        this.myThreads.push({
          theradId: messageReceived.threadId,
          threadName: messageReceived.threadName,
          participants: messageReceived.participants,
          threadDocId: messageReceived.threadId,
          createTs: messageReceived.lastMessageTime,
          lastMessage: messageReceived.lastMessage,
          lastMessageTime: messageReceived.lastMessageTime,
          messages: [messageReceived.message],
          unreadCount: messageReceived.unreadCount
        });
      }

    });
    //#endregion NewMessageRecieved

    //#region TypingStatus
    this.socketService.receivedTyping().subscribe(data => {
      this.typingData = {
        isTyping: data['isTyping'],
        userName: data['typingUser'],
        roomId: data['threadId']
      }
    });
    //#endregion TypingStatus

  }

  getAllThreads() {
    this.myThreads = [];
    this.messagesService.getUsersChatThreads(this.loggedInUser.email_id).subscribe(threadResponse => {
      console.log('all threads - ', threadResponse);
      threadResponse.forEach(thread => {
        thread.threadName = MessageUtils.getThreadNameForLoggedInUser(thread.threadName, this.loggedInUser);
        this.myThreads.push(thread);
      });

      if (this.myThreads && this.myThreads.length > 0) {
        this.socketService.joinToAllThread({ threads: this.myThreads });
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  loadThreadInChatCenter(thread: Thread) {

    this.selectedThread = thread;
    this.messagesService.getThreadMessages(thread.threadDocId).subscribe(messages => this.selectedThread.messages = messages,
      error => {
        console.log(error);
      }
    );
  }

  getMembers() {
    this.selectedMemberToChat = [];
    this.loading = true;
    let request = {
      _member_id: this.loggedInUser.member_id,
      _filter_by: "none",
      _lease_number: 0,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    };
    this.messagesService.getMembers(request).subscribe(members => {
      this.members = members['data']
      this.loading = false;
    },
      error => {
        console.log(error)
        this.loading = false;
      })
  }

  selectMembersToChat(event, member: any) {
    let id: number = event.target.id;
    if (event.target.checked) {
      let participantUser: Member = {
        memberId: member['neighbor_id'],
        userName: member['name'],
        userEmailId: member['neighbor_email_id']
      }
      this.selectedMemberToChat.push(participantUser);
    }
    else {
      this.selectedMemberToChat = this.selectedMemberToChat.filter(
        m => m.memberId != id
      );
    }
  }

  initiateNewThread() {
    if (this.selectedMemberToChat.length > 0) {
      this.selectedMemberToChat.push({
        memberId: this.loggedInUser.member_id,
        userName: `${this.loggedInUser.f_name} ${this.loggedInUser.l_name}`,
        userEmailId: this.loggedInUser.email_id
      });
      debugger;
      let existThread = MessageUtils.isThreadExist(this.myThreads, this.selectedMemberToChat);

      if (existThread) {
        this.loadThreadInChatCenter(existThread);
      }
      else {
        this.generateAndJoinThread();
      }
    }
  }

  sendMessage(event) {
    let messageText = event.target.value;
    event.target.value = "";

    let message = {
      messageId: uuid(),
      threadId: this.selectedThread.theradId,
      message: messageText,
      from: MessageUtils.getLoggedInUser(this.loggedInUser),
      timeStamp: new Date(),
      isRead: true
    }
    let newMessage = {
      threadId: this.selectedThread.threadDocId,
      threadName: this.selectedThread.threadName,
      createTs: this.selectedThread.createTs,
      createdBy: MessageUtils.getLoggedInUser(this.loggedInUser),
      participants: this.selectedThread.participants,
      message: message,
      lastMessage: message.message,
      lastMessageTime: message.timeStamp
    }

    this.selectedThread.messages.push(message);
    this.socketService.sendMessage(newMessage);
  }

  typing() {
    console.log('typing user..', this.loggedInUser.f_name + " " + this.loggedInUser.l_name);
    let data = {
      roomId: this.selectedThread.theradId,
      typingUser: this.loggedInUser.f_name + " " + this.loggedInUser.l_name,
      isTyping: true
    }
    this.socketService.typing({ data });
  }

  isThreadOneToOne(thread: Thread) {
    return MessageUtils.isThreadOneToOne(thread);
  }

  private generateAndJoinThread() {
    let threadId = uuid();

    this.selectedThread = {
      theradId: threadId,
      threadName: this.selectedMemberToChat.map(u => { return u.userName }).toString(),
      participants: this.selectedMemberToChat,
      threadDocId: threadId,
      createTs: new Date(),
      lastMessage: "",
      lastMessageTime: new Date(),
      messages: [],
      unreadCount: 0
    }
    //this.threadName = MessageUtils.getThreadNameForLoggedInUser(this.selectedThread.threadName, this.loggedInUser);
    this.myThreads.push(this.selectedThread);

    this.socketService.joinRoom({
      threadId: threadId,
      threadName: this.selectedMemberToChat.map(selectedMember => { return selectedMember.userName }).toString(),
      createdAt: new Date(),
      createdBy: MessageUtils.getLoggedInUser(this.loggedInUser),
      createdWith: this.selectedMemberToChat,
      lastMessage: "This is testing message...",
      lastMessageTime: new Date(),
      IsOnetoOne: this.selectMembersToChat.length == 2,
      isInvite: true,
      inviteTo: this.selectedMemberToChat
    });
  }

  getThreadNameForLoggedInUser(originalThreadName: string, loggedInUser: Auth): string {
    let newThreadName: string[] = [];
    originalThreadName.split(",").map(name => {
      if (name != `${loggedInUser.f_name} ${loggedInUser.l_name}`) {
        newThreadName.push(name);
        return name;
      }
    });
    return newThreadName.toString();
  }
  getThreadEmailforLoggedInUser(participants: Member[], loggedInUser: Auth): string {
    console.log('participant and logged in user : ', participants);
    return MessageUtils.getThreadEmailforLoggedInUser(participants, loggedInUser);
  }


}

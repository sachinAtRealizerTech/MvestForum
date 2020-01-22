import { Component, OnInit, ViewChildren } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { MessageService } from '../services/messages.service';
import { WebSocketServiceService } from '../services/web-socket-service.service';
import { Thread } from '../model/threads';
import { v4 as uuid } from 'uuid';
import { Auth } from 'src/app/models/Auth';
import { ScrollToBottomDirective } from '../directives/ScrollToBottomDirective';
import { MessageUtils } from './MessageUtils';
import { Member } from '../model/member';
import { environment } from 'src/environments/environment';
import { NeighborsService } from 'src/app/neighbors/services/neighbors.service';
import { Observable } from 'rxjs';
import { TypingData } from '../model/typingdata';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {
  @ViewChildren(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;

  loading = false;
  searchText = "";
  loggedInUser: Auth
  members: any = [];
  selectedMemberToChat: Member[] = [];
  neighborLists$: Observable<any[]>;
  public myThreads: Thread[] = [];
  public selectedThread: Thread;

  public typingData: TypingData[] = [];
  messgeText: any;

  constructor(
    private neighborsService: NeighborsService,
    private messagesService: MessageService,
    private socketService: WebSocketServiceService) { }

  ngOnInit() {
    //#region Load Initial Data

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
        this.myThreads[index].lastMessageTime = messageReceived.message.timeStamp;
        //if incoming message for selected thread
        if (this.selectedThread && this.selectedThread.threadDocId == messageReceived.threadId) {
          this.selectedThread.participants = messageReceived.participants;
          this.selectedThread.messages.push(messageReceived.message);
          let readMessageParams = {
            threadId: messageReceived.threadId,
            userEmailId: this.loggedInUser.email_id
          }
          this.readRecievedMessage(readMessageParams);
        } else {
          this.myThreads[index].unreadMessageCount = Number(this.myThreads[index].unreadMessageCount) ? Number(this.myThreads[index].unreadMessageCount) + 1 : 1;
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
          unreadMessageCount: 1
        });
      }
      this.myThreads = this.myThreads.sort((a, b) => new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime());
    });
    //#endregion NewMessageRecieved

    //#region TypingStatus
    this.socketService.receivedTyping().subscribe(typingData => {
      debugger;
      console.log('typing received', typingData);
      console.log('selected thread id- ', this.selectedThread.threadDocId);
      if (this.selectedThread.threadDocId == typingData.threadId) {
        let exist = this.typingData.find(u => u.userEmailId == typingData.userEmailId)
        if (!exist) {
          this.typingData.push(typingData);
          console.log('type data-', typingData);
        }

      }


      //console.log('index - ', TypedUser);
      //this.typingData.splice(TypedUser, 1);
      setTimeout(() => {
        if (this.typingData.length > 0) {
          let TypedUser = this.typingData.findIndex(t => t.userEmailId == typingData.userEmailId);
          this.typingData.splice(TypedUser, 1);
        }
      }, 3000);


    });
    //#endregion TypingStatus

  }
  showTypingMessage() {
    debugger;
    if (this.typingData.length > 0) {
      return this.typingData.map(u => u.typingUser).join(", ") + " is typing..."
    }
  }
  /**
   * Read message which is recieved from socket 
   * @param readMessageParams 
   */
  readRecievedMessage(readMessageParams) {
    setTimeout(() => {
      this.socketService.readMessage(readMessageParams);
    }, 1000);
  };

  /**
   * Api call to get all logged user threads
   */
  getAllThreads() {
    this.myThreads = [];
    this.messagesService.getUsersChatThreads(this.loggedInUser.email_id).subscribe(threadResponse => {
      this.myThreads = threadResponse;
      this.joinAllThreads(this.myThreads);
    });
  }

  /**
   * Logged user should join all the thread to recieve message from all threads
   * @param threads 
   */
  private joinAllThreads(threads: Thread[]) {
    if (this.myThreads && this.myThreads.length > 0) {
      this.socketService.joinToAllThread({ threads: this.myThreads });
    }
  }

  /**
   * Get messages for selected threads
   * @param thread 
   */
  loadThreadInChatCenter(thread: Thread) {
    thread.unreadMessageCount = 0;
    this.selectedThread = thread;
    this.messagesService.getThreadMessages(thread.threadDocId, this.loggedInUser.email_id).subscribe(messages => this.selectedThread.messages = messages);
  }

  getMembers() {
    this.selectedMemberToChat = [];
    this.loading = true;

    this.messagesService.getMembers(this.loggedInUser.member_id).subscribe(members => {
      this.members = members;
      this.loading = false;
    })

    this.neighborLists$ = this.neighborsService.getNeighborListByMemberId(this.loggedInUser.member_id);
  }

  selectMembersToChat(event, member: any) {
    let id: number = event.target.id;
    if (event.target.checked) {
      let participantUser: Member = {
        memberId: member['neighbor_id'],
        userName: member['name'],
        userEmailId: member['neighbor_email_id'],
        isGroup: false
      }
      this.selectedMemberToChat.push(participantUser);
    }
    else {
      this.selectedMemberToChat = this.selectedMemberToChat.filter(
        m => m.memberId != id
      );
    }
  }
  selectNeighborListToChat(members) {
    this.selectedMemberToChat = [];
    members.forEach(member => {
      let participantUser: Member = {
        memberId: member['mlist_id'],
        userName: `${member['f_name']} ${member['l_name']}`,
        userEmailId: member['email_id'],
        groupName: member['list_name'],
        isGroup: true
      };
      this.selectedMemberToChat.push(participantUser)
    });
  }

  isMemberSelected(id) {
    return this.selectedMemberToChat.some(m => m.memberId == id)
  }
  initiateNewThread() {

    if (this.selectedMemberToChat.length > 0) {
      this.selectedMemberToChat.push({
        memberId: this.loggedInUser.member_id,
        userName: `${this.loggedInUser.f_name} ${this.loggedInUser.l_name}`,
        userEmailId: this.loggedInUser.email_id,
        groupName: this.selectedMemberToChat[0].groupName,
        isGroup: this.selectedMemberToChat[0].isGroup
      });
      let existThread = MessageUtils.isThreadExist(this.myThreads, this.selectedMemberToChat);

      if (existThread) {
        this.loadThreadInChatCenter(existThread);
      }
      else {
        this.generateAndJoinThread();
      }
    }
  }

  sendMessage() {
    let messageText = this.messgeText;
    if (messageText.trim() == "") {
      return;
    }
    this.messgeText = "";
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
  typing = false;
  timeout;
  onMessageTyping() {
    let data = {
      threadId: this.selectedThread.threadDocId,
      typingUser: this.loggedInUser.f_name + " " + this.loggedInUser.l_name,
      userEmailId: this.loggedInUser.email_id
    }

    if (this.typing == false) {
      this.typing = true
      console.log('started typing...msg comp')
      //socket.emit("typingstarted",{username,threadId});
      this.socketService.typing(data);
      this.timeout = setTimeout(() => { this.typing = false; }, 2000);
    } else {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { this.typing = false; }, 2000);
    }
  }

  isThreadOneToOne(thread: Thread) {
    return MessageUtils.isThreadOneToOne(thread);
  }

  private generateAndJoinThread() {
    let threadId = uuid();
    let threadName = this.selectedMemberToChat[0].isGroup
      ? this.selectedMemberToChat[0].groupName
      : this.selectedMemberToChat.map(u => { return u.userName }).toString();

    this.selectedThread = {
      theradId: threadId,
      threadName: threadName,
      participants: this.selectedMemberToChat,
      threadDocId: threadId,
      createTs: new Date(),
      lastMessage: "",
      lastMessageTime: new Date(),
      messages: [],
      unreadMessageCount: 0
    }
    //this.threadName = MessageUtils.getThreadNameForLoggedInUser(this.selectedThread.threadName, this.loggedInUser);
    this.myThreads.push(this.selectedThread);

    this.socketService.joinRoom({
      threadId: threadId,
      threadName: threadName,
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

  getThreadName(originalThreadName: string): string {
    //console.log('original thread name - ', originalThreadName);
    if (!originalThreadName) return;
    let newThreadName: string[] = [];
    originalThreadName.split(",").map(name => {
      if (name.toLowerCase() != `${this.loggedInUser.f_name.toLowerCase()} ${this.loggedInUser.l_name.toLowerCase()}`) {
        newThreadName.push(name);
        return name;
      }
    });
    return newThreadName.join(", ");
  }

  getParticipantThumbnailUrl(participants: Member[]): string {
    let email = MessageUtils.getParticipantEmailId(participants, this.loggedInUser);
    return this.getThumbnailUrl(email);
  }

  getThumbnailUrl(email) {
    return environment.IMAGEPREPENDURL + email + '.png';
  }

  getParticipantNameCsv(thread: Thread) {
    if (thread) {
      return this.getThreadName(thread.participants.map(p => p.userName).toString());
    }
  }
}

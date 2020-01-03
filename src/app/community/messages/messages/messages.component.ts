import { Component, OnInit, ViewChildren, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { Utils } from 'src/app/shared/Utils';
import { MessagesService } from '../services/messages.service';
import { WebSocketServiceService } from '../services/web-socket-service.service';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Thread } from '../model/threads';
import { Message, Messages } from '../model/message';
import { v4 as uuid } from 'uuid';
import { Auth } from 'src/app/models/Auth';
import { ScrollToBottomDirective } from './../ScrollToBottomDirective';
//\messages\directive\ScrollToBottomDirective.ts

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  //@ViewChildren("messageContainer") messageContainers;
  //@ViewChildren('scrollBottom') private scrollBottom: ElementRef;
  // @Input('conversation') conversation;
  //@ViewChildren('messageContainers') window;
  @ViewChildren(ScrollToBottomDirective)
  scroll: ScrollToBottomDirective;

  public loggedInUser: Auth
  allNeighboursCount: number;
  neighboursListDetails: any;
  myConnectedNeighbors: any;
  members: any[] = [];
  loading = false;
  selectedUser: any[] = [];
  usermessage: String;
  threadName: string;
  public chatroom;
  public messageArray: Array<Message> = [];
  public threads: Array<Thread> = [];
  public tempThread: Array<any> = [];

  public threadId: string;
  public messageText: string;
  public userSelection: string = null;
  //public messagesArray: Array<Message> = [];
  public participantUsers: Array<any> = [];
  selectedMemberToChat = [];
  message: Message;
  //public threadToPushInArray: Array<any> = [];

  public selectedThread: Thread;
  private isTyping = false;
  public existingThread: boolean;
  public IsOnetoOne: boolean;
  public typingData;
  public container;


  constructor(
    private messagesService: MessagesService,
    private webSocketServiceService: WebSocketServiceService) {



  }
  ngOnInit() {
    this.loggedInUser = Utils.GetCurrentUser();
    this.getAllThreads();

    this.webSocketServiceService.invitationRequest().subscribe(data => {
      console.log('invitation data  ..... : ', data);
      //roomId, roomName, createdAt, createdBy, createdWith, members, IsOnetoOne, isInvite,inviteTo
      let newRoomJoinData = {
        threadId: data["threadId"],
        threadName: data["threadName"],
        inviteTo: data['inviteTo'],
        //createdBy: data['createdWith'].userEmailId,
        isInvite: false
      }
      console.log('new invitation join data - ', data["inviteTo"]);
      console.log('logged in email - ', this.loggedInUser.email_id);

      //join the room if its for me
      if (data["inviteTo"].some(i => i.userEmailId == this.loggedInUser.email_id)) {
        console.log('room data - ', newRoomJoinData);
        this.webSocketServiceService.joinRoom(newRoomJoinData);
        console.log(`Invitation accepted going to join the room:${newRoomJoinData.threadId}`)
      } else {
        console.log('ingnored..');
      }
    });
    this.webSocketServiceService.newMessageReceived().subscribe(data => {
      debugger;
      console.log('new message recieved: ', data);
      console.log('new message recieved thread id: ', data['threadId']);
      console.log('selecte thread data: ', this.selectedThread);

      let threadExist = this.threads.find(t => t.threadDocId == data['threadId']);
      console.log("thread exist", threadExist);
      if (threadExist) {
        let index = this.threads.findIndex(t => t.threadDocId == data['threadId']);
        console.log("thread found and index of that thread is:", index);
        //last message update
        this.threads[index].lastMessage = (data['message'].message);

        if (this.selectedThread && this.selectedThread.threadDocId == data['threadId']) {
          this.selectedThread.messages.push(data['message']);
        } else {
          this.threads[index].unreadCount = Number(this.threads[index].unreadCount) ? Number(this.threads[index].unreadCount) + 1 : 1;
        }

        // if thread not selected increase iunread count
      } else {
        // create thread with recived message and push to threadlist
        let newThread = {
          theradId: data['threadId'],
          threadName: data['threadName'],
          participants: data['createdWith'],
          threadDocId: data['threadId'],
          createTs: new Date(),
          lastMessage: "",
          lastMessageTime: "",
          messages: [data['message']],
          unreadCount: 1
        }
        this.threads.push(newThread);
        //this.selectedThread = threadToPushInArray;
      }
      // if (this.selectedThread != null) {
      //   //working code
      //   if (data['threadId'] == this.selectedThread.threadDocId) {

      //     console.log('message inserted in thread id: ', this.selectedThread);
      //     this.selectedThread.messages.push(data['message']);
      //     this.isTyping = false;
      //   }
      // } else {
      //   //   let threadToPushInArray = {
      //   //   theradId: data['threadId'],
      //   //   threadName: this.selectedUser[0]['userName'],
      //   //   threadWithUserEmailId: this.selectedUser[0]['userEmailId'],
      //   //   threadDocId: this.threadId,
      //   //   createTs: new Date(),
      //   //   lastMessage: "",
      //   //   lastMessageTime: "",
      //   //   messages: []
      //   // }
      //   // this.threads.push(threadToPushInArray);
      //   // this.selectedThread = threadToPushInArray;
      // }

    });
    this.webSocketServiceService.allThreadsReceived().subscribe(data => {
      debugger;
      //roomId, roomName, createdBy, createdWith, members, IsOnetoOne, message
      this.threads = (data['threads']);
      console.log('All Threads Received', this.threads);
      //this.isTyping = false;
    });
    this.webSocketServiceService.receivedTyping().subscribe(data => {
      this.typingData = {
        isTyping: data['isTyping'],
        userName: data['typingUser'],
        roomId: data['threadId']
      }
      console.log(this.isTyping = data['isTyping']);
    });

  }
  getAllThreads() {
    this.messagesService.getUsersChatThreads(this.loggedInUser.email_id).subscribe(threadResponse => {
      debugger;
      console.log(JSON.stringify(threadResponse, null, 2));
      //this.threads: Thread[] = [];
      threadResponse.forEach(thread => {
        let threadName: string[] = [];
        thread.threadName.toString().split(',').map(name => {
          if (name != `${this.loggedInUser.f_name} ${this.loggedInUser.l_name}`) {
            threadName.push(name);
            return name;
          }
        });
        thread.threadName = threadName.toString();
        console.log(threadName);
        this.threads.push(thread);
      });


      if (this.threads || this.threads.length > 0) {
        console.log('find threads in get users threads');
        this.webSocketServiceService.joinToAllThread({ threads: this.threads });
        console.log('msgs: ', this.threads);
      }
    },
      error => {
        debugger;
        console.log(error);
      }
    );
  }

  loadThreadInChatCenter(thread: Thread) {
    this.existingThread = true;
    this.threadName = thread.threadName;
    console.log('selected thread >>>>>>>>>>>>>>>>>>', thread);
    console.log('thread doc id >>>>>>>>>>>>>>>>>>', thread.threadDocId);
    this.threadId = thread.threadDocId;
    thread.unreadCount = null;
    this.messagesService.getUsersSelectedThreadChatHistory(thread.threadDocId).subscribe(messages => {
      debugger;
      //console.log(JSON.stringify(messages, null, 2));
      console.log('get......', messages);
      //let activeThreadIndex = this.threads.findIndex(thread => thread.threadDocId == this.threadId);
      // console.log('index..', activeThreadIndex);
      this.selectedThread = thread;

      //this.messagesArray = messages;
      this.selectedThread.messages = messages;
      console.log('index..', this.selectedThread);
      //this.messagesArray = messages;
    },
      error => {
        debugger;
        console.log(error);
      }
    );
    //this.messagesArray = thread.messages;
    //console.log('messagesArray::::', this.messagesArray);

  }

  getAllMemberNeighbors() {
    this.selectedMemberToChat = [];
    this.selectedUser = [];
    debugger;
    this.loading = true;
    let body = {
      _member_id: this.loggedInUser.member_id,
      _filter_by: "none",
      _lease_number: 0,
      _district_code: "",
      _county_no: "",
      _operator_number: ""
    };
    this.messagesService.getMemberNeighborsWithFilter(body).subscribe(data => {
      debugger;
      this.allNeighboursCount = 0;
      this.neighboursListDetails = [];
      this.myConnectedNeighbors = data['data']
      this.allNeighboursCount = this.myConnectedNeighbors.length;
      sessionStorage.setItem("allNeighboursCount", this.allNeighboursCount.toString())
      this.members = this.myConnectedNeighbors;
      console.log('newFilteredData', data['data']);
      this.loading = false;
    },
      error => {
        console.log('getallmemberneighbor error', error)
        this.loading = false;
      })
  }

  handleUserSelectionEvent($event, selectedUser: any[]) {

    // if ($event.target.checked === true) {
    //   // Handle your code
    //   console.log('loadedUser', selectedUser);
    //   console.log('Logged In User: ', this.loggedInUser);
    //   this.selectedUser = selectedUser;
    // }



  }
  selectMembersToChat(event, member: any) {
    //this.selectedMemberToChat = [];
    //this.selectedUser = [];
    let id: number = event.target.id;
    if (event.target.checked) {
      let participantUser = {
        memberId: member['neighbor_id'],
        userName: member['name'],
        userEmailId: member['neighbor_email_id']
      }
      this.selectedUser.push(participantUser);
      this.selectedMemberToChat.push(participantUser);


    }
    else {
      this.selectedMemberToChat = this.selectedMemberToChat.filter(
        m => m.neighbor_id != id
      );
      this.selectedUser = this.selectedUser.filter(
        su => su.neighbor_id != id
      );
    }
  }

  initiateNewThread() {// rename to initiateNewThread
    //let activeThreadIndex = this.threads.findIndex(thread => thread.threadDocId == this.threadId);
    // if (this.threads.length != 0)
    console.log('selected members to chat-', this.selectedMemberToChat);
    console.log('selected users to chat-', this.selectedUser.length);
    if (this.selectedUser.length <= 1) {
      this.IsOnetoOne = true;
      console.log('in if block');

    } else if (this.selectedUser.length > 1) {
      this.IsOnetoOne = false;
    }
    console.log('is on to one - ', this.IsOnetoOne);

    this.selectedMemberToChat.push({
      memberId: this.loggedInUser.member_id,
      userName: `${this.loggedInUser.f_name} ${this.loggedInUser.l_name}`,
      userEmailId: this.loggedInUser.email_id
    });
    let existTread = false;
    let existThread;
    this.threads.forEach(thread => {
      let participantEmailsArr = thread.participants.map(p => p.userEmailId);
      let selectedMemberEmailArr = this.selectedMemberToChat.map(s => s.userEmailId);
      console.log(participantEmailsArr, selectedMemberEmailArr);

      if (JSON.stringify(participantEmailsArr.sort()) == JSON.stringify(selectedMemberEmailArr.sort())) {
        existTread = true;
        existThread = thread;
        console.log('thread in true - ', thread);
        return false;
      } else {
        if (existTread) { return false; }
        existTread == false;
      }
      // if (participantEmailsArr.length == selectedMemberEmailArr.length) {
      //   participantEmailsArr.forEach(email => {
      //     if (selectedMemberEmailArr.includes(email)) {
      //       existTread = true;
      //       existThread = thread;
      //       console.log('thread in true - ', thread);
      //       return false;
      //     } else {

      //       if (existTread) {

      //         return false;
      //       }

      //       existTread = false;
      //     }

      //   });
      // } else {
      //   existTread = false;
      // }

    });
    console.log('Thread exist checking:', existTread);

    // let cnt = this.threads.find(thread => {
    //   return thread.participants.forEach((item) => {
    //     console.log('item email', item.userEmailId);
    //     this.selectedUser.forEach((selected)=>{
    //       item.userEmailId
    //     }) 
    //     //['userEmailId'].contains();
    //   });
    //});
    //this.selectedUser['userEmailId'].contains(item.userEmailId);
    //thread.threadWithUserEmailId == this.selectedUser['userEmailId']);
    if (existTread) {
      console.log('thread already exists!!', existTread);
      console.log('thread which is exist -', existThread);
      this.loadThreadInChatCenter(existThread);

    }
    else {
      //this.threads = [];
      //this.selectedThread = null;
      console.log('thread not found - ');
      this.threadId = uuid();
      let loggedUser = {
        memberId: this.loggedInUser.member_id,
        userName: this.loggedInUser.f_name + " " + this.loggedInUser.l_name,
        userEmailId: this.loggedInUser.email_id
      }
      let threadToPushInArray = {
        theradId: this.threadId,
        threadName: this.selectedMemberToChat.map(u => { return u['userName'] }).toString(),
        participants: this.selectedMemberToChat,
        threadDocId: this.threadId,
        createTs: new Date(),
        lastMessage: "",
        lastMessageTime: "",
        messages: [],
        unreadCount: 0
      }
      this.threads.push(threadToPushInArray);
      this.selectedThread = threadToPushInArray;
      let newRoomJoinData = {
        threadId: this.threadId,
        threadName: this.selectedMemberToChat.map(u => { return u['userName'] }).toString(),
        createdAt: new Date(),
        createdBy: loggedUser,
        createdWith: this.selectedMemberToChat,
        lastMessage: "This is testing message...",
        lastMessageTime: new Date(),
        IsOnetoOne: true,
        isInvite: true,
        inviteTo: this.selectedUser

      }
      this.threadName = newRoomJoinData.threadName;

      this.webSocketServiceService.joinRoom(newRoomJoinData);
      // this.threadName = this.selectedUser[0]['userName'];
      // if (this.selectedMemberToChat.length != 0) {
      //   this.selectedMemberToChat.forEach((user) => {
      //     this.threadName = user.userName;
      //     this.webSocketServiceService.joinRoom(newRoomJoinData);
      //     console.log('in chat selection boxxxxxxxx=>', newRoomJoinData);
      //   })
      // }
      //this.selectedMemberToChat = [];
      ///this.selectedUser = [];
    }
  }

  sendMessage(event) {

    this.messageText = event.target.value;
    //this.message = messageText;
    event.target.value = "";
    //this.participantUsers.push(participantUser1);
    //this.participantUsers.push(participantUser2);
    let chatroom;
    let loggedUser = {
      memberId: this.loggedInUser.member_id,
      userName: this.loggedInUser.f_name + " " + this.loggedInUser.l_name,
      userEmailId: this.loggedInUser.email_id
    }
    // if (this.threadId == null) {
    //   this.threadId = uuid();
    // } else {
    //   console.log('threadId exists!');
    // }
    this.message = {
      messageId: uuid(),
      threadId: this.threadId,
      message: this.messageText,
      from: {
        memberId: this.loggedInUser.member_id,
        userName: this.loggedInUser.f_name + " " + this.loggedInUser.l_name,
        userEmailId: this.loggedInUser.email_id
      },
      timeStamp: new Date(),
      isRead: false
    }
    this.selectedThread.messages.push(this.message);

    //if (this.existingThread == true) {
    chatroom = {
      threadId: this.selectedThread.threadDocId,//Room id should be check before set new uuid
      threadName: this.selectedThread.threadName,
      createTs: this.selectedThread.createTs,//this should change at future
      createdBy: loggedUser,
      participants: this.selectedThread.participants,
      message: {
        messageId: uuid(),
        message: this.messageText,
        from: loggedUser,
        timeStamp: new Date(),
        isRead: false
      },
      lastMessage: this.selectedThread.lastMessage,
      lastMessageTime: this.selectedThread.lastMessageTime
    }
    console.log('chatroom of extisting thread send message-', chatroom);
    // } else {

    //   chatroom = {
    //     threadId: this.threadId,//Room id should be check before set new uuid
    //     threadName: this.threadName,
    //     createdAt: new Date(),//this should change at future
    //     createdBy: loggedUser,
    //     createdWith: this.selectedMemberToChat,
    //     message: {
    //       messageId: uuid(),
    //       message: this.messageText,
    //       from: loggedUser,
    //       timeStamp: new Date(),
    //       isRead: false
    //     },
    //     lastMessage: "This is testing message......",
    //     lastMessageTime: new Date(),
    //     IsOnetoOne: this.IsOnetoOne
    //   }

    //   console.log('user Message:', this.messageText);
    //   console.log('threadId :', this.threadId);
    //   console.log('chatroom of send message-', chatroom);
    //   this.selectedThread.messages.push(this.message);
    // }

    //this.threads.find(thread => thread.threadWithUserEmailId == )

    //this.threads.push(this.selectedThread);
    this.webSocketServiceService.sendMessage(chatroom);
  }
  typing() {
    debugger;
    console.log('typing user..', this.loggedInUser.f_name + " " + this.loggedInUser.l_name);
    let data = {
      roomId: this.threadId,
      typingUser: this.loggedInUser.f_name + " " + this.loggedInUser.l_name,
      isTyping: true
    }
    this.webSocketServiceService.typing({ data });
  }
}

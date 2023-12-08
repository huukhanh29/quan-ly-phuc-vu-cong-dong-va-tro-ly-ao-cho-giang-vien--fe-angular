// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   OnInit,
//   Renderer2,
//   ViewChild,
// } from '@angular/core';
// import { CauHoiService } from 'src/app/services/cau-hoi.service';

// interface Message {
//   content: string;
//   isOutgoing: boolean;
// }

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css'],
// })
// export class ChatComponent implements AfterViewInit {
//   showChatbot = false;
//   userMessage: string = '';
//   combinedMessages: Message[] = [];
//   @ViewChild('chatbot') chatbotRef!: ElementRef;
//   @ViewChild('toggler') togglerRef!: ElementRef;

//   constructor(
//     private cauHoiService: CauHoiService,
//     private renderer: Renderer2
//   ) {}
//   ngAfterViewInit() {
//     this.combinedMessages.push({
//       content: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
//       isOutgoing: false,
//     });
//     this.renderer.listen('document', 'click', (event) => {
//       if (
//         this.chatbotRef &&
//         this.chatbotRef.nativeElement &&
//         this.togglerRef &&
//         this.togglerRef.nativeElement &&
//         !this.chatbotRef.nativeElement.contains(event.target) &&
//         !this.togglerRef.nativeElement.contains(event.target) &&
//         this.showChatbot
//       ) {
//         this.showChatbot = false;
//       }
//     });
//   }

//   toggleChatbot() {
//     this.showChatbot = !this.showChatbot;
//   }

//   sendMessage(event: Event) {
//     event.preventDefault(); // Ngăn chặn sự kiện xuống dòng

//     const message = this.userMessage.trim().toLowerCase();
//     let response = '';
//     let response1 = '';
//     if (!message) {
//       return; // Return early if the message is empty
//     }
//     const handleResponse = (data: any) => {
//       if (data.message === 'unknown') {
//         response = 'Xin lỗi. Tôi không tìm thấy dữ liệu cho câu hỏi của bạn!';
//         this.combinedMessages.push({
//           content: this.userMessage,
//           isOutgoing: true,
//         });

//         this.combinedMessages.push({ content: response, isOutgoing: false });
//       } else {
//         response1 = `Bạn muốn hỏi về ${data.cauHoi} đúng không?`;
//         response = data.traLoi; // Chỉnh sửa tùy theo cấu trúc dữ liệu trả về
//         this.combinedMessages.push({
//           content: this.userMessage,
//           isOutgoing: true,
//         });
//         this.combinedMessages.push({ content: response1, isOutgoing: false });
//         this.combinedMessages.push({ content: response, isOutgoing: false });
//       }

//       this.scrollChatboxToBottom();
//       this.userMessage = '';
//     };

//     if (
//       message === 'hi' ||
//       message === 'hello' ||
//       message === 'chào' ||
//       message === 'xin chào'
//     ) {
//       response = 'Hello!';

//       this.combinedMessages.push({
//         content: this.userMessage,
//         isOutgoing: true,
//       });

//       this.combinedMessages.push({ content: response, isOutgoing: false });
//       this.scrollChatboxToBottom();
//       this.userMessage = '';
//     } else {
//       // Gọi API hỏi câu hỏi và xử lý câu trả lời
//       this.cauHoiService.getAnswer(message).subscribe({
//         next: handleResponse,
//         error: (error) => {
//           console.log(error);
//           console.error('Error calling API:', error);
//         },
//       });
//     }
//   }

//   //cuộn xuống nội dung tin nhắn mới nhất
//   scrollChatboxToBottom() {
//     setTimeout(() => {
//       const chatbox = document.querySelector('.chatbox');
//       if (chatbox) {
//         chatbox.scrollTop = chatbox.scrollHeight;
//       }
//     }, 0);
//   }
// }
import { Component, ElementRef, OnInit, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { CauHoiService } from 'src/app/services/cau-hoi.service';

interface Message {
  content: string;
  isOutgoing: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  showChatbot = false;
  userMessage: string = '';
  combinedMessages: Message[] = [];
  @ViewChild('chatbot') chatbotRef!: ElementRef;
  @ViewChild('toggler') togglerRef!: ElementRef;

  constructor(
    private cauHoiService: CauHoiService,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.combinedMessages.push({
      content: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
      isOutgoing: false,
    });
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    if (
      this.chatbotRef?.nativeElement &&
      this.togglerRef?.nativeElement &&
      !this.chatbotRef.nativeElement.contains(event.target) &&
      !this.togglerRef.nativeElement.contains(event.target) &&
      this.showChatbot
    ) {
      this.showChatbot = false;
    }
  }

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }

  sendMessage(event: Event) {
    event.preventDefault();

    const message = this.userMessage.trim().toLowerCase();
    if (!message) {
      return;
    }

    this.processUserMessage(message);
  }

  private processUserMessage(message: string) {
    // Kiểm tra và xử lý các tin nhắn đặc biệt (ví dụ: chào hỏi)
    if (this.handleSpecialMessages(message)) {
      return;
    }

    // Gọi API hỏi câu hỏi và xử lý câu trả lời
    this.cauHoiService.getAnswer(message).subscribe({
      next: (data: any) => this.handleResponse(data),
      error: (error) => {
        console.log(error);
        console.error('Error calling API:', error);
      },
    });
  }

  private handleSpecialMessages(message: string): boolean {
    switch (message) {
      case 'hi':
      case 'hello':
      case 'chào':
      case 'xin chào':
        this.handleGreeting(message);
        return true;
      default:
        return false;
    }
  }

  private handleGreeting(message: string) {
    const response = 'Hello!';
    this.combinedMessages.push({ content: message, isOutgoing: true });
    this.combinedMessages.push({ content: response, isOutgoing: false });
    this.scrollChatboxToBottom();
    this.userMessage = '';
  }

  private handleResponse(data: any) {
    let responseCauHoi = '';
    let response = '';

    if (data.message === 'unknown') {
      response = 'Xin lỗi. Tôi không tìm thấy dữ liệu cho câu hỏi của bạn!';
      this.combinedMessages.push({ content: this.userMessage, isOutgoing: true });
      this.combinedMessages.push({ content: response, isOutgoing: false });
    } else {
      responseCauHoi = `Bạn muốn hỏi về "${data.cauHoi}" đúng không?`;

      response = data.traLoi;
      this.combinedMessages.push({ content: this.userMessage, isOutgoing: true });
      this.combinedMessages.push({ content: responseCauHoi, isOutgoing: false });
      this.combinedMessages.push({ content: response, isOutgoing: false });
    }


    this.scrollChatboxToBottom();
    this.userMessage = '';
  }

  private scrollChatboxToBottom() {
    setTimeout(() => {
      const chatbox = document.querySelector('.chatbox');
      if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    }, 0);
  }
}

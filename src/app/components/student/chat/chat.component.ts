import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CauHoiService } from 'src/app/services/cau-hoi.service';

interface Message {
  content: string;
  isOutgoing: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit  {
  showChatbot = false;
  userMessage: string = '';
  combinedMessages: Message[] = [];
  @ViewChild('chatbot') chatbotRef!: ElementRef;
  @ViewChild('toggler') togglerRef!: ElementRef;

  constructor(private cauHoiService: CauHoiService, private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.combinedMessages.push({ content: 'Hi there! How can I help you today?', isOutgoing: false });
    this.renderer.listen('document', 'click', (event) => {
      if (
        this.chatbotRef &&
        this.chatbotRef.nativeElement &&
        this.togglerRef &&
        this.togglerRef.nativeElement &&
        !this.chatbotRef.nativeElement.contains(event.target) &&
        !this.togglerRef.nativeElement.contains(event.target) &&
        this.showChatbot
      ) {
        this.showChatbot = false;
      }
    });
  }

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }

  sendMessage(event: Event) {
    event.preventDefault(); // Ngăn chặn sự kiện xuống dòng

    const message = this.userMessage.trim().toLowerCase();
    let response = "";
    if (!message) {
      return; // Return early if the message is empty
    }
    const handleResponse = (data: { traLoi: any; message?: any; }) => {
      if (data.message === "unknown") {
        response = "Xin lỗi. Tôi không tìm thấy dữ liệu cho câu hỏi của bạn!";
      } else {
        response = data.traLoi; // Chỉnh sửa tùy theo cấu trúc dữ liệu trả về
      }
      this.combinedMessages.push({ content: this.userMessage, isOutgoing: true });
      this.combinedMessages.push({ content: response, isOutgoing: false });
      this.scrollChatboxToBottom();
      this.userMessage = '';
    };

    if (message === "hi" || message === "hello" || message === "chào" || message === "xin chào") {
      response = "Hello!";
      handleResponse({ traLoi: response });
    } else {
      // Gọi API hỏi câu hỏi và xử lý câu trả lời
      this.cauHoiService.getAnswer(message).subscribe({
        next: handleResponse,
        error: (error) => {
          console.log(error);
          console.error('Error calling API:', error);
        }
      });
    }
  }

  //cuộn xuống nội dung tin nhắn mới nhất
  scrollChatboxToBottom() {
    setTimeout(() => {
      const chatbox = document.querySelector('.chatbox');
      if (chatbox) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    }, 0);
  }
}

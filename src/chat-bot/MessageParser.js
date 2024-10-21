// class MessageParser {
//     constructor(actionProvider, state) {
//       this.actionProvider = actionProvider;
//       this.state = state;
//     }
  
//     parse(message) {
//       console.log(message);
//     }
//   }
  
//   export default MessageParser;
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message);
  
    // 백엔드로 메시지 전송
    fetch("http://localhost:8181/api/chatbot/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 받은 메시지를 파싱하고 로그로 확인
        console.log("Response data:", data);
        
        // data.message가 실제로 존재하는지 확인하고 처리
        if (data && data.message) {
          this.actionProvider.handleBotResponse(data.message);
        } else {
          console.error("Invalid response format:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}  

export default MessageParser;

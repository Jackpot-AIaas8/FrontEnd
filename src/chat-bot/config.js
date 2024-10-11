import { createChatBotMessage } from "react-chatbot-kit";
import Header from "./Header";
import ChatMessage from "./ChatMessage";

const config = {
  initialMessages: [
    createChatBotMessage(
      "안녕하세요! 궁금한 내용을 입력해주세요."
    ),
  ],
  customComponents: {
    // Replaces the default header
    header: () => <Header />,
    // Replaces the default bot avatar
    botAvatar: (props) => <div {...props} />,
    // Replaces the default bot chat message container
    botChatMessage: (props) => <ChatMessage {...props} isBot={true} />,
    // Replaces the default user icon
    userAvatar: (props) => <div {...props} />,
    // Replaces the default user chat message
    userChatMessage: (props) => <ChatMessage {...props} isBot={false}/>,
  },
};

export default config;
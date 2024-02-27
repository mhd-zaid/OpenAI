import { Box } from '@chakra-ui/react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useEffect, useState } from 'react';

const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState([
    { message: 'Bonjour! Comment puis-je vous aider ?', sender: 'assistant' },
  ]);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);

  useEffect(() => {}, []);

  // fetches ai response
  const handleAssistantResponse = async () => {};

  const handleUserMessage = async userMessage => {
    // Create a new user message object
    const newUserMessage = {
      message: userMessage,
      sender: 'user',
      direction: 'outgoing',
    };

    const updatedChatMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedChatMessages);
  };

  return (
    <Box pos="absolute" right="2%" w=" 30%" h="80%">
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {chatMessages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            placeholder="Envoyer un message..."
            onSend={handleUserMessage}
          />
        </ChatContainer>
      </MainContainer>
    </Box>
  );
};

export default Chatbot;

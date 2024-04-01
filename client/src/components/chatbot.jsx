import { Box, Button, Image } from '@chakra-ui/react';
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
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    resetContext();
  }, []);

  const handleUserMessage = async userMessage => {
    const newUserMessage = {
      message: userMessage,
      sender: 'user',
      direction: 'outgoing',
    };

    setChatMessages([...chatMessages, newUserMessage]);
    setIsChatbotTyping(true);
    await processUserMessage(userMessage);
  };

  const processUserMessage = async userMessage => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setChatMessages(chatMessages => [
          ...chatMessages,
          { message: data.content, sender: 'assistant', direction: 'incoming' },
        ]);
      })
      .finally(() => {
        setIsChatbotTyping(false);
      });
  };

  const getContext = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/chatbot/context')
      .then(res => res.json())
      .then(data => console.log(data));
  };
  const resetContext = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + '/chatbot/reset', {
      method: 'POST',
    });
  };

  return (
    <>
      <Button
        pos="fixed"
        right="3%"
        bottom="4%"
        w={14}
        h={14}
        rounded="full"
        variant="unstyled"
        bgColor="yellow.500"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <Image src="/img/chatbot-logo.png" rounded="full" />
      </Button>
      <Box
        pos="fixed"
        right="2%"
        bottom="14%"
        zIndex={10}
        w={{ sm: '75%', md: '50%', lg: '30%' }}
        h="70%"
        hidden={!showChatbot}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isChatbotTyping ? (
                  <TypingIndicator content="Le chef réflechit" />
                ) : null
              }
            >
              {chatMessages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
              {chatMessages.length === 0 && (
                <MessageList.Content
                  style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    fontSize: '.75rem',
                    color: 'gray',
                  }}
                >
                  Veuillez poser votre question
                </MessageList.Content>
              )}
            </MessageList>
            <MessageInput
              attachButton={false}
              placeholder="Envoyer un message..."
              style={{ textAlign: 'initial' }}
              onSend={handleUserMessage}
            />
          </ChatContainer>
        </MainContainer>
      </Box>
    </>
  );
};

export default Chatbot;

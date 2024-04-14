import { Box, Button, Image } from '@chakra-ui/react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { useEffect, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const Chatbot = () => {
  const [currentData, setCurrentData] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    resetContext();
  }, []);

  useEffect(() => {
    if (currentData.length === 0) return;
    setChatMessages(prevMessages => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      lastMessage.message = currentData.join('');
      return [...prevMessages];
    });
  }, [currentData]);

  const handleUserMessage = async userMessage => {
    const newUserMessage = {
      message: userMessage,
      sender: 'user',
      direction: 'outgoing',
    };

    setChatMessages([...chatMessages, newUserMessage]);
    await processUserMessage(userMessage);
  };

  const processUserMessage = async userMessage => {
    setCurrentData([]);
    setChatMessages(prevMessages => [
      ...prevMessages,
      {
        message: '',
        sender: 'assistant',
        direction: 'incoming',
      },
    ]);
    await fetchEventSource(import.meta.env.VITE_BACKEND_URL + '/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage }),
      headers: {
        Accept: 'text/event-stream',
        'Content-Type': 'application/json',
      },
      onopen: res => {
        if (res.ok && res.status === 200) {
          console.log('Connection made ', res);
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log('Client-side error ', res);
        }
      },
      onmessage: async event => {
        if (!event.data) return;

        try {
          const parsedData = JSON.parse(event.data);
          parsedData.content &&
            setCurrentData(currentData => [...currentData, parsedData.content]);
        } catch (err) {
          console.log(err);
        }
      },
      onclose: () => {
        console.log('Connection closed by the server');
      },
      onerror: async err => {
        console.log('There was an error from server', err);
      },
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
        zIndex={9999}
        w={{ sm: '75%', md: '50%', lg: '30%' }}
        h="70%"
        hidden={!showChatbot}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList>
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

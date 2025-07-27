import ChatMessage from "./ChatMessage";

const ChatMessageList = ({ messages }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8 w-full">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessageList;

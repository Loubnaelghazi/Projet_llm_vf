import React, { useRef, useState } from "react";
import { FaUserCircle, FaRobot } from "react-icons/fa";
import startChat from "../assets/startchat.png";
import { chatResponse,chatResponseRag } from "../api/api";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const messageRef = useRef();

  const addNewMessage = async (e) => {
    e.preventDefault();
    const messageValue = messageRef.current.value;
    if (messageValue.trim() === "") return;

    const userMessage = { user: "User", text: messageValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setChatStarted(true);
    messageRef.current.value = "";

    setIsLoading(true);
    const loadingMessage = {
      user: "Bot",
      text: "Je suis en train de réfléchir...",
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      let response;
      if (selectedModel === "fine-tuning" || selectedModel === "RAG") {
       
        response = await chatResponse({ prompt: messageValue });
      }

      const botMessage = { user: "Bot", text: response.data.generated_text };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      const errorMessage = {
        user: "Bot",
        text: "Désolé, une erreur est survenue.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <div className="w-full flex flex-col-reverse bg-accent  ">
      <div className=" top-0 left-0 ">
        <select
          value={selectedModel}
          onChange={handleModelChange}
          className="btn btn-accent ml-2 "
        >
          <option value="">Select a model</option>
          <option value="fine-tuning">Fine Tuning Model</option>
          <option value="RAG">RAG Model</option>
        </select>
      </div>
      {!chatStarted ? (
        <div className="flex flex-col text-neutral-300 items-center py-16 gap-2 ">
          <img src={startChat} className="w-56" alt="Start Chat" />
          <div>It seems clear for now...</div>
          <div>Unleash your creativity and start chatting!</div>
          <div className=" px-48">
            <div className="flex rounded-lg">
              <input
                type="text"
                ref={messageRef}
                placeholder="Start your conversation...."
                className="input text-primary input-bordered w-full max-w-xs "
              />
              <button
                onClick={addNewMessage}
                className="btn text-primary bg-base-300 ml-2"
              >
                Start Chat (French)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-1py-4 px-48 justify-center">
          <div className="flex rounded-lg p-26">
            <input
              type="text"
              ref={messageRef}
              placeholder="Quelle est votre question ? /"
              className="input input-bordered w-auto "
            />
            <button onClick={addNewMessage} className="btn btn-base-300 ml-2">
              Submit
            </button>
          </div>
        </div>
      )}
      {messages.length !== 0 && (
        <div
          className="overflow-y-auto px-10 my-5 w-full"
          style={{ maxHeight: "600px" }}
        >
          {messages.map((message, index) => (
            <div key={index} className="mb-5">
              {message.user === "User" ? (
                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-primary">
                    {message.text}
                  </div>
                  <FaUserCircle className="text-primary w-10 h-10" />
                </div>
              ) : (
                <div className="chat chat-start">
                  <FaRobot className="text-secondary w-10 h-10" />
                  <div className="chat-bubble chat-bubble-secondary">
                    {message.text}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

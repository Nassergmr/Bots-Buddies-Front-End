"use client";

import { useEffect, createContext, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

export const MyContext = createContext();

// Local Storage Setup
const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const getItem = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

export default function Client({ children }) {
  const [animated, setAnimated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLimit, setIsLimit] = useState(false);
  const socketRef = useRef(null);
  const path = usePathname();

  useEffect(() => {
    if (isLimit) {
      toast(
        <div className="flex flex-col gap-3 text-center">
          <FaExclamationCircle size={32} className="mx-auto text-red-600" />
          <div>Daily rate limit reached for this model, retry later</div>
          {path.includes("core") && (
            <div>
              تم الوصول إلى الحد الأقصى للسعر اليومي لهذا النموذج، أعد المحاولة
              لاحقًا
            </div>
          )}
        </div>,
        {
          className: "custom-toast",
        }
      );
    }
  }, [isLimit]);

  // Chatgpt
  const [chatgptMessage, setChatgptMessage] = useState("");
  const [chatgptConversation, setChatgptConversation] = useState([]);

  // Meta
  const [metaMessage, setMetaMessage] = useState("");
  const [metaConversation, setMetaConversation] = useState([]);

  // Microsoft
  const [microsoftMessage, setMicrosoftMessage] = useState("");
  const [microsoftConversation, setMicrosoftConversation] = useState([]);

  // XAi
  const [xAiMessage, setXAiMessage] = useState("");
  const [xAiConversation, setXAiConversation] = useState([]);

  // Core42
  const [core42Message, setCore42Message] = useState("");
  const [core42Conversation, setCore42Conversation] = useState([]);

  /* Get From LocalStorage */
  // Chatgpt
  useEffect(() => {
    const savedMessages = getItem("chatgpt_conversation_storage");
    if (savedMessages.length > 0) {
      const updatedMessages = savedMessages.map((prev) => ({
        ...prev,
        animate: false,
      }));

      setChatgptConversation(updatedMessages);

      if (path.includes("open-ai")) {
        setChatgptConversation(updatedMessages);
      }
    }
  }, [path]);

  // Meta
  useEffect(() => {
    const savedMessages = getItem("meta_conversation_storage");
    if (savedMessages.length > 0) {
      const updatedMessages = savedMessages.map((prev) => ({
        ...prev,
        animate: false,
      }));

      setMetaConversation(updatedMessages);

      if (path.includes("meta")) {
        setMetaConversation(updatedMessages);
      }
    }
  }, [path]);

  // Microsoft
  useEffect(() => {
    const savedMessages = getItem("microsoft_conversation_storage");

    if (savedMessages.length > 0) {
      const updatedMessages = savedMessages.map((prev) => ({
        ...prev,
        animate: false,
      }));

      setMicrosoftConversation(updatedMessages);

      if (path.includes("microsoft")) {
        setMicrosoftConversation(updatedMessages);
      }
    }
  }, [path]);

  // Xai
  useEffect(() => {
    const savedMessages = getItem("xai_conversation_storage");

    if (savedMessages.length > 0) {
      const updatedMessages = savedMessages.map((prev) => ({
        ...prev,
        animate: false,
      }));
      setXAiConversation(updatedMessages);

      if (path.includes("xai")) {
        setXAiConversation(updatedMessages);
      }
    }
  }, [path]);

  // Core42
  useEffect(() => {
    const savedMessages = getItem("core42_conversation_storage");

    if (savedMessages.length > 0) {
      const updatedMessages = savedMessages.map((prev) => ({
        ...prev,
        animate: false,
      }));
      setCore42Conversation(updatedMessages);

      if (path.includes("core")) {
        setCore42Conversation(updatedMessages);
      }
    }
  }, [path]);

  /* Save To LocalStorage */
  // Chatgpt
  useEffect(() => {
    setItem("chatgpt_conversation_storage", chatgptConversation);
  }, [chatgptConversation]);

  // Meta
  useEffect(() => {
    setItem("meta_conversation_storage", metaConversation);
  }, [metaConversation]);

  // Microsoft
  useEffect(() => {
    setItem("microsoft_conversation_storage", microsoftConversation);
  }, [microsoftConversation]);

  // XAi
  useEffect(() => {
    setItem("xai_conversation_storage", xAiConversation);
  }, [xAiConversation]);

  // Core42
  useEffect(() => {
    setItem("core42_conversation_storage", core42Conversation);
  }, [core42Conversation]);

  // Send The Chatgpt User Message to The Server
  const sendChatgptUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("chatgpt_conversation", message);
    }
  };

  // Send The Meta User Message to The Server
  const sendMetaUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("meta_conversation", message);
    }
  };

  // Send The Microsoft User Message to The Server
  const sendMicrosoftUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("microsoft_conversation", message);
    }
  };

  // Send The XAi User Message to The Server
  const sendXAiUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("xai_conversation", message);
    }
  };

  // Send The Core42 User Message to The Server
  const sendCore42UserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("core42_conversation", message);
    }
  };

  useEffect(() => {
    // Creating a socket instance and connecting to the WebSocket server
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    socketRef.current = io(socketUrl);

    // Event listener for successful connection to the server
    socketRef.current.on(`connect`, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `Connected Successfully from Client Side, id: ${socketRef.current.id}`
        );
      }
    });

    // Receive ChatGPT Response From The Server And Push It To The Conversation Array
    socketRef.current.on("chatgpt_conversation", (ChatGptmessage) => {
      setChatgptMessage(ChatGptmessage);
      setChatgptConversation((prev) =>
        prev
          .map((msg, index) =>
            index === prev.length - 1 ? { ...msg, isloading: false } : msg
          )
          .concat({
            text: ChatGptmessage,
            isai: true,
            animate: true,
            isloading: false,
          })
      );
    });

    // Receive Meta Response From The Server And Push It To The Conversation Array
    socketRef.current.on("meta_conversation", (MetaMessage) => {
      setMetaMessage(MetaMessage);
      setMetaConversation((prev) =>
        prev
          .map((msg, index) =>
            index === prev.length - 1 ? { ...msg, isloading: false } : msg
          )
          .concat({
            text: MetaMessage,
            isai: true,
            animate: true,
            isloading: false,
          })
      );
    });

    // Receive Microsoft Response From The Server And Push It To The Conversation Array
    socketRef.current.on("microsoft_conversation", (MicrosoftMessage) => {
      setMicrosoftMessage(MicrosoftMessage);
      setMicrosoftConversation((prev) =>
        prev
          .map((msg, index) =>
            index === prev.length - 1 ? { ...msg, isloading: false } : msg
          )
          .concat({
            text: MicrosoftMessage,
            isai: true,
            animate: true,
            isloading: false,
          })
      );
    });

    // Receive XAi Response From The Server And Push It To The Conversation Array
    socketRef.current.on("xai_conversation", (XAiMessage) => {
      setXAiMessage(XAiMessage);
      setXAiConversation((prev) =>
        prev
          .map((msg, index) =>
            index === prev.length - 1 ? { ...msg, isloading: false } : msg
          )
          .concat({
            text: XAiMessage,
            isai: true,
            animate: true,
            isloading: false,
          })
      );
    });

    // Receive Core42 Response From The Server And Push It To The Conversation Array
    socketRef.current.on("core42_conversation", (Core42Message) => {
      setCore42Message(Core42Message);
      setCore42Conversation((prev) =>
        prev
          .map((msg, index) =>
            index === prev.length - 1 ? { ...msg, isloading: false } : msg
          )
          .concat({
            text: Core42Message,
            isai: true,
            animate: true,
            isloading: false,
          })
      );
    });

    // Alert for the rate limit error (ex: 50 requests a day)
    socketRef.current.on("rate_limit_exceeded", () => {
      setIsLimit(true);
      setTimeout(() => {
        setIsLimit(false);
      }, 5000);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <MyContext.Provider
      value={{
        isLoaded,
        setIsLoaded,
        socketRef,
        // Chatgpt
        chatgptConversation,
        setChatgptConversation,
        sendChatgptUserMessage,
        isLimit,
        // Meta
        metaConversation,
        setMetaConversation,
        sendMetaUserMessage,
        // Microsoft
        microsoftConversation,
        setMicrosoftConversation,
        sendMicrosoftUserMessage,
        // XAi
        xAiConversation,
        setXAiConversation,
        sendXAiUserMessage,
        // Core42
        core42Conversation,
        setCore42Conversation,
        sendCore42UserMessage,
      }}
    >
      {/* Alert the user of rate limit */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        theme="dark"
        transition={Zoom}
        closeButton={false}
        pauseOnHover={false}
      />
      {children}
    </MyContext.Provider>
  );
}

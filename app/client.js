"use client";

import { useEffect, createContext, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaExclamationCircle } from "react-icons/fa";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useId } from "react";

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
  const [isError, setIsError] = useState(false);
  const [isUnavailable, setisUnavailable] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState("");
  const [replySelected, setReplySelected] = useState(false);

  const router = useRouter();
  const socketRef = useRef(null);
  const path = usePathname();
  const messageId = crypto.randomUUID();

  // Chatgpt
  const [chatgptMessage, setChatgptMessage] = useState("");
  const [chatgptConversation, setChatgptConversation] = useState([]);
  const [chatgptMssgGenerated, setChatgptMssgGenerated] = useState(true);
  const [chatgptMssgGenerated2, setChatgptMssgGenerated2] = useState(true);

  // Meta
  const [metaMessage, setMetaMessage] = useState("");
  const [metaConversation, setMetaConversation] = useState([]);
  const [metaMssgGenerated, setMetaMssgGenerated] = useState(true);
  const [metaMssgGenerated2, setMetaMssgGenerated2] = useState(true);

  // Microsoft
  const [microsoftMessage, setMicrosoftMessage] = useState("");
  const [microsoftConversation, setMicrosoftConversation] = useState([]);
  const [microsoftMssgGenerated, setMicrosoftMssgGenerated] = useState(true);
  const [microsoftMssgGenerated2, setMicrosoftMssgGenerated2] = useState(true);

  // XAi
  const [xAiMessage, setXAiMessage] = useState("");
  const [xAiConversation, setXAiConversation] = useState([]);
  const [xaiMssgGenerated, setXaiMssgGenerated] = useState(true);
  const [xaiMssgGenerated2, setXaiMssgGenerated2] = useState(true);

  // Core42
  const [core42Message, setCore42Message] = useState("");
  const [core42Conversation, setCore42Conversation] = useState([]);
  const [core42MssgGenerated, setCore42MssgGenerated] = useState(true);
  const [isArabicLetters, setIsArabicLetters] = useState(true);

  // Codestral
  const [codestralMessage, setCodestralMessage] = useState("");
  const [codestralConversation, setCodestralConversation] = useState([]);
  const [codestralMssgGenerated, setCodestralMssgGenerated] = useState(true);
  const [codestralMssgGenerated2, setCodestralMssgGenerated2] = useState(true);

  // All Models
  const [allModelsMessages, setAllModelsMessages] = useState([]);
  const [allModelsConversation, setAllModelsConversation] = useState([]);
  const [allModelsMssgGenerated, setAllModelsMssgGenerated] = useState(true);

  const modelRoutes = {
    "GPT-4.1": "/models/gpt",
    "Llama 4 Scout 17B 16E Instruct": "/models/llama",
    "Phi-4-mini-instruct": "/models/phi",
    "Codestral 25.01": "/models/codestral",
    "Grok 3 Mini": "/models/grok",
  };

  // Alert user about errors
  useEffect(() => {
    if (isLimit) {
      toast.error(
        <div className="flex flex-col gap-3 text-center mx-auto">
          <FaExclamationCircle size={32} className="text-[#E64D3C] mx-auto" />
          <div className="text-white">
            Daily rate limit reached for this model, retry later
          </div>
          {path.includes("core") && (
            <div className="text-white">
              تم الوصول إلى الحد الأقصى للسعر اليومي لهذا النموذج، أعد المحاولة
              لاحقًا
            </div>
          )}
        </div>,
      );
    }

    if (isUnavailable) {
      toast.error(
        <div className="flex flex-col gap-3 mx-auto text-center">
          <FaExclamationCircle size={32} className="text-[#E64D3C] mx-auto" />
          <div className="text-white">
            This model is currently unavailable, try again later
          </div>
        </div>,
      );
    }

    if (isError) {
      toast.error(
        <div className="flex flex-col gap-3 mx-auto text-center">
          <FaExclamationCircle size={32} className="text-[#E64D3C] mx-auto" />
          <div className="text-white"> Something went wrong, try again</div>
          {path.includes("core") && (
            <div className="text-white">حدث خطأ ما، حاول مرة أخرى</div>
          )}
        </div>,
      );
    }
    if (!isArabicLetters) {
      toast.info(
        <div className="flex flex-col gap-3 mx-auto text-center">
          <FaExclamationCircle size={32} className="text-[#4298DB] mx-auto" />
          <div>Only Arabic letters are allowed</div>
          <div>يُسمح فقط بالحروف العربية</div>
        </div>,
      );
    }
  }, [isLimit, isError, isArabicLetters, path]);

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

  // Codestral
  useEffect(() => {
    const savedMessages = getItem("codestral_conversation_storage");

    if (savedMessages.length > 0) {
      const updatedMessages = savedMessages.map((prev) => ({
        ...prev,
        animate: false,
      }));
      setCodestralConversation(updatedMessages);

      if (path.includes("codestral")) {
        setCodestralConversation(updatedMessages);
      }
    }
  }, [path]);

  // All Models
  useEffect(() => {
    const savedMessages = getItem("allModels_conversation_storage");

    if (savedMessages.length > 0) {
      const updatedMessages = savedMessages.map((prev) => ({
        ...prev,
        animate: false,
      }));
      setAllModelsConversation(updatedMessages);

      if (path.includes("parallel")) {
        setAllModelsConversation(updatedMessages);
      }
    }
  }, [path]);

  // Reply messages
  useEffect(() => {
    const savedMessages = getItem("reply_messages_conversation_storage");

    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

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

  // Codestral
  useEffect(() => {
    setItem("codestral_conversation_storage", codestralConversation);
  }, [codestralConversation]);

  // All Models
  useEffect(() => {
    setItem("allModels_conversation_storage", allModelsConversation);
  }, [allModelsConversation]);

  // Reply Messages
  useEffect(() => {
    setItem("reply_messages_conversation_storage", messages);
  }, [messages]);

  // Send The Chatgpt User Message to The Server
  const handleSendChatgptUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("chatgpt_conversation", message);
    }
  };

  // Send The Meta User Message to The Server
  const handleSendMetaUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("meta_conversation", message);
    }
  };

  // Send The Microsoft User Message to The Server
  const handleSendMicrosoftUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("microsoft_conversation", message);
    }
  };

  // Send The XAi User Message to The Server
  const handleSendXAiUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("xai_conversation", message);
    }
  };

  // Send The Core42 User Message to The Server
  const handleSendCore42UserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit(
        "core42_conversation",
        `(respond in Arabic) ${message}`,
      );
    }
  };

  // Send The Codestral User Message to The Server
  const handleSendCodestralUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("codestral_conversation", message);
    }
  };

  // Send The All Models User Message to The Server
  const handleSendAllModelsUserMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit("chatgpt_conversation_2", message);
      socketRef.current.emit("meta_conversation_2", message);
      socketRef.current.emit("microsoft_conversation_2", message);
      socketRef.current.emit("xai_conversation_2", message);
      socketRef.current.emit("codestral_conversation_2", message);
    }
    setChatgptMssgGenerated2(false);
    setMetaMssgGenerated2(false);
    setMicrosoftMssgGenerated2(false);
    setCodestralMssgGenerated2(false);
    setXaiMssgGenerated2(false);
  };

  // Send The User Reply Message to The Server
  const handleSendSpecificModelUserMessage = (userMessage) => {
    if (socketRef.current) {
      if (model === "GPT-4.1") {
        socketRef.current.emit(
          "chatgpt_conversation_2",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setChatgptMssgGenerated2(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Llama 4 Scout 17B 16E Instruct") {
        socketRef.current.emit(
          "meta_conversation_2",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setMetaMssgGenerated2(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Phi-4-mini-instruct") {
        socketRef.current.emit(
          "microsoft_conversation_2",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setMicrosoftMssgGenerated2(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Codestral 25.01") {
        socketRef.current.emit(
          "codestral_conversation_2",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setCodestralMssgGenerated2(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Grok 3 Mini") {
        socketRef.current.emit(
          "xai_conversation_2",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setXaiMssgGenerated2(false);
        setMessage("");
        setReplySelected(false);
      }
      // Push The User Message To The Conversation Array
      setAllModelsConversation((prev) => [
        ...prev,
        {
          messageId: messageId,
          text: userMessage,
          animate: false,
          isloading: true,
        },
      ]);

      setMessages((prev) => [
        ...prev,
        { messageId: messageId, userMessage: userMessage, message: message },
      ]);
    }
  };

  // Send The User Reply Message to The Server (Move to the model chat)
  const handleSendSpecificModelUserMessage2 = (userMessage) => {
    if (socketRef.current) {
      if (model === "GPT-4.1") {
        setChatgptConversation((prev) => [
          ...prev,
          { text: userMessage, animate: false, isloading: true },
        ]);
        socketRef.current.emit(
          "chatgpt_conversation",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setChatgptMssgGenerated(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Llama 4 Scout 17B 16E Instruct") {
        setMetaConversation((prev) => [
          ...prev,
          { text: userMessage, animate: false, isloading: true },
        ]);
        socketRef.current.emit(
          "meta_conversation",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setMetaMssgGenerated(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Phi-4-mini-instruct") {
        setMicrosoftConversation((prev) => [
          ...prev,
          { text: userMessage, animate: false, isloading: true },
        ]);
        socketRef.current.emit(
          "microsoft_conversation",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setMicrosoftMssgGenerated(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Codestral 25.01") {
        setCodestralConversation((prev) => [
          ...prev,
          { text: userMessage, animate: false, isloading: true },
        ]);
        socketRef.current.emit(
          "codestral_conversation",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setCodestralMssgGenerated(false);
        setMessage("");
        setReplySelected(false);
      } else if (model === "Grok 3 Mini") {
        setXAiConversation((prev) => [
          ...prev,
          { text: userMessage, animate: false, isloading: true },
        ]);
        socketRef.current.emit(
          "xai_conversation",
          `this is your message: ${message.slice(0, 250)}..., reply to the following reply to that message: "${userMessage}", don't mention its a reply.`,
        );
        setXaiMssgGenerated(false);
        setMessage("");
        setReplySelected(false);
      }
      router.push(modelRoutes[model]);
    }
    setMessages((prev) => [
      ...prev,
      { messageId: messageId, userMessage: userMessage, message: message },
    ]);
  };

  // Creating a socket instance and connecting to the WebSocket server
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    socketRef.current = io(socketUrl);

    // Event listener for successful connection to the server
    socketRef.current.on(`connect`, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(
          `Connected Successfully from Client Side, id: ${socketRef.current.id}`,
        );
      }
    });

    // Receive ChatGPT Response From The Server And Push It To The Conversation Array
    socketRef.current.on("chatgpt_conversation", (ChatGptmessage) => {
      setChatgptMessage(ChatGptmessage);
      setChatgptConversation((prev) => [
        ...prev,
        {
          text: ChatGptmessage,
          isai: true,
          animate: true,
          isloading: false,
        },
      ]);
    });

    // Receive Meta Response From The Server And Push It To The Conversation Array
    socketRef.current.on("meta_conversation", (MetaMessage) => {
      setMetaMessage(MetaMessage);
      setMetaConversation((prev) => [
        ...prev,
        {
          text: MetaMessage,
          isai: true,
          animate: true,
          isloading: false,
        },
      ]);
    });

    // Receive Microsoft Response From The Server And Push It To The Conversation Array
    socketRef.current.on("microsoft_conversation", (MicrosoftMessage) => {
      setMicrosoftMessage(MicrosoftMessage);
      setMicrosoftConversation((prev) => [
        ...prev,
        {
          text: MicrosoftMessage,
          isai: true,
          animate: true,
          isloading: false,
        },
      ]);
    });

    // Receive XAi Response From The Server And Push It To The Conversation Array
    socketRef.current.on("xai_conversation", (XAiMessage) => {
      setXAiMessage(XAiMessage);
      setXAiConversation((prev) => [
        ...prev,
        {
          text: XAiMessage,
          isai: true,
          animate: true,
          isloading: false,
        },
      ]);
    });

    // Receive Core42 Response From The Server And Push It To The Conversation Array
    socketRef.current.on("core42_conversation", (Core42Message) => {
      setCore42Message(Core42Message);
      setCore42Conversation((prev) =>
        prev
          .map((msg, index) =>
            index === prev.length - 1 ? { ...msg, isloading: false } : msg,
          )
          .concat({
            text: Core42Message,
            isai: true,
            animate: true,
            isloading: false,
          }),
      );
    });

    // Receive Codestral Response From The Server And Push It To The Conversation Array
    socketRef.current.on("codestral_conversation", (CodestralMessage) => {
      setCodestralMessage(CodestralMessage);
      setCodestralConversation((prev) => [
        ...prev,
        {
          text: CodestralMessage,
          isai: true,
          animate: true,
          isloading: false,
        },
      ]);
    });

    // Receive GPT Response From The Server And Push It To AllModels Conversation Array
    socketRef.current.on("chatgpt_conversation_2", (ChatGptmessage) => {
      setChatgptMessage(ChatGptmessage);
      setAllModelsConversation((prev) => [
        ...prev,
        {
          model: "GPT-4.1",
          text: ChatGptmessage,
          isai: true,
          animate: true,
        },
      ]);
    });

    // Receive Meta Response From The Server And Push It To AllModels Conversation Array
    socketRef.current.on("meta_conversation_2", (MetaMessage) => {
      setMetaMessage(MetaMessage);
      setAllModelsConversation((prev) => [
        ...prev,
        {
          model: "Llama 4 Scout 17B 16E Instruct",
          text: MetaMessage,
          isai: true,
          animate: true,
        },
      ]);
    });

    // Receive Microsoft Response From The Server And Push It To AllModels Conversation Array
    socketRef.current.on("microsoft_conversation_2", (MicrosoftMessage) => {
      setMicrosoftMessage(MicrosoftMessage);
      setAllModelsConversation((prev) => [
        ...prev,
        {
          model: "Phi-4-mini-instruct",
          text: MicrosoftMessage,
          isai: true,
          animate: true,
        },
      ]);
    });

    // Receive XAi Response From The Server And Push It To AllModels Conversation Array
    socketRef.current.on("xai_conversation_2", (XAiMessage) => {
      setXAiMessage(XAiMessage);
      setAllModelsConversation((prev) => [
        ...prev,
        {
          model: "Grok 3 Mini",
          text: XAiMessage,
          isai: true,
          animate: true,
        },
      ]);
    });

    // Receive Codestral Response From The Server And Push It To AllModels Conversation Array
    socketRef.current.on("codestral_conversation_2", (CodestralMessage) => {
      setCodestralMessage(CodestralMessage);
      setAllModelsConversation((prev) => [
        ...prev,
        {
          model: "Codestral 25.01",
          text: CodestralMessage,
          isai: true,
          animate: true,
        },
      ]);
    });

    // Hide loader after ai response finished generating
    socketRef.current.on("chatgpt_mssg_generated", () => {
      setChatgptMssgGenerated(true);
    });

    socketRef.current.on("meta_mssg_generated", () => {
      setMetaMssgGenerated(true);
    });

    socketRef.current.on("microsoft_mssg_generated", () => {
      setMicrosoftMssgGenerated(true);
    });

    socketRef.current.on("xai_mssg_generated", () => {
      setXaiMssgGenerated(true);
    });

    socketRef.current.on("core42_mssg_generated", () => {
      setCore42MssgGenerated(true);
    });

    socketRef.current.on("codestral_mssg_generated", () => {
      setCodestralMssgGenerated(true);
    });

    socketRef.current.on("chatgpt_mssg_generated_2", () => {
      setChatgptMssgGenerated2(true);
      setMetaMssgGenerated2(true);
      setMicrosoftMssgGenerated2(true);
      setXaiMssgGenerated2(true);
      setCodestralMssgGenerated2(true);
    });

    socketRef.current.on("meta_mssg_generated_2", () => {
      setChatgptMssgGenerated2(true);
      setMetaMssgGenerated2(true);
      setMicrosoftMssgGenerated2(true);
      setXaiMssgGenerated2(true);
      setCodestralMssgGenerated2(true);
    });

    socketRef.current.on("microsoft_mssg_generated_2", () => {
      setChatgptMssgGenerated2(true);
      setMetaMssgGenerated2(true);
      setMicrosoftMssgGenerated2(true);
      setXaiMssgGenerated2(true);
      setCodestralMssgGenerated2(true);
    });

    socketRef.current.on("xai_mssg_generated_2", () => {
      setChatgptMssgGenerated2(true);
      setMetaMssgGenerated2(true);
      setMicrosoftMssgGenerated2(true);
      setXaiMssgGenerated2(true);
      setCodestralMssgGenerated2(true);
    });

    socketRef.current.on("core42_mssg_generated_2", () => {
      setCore42MssgGenerated2(true);
    });

    socketRef.current.on("codestral_mssg_generated_2", () => {
      setChatgptMssgGenerated2(true);
      setMetaMssgGenerated2(true);
      setMicrosoftMssgGenerated2(true);
      setXaiMssgGenerated2(true);
      setCodestralMssgGenerated2(true);
    });

    // Handle the rate limit error (ex: 50 requests a day) and any error
    socketRef.current.on("rate_limit_exceeded", () => {
      setIsLimit(true);
      setTimeout(() => {
        setIsLimit(false);
        setChatgptMssgGenerated(true);
        setMetaMssgGenerated(true);
        setMicrosoftMssgGenerated(true);
        setXaiMssgGenerated(true);
        setCore42MssgGenerated(true);
        setCodestralMssgGenerated(true);
        setChatgptMssgGenerated2(true);
        setMetaMssgGenerated2(true);
        setMicrosoftMssgGenerated2(true);
        setXaiMssgGenerated2(true);
        setCodestralMssgGenerated2(true);
      }, 5000);
    });

    socketRef.current.on("model_unavailable", () => {
      setisUnavailable(true);
      setTimeout(() => {
        setisUnavailable(false);
        setChatgptMssgGenerated(true);
        setMetaMssgGenerated(true);
        setMicrosoftMssgGenerated(true);
        setXaiMssgGenerated(true);
        setCore42MssgGenerated(true);
        setCodestralMssgGenerated(true);
        setChatgptMssgGenerated2(true);
        setMetaMssgGenerated2(true);
        setMicrosoftMssgGenerated2(true);
        setXaiMssgGenerated2(true);
        setCodestralMssgGenerated2(true);
      }, 5000);
    });

    socketRef.current.on("error", () => {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setChatgptMssgGenerated(true);
        setMetaMssgGenerated(true);
        setMicrosoftMssgGenerated(true);
        setXaiMssgGenerated(true);
        setCore42MssgGenerated(true);
        setCodestralMssgGenerated(true);
        setChatgptMssgGenerated2(true);
        setMetaMssgGenerated2(true);
        setMicrosoftMssgGenerated2(true);
        setXaiMssgGenerated2(true);
        setCodestralMssgGenerated2(true);
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
        isLimit,
        isError,
        message,
        setMessage,
        model,
        setModel,
        replySelected,
        setReplySelected,
        handleSendSpecificModelUserMessage,
        handleSendSpecificModelUserMessage2,

        // ChatGPT
        chatgptConversation,
        setChatgptConversation,
        handleSendChatgptUserMessage,
        chatgptMssgGenerated,
        setChatgptMssgGenerated,
        chatgptMssgGenerated2,
        setChatgptMssgGenerated2,

        // Meta
        metaConversation,
        setMetaConversation,
        handleSendMetaUserMessage,
        metaMssgGenerated,
        setMetaMssgGenerated,
        metaMssgGenerated2,
        setMetaMssgGenerated2,

        // Microsoft
        microsoftConversation,
        setMicrosoftConversation,
        handleSendMicrosoftUserMessage,
        microsoftMssgGenerated,
        setMicrosoftMssgGenerated,
        microsoftMssgGenerated2,
        setMicrosoftMssgGenerated2,

        // XAi
        xAiConversation,
        setXAiConversation,
        handleSendXAiUserMessage,
        xaiMssgGenerated,
        setXaiMssgGenerated,
        xaiMssgGenerated2,
        setXaiMssgGenerated2,

        // Core42
        core42Conversation,
        setCore42Conversation,
        handleSendCore42UserMessage,
        core42MssgGenerated,
        setCore42MssgGenerated,
        isArabicLetters,
        setIsArabicLetters,

        // Codestral
        codestralConversation,
        setCodestralConversation,
        handleSendCodestralUserMessage,
        codestralMssgGenerated,
        setCodestralMssgGenerated,
        codestralMssgGenerated2,
        setCodestralMssgGenerated2,

        // All Models
        allModelsConversation,
        setAllModelsConversation,
        handleSendAllModelsUserMessage,
        allModelsMssgGenerated,
        setAllModelsMssgGenerated,
        messages,
        setMessages,
      }}
    >
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
        closeButton={true}
        pauseOnHover={true}
        icon={false}
      />
      {children}
    </MyContext.Provider>
  );
}

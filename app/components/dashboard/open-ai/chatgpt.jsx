"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { MdSquare } from "react-icons/md";
import Messages from "../messages";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";

export default function Chatgpt() {
  const {
    handleSendChatgptUserMessage,
    chatgptConversation,
    setChatgptConversation,
    isLoaded,
    setIsLoaded,
    isLimit,
    isError,
    chatgptMssgGenerated,
    setChatgptMssgGenerated,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#212121");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      area_placeholder_bottom.style.backgroundColor = "#212121";
    }, 500);
  }, []);

  // Await page content until page loads
  useEffect(() => {
    if (window.performance && window.performance.navigation.type === 1) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Scroll To Bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.innerHeight * 2;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;

      setIsScroll(window.scrollY >= scrollHeight);

      if (isAtBottom) {
        setIsScroll(false);
      } else {
        setIsScroll(true);
      }

      if (document.body.scrollHeight > 800) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Chatgpt Conversation:", chatgptConversation);
    }
  }, [chatgptConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit && !isError) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      handleSendChatgptUserMessage(inputMessage); // Send The User Message To Chatgpt Api
      setChatgptMssgGenerated(false);
      setInputMessage("");
      setChatgptConversation((prev) => [
        // Push The User Message To The Conversation Array
        ...prev,
        { text: inputMessage, animate: false, isloading: true },
      ]);

      // scroll exactly to bottom
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  };

  // Remove last message from the array when limit is reached or if there error
  useEffect(() => {
    if (isLimit || isError) {
      setTimeout(() => {
        setChatgptConversation((prev) => prev.slice(0, -1));
      }, 4000);
    }
  }, [isLimit, isError]);

  const handleKeyDown = (e) => {
    if (chatgptMssgGenerated) {
      if (e.key === "Enter" && inputMessage.trim() !== "") {
        handleInputMessage();
      }
    }
  };

  // Scoll To Bottom
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div
      id="section_container"
      className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full text-white w-full relative mx-auto ${
        isLoaded ? "block" : "hidden"
      }`}
    >
      <div
        id="messages_container"
        className={`px-1 mx-auto mt-[100px] break-words whitespace-normal xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[98%] z-[20]`}
      >
        {/* Reset button */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[15px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
            ${chatgptConversation.length > 0 ? "block" : "hidden"}`}
        >
          <button
            className="text-white cool_button !w-auto !text-base !p-3"
            onClick={() => {
              setChatgptConversation([]);
              setChatgptMssgGenerated(true);
            }}
          >
            <Image
              src={ResetButton}
              width={22}
              height={22}
              alt=""
              className="z-20"
            />
            <span>Reset</span>
          </button>
        </div>
        <Messages chatgptConversation={chatgptConversation} />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder_top"
        className="w-full bg-inherit h-[300px] relative"
        style={{ display: chatgptConversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3 xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full
    ${
      chatgptConversation.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
        : "top-[50%] absolute translate-x-[-50%] left-[50%] translate-y-[calc(-50%-90px)]"
    }`}
      >
        <h2
          id="title"
          className="text-center mb-9 text-3xl font-normal h-[100px] pt-[66px]"
          style={{ opacity: chatgptConversation.length > 0 ? 0 : 1 }}
        >
          What can I help with?
        </h2>

        <div
          id="input_container"
          className={`relative z-[100] ${
            chatgptConversation.length > 0 ? "mb-[27px]" : "mb-0"
          }`}
        >
          {/* Scroll To Bottom Button */}
          <button
            id="scroll_to_bottom"
            onClick={scrollToBottom}
            className={`${
              chatgptConversation.length > 0 && isScroll && showScrollButton
                ? "block"
                : "hidden"
            } border-solid border-[#4A4A4A] border-[1px] translate-x-[-50%] top-[-45px] absolute rounded-full left-1/2 text-[#B9B9B9] bg-[#212121]`}
          >
            <FaArrowDown size={30} className="py-2 px-2" />
          </button>

          {/* Input */}
          <input
            placeholder="Ask GPT-4.1"
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputMessage(e.target.value)}
            className="pl-5 pr-[65px] py-6 focus:outline-none placeholder-[#B4B4B4] bg-[#303030] rounded-xl w-full"
            ref={inputRef}
          />
          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${
              !chatgptMssgGenerated
                ? "Generating..."
                : inputMessage
                ? "Send message"
                : "Message is empty"
            }`}
            onClick={handleInputMessage}
            disabled={!inputMessage || isLimit || !chatgptMssgGenerated}
            className="absolute rounded-full right-0 top-[50%] disabled:cursor-default disabled:text-[#2f2f2f] disabled:bg-[#676767] text-black bg-white hover:bg-[#C1C1C1] translate-y-[-50%] mr-4"
          >
            {chatgptMssgGenerated ? (
              <FaArrowUp size={35} className="p-2" />
            ) : (
              <MdSquare size={35} className="p-2" />
            )}
          </button>
        </div>
        <div
          id="area_placeholder_bottom"
          className={`${
            chatgptConversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] left-0`}
        ></div>
      </div>
    </div>
  );
}

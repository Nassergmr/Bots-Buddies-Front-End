"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import Messages from "../messages";
import Image from "next/image";
import groklogo from "../../../assets/grok.png";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";

export default function XAi() {
  const {
    sendXAiUserMessage,
    xAiConversation,
    setXAiConversation,
    isLoaded,
    setIsLoaded,
    isLimit,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#151718");
  }, []);

  // Await page content until page loads (in case user refresh page)
  useEffect(() => {
    if (window.performance && window.performance.navigation.type === 1) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Scroll to bottom
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
      console.log("Core42 Conversation:", xAiConversation);
    }
  }, [xAiConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      sendXAiUserMessage(inputMessage); // Send The User Message To Chatgpt Api
      setInputMessage("");
      setXAiConversation((prev) => [
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

  // Remove last object from the array when limit is reached
  useEffect(() => {
    if (isLimit) {
      setTimeout(() => {
        setXAiConversation((prev) => prev.slice(0, -1));
      }, 4000);
    }
  }, [isLimit]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      handleInputMessage();
    }
  };

  // Scoll To Buttom On Button Click
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight });
  };

  // Auto Scroll To Latest Message
  const scrollToBottomMessages = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="section_container"
      className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full  w-full relative text-[#FCFCFC] mx-auto manropeText ${
        isLoaded ? "block" : "hidden"
      }`}
    >
      <div
        id="messages_container"
        className={`px-1 mx-auto mt-[100px] break-words whitespace-normal xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] z-20`}
      >
        {/* Reset button */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[16px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
             ${xAiConversation.length > 0 ? "block" : "hidden"}`}
        >
          <button
            className="text-white cool_button !w-auto !text-base !p-3"
            onClick={() => setXAiConversation([])}
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
        <Messages xAiConversation={xAiConversation} />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder"
        className="w-full bg-[#151718] h-[200px] relative"
        style={{ display: xAiConversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3  xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full
    ${
      xAiConversation.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
        : "top-[50%] absolute translate-x-[-50%] left-[50%] translate-y-[calc(-50%-90px)]"
    }`}
      >
        <div
          id="logo_container"
          className="flex gap-2 items-center text-center justify-center mb-9"
          style={{ opacity: xAiConversation.length > 0 ? 0 : 1 }}
        >
          <Image src={groklogo} width={100} height={100} alt="logo" priority />
          <h1 id="title" className=" text-[#FCFCFC] text-5xl">
            Grok
          </h1>
        </div>

        <div
          id="input_container"
          className={`relative z-[100] ${
            xAiConversation.length > 0 ? "mb-[27px]" : "mb-0"
          }`}
        >
          {/* Scroll To Bottom Button */}
          <button
            id="scroll_to_bottom"
            onClick={scrollToBottom}
            className={`${
              xAiConversation.length > 0 &&
              isScroll &&
              document.body.scrollHeight > 800
                ? "block"
                : "hidden"
            } border-solid border-[#4A4A4A] border-[1px] translate-x-[-50%] top-[-45px] absolute rounded-full left-1/2 text-[#B9B9B9] bg-[#212121]`}
          >
            <FaArrowDown size={30} className="py-2 px-2" />
          </button>

          {/* Input */}
          <input
            placeholder="Ask Grok 3"
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputMessage(e.target.value)}
            className="pl-5 pr-[65px] py-6 focus:outline-none border border-[#383A3C] placeholder-[#99999A] bg-[#242628] rounded-2xl w-full"
            ref={inputRef}
          />
          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${inputMessage ? "Send message" : "Message is empty"}`}
            onClick={handleInputMessage}
            disabled={!inputMessage || isLimit}
            className="absolute rounded-full right-0 top-[50%] disabled:cursor-default disabled:text-[#B5B5B5] disabled:bg-[#3E3F42] text-black bg-[#FCFCFC] hover:bg-[#C1C1C1] translate-y-[-50%] mr-4"
          >
            <FaArrowUp size={38} className=" py-3 px-3" />
          </button>
        </div>
        {/* Info Sentence */}
        <div
          id="info"
          className={`${
            xAiConversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] left-0 bg-[#151718]`}
        >
          <p
            className={`absolute w-full left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-[#B4B4B4] text-center text-xs`}
          ></p>
        </div>
      </div>
    </div>
  );
}

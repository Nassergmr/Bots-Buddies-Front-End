"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { MdSquare } from "react-icons/md";
import Messages from "../messages";
import { Particles } from "../../../../components/ui/particles";
import groklogo from "../../../assets/grok.png";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";
import { ParticlesComponent } from "../../elements/particlesComponent";

export default function XAi() {
  const {
    handleSendXAiUserMessage,
    xAiConversation,
    setXAiConversation,
    isLoaded,
    setIsLoaded,
    isLimit,
    isError,
    xaiMssgGenerated,
    setXaiMssgGenerated,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#151718");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      area_placeholder_bottom.style.backgroundColor = "#151718";
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
      console.log("XAI Conversation:", xAiConversation);
    }
  }, [xAiConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit && !isError) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      handleSendXAiUserMessage(inputMessage); // Send The User Message To Chatgpt Api
      setXaiMssgGenerated(false);
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

  // Remove last message from the array when limit is reached or if there error
  useEffect(() => {
    if (isLimit || isError) {
      setTimeout(() => {
        setXAiConversation((prev) => prev.slice(0, -1));
      }, 4000);
    }
  }, [isLimit, isError]);

  const handleKeyDown = (e) => {
    if (xaiMssgGenerated) {
      if (e.key === "Enter" && inputMessage.trim() !== "") {
        handleInputMessage();
      }
    }
  };

  // Scroll To Bottom
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

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
      {/* Reset button */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 top-[15px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
             ${xAiConversation.length > 0 ? "block" : "hidden"}`}
      >
        <button
          className="text-white cool_button !w-auto !text-base !p-3"
          onClick={() => {
            setXAiConversation([]);
            setXaiMssgGenerated(true);
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
      <div
        id="messages_container"
        className={`px-1 mx-auto mt-[100px] break-words whitespace-normal xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] z-20 relative`}
      >
        <Messages xAiConversation={xAiConversation} />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder_top"
        className="w-full bg-[#151718] h-[300px] relative"
        style={{ display: xAiConversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3  xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full
    ${
      xAiConversation.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
        : "top-[54%] absolute translate-x-[-50%] left-[50%] translate-y-[calc(-50%-90px)]"
    }`}
      >
        <div
          id="logo_container"
          className="flex gap-2 items-center text-center justify-center mb-5"
          style={{ opacity: xAiConversation.length > 0 ? 0 : 1 }}
        >
          <Image src={groklogo} width={80} height={80} alt="logo" priority />
          <h1 id="title" className=" text-[#FCFCFC] text-5xl ">
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
            placeholder="Ask Grok 3 Mini"
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputMessage(e.target.value)}
            className="pl-5 pr-[65px] py-6 focus:outline-none border border-[#383A3C] placeholder-[#99999A] bg-[#242628] rounded-2xl w-full"
            ref={inputRef}
          />
          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${
              !xaiMssgGenerated
                ? "Generating..."
                : inputMessage
                ? "Send message"
                : "Message is empty"
            }`}
            onClick={handleInputMessage}
            disabled={!inputMessage || isLimit || !xaiMssgGenerated}
            className="absolute rounded-full right-0 top-[50%] disabled:cursor-default disabled:text-[#B5B5B5] disabled:bg-[#3E3F42] text-black bg-[#FCFCFC] hover:bg-[#C1C1C1] translate-y-[-50%] mr-4"
          >
            {xaiMssgGenerated ? (
              <FaArrowUp size={38} className="p-3" />
            ) : (
              <MdSquare size={38} className="p-3" />
            )}
          </button>
        </div>
        <div
          id="area_placeholder_bottom"
          className={`${
            xAiConversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] left-0`}
        ></div>
      </div>
    </div>
  );
}

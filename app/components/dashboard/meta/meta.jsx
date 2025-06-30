"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdSquare } from "react-icons/md";
import Messages from "../messages";
import LottieComponent from "./lottieComponent";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";

export default function Meta() {
  const {
    metaMessage,
    metaConversation,
    setMetaMessage,
    setMetaConversation,
    handleSendMetaUserMessage,
    isLoaded,
    setIsLoaded,
    isLimit,
    isError,
    metaMssgGenerated,
    setMetaMssgGenerated,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#101112");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      info.style.backgroundColor = "#101112";
    }, 500);
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
      console.log("Meta Conversation:", metaConversation);
    }
  }, [metaConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit && !isError) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      handleSendMetaUserMessage(inputMessage); // Send The User Message To meta Api
      setMetaMssgGenerated(false);
      setInputMessage("");
      setMetaConversation((prev) => [
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
    if (isLimit || isError) {
      setTimeout(() => {
        setMetaConversation((prev) => prev.slice(0, -1));
      }, 4000);
    }
  }, [isLimit, isError]);

  const handleKeyDown = (e) => {
    if (metaMssgGenerated) {
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
      className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full  w-full relative text-[#F3F4F5] mx-auto liberationText ${
        isLoaded ? "block" : "hidden"
      }`}
    >
      <div
        id="messages_container"
        className={`px-1 mx-auto mt-[100px] text-[#F3F4F5] break-words whitespace-normal z-20 xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[98%]`}
      >
        {/* Reset button */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[15px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
            ${metaConversation.length > 0 ? "block" : "hidden"}`}
        >
          <button
            className="text-white cool_button !w-auto !text-base !p-3"
            onClick={() => {
              setMetaConversation([]);
              setMetaMssgGenerated(true);
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

        <Messages metaConversation={metaConversation} />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder"
        className="w-full bg-inherit h-[300px] relative"
        style={{ display: metaConversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3 transition ease-out duration-500 xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full
    ${
      metaConversation?.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
        : "top-[50%] absolute translate-x-[-50%] left-[50%] translate-y-[calc(-50%-90px)]"
    }`}
      >
        <div
          id="logo_container"
          style={{
            display: metaConversation.length > 0 ? "none" : "block ",
          }}
          className="mb-9"
        >
          <LottieComponent />
        </div>

        <div
          id="input_container"
          className={`relative z-[100] ${
            metaConversation?.length > 0 ? "mb-[27px]" : "mb-0"
          }`}
        >
          {/* Scroll To Bottom Button */}
          <button
            id="scroll_to_bottom"
            onClick={scrollToBottom}
            className={`${
              metaConversation?.length > 0 && isScroll && showScrollButton
                ? "block"
                : "hidden"
            } translate-x-[-50%] top-[-40px] absolute rounded-full left-1/2 text-[#F3F4F5] bg-[#28292B]`}
          >
            <IoIosArrowDown size={30} className="py-2 px-2" />
          </button>
          {/* Input */}
          <input
            placeholder="Ask Meta-Llama-3-8B-Instruct"
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputMessage(e.target.value)}
            className="pl-5 pr-[65px] py-6 focus:outline-none placeholder-[#A9ABB1] bg-[#17181A] rounded-2xl w-full border-t-2 border-double border-[#252627]"
            ref={inputRef}
          />
          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${
              !metaMssgGenerated
                ? "Generating..."
                : inputMessage
                ? "Send message"
                : "Message is empty"
            }`}
            onClick={handleInputMessage}
            disabled={!inputMessage || isLimit || !metaMssgGenerated}
            className="absolute transition-colors duration-500 ease-in-out rounded-full right-0 top-[50%] disabled:cursor-default disabled:text-[#747476] disabled:bg-[#193669] text-[#FFFFFF] bg-[#2864E0]  translate-y-[-50%] mr-4"
          >
            {metaMssgGenerated ? (
              <FaArrowUp size={35} className="py-2 px-3" />
            ) : (
              <MdSquare size={35} className="p-2" />
            )}
          </button>
        </div>
        <div
          id="info"
          className={`${
            metaConversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] left-0`}
        >
          <p
            className={`absolute w-full left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-[#B4B4B4] text-center text-xs`}
          ></p>
        </div>
      </div>
    </div>
  );
}

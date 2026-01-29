"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { MdSquare } from "react-icons/md";
import Messages from "../messages";
import codestralogo from "../../../assets/logos/codestral.png";

// import LottieComponent from "./lottieComponent";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";

export default function Codestral() {
  const {
    codestralMessage,
    codestralConversation,
    setCodestralMessage,
    setCodestralConversation,
    handleSendCodestralUserMessage,
    isLoaded,
    setIsLoaded,
    isLimit,
    isError,
    codestralMssgGenerated,
    setCodestralMssgGenerated,
    messages,
    highlitedMessage,
    setIsHighlited,
    setHighlitedMessage,
    targetRef,
    router,
    isHighlited,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#18181B");
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      area_placeholder_bottom.style.backgroundColor = "#18181B";
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
      console.log("Codestral Conversation:", codestralConversation);
    }
  }, [codestralConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit && !isError) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      handleSendCodestralUserMessage(inputMessage); // Send The User Message To codestral Api
      setCodestralMssgGenerated(false);
      setInputMessage("");
      setCodestralConversation((prev) => [
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
  // useEffect(() => {
  //   if (isLimit || isError) {
  //     setTimeout(() => {
  //       setCodestralConversation((prev) => prev.slice(0, -1));
  //     }, 4000);
  //   }
  // }, [isLimit, isError]);

  const handleKeyDown = (e) => {
    if (codestralMssgGenerated) {
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
      className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full  w-full relative text-[#F3F4F5] mx-auto interText ${
        isLoaded ? "block" : "hidden"
      }`}
    >
      {/* Reset button */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 top-[15px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
            ${codestralConversation.length > 0 ? "block" : "hidden"}`}
      >
        <button
          className="text-white cool_button !w-auto !text-base !p-3"
          onClick={() => {
            setCodestralConversation([]);
            setCodestralMssgGenerated(true);
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
        className={`px-1 mx-auto mt-[100px] text-[#FEFEF7] break-words whitespace-normal z-20 xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[98%]`}
      >
        <Messages
          codestralConversation={codestralConversation}
          codestralMssgGenerated={codestralMssgGenerated}
          messages={messages}
          highlitedMessage={highlitedMessage}
          setHighlitedMessage={setHighlitedMessage}
          setIsHighlited={setIsHighlited}
          targetRef={targetRef}
          router={router}
          isHighlited={isHighlited}
        />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder_top"
        className="w-full bg-inherit h-[300px] relative"
        style={{ display: codestralConversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3 xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full overflow-hidden
    ${
      codestralConversation?.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
        : "top-[52.5%] absolute translate-x-[-50%] left-[50%] translate-y-[calc(-50%-90px)]"
    }`}
      >
        <div
          id="logo_container"
          className="flex  items-center  justify-center mb-5"
          style={{ opacity: codestralConversation.length > 0 ? 0 : 1 }}
        >
          <Image
            src={codestralogo}
            width={90}
            height={90}
            alt="logo"
            priority
          />
        </div>

        <div
          id="input_container"
          className={`relative z-[100] ${
            codestralConversation?.length > 0 ? "mb-[27px]" : "mb-0"
          }`}
        >
          {/* Scroll To Bottom Button */}
          <button
            id="scroll_to_bottom"
            onClick={scrollToBottom}
            className={`${
              codestralConversation.length > 0 &&
              isScroll &&
              document.body.scrollHeight > 800
                ? "block"
                : "hidden"
            } border-solid border-[#4A4A4A] border-[1px] translate-x-[-50%] top-[-45px] absolute rounded-full left-1/2 text-[#9A9A9B] bg-transparent hover:bg-[#2A2A2D] transition-all duration-300`}
            // bg-[#212124]
          >
            <FaArrowDown size={30} className="py-2 px-2" />
          </button>
          {/* Input */}
          <input
            placeholder="Ask Codestral 25.01"
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputMessage(e.target.value)}
            className="pl-5 pr-[65px] py-6 focus:outline-none placeholder-[#919192] bg-[#222225] rounded-xl w-full overflow-hidden"
            ref={inputRef}
          />
          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${
              !codestralMssgGenerated
                ? "Generating..."
                : inputMessage
                  ? "Send message"
                  : "Message is empty"
            }`}
            onClick={handleInputMessage}
            disabled={!inputMessage || isLimit || !codestralMssgGenerated}
            // style={{ right: !inputMessage ? "-80px" : "0" }}
            className={`absolute transition-all right-0 duration-300 ease-in-out rounded-lg top-[50%] disabled:cursor-default  text-[#111115] bg-[#F4F4F5]  translate-y-[-50%] mr-4
              ${!inputMessage ? "opacity-0" : "opacity-100"}
              `}
            // disabled:text-[#747476] disabled:bg-[#193669]
          >
            {codestralMssgGenerated ? (
              <FaArrowUp size={35} className="py-2 px-3" />
            ) : (
              <MdSquare size={35} className="p-2" />
            )}
          </button>
        </div>
        <div
          id="area_placeholder_bottom"
          className={`${
            codestralConversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] left-0`}
        ></div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, useContext, useEffect, useRef } from "react";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { MdSquare } from "react-icons/md";
import Messages from "../messages";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";

export default function Microsoft() {
  const {
    microsoftConversation,
    setMicrosoftConversation,
    handleSendMicrosoftUserMessage,
    isLoaded,
    setIsLoaded,
    isLimit,
    isError,
    microsoftMssgGenerated,
    setMicrosoftMssgGenerated,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#101524");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      area_placeholder_bottom.style.backgroundColor = "#101524";
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
      console.log("Microsoft Conversation:", microsoftConversation);
    }
  }, [microsoftConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit && !isError) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      handleSendMicrosoftUserMessage(inputMessage); // Send The User Message To Microsoft Api
      setMicrosoftMssgGenerated(false);
      setInputMessage("");
      setMicrosoftConversation((prev) => [
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
        setMicrosoftConversation((prev) => prev.slice(0, -1));
      }, 4000);
    }
  }, [isLimit, isError]);

  const handleKeyDown = (e) => {
    if (microsoftMssgGenerated) {
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

  // Auto Scroll To Latest Message
  const scrollToBottomMessages = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="section_container"
      className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full text-white w-full relative mx-auto gintoText ${
        isLoaded ? "block" : "hidden"
      }`}
    >
      {/* Reset button */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 top-[15px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
             ${microsoftConversation.length > 0 ? "block" : "hidden"}`}
      >
        <button
          className="text-white cool_button !w-auto !text-base !p-3"
          onClick={() => {
            setMicrosoftConversation([]);
            setMicrosoftMssgGenerated(true);
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
        className={`px-1 mx-auto text-[#E1CEBF] mt-[100px] break-words whitespace-normal xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[98%] z-20`}
      >
        <Messages microsoftConversation={microsoftConversation} />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder_top"
        className="w-full bg-inherit h-[300px] relative"
        style={{ display: microsoftConversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3 xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full
    ${
      microsoftConversation.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]  transition ease-out duration-500`
        : "absolute translate-x-[-50%] left-[50%] top-[50%] translate-y-[calc(-50%-90px)] "
    }`}
      >
        <h2
          id="title"
          className={`${
            microsoftConversation.length > 0
              ? "opacity-0"
              : "fadeIn-animation opacity-100"
          } pl-3 h-[100px] sm:pt-[66px] pt-[50px] mb-9 text-[#E0CEBF] text-3xl sm:text-4xl sm:text-nowrap`}
        >
          Hey, what’s on your mind today?
        </h2>

        <div
          id="input_container"
          className={` ${
            microsoftConversation.length > 0
              ? "mb-[27px]"
              : "fadeInUp-animation mb-0"
          } relative z-[100] rounded-3xl border-2 border-[#32384A]`}
        >
          {/* Scroll To Bottom Button */}
          <button
            id="scroll_to_bottom"
            onClick={scrollToBottom}
            className={`${
              microsoftConversation.length > 0 && isScroll && showScrollButton
                ? "block"
                : "hidden"
            } border-solid border-[#4A4A4A] border translate-x-[-50%] top-[-45px] absolute rounded-full left-1/2 text-[#B9B9B9] bg-[#30374a]`}
          >
            <FaArrowDown size={30} className="py-2 px-2" />
          </button>

          {/* Input */}
          <input
            placeholder="Ask Phi-4"
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputMessage(e.target.value)}
            className="pl-5 pr-[65px] py-6 focus:outline-none placeholder-[#828BAC] bg-[#151C2F] rounded-3xl w-full border-[6px] border-[#1B2235]"
            ref={inputRef}
          />

          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${
              !microsoftMssgGenerated
                ? "Generating..."
                : inputMessage
                ? "Send message"
                : "Message is empty"
            }`}
            onClick={handleInputMessage}
            disabled={!inputMessage || isLimit || !microsoftMssgGenerated}
            style={{ display: !inputMessage ? "none" : "block" }}
            className="absolute rounded-lg right-0 top-[50%]  text-[#E3CBBC] hover:bg-[#505B7B] bg-[#455172] translate-y-[-50%] mr-4"
          >
            {microsoftMssgGenerated ? (
              <FaArrowUp size={35} className="p-2" />
            ) : (
              <MdSquare size={35} className="p-2" />
            )}
          </button>
        </div>

        <div
          id="area_placeholder_bottom"
          className={`${
            microsoftConversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] text-[#E0CEBF] left-0`}
        ></div>
      </div>
    </div>
  );
}

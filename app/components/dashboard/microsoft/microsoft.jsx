"use client";

import Image from "next/image";
import { useState, useContext, useEffect, useRef } from "react";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import Messages from "../messages";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";

export default function Microsoft() {
  const {
    microsoftConversation,
    setMicrosoftConversation,
    sendMicrosoftUserMessage,
    isLoaded,
    setIsLoaded,
  } = useContext(MyContext);

  const messagesEndRef = useRef(null);
  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    setBodyColor("#101524");
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
    scrollToBottom();
  }, [microsoftConversation]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Core42 Conversation:", microsoftConversation);
    }
  }, [microsoftConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "") {
      setUserMessage(inputMessage);
      sendMicrosoftUserMessage(inputMessage); // Send The User Message To Microsoft Api
      setInputMessage("");
      setMicrosoftConversation((prev) => [
        // Push The User Message To The Conversation Array
        ...prev,
        { text: inputMessage, animate: false, isloading: true },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputMessage.trim() !== "") {
      handleInputMessage();
    }
  };

  // Scoll To Bottom On Button Click
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
      className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full text-white w-full relative mx-auto gintoText ${
        isLoaded ? "block" : "hidden"
      }`}
    >
      <div
        id="messages_container"
        className={`mx-auto text-[#E1CEBF] mt-[100px] break-words whitespace-normal xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[98%] z-20`}
      >
        {/* Reset button */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[16px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
             ${microsoftConversation.length > 0 ? "block" : "hidden"}`}
        >
          <button
            className="text-white cool_button !w-auto !text-base !p-3"
            onClick={() => setMicrosoftConversation([])}
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

        <Messages
          microsoftConversation={microsoftConversation}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder"
        className="w-full bg-inherit h-[160px] relative"
        style={{ display: microsoftConversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3 xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full 
    ${
      microsoftConversation.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
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
            className=" pl-5 pr-[65px] py-6 focus:outline-none placeholder-[#828BAC] bg-[#151C2F] rounded-3xl w-full border-[6px] border-[#1B2235]"
          />

          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${inputMessage ? "Send message" : "Message is empty"}`}
            onClick={handleInputMessage}
            disabled={!inputMessage}
            style={{ display: !inputMessage ? "none" : "block" }}
            className="absolute rounded-lg right-0 top-[50%]  text-[#E3CBBC] hover:bg-[#505B7B] bg-[#455172] translate-y-[-50%] mr-4"
          >
            <FaArrowUp size={34} className=" py-2 px-2" />
          </button>
        </div>

        {/* Info Sentence */}
        <div
          id="info"
          className={`${
            microsoftConversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] text-[#E0CEBF] bg-[#101524] left-0`}
        >
          <p
            className={`absolute w-full left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-[#B4B4B4] text-center text-xs`}
          >
            Phi-4 may make mistakes.
          </p>
        </div>
      </div>
    </div>
  );
}

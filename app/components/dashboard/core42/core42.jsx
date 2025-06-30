"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { FaArrowDown } from "react-icons/fa6";
import { MdSquare } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Slide } from "react-toastify";
import { MyContext } from "../../../client";
import Messages from "../messages";
import ResetButton from "../../../assets/reset.png";
import Logo from "../../../assets/jaisv2-dark.png";
import setBodyColor from "../../elements/bodyColor";

export default function Core42() {
  const {
    core42Conversation,
    setCore42Conversation,
    handleSendCore42UserMessage,
    isLoaded,
    setIsLoaded,
    isLimit,
    isError,
    core42MssgGenerated,
    setCore42MssgGenerated,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#1D232A");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      info.style.backgroundColor = "#1D232A";
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
      console.log("Core42 Conversation:", core42Conversation);
    }
  }, [core42Conversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit && !isError) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      handleSendCore42UserMessage(inputMessage); // Send The User Message To Core42 Api
      setCore42MssgGenerated(false);
      setInputMessage("");
      setCore42Conversation((prev) => [
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
        setCore42Conversation((prev) => prev.slice(0, -1));
      }, 4000);
    }
  }, [isLimit, isError]);

  const handleKeyDown = (e) => {
    if (core42MssgGenerated) {
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
      dir="rtl"
      id="section_container"
      className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full text-white w-full relative mx-auto tajawalText ${
        isLoaded ? "block" : "hidden"
      }`}
    >
      <div
        id="messages_container"
        className={`px-1 mx-auto text-[#FEFEFE] text-lg mt-[100px] break-words whitespace-normal xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] z-20`}
      >
        {/* Reset button */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[15px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
             ${core42Conversation.length > 0 ? "block" : "hidden"}`}
        >
          <button
            className="text-white cool_button !w-auto !text-base !p-3"
            onClick={() => {
              setCore42Conversation([]);
              setCore42MssgGenerated(true);
            }}
          >
            <span className="pt-1">إعادة ضبط</span>
            <Image
              src={ResetButton}
              width={22}
              height={22}
              alt=""
              className="z-20"
            />
          </button>
        </div>
        <Messages core42Conversation={core42Conversation} />
      </div>

      {/* Area Placeholder (make some space above input area) */}
      <div
        id="area_placeholder"
        className="w-full bg-inherit h-[272px] relative"
        style={{ display: core42Conversation.length > 0 ? "block" : "none" }}
      ></div>

      <div
        id="chat_container"
        className={`z-30 px-3 xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full
    ${
      core42Conversation.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
        : "top-[50%] absolute translate-x-[-50%] left-[50%] translate-y-[calc(-50%-90px)]"
    }`}
      >
        <div
          id="logo_container"
          className="mb-9 mt-[40px]"
          style={{ opacity: core42Conversation.length > 0 ? 0 : 1 }}
        >
          <Image
            src={Logo}
            width={180}
            height={180}
            className=" mx-auto"
            alt=""
            priority
          />
        </div>

        <div
          id="input_container"
          className={`relative z-[100] ${
            core42Conversation.length > 0 ? "mb-[27px]" : ""
          }`}
        >
          {/* Scroll To Bottom Button */}
          <button
            id="scroll_to_bottom"
            onClick={scrollToBottom}
            className={`${
              core42Conversation.length > 0 && isScroll && showScrollButton
                ? "block"
                : "hidden"
            } border-solid border-[#4A4A4A] border-[1px] translate-x-[-50%] top-[-45px] absolute rounded-full left-1/2 text-white bg-[#635EF2]`}
          >
            <FaArrowDown size={30} className="py-2 px-2" />
          </button>

          {/* Input */}
          <input
            placeholder="إسأل جيس 30B"
            value={inputMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              // Allow Arabic characters only
              let arabicCharacter = e.target.value;
              let arabicRegex = /^[\u0600-\u06FF0-9\s]*$/;
              if (arabicRegex.test(arabicCharacter)) {
                setInputMessage(arabicCharacter);
              } else {
                toast(
                  <div className="flex flex-col gap-1 text-lg pt-3 mx-auto sm:mx-0">
                    <p className="sm:text-start text-center">
                      .Only Arabic letters are allowed
                    </p>
                    <p className="sm:text-start text-center">
                      يُسمح فقط بالحروف العربية.
                    </p>
                  </div>
                );
                inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
              }
            }}
            className="pr-5 pl-[65px] py-6 focus:outline-none text-[#141718] placeholder-[#6C7275] bg-[#FFFFFF] rounded-md w-full"
            ref={inputRef}
          />
          {/* Send Message Button */}
          <button
            id="send_message"
            title={`${
              !core42MssgGenerated
                ? "جارٍ التوليد..."
                : inputMessage
                ? "أرسل رسالة"
                : "الرسالة فارغة"
            }`}
            onClick={handleInputMessage}
            disabled={!inputMessage || isLimit || !core42MssgGenerated}
            className="absolute left-0 top-[50%] disabled:cursor-default disabled:text-gray-400 text-black translate-y-[-50%] ml-4"
          >
            {core42MssgGenerated ? (
              <CiLocationArrow1 size={45} className="p-2" />
            ) : (
              <MdSquare size={45} className="p-2" />
            )}
          </button>
        </div>
        {/* Info Sentence */}
        <div
          id="info"
          className={`${
            core42Conversation.length > 0 ? "fixed block" : "hidden"
          } w-full bottom-[-1px] h-[30px] left-0`}
        >
          <p
            className={`absolute w-full left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] text-[#B4B4B4] text-center text-xs`}
          ></p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={true}
        theme="dark"
        transition={Slide}
      />
    </div>
  );
}

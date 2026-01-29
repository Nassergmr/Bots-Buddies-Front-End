"use client";

import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MyContext } from "../../../client";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { MdSquare } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoMdArrowRoundUp } from "react-icons/io";
import Messages from "../messages";
import gptLogo from "../../../assets/logos/open-ai-seeklogo.png";
import metaLogo from "../../../assets/logos/Meta-AI-Logo-Mark-PNG.png";
import microsoftLogo from "../../../assets/logos/microsoft_copilot-logo_brandlogos.net_zaqzr.png";
import mistralLogo from "../../../assets/m-boxed-orange.png";
import grokIcon from "../../../assets/grok.png";
import ResetButton from "../../../assets/reset.png";
import setBodyColor from "../../elements/bodyColor";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedBeamDemo } from "@/components/beam";
import { handleInputMessage } from "../open-ai/chatgpt";

export default function AllModels() {
  const {
    replySelected,
    setReplySelected,
    allModelsConversation,
    setAllModelsConversation,
    handleSendAllModelsUserMessage,
    handleSendSpecificModelUserMessage,
    handleSendChatgptUserMessage,
    handleSendMetaUserMessage,
    handleSendMicrosoftUserMessage,
    handleSendXAiUserMessage,
    handleSendCodestralUserMessage,
    handleSendSpecificModelUserMessage2,
    isLoaded,
    setIsLoaded,
    isLimit,
    isError,
    message,
    setMessage,
    model,
    setModel,
    chatgptMssgGenerated,
    metaMssgGenerated,
    microsoftMssgGenerated,
    xaiMssgGenerated,
    codestralMssgGenerated,
    chatgptMssgGenerated2,
    metaMssgGenerated2,
    microsoftMssgGenerated2,
    xaiMssgGenerated2,
    codestralMssgGenerated2,
    allModelsMssgGenerated,
    setAllModelsMssgGenerated,
    setChatgptMssgGenerated,
    setMetaMssgGenerated,
    setMicrosoftMssgGenerated,
    setXaiMssgGenerated,
    setCodestralMssgGenerated,
    messages,
    setMessages,
    setChatgptConversation,
    highlitedMessage,
    setHighlitedMessage,
    isHighlited,
    setIsHighlited,
    targetRef,
  } = useContext(MyContext);

  const [userMessage, setUserMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [moveToChat, setMoveToChat] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    setBodyColor("#131314");
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      area_placeholder_bottom.style.backgroundColor = "#131314";
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
      console.log("AllModels Conversation:", allModelsConversation);
    }
  }, [allModelsConversation]);

  const handleInputMessage = () => {
    if (inputMessage.trim() !== "" && !isLimit && !isError) {
      inputRef.current?.blur(); // hide the keyboard when message is sent (on mobile)
      setUserMessage(inputMessage);
      if (moveToChat) {
        handleSendSpecificModelUserMessage2(inputMessage);
      } else if (replySelected) {
        handleSendSpecificModelUserMessage(inputMessage);
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      } else {
        handleSendAllModelsUserMessage(inputMessage);
        setAllModelsConversation((prev) => [
          // Push The User Message To The Conversation Array
          ...prev,
          { text: inputMessage, animate: false, isloading: true },
        ]);
        // scroll exactly to bottom
        setTimeout(() => {
          scrollToBottom();
        }, 0);
      }
      setInputMessage("");
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (allModelsMssgGenerated) {
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
    <>
      <div
        id="section_container"
        className={`sm:min-h-[calc(100dvh-100px)] min-h-[calc(100dvh-100px)] px-3 h-full w-full relative text-white mx-auto googleText
        ${isLoaded ? "block" : "hidden"}`}
      >
        {/* Reset button */}
        <div
          className={`fixed left-1/2 -translate-x-1/2 top-[15px] lg:z-10 z-[50] lg:left-auto lg:right-0 lg:top-[100px] xl:right-[40px] 
            ${allModelsConversation.length > 0 ? "block" : "hidden"}`}
        >
          <button
            className="text-white cool_button !w-auto !text-base !p-3"
            onClick={() => {
              setAllModelsConversation([]);
              setAllModelsMssgGenerated(true);
              setMoveToChat(false);
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
            allModelsConversation={allModelsConversation}
            chatgptMssgGenerated={chatgptMssgGenerated}
            metaMssgGenerated={metaMssgGenerated}
            microsoftMssgGenerated={microsoftMssgGenerated}
            xaiMssgGenerated={xaiMssgGenerated}
            codestralMssgGenerated={codestralMssgGenerated}
            chatgptMssgGenerated2={chatgptMssgGenerated2}
            metaMssgGenerated2={metaMssgGenerated2}
            microsoftMssgGenerated2={microsoftMssgGenerated2}
            xaiMssgGenerated2={xaiMssgGenerated2}
            codestralMssgGenerated2={codestralMssgGenerated2}
            message={message}
            setMessage={setMessage}
            model={model}
            setModel={setModel}
            replySelected={replySelected}
            setReplySelected={setReplySelected}
            messages={messages}
            setMessages={setMessages}
            inputRef={inputRef}
            targetRef={targetRef}
            isHighlited={isHighlited}
            setIsHighlited={setIsHighlited}
            highlitedMessage={highlitedMessage}
            setHighlitedMessage={setHighlitedMessage}
          />
        </div>

        {/* Area Placeholder (make some space above input area) */}
        <div
          id="area_placeholder_top"
          className="w-full bg-inherit h-[300px] relative"
          style={{
            display: allModelsConversation.length > 0 ? "block" : "none",
          }}
        ></div>

        <div
          id="chat_container"
          className={`z-30 px-3 xl:w-[52%] lg:w-[62%] md:w-[72%] sm:w-[82%] w-full
    ${
      allModelsConversation?.length > 0
        ? `bottom-0 fixed  translate-x-[-50%] left-[50%]`
        : "top-[52.5%] absolute translate-x-[-50%] left-[50%] translate-y-[calc(-50%-90px)]"
    }`}
        >
          <div
            id="logo_container"
            className="flex  items-center  justify-center floatUpDownq"
            style={{
              display: allModelsConversation.length > 0 ? "none" : "block",
            }}
          >
            <AnimatedBeamDemo />
          </div>

          {/* Selected message to reply to */}
          <div
            style={{
              display: allModelsConversation.length > 0 ? "flex" : "none",
            }}
            className={`w-full gap-2 max-h-[200px] transition-[bottom] relative  overflow-y-auto flex-col px-5 py-3 text-[#f9fafb] focus:outline-none placeholder-[#f9fafb] bg-[#1E1F20] border border-[#2C2D2D]
              ${message ? "bottom-0  border-b-0  rounded-b-none  rounded-3xl" : "-bottom-10 opacity-0"}
              `}
          >
            <div className="flex justify-between items-center">
              {/* Remove selected message button */}
              <button
                onClick={() => {
                  setReplySelected(false);
                  setMoveToChat(false);
                  setMessage("");
                }}
                className="text-[#C3C7C5] transition-all hover:bg-[#2C2D2D] rounded-full w-fit relative right-[12px]"
              >
                <MdOutlineClose size={36} className="p-[9px]" />
              </button>

              {/* Move to chat button */}
              <label className="container w-fit flex gap-2 items-center ">
                <input
                  type="checkbox"
                  checked={moveToChat}
                  onChange={(e) => setMoveToChat(e.target.checked)}
                />
                <span className="text-sm">Continue in model page</span>
                <div className="checkmark"></div>
              </label>
            </div>
            <span className="">{message}</span>
          </div>

          <div
            id="input_container"
            className={`relative z-[100] ${
              allModelsConversation?.length > 0 ? "mb-[27px]" : "mb-0"
            }`}
          >
            {/* Scroll To Bottom Button */}
            <button
              id="scroll_to_bottom"
              onClick={scrollToBottom}
              className={`${
                allModelsConversation.length > 0 && isScroll && showScrollButton
                  ? "block"
                  : "hidden"
              } border-solid border-[#4A4A4A] border translate-x-[-50%] top-[-45px] absolute rounded-full left-1/2 text-[#9ca3af] hover:bg-[#2C2D2D]  bg-[#1E1F20] transition-all`}
            >
              <FaArrowDown size={30} className="py-2 px-2" />
            </button>

            {/* Input */}
            <input
              placeholder={`${message ? `Reply to ${model}` : "Ask all together"}`}
              value={inputMessage}
              onKeyDown={handleKeyDown}
              onChange={(e) => setInputMessage(e.target.value)}
              className={` pl-5 pr-[65px] py-6 text-[#f9fafb] focus:outline-none placeholder-[#b5bec7] bg-[#1E1F20] border border-[#2C2D2D] rounded-3xl w-full overflow-hidden
                ${message ? "rounded-t-none" : "rounded-t-3xl"}
                `}
              ref={inputRef}
            />

            {/* Send Message Button */}
            <button
              id="send_message"
              title={`${
                !allModelsMssgGenerated
                  ? "Generating..."
                  : inputMessage
                    ? "Send message"
                    : "Message is empty"
              }`}
              onClick={handleInputMessage}
              disabled={!inputMessage || isLimit}
              className="absolute rounded-full transition-all right-0 top-[50%] duration-300 disabled:opacity-0 text-[#E3E3E3] hover:bg-[#373838] bg-[#2C2D2D] translate-y-[-50%] mr-4"
            >
              {allModelsMssgGenerated ? (
                <IoMdArrowRoundUp size={38} className="p-[9px]" />
              ) : (
                <MdSquare size={38} className="" />
              )}
            </button>
          </div>
          <div
            id="area_placeholder_bottom"
            className={`${
              allModelsConversation.length > 0 ? "fixed block" : "hidden"
            } w-full bottom-[-1px] h-[30px] left-0 text-[#131314]`}
          ></div>
        </div>
      </div>
    </>
  );
}

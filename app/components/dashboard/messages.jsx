import Image from "next/image";
import { usePathname } from "next/navigation";
import TypeWriter from "../elements/typeWriter";
import ReactSpinner from "../elements/reactSpinner";
import Icon from "../../assets/jais-icon.png";
import gptLogo from "../../assets/logos/open-ai-seeklogo.png";
import metaLogo from "../../assets/logos/Meta-AI-Logo-Mark-PNG.png";
import microsoftLogo from "../../assets/logos/microsoft_copilot-logo_brandlogos.net_zaqzr.png";
import mistralLogo from "../../assets/m-boxed-orange.png";
import grokIcon from "../../assets/grok.png";
import BounceLoader from "react-spinners/BounceLoader";
import DotLoader from "react-spinners/DotLoader";
import PuffLoader from "react-spinners/PuffLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { TbArrowBackUp } from "react-icons/tb";
import { StaggeredFade } from "@/components/ui/staggeredFade";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { FiUser } from "react-icons/fi";
import { TextAnimate } from "@/components/ui/text-animate";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/AI animation.json";
import { HiMiniArrowTurnDownRight } from "react-icons/hi2";

export default function Messages({
  messagesEndRef,
  chatgptConversation,
  deepSeekConversation,
  metaConversation,
  microsoftConversation,
  xAiConversation,
  codestralConversation,
  core42Conversation,
  allModelsConversation,
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
  message,
  setMessage,
  model,
  setModel,
  replySelected,
  setReplySelected,
  messages,
  setMessages,
  inputRef,
  targetRef,
  isHighlited,
  setIsHighlited,
  highlitedMessage,
  setHighlitedMessage,
  router,
}) {
  // Text & Code Formatting
  const renderers = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dracula}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setIsHighlited(true);
      setTimeout(() => {
        setIsHighlited(false);
      }, 1500);
    }
  };
  const route = usePathname();
  const isNotGenerated =
    !chatgptMssgGenerated2 ||
    !codestralMssgGenerated2 ||
    !microsoftMssgGenerated2 ||
    !xaiMssgGenerated2 ||
    !metaMssgGenerated2;

  return (
    <>
      {/* Chatgpt */}
      {route.includes("gpt") &&
        chatgptConversation.map((mssg, index) => (
          <div key={index}>
            {/* User Message */}
            {!mssg.isai && (
              <div
                id="user_message_container"
                className="sm:max-w-[65%] max-w-[75%] ml-auto break-words whitespace-normal my-8"
              >
                {messages?.map(
                  (e, index) =>
                    mssg.messageId === e.messageId && (
                      <div
                        onClick={() => {
                          setHighlitedMessage(e.message);
                          router.push("/parallel");
                          setTimeout(() => {
                            scrollToTarget();
                          }, 200);
                        }}
                        key={e}
                        className="w-full py-2  text-gray-300 hover:text-gray-50 cursor-pointer transition-all  max-h-[100px]"
                      >
                        <div className="flex ml-auto w-fit items-start gap-2">
                          <HiMiniArrowTurnDownRight size={18} className="" />
                          <p className="text-sm w-fit line-clamp-4">
                            {e.message}
                          </p>
                        </div>
                      </div>
                    ),
                )}

                <p className="rounded-3xl bg-[#2F2F2F] px-5 py-[10px] w-fit max-w-[100%] ml-auto text-pretty">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For Chatgpt Response */}
            {index === chatgptConversation.length - 1 &&
              !chatgptMssgGenerated && (
                <div className="">
                  <BounceLoader
                    color={"#A6A6A6"}
                    size={18}
                    data-testid="loader"
                  />
                </div>
              )}

            {/* Chatgpt Response */}
            {mssg.isai && (
              <span className="leading-relaxed text-pretty">
                {/*  */}
                {mssg.animate ? (
                  <TypeWriter text={mssg.text} delay={0.3} infinite />
                ) : (
                  <ReactMarkdown components={renderers}>
                    {mssg.text}
                  </ReactMarkdown>
                )}
              </span>
            )}
          </div>
        ))}

      {/* Meta */}
      {route.includes("llama") &&
        metaConversation.map((mssg, index) => (
          <div key={index}>
            {/* User Message */}
            {!mssg.isai && (
              <div
                id="user_message_container"
                className="sm:max-w-[65%] max-w-[75%] break-words whitespace-normal mb-3 mt-9"
              >
                {messages?.map(
                  (e, index) =>
                    mssg.messageId === e.messageId && (
                      <div
                        onClick={() => {
                          setHighlitedMessage(e.message);
                          router.push("/parallel");
                          setTimeout(() => {
                            scrollToTarget();
                          }, 200);
                        }}
                        key={e}
                        className="w-full py-2  text-gray-300 hover:text-gray-50 cursor-pointer transition-all  max-h-[100px]"
                      >
                        <div className="flex ml-auto w-fit items-start gap-2">
                          <HiMiniArrowTurnDownRight size={18} className="" />
                          <p className="text-sm w-fit line-clamp-4">
                            {e.message}
                          </p>
                        </div>
                      </div>
                    ),
                )}

                <p className="rounded-xl bg-[#323338] px-5 py-[8px] w-fit max-w-[100%]">
                  {mssg.text}
                </p>
                {/* The message the user is replying to */}
              </div>
            )}

            {/* Loader While Waiting For Meta Response */}
            {index === metaConversation.length - 1 && !metaMssgGenerated && (
              <div className="loading text-sm">
                <span>G</span>
                <span>e</span>
                <span>n</span>
                <span>e</span>
                <span>r</span>
                <span>a</span>
                <span>t</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
              </div>
            )}

            {/* Meta Response */}
            {mssg.isai && (
              <span className="leading-relaxed">
                {mssg.animate ? (
                  <TextAnimate
                    animation="blurInUp"
                    by="line"
                    duration={4}
                    startOnView={true}
                    once={true}
                  >
                    {mssg.text}
                  </TextAnimate>
                ) : (
                  <ReactMarkdown components={renderers}>
                    {mssg.text}
                  </ReactMarkdown>
                )}
              </span>
            )}
          </div>
        ))}

      {/* Microsoft */}
      {route.includes("phi") &&
        microsoftConversation.map((mssg, index) => (
          <div key={index}>
            {/* User Message */}
            {!mssg.isai && (
              <div
                id="user_message_container"
                className="sm:max-w-[65%] max-w-[75%] ml-auto break-words whitespace-normal my-8"
              >
                {messages?.map(
                  (e, index) =>
                    mssg.messageId === e.messageId && (
                      <div
                        onClick={() => {
                          setHighlitedMessage(e.message);
                          router.push("/parallel");
                          setTimeout(() => {
                            scrollToTarget();
                          }, 200);
                        }}
                        key={e}
                        className="w-full py-2  text-gray-300 hover:text-gray-50 cursor-pointer transition-all  max-h-[100px]"
                      >
                        <div className="flex ml-auto w-fit items-start gap-2">
                          <HiMiniArrowTurnDownRight size={18} className="" />
                          <p className="text-sm w-fit line-clamp-4">
                            {e.message}
                          </p>
                        </div>
                      </div>
                    ),
                )}
                <p className="rounded-2xl bg-[#1D2439] px-5 py-[10px] w-fit max-w-[100%] ml-auto">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For Microsoft Response */}
            {index === microsoftConversation.length - 1 &&
              !microsoftMssgGenerated && (
                <div className="">
                  <DotLoader
                    color={"#4F8EF7"}
                    size={25}
                    speedMultiplier={0.7}
                    data-testid="loader"
                  />
                </div>
              )}

            {/* Microsoft Response */}
            {mssg.isai && (
              <span className="leading-relaxed">
                {mssg.animate ? (
                  <TextAnimate
                    animation="blurInUp"
                    by="character"
                    duration={6}
                    startOnView={true}
                    once={true}
                  >
                    {mssg.text}
                  </TextAnimate>
                ) : (
                  <ReactMarkdown components={renderers}>
                    {mssg.text}
                  </ReactMarkdown>
                )}
              </span>
            )}
          </div>
        ))}

      {/* XAi */}
      {route.includes("grok") &&
        xAiConversation.map((mssg, index) => (
          <div key={index} className="">
            {/* User Message */}
            {!mssg.isai && (
              <div
                id="user_message_container"
                className="sm:max-w-[65%] max-w-[75%] ml-auto break-words whitespace-normal my-8"
              >
                {messages?.map(
                  (e, index) =>
                    mssg.messageId === e.messageId && (
                      <div
                        onClick={() => {
                          setHighlitedMessage(e.message);
                          router.push("/parallel");
                          setTimeout(() => {
                            scrollToTarget();
                          }, 200);
                        }}
                        key={e}
                        className="w-full py-2  text-gray-300 hover:text-gray-50 cursor-pointer transition-all  max-h-[100px]"
                      >
                        <div className="flex ml-auto w-fit items-start gap-2">
                          <HiMiniArrowTurnDownRight size={18} className="" />
                          <p className="text-sm w-fit line-clamp-4">
                            {e.message}
                          </p>
                        </div>
                      </div>
                    ),
                )}
                <p className="rounded-2xl bg-[#242628] px-5 py-[10px] w-fit max-w-[100%] ml-auto border border-[#383A3C]">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For XAi Response */}
            {index === xAiConversation.length - 1 && !xaiMssgGenerated && (
              <div className="">
                <PuffLoader
                  color={"#FCFCFC"}
                  size={28}
                  speedMultiplier={0.7}
                  data-testid="loader"
                />
              </div>
            )}

            {/* XAi Response */}
            {mssg.isai && (
              <span className="leading-relaxed">
                {mssg.animate ? (
                  <TypeWriter text={mssg.text} delay={0.3} infinite />
                ) : (
                  <ReactMarkdown components={renderers}>
                    {mssg.text}
                  </ReactMarkdown>
                )}
              </span>
            )}
          </div>
        ))}

      {/* Codestral */}
      {route.includes("codestral") &&
        codestralConversation.map((mssg, index) => (
          <div key={index} className="">
            {/* User Message */}
            {!mssg.isai && (
              <div
                id="user_message_container"
                className="sm:max-w-[65%] max-w-[75%] ml-auto break-words whitespace-normal my-8"
              >
                {messages?.map(
                  (e, index) =>
                    mssg.messageId === e.messageId && (
                      <div
                        onClick={() => {
                          setHighlitedMessage(e.message);
                          router.push("/parallel");
                          setTimeout(() => {
                            scrollToTarget();
                          }, 200);
                        }}
                        key={e}
                        className="w-full py-2  text-gray-300 hover:text-gray-50 cursor-pointer transition-all  max-h-[100px]"
                      >
                        <div className="flex ml-auto w-fit items-start gap-2">
                          <HiMiniArrowTurnDownRight size={18} className="" />
                          <p className="text-sm w-fit line-clamp-4">
                            {e.message}
                          </p>
                        </div>
                      </div>
                    ),
                )}
                <p className="rounded-3xl bg-[#242628] px-5 py-[8px] w-fit max-w-[100%] ml-auto">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For Codestral Response */}
            {index === codestralConversation.length - 1 &&
              !codestralMssgGenerated && (
                <div className="">
                  <PulseLoader
                    color={"#ec4f13"}
                    size={10}
                    speedMultiplier={0.7}
                    data-testid="loader"
                  />
                </div>
              )}

            {/* Codestral Response */}
            {mssg.isai && (
              <div className=" flex items-start gap-3">
                <Image
                  src={mistralLogo}
                  width={28}
                  height={28}
                  alt=""
                  className=""
                />
                <span className="leading-relaxed">
                  {mssg.animate ? (
                    <StaggeredFade text={mssg.text} />
                  ) : (
                    <ReactMarkdown components={renderers}>
                      {mssg.text}
                    </ReactMarkdown>
                  )}
                </span>
              </div>
            )}
          </div>
        ))}

      {/* All Models */}
      {route.includes("all") &&
        allModelsConversation.map((mssg, index) => (
          <div key={index} className="">
            {!mssg.isai && (
              <div
                id="user_message_container"
                className="sm:max-w-[65%] max-w-[75%] ml-auto break-words whitespace-normal my-8"
              >
                {/* The message the user replyed to */}
                {messages?.map(
                  (e, index) =>
                    mssg.messageId === e.messageId && (
                      <div
                        onClick={() => {
                          setHighlitedMessage(e.message);
                          setTimeout(() => {
                            scrollToTarget();
                          }, 200);
                        }}
                        key={e}
                        className="w-full py-2 max-h-[100px] text-gray-300 hover:text-gray-50 cursor-pointer transition-all"
                      >
                        <div className="flex  ml-auto w-fit items-start gap-2">
                          <HiMiniArrowTurnDownRight size={18} className="" />
                          <p className="text-sm w-fit max-h-[200px] line-clamp-4 overflow-hidden">
                            {e.message}
                          </p>
                        </div>
                      </div>
                    ),
                )}
                {/* User Message */}
                <p className="rounded-3xl text-[#f9fafb] bg-[#282A2C] border border-[#2C2D2D]  px-5 py-[8px] w-fit max-w-[100%] ml-auto">
                  {mssg.text}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-7">
              {/* Loader While Waiting For Models Response */}
              {index === allModelsConversation.length - 1 && isNotGenerated && (
                <Lottie
                  animationData={loaderAnimation}
                  loop
                  autoplay
                  style={{ width: 50, height: 50 }}
                />
              )}
            </div>

            {/* All Models Response */}
            {mssg.model === "GPT-4.1" && (
              <div
                ref={highlitedMessage === mssg.text ? targetRef : null}
                className={`flex ${
                  isHighlited && highlitedMessage === mssg.text
                    ? "text-red-300"
                    : "text-white"
                } items-start justify-between  gap-5 py-3 transition-colors duration-300 overflow-x-auto`}
              >
                <div className="flex items-start gap-3 ">
                  <Image
                    src={gptLogo}
                    width={26}
                    height={26}
                    alt=""
                    className=""
                  />
                  <span className="leading-relaxed text-pretty">
                    {mssg.animate ? (
                      <TypeWriter text={mssg.text} delay={0.1} infinite />
                    ) : (
                      <ReactMarkdown components={renderers}>
                        {mssg.text}
                      </ReactMarkdown>
                    )}
                  </span>
                </div>
                <button
                  title="reply to message"
                  onClick={() => {
                    setMessage(mssg.text);
                    setModel(mssg.model);
                    setReplySelected(true);
                    inputRef.current.focus();
                  }}
                  className="text-gray-600 border border-black p-2 rounded-full hover:bg-gray-300 transition-colors gap-1 w-fit flex items-center bg-gray-200"
                >
                  <TbArrowBackUp size={14} />
                </button>
              </div>
            )}

            {mssg.model === "Llama 4 Scout 17B 16E Instruct" && (
              <div
                ref={highlitedMessage === mssg.text ? targetRef : null}
                className={`flex ${
                  isHighlited && highlitedMessage === mssg.text
                    ? "text-red-300"
                    : "text-white"
                } items-start justify-between  transition-colors duration-300 gap-5 py-3  overflow-x-auto`}
              >
                <div className="flex items-start gap-3 ">
                  <Image src={metaLogo} width={24} height={24} alt="" />
                  <span className="leading-relaxed text-pretty">
                    {mssg.animate ? (
                      <TypeWriter text={mssg.text} delay={0.1} infinite />
                    ) : (
                      <ReactMarkdown components={renderers}>
                        {mssg.text}
                      </ReactMarkdown>
                    )}
                  </span>
                </div>
                <button
                  title="reply to message"
                  onClick={() => {
                    setMessage(mssg.text);
                    setModel(mssg.model);
                    setReplySelected(true);
                    inputRef.current.focus();
                  }}
                  className="text-gray-600 border border-black p-2 rounded-full hover:bg-gray-300 transition-colors gap-1 w-fit flex items-center bg-gray-200"
                >
                  <TbArrowBackUp size={14} />
                </button>
              </div>
            )}

            {mssg.model === "Phi-4-mini-instruct" && (
              <div
                ref={highlitedMessage === mssg.text ? targetRef : null}
                className={`flex ${
                  isHighlited && highlitedMessage === mssg.text
                    ? "text-red-300"
                    : "text-white"
                } items-start justify-between  transition-colors duration-300 gap-5 py-3  overflow-x-auto`}
              >
                <div className="flex items-start gap-3 ">
                  <Image
                    src={microsoftLogo}
                    width={26}
                    height={26}
                    alt=""
                    className=""
                  />
                  <span className="leading-relaxed">
                    {mssg.animate ? (
                      <TypeWriter text={mssg.text} delay={0.1} infinite />
                    ) : (
                      <ReactMarkdown components={renderers}>
                        {mssg.text}
                      </ReactMarkdown>
                    )}
                  </span>
                </div>
                <button
                  title="reply to message"
                  onClick={() => {
                    setMessage(mssg.text);
                    setModel(mssg.model);
                    setReplySelected(true);
                    inputRef.current.focus();
                  }}
                  className="text-gray-600 border border-black p-2 rounded-full hover:bg-gray-300 transition-colors gap-1 w-fit flex items-center bg-gray-200"
                >
                  <TbArrowBackUp size={14} />
                </button>
              </div>
            )}

            {mssg.model === "Codestral 25.01" && (
              <div
                ref={highlitedMessage === mssg.text ? targetRef : null}
                className={`flex ${
                  isHighlited && highlitedMessage === mssg.text
                    ? "text-red-300"
                    : "text-white"
                } items-start justify-between  transition-colors duration-300 gap-5 py-3  overflow-x-auto`}
              >
                <div className="flex items-start gap-3 ">
                  <Image
                    src={mistralLogo}
                    width={26}
                    height={26}
                    alt=""
                    className=""
                  />
                  <span className="leading-relaxed text-pretty">
                    {mssg.animate ? (
                      <TypeWriter text={mssg.text} delay={0.1} infinite />
                    ) : (
                      <ReactMarkdown components={renderers}>
                        {mssg.text}
                      </ReactMarkdown>
                    )}
                  </span>
                </div>
                <button
                  title="reply to message"
                  onClick={() => {
                    setMessage(mssg.text);
                    setModel(mssg.model);
                    setReplySelected(true);
                    inputRef.current.focus();
                  }}
                  className="text-gray-600 border border-black p-2 rounded-full hover:bg-gray-300 transition-colors gap-1 w-fit flex items-center bg-gray-200"
                >
                  <TbArrowBackUp size={14} />
                </button>
              </div>
            )}

            {mssg.model === "Grok 3 Mini" && (
              <div
                ref={highlitedMessage === mssg.text ? targetRef : null}
                className={`flex ${
                  isHighlited && highlitedMessage === mssg.text
                    ? "text-red-300"
                    : "text-white"
                } items-start justify-between  transition-colors duration-300 gap-5 py-3  overflow-x-auto`}
              >
                <div className="flex items-start gap-3 ">
                  <Image
                    src={grokIcon}
                    width={26}
                    height={26}
                    alt=""
                    className="object-none"
                  />
                  <span className="leading-relaxed">
                    {mssg.animate ? (
                      <TypeWriter text={mssg.text} delay={0.1} infinite />
                    ) : (
                      <ReactMarkdown components={renderers}>
                        {mssg.text}
                      </ReactMarkdown>
                    )}
                  </span>
                </div>

                <button
                  title="reply to message"
                  onClick={() => {
                    setMessage(mssg.text);
                    setModel(mssg.model);
                    setReplySelected(true);
                    inputRef.current.focus();
                  }}
                  className="text-gray-600 border border-black p-2 rounded-full hover:bg-gray-300 transition-colors gap-1 w-fit flex items-center bg-gray-200"
                >
                  <TbArrowBackUp size={14} />
                </button>
              </div>
            )}
          </div>
        ))}

      {/* Core42 */}
      {route.includes("jais") &&
        core42Conversation.map((mssg, index) => (
          <div key={index}>
            {/* User Message */}
            {!mssg.isai && (
              <div className="flex flex-col ">
                <div className="flex gap-2 items-center">
                  <div className="rounded-full bg-[#EEF1FF] flex items-center justify-center size-7">
                    <FiUser size={28} className=" p-1 text-black" />
                  </div>
                  <h4 className="pt-2">أنت</h4>
                </div>
                <div
                  id="user_message_container"
                  className="sm:max-w-[65%] max-w-[75%] break-words whitespace-normal"
                >
                  <p className="w-fit">{mssg.text}</p>
                </div>
              </div>
            )}

            {/* Loader While Waiting For Core42 Response */}
            {mssg.isloading && (
              <div className="mt-3">
                <PulseLoader
                  color={"#635EF2"}
                  size={3}
                  speedMultiplier={0.7}
                  data-testid="loader"
                />
              </div>
            )}

            {/* core42 Response */}
            {mssg.isai && (
              <div className="flex flex-col pb-8 pt-2">
                <div className="flex gap-2 items-center mb-1">
                  <div className="rounded-full bg-[#EEF1FF] flex items-center justify-center size-7">
                    <Image
                      src={Icon}
                      width={28}
                      height={28}
                      alt=""
                      className="p-1"
                    />
                  </div>
                  <h4>جيس</h4>
                </div>
                <span className="leading-relaxed">
                  {mssg.animate ? (
                    <TypeWriter text={mssg.text} delay={0.3} infinite />
                  ) : (
                    <ReactMarkdown components={renderers}>
                      {mssg.text}
                    </ReactMarkdown>
                  )}
                </span>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

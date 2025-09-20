import Image from "next/image";
import { usePathname } from "next/navigation";
import TypeWriter from "../elements/typeWriter";
import ReactSpinner from "../elements/reactSpinner";
import Icon from "../../assets/jais-icon.png";
import CircleLoader from "react-spinners/BounceLoader";
import PulseLoader from "react-spinners/PulseLoader";
import DotLoader from "react-spinners/DotLoader";
import PuffLoader from "react-spinners/PuffLoader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { FiUser } from "react-icons/fi";
import { TextAnimate } from "@/components/ui/text-animate";

export default function Messages({
  messagesEndRef,
  chatgptConversation,
  deepSeekConversation,
  metaConversation,
  microsoftConversation,
  xAiConversation,
  core42Conversation,
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

  const route = usePathname();

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
                <p className="rounded-3xl bg-[#2F2F2F] px-5 py-[10px] w-fit max-w-[100%] ml-auto text-pretty">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For Chatgpt Response */}
            {mssg.isloading && (
              <div className="">
                <CircleLoader
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
                <p className="rounded-xl bg-[#323338] px-5 py-[8px] w-fit max-w-[100%]">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For Meta Response */}
            {mssg.isloading && (
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
                    // delay={0.5}
                    startOnView={true}
                    once={true}
                  >
                    {mssg.text}
                  </TextAnimate>
                ) : (
                  // <TypeWriter text={mssg.text} delay={0.3} infinite />
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
                <p className="rounded-2xl bg-[#1D2439] px-5 py-[10px] w-fit max-w-[100%] ml-auto">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For Microsoft Response */}
            {mssg.isloading && (
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
                <p className="rounded-2xl bg-[#242628] px-5 py-[10px] w-fit max-w-[100%] ml-auto border border-[#383A3C]">
                  {mssg.text}
                </p>
              </div>
            )}

            {/* Loader While Waiting For XAi Response */}
            {mssg.isloading && (
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
                  size={8}
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

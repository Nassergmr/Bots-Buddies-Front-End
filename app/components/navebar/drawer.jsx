import Image from "next/image";
import Link from "next/link";
import OpenAiLogo from "../../assets/logos/open-ai-seeklogo.png";
import MetaLogo from "../../assets/logos/meta.png";
import MicrosoftLogo from "../../assets/logos/microsoft.png";
import XAiLogo from "../../assets/logos/xai.png";
import mistralLogo from "../../assets/logos/mistral.png";
import Core42Logo from "../../assets/logos/core42.png";
import { IoMdClose } from "react-icons/io";

export default function Drawer({
  openDrawer,
  setOpenDrawer,
  buttonActive,
  setButtonActive,
  path,
}) {
  return (
    <>
      <div
        id="links_container"
        className={`${
          openDrawer ? "left-0" : "-left-[600px]"
        } flex lg:hidden flex-col gap-5 mx-auto items-center w-[70%] sm:w-[40%] md:w-[30%] gap-x-3 py-5 px-3 fixed top-0  h-full z-[200] bg-inherit transition-all duration-700 ease-in-out`}
      >
        {/* Close Drawer Button */}
        <button
          onClick={() => setOpenDrawer(false)}
          className="cool_button !w-auto self-end"
        >
          <IoMdClose className="z-10" />
        </button>

        <Link
          onClick={() => setOpenDrawer(false)}
          className={`cool_button mt-12 !w-full !py-4  ${
            path.includes("gpt") && buttonActive ? "clicked" : ""
          }`}
          href={"/models/gpt"}
          id="gpt"
        >
          <Image
            src={OpenAiLogo}
            width={30}
            height={30}
            alt=""
            className="z-10"
          />
          <span>OpenAI</span>
        </Link>

        <Link
          onClick={() => setOpenDrawer(false)}
          className={`cool_button liberationText !w-full !py-4 ${
            path.includes("llama") && buttonActive ? "clicked" : ""
          }`}
          href={"/models/llama"}
          id="llama"
        >
          <Image
            src={MetaLogo}
            width={30}
            height={30}
            alt=""
            className="z-10"
          />
          <span>Meta</span>
        </Link>

        {/* <Link
          onClick={() => setOpenDrawer(false)}
          href={"/models/jais"}
          id="Jais"
          className={`cool_button !w-full !py-4 ${
            path.includes("jais") && buttonActive ? "clicked" : ""
          }`}
        >
          <Image
            src={Core42Logo}
            width={95}
            height={95}
            alt=""
            className="z-10"
            priority
          />
        </Link> */}

        <Link
          onClick={() => setOpenDrawer(false)}
          className={`cool_button gintoText !w-full !py-4 ${
            path.includes("phi") && buttonActive ? "clicked" : ""
          }`}
          href={"/models/phi"}
          id="phi"
        >
          <Image
            src={MicrosoftLogo}
            width={30}
            height={30}
            alt=""
            className="z-10"
          />
          <span>Microsoft</span>{" "}
        </Link>

        <Link
          onClick={() => setOpenDrawer(false)}
          href={"/models/codestral"}
          id="codestral"
          className={`cool_button interText !w-full !py-4 ${
            path.includes("codestral") && buttonActive ? "clicked" : ""
          }`}
        >
          <Image
            src={mistralLogo}
            width={28}
            height={28}
            alt=""
            className="z-10"
          />
          <span>Mistral</span>
        </Link>

        <Link
          onClick={() => setOpenDrawer(false)}
          href={"/models/grok"}
          id="grok"
          className={`cool_button manropeText !w-full !py-4 ${
            path.includes("grok") && buttonActive ? "clicked" : ""
          }`}
        >
          <Image src={XAiLogo} width={30} height={30} alt="" className="z-10" />
          <span>xAI</span>
        </Link>
      </div>
    </>
  );
}

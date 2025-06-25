import Image from "next/image";
import Link from "next/link";
import OpenAiLogo from "../../assets/logos/open-ai-seeklogo.png";
import MetaLogo from "../../assets/logos/meta.png";
import MicrosoftLogo from "../../assets/logos/microsoft.png";
import XAiLogo from "../../assets/logos/xai.png";
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
            path.includes("open-ai") && buttonActive ? "clicked" : ""
          }`}
          href={"/bots/open-ai"}
          id="open-ai"
        >
          <Image
            src={OpenAiLogo}
            width={30}
            height={30}
            alt=""
            className="z-10"
          />
          <span>Open Ai</span>
        </Link>

        <Link
          onClick={() => setOpenDrawer(false)}
          className={`cool_button liberationText !w-full !py-4 ${
            path.includes("meta") && buttonActive ? "clicked" : ""
          }`}
          href={"/bots/meta"}
          id="meta"
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

        <Link
          onClick={() => setOpenDrawer(false)}
          href={"/bots/core42"}
          id="Core42"
          className={`cool_button !w-full !py-4 ${
            path.includes("core42") && buttonActive ? "clicked" : ""
          }`}
        >
          <Image
            src={Core42Logo}
            width={95}
            height={95}
            alt=""
            className="z-10"
          />
        </Link>

        <Link
          onClick={() => setOpenDrawer(false)}
          className={`cool_button gintoText !w-full !py-4 ${
            path.includes("microsoft") && buttonActive ? "clicked" : ""
          }`}
          href={"/bots/microsoft"}
          id="microsoft"
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
          href={"/bots/xai"}
          id="xai"
          className={`cool_button manropeText !w-full !py-4 ${
            path.includes("xai") && buttonActive ? "clicked" : ""
          }`}
        >
          <Image src={XAiLogo} width={30} height={30} alt="" className="z-10" />
          <span>xAI</span>
        </Link>
      </div>
    </>
  );
}

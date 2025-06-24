"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import OpenAiLogo from "../../assets/logos/open-ai-seeklogo.png";
import MetaLogo from "../../assets/logos/meta.png";
import MicrosoftLogo from "../../assets/logos/microsoft.png";
import XAiLogo from "../../assets/logos/xai.png";
import Chatgpt from "../dashboard/open-ai/chatgpt";
import Core42Logo from "../../assets/logos/core42.png";
import Drawer from "./drawer";

export default function NaveBar() {
  const [buttonActive, setButtonActive] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const path = usePathname();
  const homePage = path === "/";

  useEffect(() => {
    setButtonActive(true);

    setTimeout(() => {
      setButtonActive(false);
    }, 1000);
  }, [path]);

  const handleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    !homePage && ( // Hide navebar in homepage
      <>
        <div
          id="nave_bar_container"
          className={`w-full gap-x-3 py-5 px-3 bg-inherit z-50 fixed top-0 left-0`}
        >
          <div
            id="links_container"
            className="hidden lg:flex gap-5 mx-auto items-center justify-center"
          >
            <Link
              className={`cool_button ${
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
              className={`cool_button liberationText ${
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
              className={`cool_button gintoText ${
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
              href={"/bots/xai"}
              id="xai"
              className={`cool_button manropeText ${
                path.includes("xai") && buttonActive ? "clicked" : ""
              }`}
            >
              <Image
                src={XAiLogo}
                width={30}
                height={30}
                alt=""
                className="z-10"
              />
              <span>xAI</span>
            </Link>

            <Link
              href={"/bots/core42"}
              id="Core42"
              className={`cool_button ${
                path.includes("core") && buttonActive ? "clicked" : ""
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
          </div>

          {/* Open Drawer Button */}
          <button
            onClick={handleDrawer}
            className="block lg:hidden text-white cool_button !w-auto ml-auto"
          >
            <RxHamburgerMenu className="z-10" />
          </button>
        </div>

        {/* Drawer */}
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

        {/* Overlay */}
        <div
          id="overlay"
          onClick={() => setOpenDrawer(false)}
          className={`${
            openDrawer ? "block" : "hidden"
          } transition-all duration-700 ease-in-out z-[100] bg-black/60`}
        ></div>
      </>
    )
  );
}

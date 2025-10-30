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
              className={`cool_button liberationText ${
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

            <Link
              href={"/models/jais"}
              id="Jais"
              className={`cool_button !max-h-[50px] ${
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
            </Link>

            <Link
              className={`cool_button gintoText ${
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
              href={"/models/grok"}
              id="grok"
              className={`cool_button manropeText ${
                path.includes("grok") && buttonActive ? "clicked" : ""
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
        <Drawer
          path={path}
          buttonActive={buttonActive}
          setButtonActive={setButtonActive}
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />

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

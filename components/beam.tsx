"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../components/ui/animated-beam";

import Image from "next/image";
import gptLogo from "../app/assets/logos/openai-black.png";
import metaLogo from "../app/assets/logos/Meta-AI-Logo-Mark-PNG.png";
import microsoftLogo from "../app/assets/logos/microsoft_copilot-logo_brandlogos.net_zaqzr.png";
import mistralLogo from "../app/assets/m-boxed-orange.png";
import grokIcon from "../app/assets/logos/grok-black.png";
import userIcon from "../app/assets/user.png";
import Link from "next/link";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2.5 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10 -mt-14",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.gpt />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.meta />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.copilot />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.mistral />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.grok />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div7Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div7Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div7Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div7Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div7Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}

const Icons = {
  gpt: ({ className = "" }) => (
    <Link href="/models/gpt">
      <Image
        src={gptLogo}
        alt="GPT"
        className={`w-12 h-12 object-contain ${className}`}
      />
    </Link>
  ),

  meta: ({ className = "" }) => (
    <Link href="/models/llama">
      <Image
        src={metaLogo}
        alt="Meta / LLaMA"
        className={`w-12 h-12 object-contain ${className}`}
      />
    </Link>
  ),

  copilot: ({ className = "" }) => (
    <Link href="/models/phi">
      <Image
        src={microsoftLogo}
        alt="Microsoft Phi"
        className={`w-12 h-12 object-contain ${className}`}
      />
    </Link>
  ),

  mistral: ({ className = "" }) => (
    <Link href="/models/codestral">
      <Image
        src={mistralLogo}
        alt="Codestral"
        className={`w-12 h-12 object-contain ${className}`}
      />
    </Link>
  ),

  grok: ({ className = "" }) => (
    <Link href="/models/grok">
      <Image
        src={grokIcon}
        alt="Grok"
        className={`w-12 h-12 object-contain ${className}`}
      />
    </Link>
  ),

  user: ({ className = "" }) => (
    <Image
      src={userIcon}
      alt="User"
      className={`w-12 h-12 object-contain ${className}`}
    />
  ),
};

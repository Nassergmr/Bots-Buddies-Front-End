import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="sm:h-screen h-[100dvh] relative">
      <div className="absolute flex flex-col items-center gap-3 translate-x-[-50%] translate-y-[-50%] left-1/2 top-[40%] ">
        <h1 className=" uppercase text-7xl">Welcome</h1>
        <Link href={"/bots/open-ai"} className="flex items-center gap-2">
          <span>Get Started</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

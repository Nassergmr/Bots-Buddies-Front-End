import Chatgpt from "../../components/dashboard/open-ai/chatgpt";

export const metadata = {
  icons: {
    icon: "/chatgpt.ico",
  },
};

export default function Page() {
  return <Chatgpt />;
}

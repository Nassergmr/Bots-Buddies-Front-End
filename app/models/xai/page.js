import XAi from "../../components/dashboard/xai/xai.jsx";
import ParticlesComponent from "../../components/elements/particlesComponent.jsx";

export const metadata = {
  icons: {
    icon: "/xai.ico",
  },
};

export default function Page() {
  return (
    <>
      <XAi />
      <ParticlesComponent />
    </>
  );
}

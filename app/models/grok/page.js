import XAi from "../../components/dashboard/xai/xai.jsx";
import { ParticlesComponent } from "../../../components/ui/particles.tsx";
export default function Page() {
  return (
    <>
      <XAi />
      <ParticlesComponent className="fixed inset-0 z-10 w-full h-full" />
    </>
  );
}

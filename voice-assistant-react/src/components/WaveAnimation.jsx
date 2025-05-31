// components/WaveAnimation.jsx
import { Player } from "@lottiefiles/react-lottie-player";
import waveData from "../assets/wave2.json";

export default function WaveAnimation() {
  return (
    <div className="flex justify-center mt-[-10px]">
      <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
        <Player
          autoplay
          loop
          src={waveData}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}

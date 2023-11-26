import { SwipeButtonProps } from "../types";

export default function SwipeButton({
  exit,
  removeCard,
  id,
  animationState,
}: SwipeButtonProps) {
  const handleSwipe = (action: "left" | "right") => {
    if (action === "left") {
      exit(-200);
    } else if (action === "right") {
      exit(200);
    }
    removeCard(id, action);
  };
  return (
    <div className="fixed inset-0 flex ">
      <button
        className="hover:scale-200 flex-1 cursor-pointer justify-center border-2 border-none px-6 py-5 opacity-5 transition duration-200 ease-in-out focus:outline-none"
        onClick={() => {
          if (!animationState) {
            handleSwipe("left");
          }
        }}
        // style={{ background: "#ff576a" }}
        aria-label="Wiem"
      ></button>
      <button
        className="hover:scale-200 flex-1 cursor-pointer justify-center border-2 border-none px-6 py-5 opacity-5 transition duration-200 ease-in-out focus:outline-none"
        onClick={() => {
          if (!animationState) {
            handleSwipe("right");
          }
        }}
        // style={{ background: "#59ff91" }}
        aria-label="Wciąż się uczę"
      ></button>
    </div>
  );
}

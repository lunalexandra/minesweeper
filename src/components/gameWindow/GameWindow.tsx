import { useAppSelector } from "../../hooks";
import { Field, HeaderPanel } from "../index";
import "./gameWindow.css";

export const GameWindow = () => {
  const isGameStarted = useAppSelector((state) => state.game.isGameStarted);

  if (!isGameStarted) {
    return null;
  }

  return (
    <div className="game-window">
      <HeaderPanel />
      <Field />
    </div>
  );
};

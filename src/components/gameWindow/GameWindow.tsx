import { useAppSelector } from "../../hooks";
import { Modal } from "../modal/Modal";
import { Field, HeaderPanel } from "../index";
import "./gameWindow.css";

export const GameWindow = () => {
  const {isGameStarted, currentLevel} = useAppSelector((state) => state.game);
  const hasWon = useAppSelector((state) => state.game.hasWon);
  if (!isGameStarted) {
    return null;
  }

  return (
    <>
    <div className={`game-window game-window-${currentLevel}`}>
      <HeaderPanel />
      <Field />
    </div>
    {hasWon ? <Modal/> : null}
    </>
  );
};

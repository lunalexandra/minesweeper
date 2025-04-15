import { SettingsWindow } from "../../components";
import { GameWindow } from "../../components";
import "./gamePage.css";
export const GamePage = () => {
  return (
    <>
      <section className="main">
        <GameWindow />
        <SettingsWindow />
      </section>
    </>
  );
};

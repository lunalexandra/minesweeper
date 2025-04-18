import { useAppDispatch, useAppSelector } from "../../hooks";
import { startGame, setLevel } from "../../redux/slices/gameSlice"; 
import "./settingsWindow.css";

export const SettingsWindow = () => {
  const dispatch = useAppDispatch();
  const isGameStarted = useAppSelector(state => state.game.isGameStarted);
  const currentLevel = useAppSelector(state => state.game.currentLevel);

  const handleSelectLevel = (level:"simple" | "medium" | "hard") => {
    dispatch(setLevel(level));
  };

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const levels: ("simple" | "medium" | "hard")[] = ["simple", "medium", "hard"];

  if (isGameStarted) {
    return null;
  }

  return (
    <>
      <div className="settings">
        <div className="title-wrp">
          <h1 className="game-name">САПЁР 💣</h1>
          <h3 className="settings-title">ВЫБЕРИТЕ УРОВЕНЬ</h3>
        </div>

        <div className="levels">
          {levels.map((level) => (
            <div 
              key={`settings-${level}`} 
              className={`level level-${level} ${currentLevel === level ? 'level-active' : ''}`} 
              onClick={() => handleSelectLevel(level)}
            >
              <p>{level === "simple" ? "Простой" : level === "medium" ? "Средний" : "Сложный"}</p>
            </div>
          ))}
        </div>
        <button type="button" className="play-btn" onClick={handleStartGame}>
          ИГРАТЬ
        </button>
      </div>
    </>
  );
};

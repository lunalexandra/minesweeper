import { useState } from "react";
import { formatTime } from "../../utils/utils";
import "./leader.css";

export const Leaderboard = () => {
  const levels: Array<"simple" | "medium" | "hard"> = [
    "simple",
    "medium",
    "hard",
  ];

  const [selectedLevel, setSelectedLevel] = useState<
    "simple" | "medium" | "hard"
  >("simple");

  const getLeaderboard = (level: "simple" | "medium" | "hard") => {
    const storedData = localStorage.getItem(`leaderboard_${level}`);
    return storedData ? JSON.parse(storedData) : [];
  };

  const leaderboard = getLeaderboard(selectedLevel);

  return (
    <div className="leaderboard-container">
      <h2>Таблица лидеров</h2>
      <div className="level-selector">
        <div className="level-buttons">
          {levels.map((level) => (
            <button
              key={`level-button-${level}`}
              className={`level-button ${
                selectedLevel === level ? "active" : ""
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              {level === "simple"
                ? "Простой"
                : level === "medium"
                ? "Средний"
                : "Сложный"}
            </button>
          ))}
        </div>
        {leaderboard.length > 0 ? (
          <div className="leaderboard-header">
            <div className="column-width header-place">Место</div>
            <div className="column-width header-time">Время</div>
          </div>
        ) : null}

        <div>
          {leaderboard.length > 0 ? (
            leaderboard.map((time: number, index: number) => (
              <div
                key={`leaderboard-${selectedLevel}-${index}`}
                className="leaders-item"
              >
                <div className="column-width">{index + 1}</div>
                <div className="column-width">{formatTime(time)}</div>
              </div>
            ))
          ) : (
            <div>Нет данных</div>
          )}
        </div>
      </div>
    </div>
  );
};

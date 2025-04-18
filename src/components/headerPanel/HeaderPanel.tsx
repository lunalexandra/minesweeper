import { useAppDispatch, useAppSelector } from "../../hooks";
import { endGame, winGame, loseGame } from "../../redux/slices/gameSlice";
import { Timer } from "../timer/Timer";
import { resetField } from "../../redux/slices/fieldSlice";
import "./headerPanel.css";

export const HeaderPanel = () => {
  const dispatch = useAppDispatch();
  const { flags, totalMines } = useAppSelector((state) => state.field);
  const availableFlags = totalMines - flags;
  const handleClick = () => {
    dispatch(winGame(false));
    dispatch(loseGame(false));
    dispatch(resetField());
    dispatch(endGame());
  };

  const HandleReset = () => {
    dispatch(winGame(false));
    dispatch(loseGame(false));
    dispatch(resetField());
  };

  return (
    <>
      <div className="header-panel">
        <div className="screens">
          <div className="available-flags">{availableFlags}</div>
          <div className="timer-box">
            <Timer />
          </div>
        </div>

        <div className="buttons-box">
          <button
            type="button"
            className="header-btn settings-btn"
            onClick={handleClick}
          >
            В настройки
          </button>
          <button
            type="button"
            className="header-btn restart-btn"
            onClick={HandleReset}
          >
            Перезапустить
          </button>
        </div>
      </div>
    </>
  );
};

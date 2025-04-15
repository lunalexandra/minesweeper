import { useAppDispatch } from "../../hooks";
import { endGame, winGame, loseGame } from "../../redux/slices/gameSlice";
import { resetField } from "../../redux/slices/fieldSlice";
import "./headerPanel.css";

export const HeaderPanel = () => {
  const dispatch = useAppDispatch();

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
        <div className="available-flags">100</div>
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

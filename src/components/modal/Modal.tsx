import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { formatTime } from "../../utils/utils";
import { winGame, loseGame } from "../../redux/slices/gameSlice";
import { resetField } from "../../redux/slices/fieldSlice";
import "./modal.css";

export const Modal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const timeElapsed = useAppSelector((state) => state.field.timeElapsed);
  const [isVisible, setVisible] = useState(true);

  if (!isVisible) return null;

  const playAgain = () => {
    setVisible(false);
    dispatch(winGame(false));
    dispatch(loseGame(false));
    dispatch(resetField());
  };

  const toResults = () => {
    playAgain();
    navigate("/leaders");
  };

  return (
    <>
      <div className="modal-wrp">
        <div className="modal">
          <h3>Победа!</h3>
          <p>Ваше время: {formatTime(timeElapsed)}</p>
          <button type="button" onClick={playAgain} className="cross">
            ✖️
          </button>
          <div className="modal-buttons-wrp">
            <button type="button" onClick={playAgain} className="modal-button">
              Играть снова
            </button>
            <button type="button" onClick={toResults} className="modal-button">
              Смотреть результаты
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

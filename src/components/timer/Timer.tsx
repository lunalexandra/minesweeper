import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { formatTime } from "../../utils/utils";
import { incrementTime } from "../../redux/slices/fieldSlice";
import "./timer.css";

export const Timer = () => {
  const dispatch = useAppDispatch();
  const { hasWon, hasLost } = useAppSelector((state) => state.game);
  const { firstClick, timeElapsed } = useAppSelector((state) => state.field);

  useEffect(() => {
    let timer = null;

    if (firstClick && !hasWon && !hasLost) {
      timer = setInterval(() => {
        dispatch(incrementTime());
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [firstClick, dispatch, hasWon, hasLost]);

  return (
    <div className="timer">
      <p>{formatTime(timeElapsed)}</p>
    </div>
  );
};

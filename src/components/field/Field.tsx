import { useEffect } from "react";
import { Cell } from "../cell/Cell";
import { winGame } from "../../redux/slices/gameSlice";
import { saveTimeToLocalStorage } from "../../utils/utils";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { generateField } from "../../redux/slices/fieldSlice";
import "./field.css";

export const Field = () => {
  const currentLevel = useAppSelector((state) => state.game.currentLevel);
  
  const { isGenerated, firstClick, cells, freeCells, timeElapsed } = useAppSelector((state) => state.field);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!firstClick && !isGenerated) {
      dispatch(generateField({ level: currentLevel }));
    }
    if (freeCells <= 0) {
      dispatch(winGame(true));
      saveTimeToLocalStorage(currentLevel, timeElapsed)
      console.log("Победа")
    }

  }, [dispatch, isGenerated, currentLevel, firstClick, freeCells, timeElapsed]);

  return (
    <div className={`field field-${currentLevel}`}>
      {cells.map((cell) => (
        <Cell
          key={cell.index}
          cellIndex={cell.index}
          isMine={cell.isMine}
          isOpen={cell.isOpen}
          isFlag={cell.isFlag}
          isQuestionMark={cell.isQuestionMark}
          adjacentMines={cell.adjacentMines}
        />
      ))}
    </div>
  );
};

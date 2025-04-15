import { useEffect } from "react";
import { Cell } from "../cell/Cell";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { generateField } from "../../redux/slices/fieldSlice";
import "./field.css";

export const Field = () => {
  const currentLevel = useAppSelector((state) => state.game.currentLevel);
  const isGenerated = useAppSelector((state) => state.field.isGenerated);
  const firstClick = useAppSelector((state) => state.field.firstClick);
  const dispatch = useAppDispatch();
  const cells = useAppSelector((state) => state.field.cells);

  useEffect(() => {
    if (!firstClick && !isGenerated) {
      dispatch(generateField({ level: currentLevel }));
    }
  }, [dispatch, isGenerated, currentLevel, firstClick]);

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

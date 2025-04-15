import { useAppDispatch, useAppSelector } from "../../hooks";
import { loseGame } from "../../redux/slices/gameSlice";
import {
  generateField,
  openCell,
  toggleMark,
  addFirstClick,
} from "../../redux/slices/fieldSlice";
import "./cell.css";

interface CellProps {
  cellIndex: number;
  isOpen: boolean;
  isMine: boolean;
  isFlag: boolean;
  isQuestionMark: boolean;
  adjacentMines: number;
}

export const Cell = ({
  cellIndex,
  isOpen,
  isMine,
  isFlag,
  isQuestionMark,
  adjacentMines,
}: CellProps) => {
  const dispatch = useAppDispatch();
  const currentLevel = useAppSelector((state) => state.game.currentLevel);
  const hasWon = useAppSelector((state) => state.game.hasWon);
  const hasLost = useAppSelector((state) => state.game.hasLost);
  const firstClick = useAppSelector((state) => state.field.firstClick);

  const handleClick = () => {
    if (!isOpen && !hasWon && !hasLost) {
      if (!firstClick) {
        dispatch(addFirstClick(cellIndex));
        dispatch(generateField({ level: currentLevel }));
      }
      dispatch(openCell(cellIndex));
    }
    if (isMine) {
      dispatch(loseGame(true));
      console.log("Проигрыш");
    }
  };

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (firstClick && !isOpen && !hasWon && !hasLost) {
      dispatch(toggleMark(cellIndex));
    }
  };

  return (
    <div
      id={`${cellIndex}`}
      className={`cell 
        ${isOpen ? "open" : ""} 
        ${isMine && isOpen ? "mine" : ""} 
        ${isFlag ? "flag" : ""} 
        ${isQuestionMark ? "question-mark" : ""}
        ${adjacentMines > 0 ? `adjacent-mines-${adjacentMines}` : ""}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {isOpen && !isMine && adjacentMines > 0 && adjacentMines}
    </div>
  );
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAdjacentIndices, getLevelConfig } from "../../utils/utils";

interface CellData {
  index: number;
  isMine: boolean;
  isFlag: boolean;
  isOpen: boolean;
  isQuestionMark: boolean;
  adjacentMines: number;
}

interface FieldState {
  cells: CellData[];
  width: number;
  height: number;
  totalMines: number;
  isGenerated: boolean;
  firstClick: boolean;
  firstCellIndex: number | undefined;
  flags: number;
  freeCells: number;
  timeElapsed: number;
}

const initialState: FieldState = {
  cells: [],
  width: 8,
  height: 8,
  totalMines: 10,
  isGenerated: false,
  firstClick: false,
  firstCellIndex: undefined,
  flags: 0,
  freeCells: 64,
  timeElapsed: 0,
};

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    resetField(state) {
      state.cells = [];
      state.isGenerated = false;
      state.firstClick = false;
      state.firstCellIndex = undefined;
      state.flags = 0;
      state.timeElapsed = 0;
      state.freeCells = state.width * state.height;
    },

    generateField(
      state,
      action: PayloadAction<{
        level: "simple" | "medium" | "hard";
      }>
    ) {
      const { level } = action.payload;
      const config = getLevelConfig(level);
      const { width, height, mines } = config;
      const totalCells = width * height;
      state.width = width;
      state.height = height;
      state.freeCells = state.width * state.height;
      state.totalMines = mines;

      const minePositions = new Set<number>();

      if (state.firstClick && state.firstCellIndex !== undefined) {
        while (minePositions.size < mines) {
          const pos = Math.floor(Math.random() * totalCells);
          if (pos !== state.firstCellIndex) {
            minePositions.add(pos);
          }
        }
      }
      state.cells = Array.from({ length: totalCells }, (_, index) => {
        const isMine = minePositions.has(index);
        return {
          index,
          isMine,
          isFlag: false,
          isOpen: false,
          isQuestionMark: false,
          adjacentMines: 0,
        };
      });

      for (let i = 0; i < state.cells.length; i++) {
        const cell = state.cells[i];
        if (!cell.isMine) {
          const neighbors = getAdjacentIndices(cell.index, width, height);
          const count = neighbors.filter((idx) =>
            minePositions.has(idx)
          ).length;
          cell.adjacentMines = count;
        }
      }
      console.log(state.isGenerated);
      state.isGenerated = true;
    },
    addFirstClick(state, action: PayloadAction<number>) {
      state.firstClick = true;
      state.firstCellIndex = action.payload;
    },
    openCell(state, action: PayloadAction<{index:number, forceOpen?: boolean }>) {
      const { index, forceOpen } = action.payload;
      const revealCell = (i: number) => {
        const cell = state.cells[i];
        if (!cell || cell.isOpen || (!forceOpen && cell.isFlag)) return;

        cell.isOpen = true;
        cell.isFlag = false;
        cell.isQuestionMark = false;
        if (!cell.isMine && cell.adjacentMines === 0) {
          const neighbors = getAdjacentIndices(i, state.width, state.height);
          neighbors.forEach(revealCell);
        }
      };

      revealCell(index);
      state.freeCells =
        state.cells.length -
        state.cells.filter((item) => item.isOpen).length -
        state.flags;
      console.log(state.freeCells);
    },

    toggleMark(state, action: PayloadAction<number>) {
      const index = action.payload;
      const cell = state.cells[index];
      const availableFlsgs = state.totalMines - state.flags;
      if (cell && !cell.isOpen) {
        if (!cell.isFlag && !cell.isQuestionMark && availableFlsgs > 0) {
          cell.isFlag = true;
          state.flags++;
          //console.log(`добавили флажок ${state.flags}`);
        } else if (cell.isFlag && !cell.isQuestionMark) {
          cell.isQuestionMark = true;
          cell.isFlag = false;
          state.flags--;
          //console.log(`убрали флажок ${state.flags}`);
        } else if (cell.isQuestionMark) {
          cell.isQuestionMark = false;
        } else if (availableFlsgs === 0 && !cell.isQuestionMark) {
          cell.isQuestionMark = true;
        }
      }
      state.freeCells =
        state.cells.length -
        state.cells.filter((item) => item.isOpen).length -
        state.flags;
      console.log(state.freeCells);
    },
    incrementTime(state) {
      state.timeElapsed += 1;
    },
  },
});

export const {
  generateField,
  resetField,
  openCell,
  toggleMark,
  addFirstClick,
  incrementTime,
} = fieldSlice.actions;

export default fieldSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  isGameStarted: boolean;
  currentLevel: "simple" | "medium" | "hard";
  hasWon: boolean;
  hasLost: boolean;
}

const initialState: GameState = {
  isGameStarted: false,
  currentLevel: "simple",
  hasWon: false,
  hasLost: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.isGameStarted = true;
      state.hasWon = false;
      state.hasLost = false;
    },
    endGame(state) {
      state.isGameStarted = false;
    },
    setLevel(state, action: PayloadAction<"simple" | "medium" | "hard">) {
      state.currentLevel = action.payload;
    },
    winGame(state, action: PayloadAction<boolean>) {
      state.hasWon = action.payload
    },
    loseGame(state, action: PayloadAction<boolean>) {
      state.hasLost = action.payload
    },
  },
});

export const { startGame, endGame, setLevel, loseGame, winGame } = gameSlice.actions;

export const selectGameState = (state: { game: GameState }) => state.game;

export default gameSlice.reducer;
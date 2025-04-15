import { configureStore } from "@reduxjs/toolkit";
import  gameReducer  from "../slices/gameSlice";
import  fieldReducer  from "../slices/fieldSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    field: fieldReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
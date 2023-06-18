import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LayoutState {
  isDark: boolean;
}

const initialState: LayoutState = {
  isDark: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setAppTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
  },
});

export const { setAppTheme } = layoutSlice.actions;

export default layoutSlice.reducer;

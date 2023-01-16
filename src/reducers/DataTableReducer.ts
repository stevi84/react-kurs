import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

export const dataTableInitialState = {
  visible: true,
};

const dataTableSlice = createSlice({
  name: 'dataTable',
  initialState: dataTableInitialState,
  reducers: {
    setDataTableVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
  },
});

const { actions, reducer } = dataTableSlice;
export const { setDataTableVisible } = actions;
export { reducer as dataTableReducer };

export const dataTableVisibleSelector = (state: RootState): boolean => state.dataTable.visible;

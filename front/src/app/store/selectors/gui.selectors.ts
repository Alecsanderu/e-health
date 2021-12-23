import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromGui from '../reducers/gui.reducer';

export const selectGuiState = createFeatureSelector<fromGui.GuiState>(
  fromGui.guiFeatureKey
);


export const toastErrors = createSelector(
  selectGuiState,
  (state) => state.toastError
);

export const toastSuccess = createSelector(
  selectGuiState,
  (state) => state.toastSuccess
);

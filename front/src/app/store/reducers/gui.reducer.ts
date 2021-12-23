import {createReducer, on} from '@ngrx/store';
import * as GuiActions from '../actions/gui.actions';
import {Message} from 'primeng/api';

export const guiFeatureKey = 'gui';

export interface GuiState {

  toastError: Message | null;
  toastSuccess: Message | null;

}

export const initialState: GuiState = {
  toastError: null,
  toastSuccess: null
};


export const reducer = createReducer(
  initialState,

  on(GuiActions.displayToastError, (state, {body, title}) => ({
    ...state,
    toastError: {
      severity: 'error',
      summary: title,
      detail: body
    }
  })),
  on(GuiActions.displayToastSuccess, (state, {body, title}) => ({
    ...state,
    toastSuccess: {
      severity: 'success',
      summary: title,
      detail: body
    }
  })),

  on(GuiActions.clearToastMessage, (state) => ({
    toastError: null,
    toastSuccess:  null
  })),
);


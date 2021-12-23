import {createAction, props} from '@ngrx/store';

export const displayToastError = createAction(
  '[Gui] Display toast error',
  props<{ title: string; body: string }>()
);

export const displayToastSuccess = createAction(
  '[Gui] Display toast success',
  props<{ title: string; body: string }>()
);


export const clearToastMessage = createAction(
  '[Gui] Clear Toast Message',
);

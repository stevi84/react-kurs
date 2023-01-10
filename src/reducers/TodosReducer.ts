import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMessage } from '../globals/Translations';
import { Todo } from '../models/Todo';
import * as todoApi from '../apis/TodoApi';
import { AppThunk, RootState } from './Store';
import { decreaseReads, decreaseSubmits, increaseReads, increaseSubmits } from './ApiCallsReducer';
import { enqueueSnackbar } from './SnackbarsReducer';

export const todosInitialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    createTodo(state, action: PayloadAction<Todo>) {
      return state.concat(action.payload);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      return state.map((todo) => (todo.id !== action.payload.id ? todo : action.payload));
    },
  },
});

const { actions, reducer } = todosSlice;
export const { setTodos, createTodo, updateTodo } = actions;
export { reducer as todosReducer };

export const todosSelector = (state: RootState): Todo[] => state.todos;

export const createTodoThunk =
  (todo: Todo): AppThunk<Promise<Todo>> =>
    async (dispatch) => {
      dispatch(increaseSubmits());
      try {
        const response = await todoApi.createTodo(todo);
        dispatch(createTodo(response.data));
        dispatch(
          enqueueSnackbar(createMessage('create', 'todo', true), { variant: 'success', autoHideDuration: 2000 }),
        );
        return response.data;
      } catch (error) {
        dispatch(enqueueSnackbar(createMessage('create', 'todo', false), { variant: 'error', autoHideDuration: null }));
        throw error;
      } finally {
        dispatch(decreaseSubmits());
      }
    };

export const readTodosThunk = (): AppThunk<Promise<Todo[]>> => async (dispatch) => {
  dispatch(increaseReads());
  try {
    const response = await todoApi.readTodos();
    dispatch(setTodos(response.data));
    return response.data;
  } catch (error) {
    dispatch(enqueueSnackbar(createMessage('read', 'todo', false), { variant: 'error', autoHideDuration: null }));
    throw error;
  } finally {
    dispatch(decreaseReads());
  }
};

export const updateTodoThunk =
  (todo: Partial<Todo>): AppThunk<Promise<Todo>> =>
    async (dispatch) => {
      dispatch(increaseSubmits());
      try {
        const response = await todoApi.updateTodo(todo);
        dispatch(updateTodo(response.data));
        dispatch(
          enqueueSnackbar(createMessage('update', 'todo', true), { variant: 'success', autoHideDuration: 2000 }),
        );
        return response.data;
      } catch (error) {
        dispatch(enqueueSnackbar(createMessage('update', 'todo', false), { variant: 'error', autoHideDuration: null }));
        throw error;
      } finally {
        dispatch(decreaseSubmits());
      }
    };

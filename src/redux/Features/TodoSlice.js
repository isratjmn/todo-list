import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	todos: [],
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push({ ...action.payload, isCompleted: false });
		},
		removeTodo: (state, action) => {
			state.todos = state.todos.filter(
				(item) => item.id !== action.payload
			);
		},
		toggleComplete: (state, action) => {
			const task = state.todos.find((item) => item.id === action.payload);
			task.isCompleted = !task.isCompleted;
		},
	},
});

export const { addTodo, removeTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;

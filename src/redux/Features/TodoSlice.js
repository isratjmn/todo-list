import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TodoSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
	tagTypes: ["Todos"],
	endpoints: (builder) => ({
		/* getTodos: builder.query({
			query: () => "/todos",
			transformResponse: (res) => res.sort((a, b) => b.id - a.id),
			providesTags: ["Todos"],
		}), */
		getTodos: builder.query({
			query: (priority) => ({
				url: `/todos?priority=${priority}`,
			}),
			transformResponse: (res) => res.sort((a, b) => b.id - a.id),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Todos", id })),
							"Todos",
					]
					: ["Todos"],
		}),

		addTodo: builder.mutation({
			query: (todo) => ({
				url: "/todos",
				method: "POST",
				body: todo,
			}),
			invalidatesTags: ["Todos"],
		}),
		updateTodo: builder.mutation({
			query: (todo) => ({
				url: `/todos/${todo.id}`,
				method: "PATCH",
				body: todo,
			}),
			invalidatesTags: ["Todos"],
		}),
		deleteTodo: builder.mutation({
			query: ({ id }) => ({
				url: `/todos/${id}`,
				method: "DELETE",
				body: id,
			}),
			invalidatesTags: ["Todos"],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = TodoSlice;

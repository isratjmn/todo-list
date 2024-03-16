/* eslint-disable react/jsx-key */
import { List, Input, Button, Typography, Space, Spin, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
	useGetTodosQuery,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
	useAddTodoMutation,
} from "../redux/Features/TodoSlice";

const { Text } = Typography;
const { TextArea } = Input;

const TaskList = () => {
	const [newTodo, setNewTodo] = useState("");

	const {
		data: todos,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetTodosQuery();
	const [addTodo] = useAddTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newTodo.trim()) {
			message.error("Please enter a todo item");
			return;
		}
		addTodo({ userId: 1, title: newTodo, completed: false });
		setNewTodo("");
	};

	const handleUpdateTodo = (id) => {
		const todoToUpdate = todos.find((todo) => todo.id === id);
		const updatedTodo = { ...todoToUpdate, title: "Updated Title" };

		updateTodo(updatedTodo);
	};

	const newItemSection = (
		<form onSubmit={handleSubmit}>
			<Space>
				<TextArea
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					placeholder="Enter new todo"
					autoSize={{ minRows: 1, maxRows: 3 }}
				/>
				<Button type="primary" htmlType="submit">
					<FontAwesomeIcon icon={faUpload} />
				</Button>
			</Space>
		</form>
	);

	let content;
	if (isLoading) {
		content = <Spin />;
	} else if (isSuccess) {
		content = (
			<List
				dataSource={todos}
				renderItem={(todo) => (
					<List.Item
						actions={[
							<Button
								type="text"
								danger
								onClick={() => deleteTodo({ id: todo.id })}
							>
								<FontAwesomeIcon
									icon={faTrash}
									style={{
										fontSize: "20px",
										border: "1px solid red",
										padding: "10px",
										borderRadius: "10%",
									}}
								/>
							</Button>,
							<Button
								type="text"
								onClick={() => handleUpdateTodo(todo.id)}
							>
								<FontAwesomeIcon
									icon={faUpload}
									style={{
										fontSize: "20px",
										border: "1px solid blue",
										padding: "10px",
										borderRadius: "10%",
									}}
								/>
							</Button>,
						]}
					>
						<Text strong>{todo.title}</Text>
					</List.Item>
				)}
			/>
		);
	} else if (isError) {
		content = <Text type="danger">{error}</Text>;
	}

	return (
		<main>
			<Typography.Title style={{ fontWeight: 800 }} level={2} strong>
				Todo List
			</Typography.Title>
			{newItemSection}
			{content}
		</main>
	);
};

export default TaskList;

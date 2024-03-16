/* eslint-disable react/prop-types */
import { Button, Checkbox } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} from "../redux/Features/TodoSlice";

const TodoCards = ({ title, id, isCompleted, priority }) => {
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();

	const toggleState = () => {
		const options = {
			id: id,
			data: {
				title,
				priority,
				isCompleted: !isCompleted,
			},
		};
		updateTodo(options);
	};

	const handleDelete = () => {
		deleteTodo({ id });
	};

	return (
		<div className="bg-white rounded-md flex justify-between items-center p-3 border-2">
			<Checkbox checked={isCompleted} onChange={toggleState} />
			<p className="font-bold flex-1">{title}</p>
			<div
				className={`size-3 rounded-full ${
					priority === "high" ? "bg-red-500" : ""
				} ${priority === "medium" ? "bg-yellow-500" : ""} ${
					priority === "low" ? "bg-green-500" : ""
				}`}
			></div>
			<p>{priority}</p>
			<div className="flex-1">
				{isCompleted ? (
					<p className="text-green-500 font-semibold">Done</p>
				) : (
					<p className="text-red-500 font-semibold">Pending</p>
				)}
			</div>
			<div className="space-x-6">
				<Button
					onClick={handleDelete}
					style={{ fontSize: 20, color: "#000" }}
					type="danger"
					icon={<DeleteOutlined />}
				/>
				<Button type="primary" icon={<EditOutlined />} />
			</div>
		</div>
	);
};

export default TodoCards;

import { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import AddTodoModal from "./AddTodoModal";
import TodoFilter from "./TodoFilter";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
	useGetTodosQuery,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} from "../redux/Features/TodoSlice";
import { Spin, Layout, Row, Col, Table } from "antd";
const { Content } = Layout;
const { Option } = Select;

const TodoContainer = () => {
	const [priority, setPriority] = useState("");
	const { data: todos, isLoading } = useGetTodosQuery(priority);
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [form] = Form.useForm();
	if (isLoading) {
		return <Spin />;
	}

	const handleDelete = (id) => {
		deleteTodo({ id });
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			const updatedTodo = {
				id: todos[0]?.id,
				...values,
			};
			await updateTodo(updatedTodo);
			setIsModalVisible(false);
			form.resetFields();
		} catch (error) {
			console.error("Error:", error);
		}
	};
	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			width: "40%",
		},
		{
			title: "Priority",
			dataIndex: "priority",
			key: "priority",
		},
		{
			title: "Status",
			dataIndex: "isCompleted",
			key: "isCompleted",
			render: (isCompleted) => (
				<span
					className={
						isCompleted
							? "text-green-500 font-semibold"
							: "text-red-500 font-semibold"
					}
				>
					{isCompleted ? "Done" : "Pending"}
				</span>
			),
		},
		{
			title: "Actions",
			key: "actions",
			render: (text, record) => (
				<div className="flex space-x-6">
					<Row gutter={[32, 32]} style={{ marginRight: "20px" }}>
						<Button
							onClick={() => handleDelete(record.id)}
							style={{
								fontSize: 20,
								padding: "14px",
								marginRight: "10px",
								color: "#fff",
								backgroundColor: "red",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
							type="danger"
							icon={<DeleteOutlined />}
						/>

						<Button
							onClick={showModal}
							style={{
								fontSize: 20,
								padding: "14px",
								color: "#fff",
								backgroundColor: "blue",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
							type="primary"
							icon={<EditOutlined />}
						/>
					</Row>

					<Modal
						title="Update Todo"
						open={isModalVisible}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<Form
							form={form}
							layout="vertical"
							name="update_todo_form"
						>
							<Form.Item
								label="Title"
								name="title"
								initialValue={record?.title}
								rules={[
									{
										required: true,
										message: "Please input the title!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label="Priority"
								name="priority"
								initialValue={record?.priority}
								rules={[
									{
										required: true,
										message: "Please select the priority!",
									},
								]}
							>
								<Select>
									<Option value="Low">Low</Option>
									<Option value="Medium">Medium</Option>
									<Option value="High">High</Option>
								</Select>
							</Form.Item>
						</Form>
					</Modal>
				</div>
			),
		},
	];

	return (
		<Content style={{ padding: "10px" }}>
			<Row gutter={[64, 64]} style={{ marginBottom: "20px" }}>
				<Col span={12}>
					<AddTodoModal />
				</Col>
				<Col span={12}>
					<TodoFilter priority={priority} setPriority={setPriority} />
				</Col>
			</Row>
			<Table size="middle" dataSource={todos} columns={columns} />
		</Content>
	);
};

export default TodoContainer;

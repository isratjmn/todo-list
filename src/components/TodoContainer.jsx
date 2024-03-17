import { useState } from "react";
import { Button, Modal, Form, Input, Select, Tag } from "antd";
import AddTodoModal from "./AddTodoModal";
import TodoFilter from "./TodoFilter";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
	useGetTodosQuery,
	useUpdateTodoMutation,
	useAddTodoMutation,
	useDeleteTodoMutation,
} from "../redux/Features/TodoSlice";
import { Spin, Layout, Row, Col, Table } from "antd";

const { Content } = Layout;
const { Option } = Select;

const TodoContainer = () => {
	const [priority, setPriority] = useState("");
	const [addTodo] = useAddTodoMutation();
	const {
		data: todos,
		isLoading,
		refetch: refetchTodos,
	} = useGetTodosQuery(priority);
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedTodoId, setSelectedTodoId] = useState(null);
	const [form] = Form.useForm();

	if (isLoading) {
		return <Spin />;
	}

	const handleDelete = (id) => {
		Modal.confirm({
			title: "Confirm",
			content: "Are you sure you want to delete this Todo?",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				deleteTodo({ id });
			},
		});
	};

	const showModal = (id) => {
		setSelectedTodoId(id);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			const updatedTodo = {
				id: selectedTodoId,
				...values,
			};
			await updateTodo(updatedTodo);
			setIsModalVisible(false);
			form.resetFields();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleAddTodo = async (values) => {
		try {
			values.id = Number(values.id);
			values.isCompleted = false;
			await addTodo(values);
			setIsModalVisible(false);
			form.resetFields();
			await refetchTodos();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleStatusToggle = async (record) => {
		try {
			const updatedTodo = {
				...record,
				isCompleted: !record.isCompleted,
			};
			await updateTodo(updatedTodo);
			await refetchTodos();
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			width: 400,
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

			render: (isCompleted, record) => (
				<Tag
					onClick={() => handleStatusToggle(record)}
					color={isCompleted ? "success" : "error"}
				>
					{isCompleted ? "Complete" : "Pending"}
				</Tag>
			),
		},
		{
			title: "Actions",
			key: "actions",
			render: (text, record) => (
				<div className="flex space-x-6 space-y-6">
					<Row gutter={[8, 8]} style={{ marginRight: "10px" }}>
						{record.isCompleted && (
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
						)}
						<div style={{ width: "5px" }} />
						<Button
							onClick={() => showModal(record.id)}
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
						visible={isModalVisible}
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
		<Content>
			<Row gutter={[64, 64]} style={{ marginBottom: "20px" }}>
				<Col span={12}>
					<AddTodoModal onAddTodo={handleAddTodo} />
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

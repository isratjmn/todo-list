import { useState } from "react";
import { Button, Input, Modal, Select, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAddTodoMutation } from "../redux/Features/TodoSlice";

const { Option } = Select;

const AddTodoModal = () => {
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();
	const [addTodo, { isLoading }] = useAddTodoMutation();

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const onFinish = async (values) => {
		try {
			await addTodo({
				title: values.task,
				priority: values.priority,
			});
			form.resetFields();
			setVisible(false);
		} catch (error) {
			console.error("Error adding todo:", error);
		}
	};

	return (
		<>
			<Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
				Add Todo
			</Button>
			<Modal
				title="Add Task"
				open={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					form={form}
					layout="vertical"
					name="addTodoForm"
					onFinish={onFinish}
				>
					<Form.Item
						label="Task"
						name="task"
						rules={[
							{ required: true, message: "Please enter a task" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Priority"
						name="priority"
						rules={[
							{
								required: true,
								message: "Please select a priority",
							},
						]}
					>
						<Select placeholder="Select priority">
							<Option value="high">High</Option>
							<Option value="medium">Medium</Option>
							<Option value="low">Low</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							loading={isLoading}
							htmlType="submit"
						>
							Add Todo
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AddTodoModal;

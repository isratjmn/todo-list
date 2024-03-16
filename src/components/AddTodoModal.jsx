import { useState } from "react";
import { Button, Input, Modal, Select, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const AddTodoModal = () => {
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const onFinish = (values) => {
		console.log("Received values:", values);
		setVisible(false);
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
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>
					{/* <Form.Item
						label="Description"
						name="description"
						rules={[{ required: true }]}
					>
						<Input.TextArea />
					</Form.Item> */}
					<Form.Item
						label="Priority"
						name="priority"
						rules={[{ required: true }]}
					>
						<Select placeholder="Select priority">
							<Option value="high">High</Option>
							<Option value="medium">Medium</Option>
							<Option value="low">Low</Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Save changes
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AddTodoModal;

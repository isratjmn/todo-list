/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Dropdown, Menu, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useGetTodosQuery } from "../redux/Features/TodoSlice";

const TodoFilter = ({ setPriority }) => {
	const [selectedPriority, setSelectedPriority] = useState(null);

	const handleMenuClick = ({ key }) => {
		setSelectedPriority(key);
		setPriority(key);
	};

	const { isLoading } = useGetTodosQuery(selectedPriority);

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="high">High</Menu.Item>
			<Menu.Item key="medium">Medium</Menu.Item>
			<Menu.Item key="low">Low</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown overlay={menu} trigger={["click"]}>
			<Button className="text-xl font-bold bg-primary-gradient">
				{isLoading ? (
					<Spin size="medium" />
				) : (
					<>
						Filter <DownOutlined />
					</>
				)}
			</Button>
		</Dropdown>
	);
};

export default TodoFilter;






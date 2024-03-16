/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const TodoFilter = ({ priority, setPriority }) => {
	const handleMenuClick = (e) => {
		setPriority(e.key);
	};

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
				Filter <DownOutlined />
			</Button>
		</Dropdown>
	);
};

export default TodoFilter;

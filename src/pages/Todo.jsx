import { Layout, Typography, Row, Col } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const Todo = () => {
	return (
		<Layout>
			<Content>
				<Row justify="center">
					<Col span={24}>
						<Title className="text-center mt-10" level={2}>
							Todos List
						</Title>
					</Col>
				</Row>
				<Row justify="center">
					<Col span={24}>
						<TodoContainer />
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

export default Todo;

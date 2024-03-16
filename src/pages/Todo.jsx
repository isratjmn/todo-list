
import TodoContainer from "../components/TodoContainer";
import { Layout } from "antd";
const { Content } = Layout;

const Todo = () => {
	return (
		<Layout>
			<Content style={{ padding: "20px" }}>
				<TodoContainer width="80%"  />
			</Content>
		</Layout>
	);
};

export default Todo;

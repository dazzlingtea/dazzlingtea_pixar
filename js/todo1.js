import { loadTodoList } from "./localStorage.js";
import { addTodoToList } from "./todo.js";

const select = () => {
	let todoList = loadTodoList();
	todoList.forEach(element => {
		addTodoToList(element);
	});
}

export default select;
import { renderRepeatToCalendarView, renderTodoListBox } from "./dashboard.js";
import * as util from "./date_utils.js"
import { saveTodoList, loadTodoList } from "./localStorage.js";

let dateNow = new Date();
const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth() + 1;
const todayDate = dateNow.getDate();
const todayDay = dateNow.getDay();

const colors = () => {
	let r = Math.floor((Math.random() * (256 - 170)) + 170);
	let g = Math.floor((Math.random() * (256 - 170)) + 170);
	let b = Math.floor((Math.random() * (256 - 170)) + 170);
	while (Math.abs(r - g) < 10) g = Math.floor((Math.random() * (256 - 170)) + 170);
	while (Math.abs(g - b) < 10) b = Math.floor((Math.random() * (256 - 170)) + 170);
	return `rgb(${r}, ${g}, ${b})`;
}

const insert = (obj) => {
	let todoList = loadTodoList();
	const time = obj.time !== "기한 없음" ? util.getDateInfoFromText(obj.time) : {
		year: todayYear,
		month: todayMonth,
		date: todayDate,
		day: todayDay,
	};
	todoList.push({
		id: todoList.length + 1,
		title: obj.title,
		time,
		repeat : obj.repeat,
		done: false,
		color: colors(),
	});
	saveTodoList(todoList);
	renderRepeatToCalendarView(todoList);
	if (window.location.pathname === "/index.html" || window.location.pathname === "/Calendar/") {
		renderTodoListBox(document.querySelector(`.weekly .date-container [data-date-idx="${time.date}"]`));
	}
}

export { insert };
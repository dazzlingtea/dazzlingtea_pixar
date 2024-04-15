import modalEvent from "./modal.js";
import getheaderToday from "./header.js";
import calenderEvent from "./app_cal.js";
import { dashboardEvent } from "./dashboard.js";
import { loadTodoList, saveTodoList } from "./localStorage.js";
import { toDoList } from "./data.js";
import { todoEvent } from "./todo.js";
import select from "./todo1.js";
if (loadTodoList().length === 0) {
	saveTodoList(toDoList);
}

modalEvent();
getheaderToday();
const root = window.location.hostname === "127.0.0.1" ? "" : "/Calendar";
if (window.location.pathname === root + "/" || window.location.pathname === root + "/index.html") dashboardEvent();
if (window.location.pathname === root + "/html/calendar.html") calenderEvent();
if (window.location.pathname === root + "/html/todo.html") {
	select();
	todoEvent();
}
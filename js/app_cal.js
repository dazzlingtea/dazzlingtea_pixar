import { goToMonth, renderWeeklyView, renderCalendarView } from "./calendar.js";
import {
	getSelectedDate,
	setReccurrenceOption,
	renderRepeatToCalendarView,
} from "./calendar_todo.js";
import { saveTodoList, loadTodoList } from "./localStorage.js";

// 현재 기준 날짜 및 시간
let dateNow = new Date();

const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth();
const todayDate = dateNow.getDate();

//===== 함수 실행 영역 =====//
const calenderEvent = () => {

	let todoList = loadTodoList();
	// 초기화면: 오늘 기준 calendar 렌더
	renderCalendarView(todayYear, todayMonth, document.querySelector('#main-content .calendar'));
	// 초기화면: 이벤트 없이 weekly 렌더
	renderWeeklyView();
	renderRepeatToCalendarView(todoList);

	// 이전 달 버튼 클릭 이벤트 핸들러
	document.querySelector(".go-prev")?.parentElement.addEventListener("click", e => {
		goToMonth(-1, e.target.closest('#main-content section.calendar')); // 방향을 -1로 설정하여 이전 달로 이동
		renderRepeatToCalendarView(todoList);
	});

	// 다음 달 버튼 클릭 이벤트 핸들러
	document.querySelector(".go-next")?.parentElement.addEventListener("click", e => {
		goToMonth(1, e.target.closest('#main-content section.calendar')); // 방향을 1로 설정하여 다음 달로 이동
		renderRepeatToCalendarView(todoList);
	});
	// 오늘 버튼 클릭 이벤트 핸들러
	document.querySelector(".go-today")?.parentElement.addEventListener("click", e => {
		renderCalendarView(todayYear, todayMonth, e.target.closest('.calendar'));
		renderRepeatToCalendarView(todoList);
	});

	// 선택한 날짜에 따라 weekly 구현하는 함수
	document.querySelector(".date-container").addEventListener("click", e => {
		renderWeeklyView(e);
	});

	//===== 모달, 드롭다운 =====//

	document.querySelector(".dropdown .date-container").addEventListener("click", (e) => {
		console.log("드롭다운 날짜 선택");
		getSelectedDate(e);
	});

	// 테스트를 위해 html script에서 가져왔습니다. 병합 시 주의!
	const $selectRepeat = document.querySelector(".select-repeat");
	const $contentRepeat = document.querySelector(".content-repeat");
	$selectRepeat.addEventListener("click", (e) => {
		e.stopPropagation();
		e.preventDefault();
		$contentRepeat.classList.add("show");
	});
	$contentRepeat.addEventListener("click", (e) => {
		// e.target 드롭다운 반복 옵션 반환 (0, 1, 2, 3)
		console.log('드롭다운 반복 선택');
		setReccurrenceOption(e.target);
	});
	// 투두리스트 추가 수정 삭제 마다 render 해야 함
	// renderRepeatToCalendarView(todoList);
}

export default calenderEvent;

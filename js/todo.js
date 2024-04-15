import { renderCalendarView } from "./dashboard.js";
import { days } from "./date_utils.js";

let dateNow = new Date();
const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth();
const todayDate = dateNow.getDate();
const todayDay = dateNow.getDay();

const $modalOverlay = document.querySelector('.modal-overlay');
//========================체크 여부에 따라 수정, 삭제 이벤트======================
function checkCheckbox() {
	// 모든 체크박스 요소 가져옴
	const $checkboxes = document.querySelectorAll(".inputEl");

	// 체크된 체크박스 카운팅용 변수

	//=======================두개이상 체크시 수정버튼 비활성화=====================

	// 체크박스가 하나라도 체크됐는지 확인
	let isChecked = false;
	$checkboxes.forEach(function (checkbox) {
		if (checkbox.checked) {
			isChecked = true;
		}
	});

	// 위 조건이 해당할 경우.
	// 수정 및 삭제 버튼에 클래스를 추가해서 스타일 변경
	const $fixBtns = document.querySelectorAll(".btn_box");
	$fixBtns.forEach(function (fixBtn) {
		if (isChecked) {
			fixBtn.classList.remove("color");
			// 수정 및 삭제 버튼 클릭 이벤트 핸들러 추가
			if (fixBtn.textContent === "삭제") {
				fixBtn.addEventListener("click", handleDeleteButtonClick);
			} else if (fixBtn.textContent === "수정") {
				fixBtn.addEventListener("click", handleFixButtonClick);
			}
		} else {
			fixBtn.classList.add("color");
			// 수정 및 삭제 버튼 클릭 이벤트 핸들러 삭제
			fixBtn.removeEventListener("click", handleDeleteButtonClick);
			fixBtn.removeEventListener("click", handleFixButtonClick);
		}
	});
}

// =================================수정 기능

function handleFixButtonClick(event) {
	// 수정 버튼 클릭시에 이벤트 작성
	const $checkboxes = document.querySelectorAll(".inputEl:checked");
	const checkedCount = $checkboxes.length;
	const $fixBtns = document.querySelectorAll(".btn_box");
	$fixBtns.forEach(($fixBtn) => {
		$fixBtn.classList.add("color");
	});
	// 체크된 체크박스가 2개 이상인 경우 alert 출력
	if (checkedCount !== 1) {
		alert("한 가지만 선택해주세요.");
		$checkboxes.forEach(function (checkbox) {
			checkbox.checked = false;
		});
		return;
	}
	$modalOverlay.classList.remove("hidden");
	console.log("수정버튼클릭");

	// 체크된 체크박스가 하나인 경우 해당 항목의 내용을 가져와 모달 내용에 채움
	const todoText = $checkboxes[0]
		.closest(".todoLi")
		.querySelector(".todo_text").textContent;
	const $textarea = document.querySelector(".txt-field");
	$textarea.value = todoText;

	// 모달을 띄움
	$modalOverlay.classList.remove("hidden");
}

// ==================================삭제 기능
function handleDeleteButtonClick(event) {
	// 삭제 버튼 클릭시에 이벤트 작성
	console.log("dasd");
	// 체크된 체크박스 가져옴
	const $checkboxes = document.querySelectorAll(".inputEl:checked");

	const userConfirm = window.confirm("정말 삭제하시겠습니까?");
	// 각 체크된 요소에 대해 부모 li 요소를 찾아 삭제
	$checkboxes.forEach(function (checkbox) {
		if (userConfirm) {
			const listItem = checkbox.closest(".todoLi");
			listItem.parentNode.removeChild(listItem);
		}
		// 모든 할 일 목록을 삭제했는지 확인하고, none 추가.
		//******************************이거 왜 안댐?********************/
		// const noneDiv = document.getElementById("none");
		const todoList = document.getElementById("List");
		// if (todoList.childElementCount === 0) {
		//   noneDiv.style.display = "none";
		// } else {
		//   noneDiv.style.display = "";
		// }
	});

	// 체크박스 상태 업데이트
	checkCheckbox();

	console.log("삭제버튼클릭");
}

const todoEvent = () => {
	// 이벤트 핸들러
	window.onload = function () {
		// 페이지가 로드될 때마다 체크박스 상태 확인
		checkCheckbox();

		const $checkboxes = document.querySelectorAll(".inputEl");
		$checkboxes.forEach(function (checkbox) {
			checkbox.addEventListener("change", checkCheckbox);
		});
	};

	//===================할 일을 추가하세요 (모달로 이동)====================
	const submitBtn = document.querySelector(".submit_btn");
	const inputField = document.querySelector("input[type='text']"); // 입력칸
	submitBtn.addEventListener("click", (event) => {
		// document.getElementById("checkbox").checked = false;
		const checkedCheckbox = [...document.querySelectorAll(".inputEl:checked")];
		checkedCheckbox.forEach((checkbox) => {
			checkbox.checked = false;
		});
		const $fixBtns = document.querySelectorAll(".btn_box");
		$fixBtns.forEach(($fixBtn) => {
			$fixBtn.classList.add("color");
		});

		event.preventDefault(); // 기본 동작 방지
		$modalOverlay.classList.remove("hidden"); // 모달 띄우기
		const inputText = inputField.value; // <input> 요소의 내용 복사
		const textarea = document.querySelector(".txt-field");
		textarea.value = inputText; // <textarea> 요소에 붙여넣기
		renderCalendarView(todayYear, todayMonth, document.querySelector(".dropdown .content-calendar"));
	});

	// Enter 키 입력할 때도 동일한 효과
	inputField.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			event.preventDefault(); // 기본 동작 방지
			submitBtn.click();
			// 체크박스 풀어
		}
	});

	//================모달에서 저장버튼 클릭시===============
	// 저장 버튼 클릭 이벤트 처리
	const saveButton = document.querySelector(".save");
	saveButton.addEventListener("click", function (event) {
		event.preventDefault(); // 기본 동작 방지

		// 할 일 입력란의 내용 가져오기
		const $form = document.querySelector(".todo-save");
		const inputText = $form.querySelector(".txt-field").value;
		const checkedCheckbox = document.querySelector(".inputEl:checked");
		let date = $form.querySelector(".time-btn").textContent;
		date = date === "기한 없음" ? `${todayYear}. ${todayMonth + 1}. ${todayDate}. ${days[todayDay]}` : date;
		if (checkedCheckbox) {
			// 체크된 체크박스가 있는 경우에만 실행
			const todoTextElement = checkedCheckbox
				.closest(".todoLi")
				.querySelector(".todo_text");
			todoTextElement.textContent = inputText; // 텍스트 업데이트

			// 모달 닫기

			$modalOverlay.classList.add("hidden");

			// 입력란의 내용을 지우기
			clearInputField();
		} else {
			// 체크된 체크박스가 없는 경우는 새로운 할 일 항목을 추가
			addTodoToList({ title: inputText, date });
			$modalOverlay.classList.add("hidden");
			// 입력란의 내용을 지우기
			clearInputField();
		}
	});

	function clearInputField() {
		const inputField = document.querySelector("input[type='text']");
		inputField.value = ""; // 입력란 내용 지우기
	}
	// =============모달에서 저장버튼 클릭시============
	saveButton.addEventListener("click", function (event) {
		event.preventDefault(); // 기본 동작 방지

		// 할 일 입력란의 내용 가져오기
		const inputText = document.querySelector(".txt-field").value;

		// 수정한 할 일 목록의 체크박스 가져오기
		const checkedCheckbox = document.querySelector(".inputEl:checked");

		if (checkedCheckbox) {
			// 체크된 체크박스가 있는 경우에만 실행
			const todoTextElement = checkedCheckbox
				.closest(".todoLi")
				.querySelector(".todo_text");
			todoTextElement.textContent = inputText; // 텍스트 업데이트

			// 체크된 체크박스 해제
			checkedCheckbox.checked = false;
		}

		// 모달 닫기
		$modalOverlay.classList.add("hidden");
		const $checkboxes = document.querySelectorAll(".inputEl");
		$checkboxes.forEach(function (checkbox) {
			checkbox.addEventListener("change", checkCheckbox);
		});
	});

	// 엔터 키 입력 이벤트 처리
	inputField.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			console.log("123");
			event.preventDefault(); // 기본 동작 방지
			$modalOverlay.classList.remove("hidden"); // 모달 열기
		}
	});
}

// ========================할 일 추가시 LI태그 만들어서 UL에 추가=======================
// 할 일 목록 추가 함수
function addTodoToList(obj) {
	// 새로운 할 일 목록 요소 생성
	const time = obj.date ? obj.date : `${obj.time.year}. ${obj.time.month}. ${obj.time.date} ${days[obj.time.day]}`;
	const newTodoItem = document.createElement("li");
	newTodoItem.classList.add("todoLi");
	newTodoItem.innerHTML = `
			<label class="checkbox">
				<div class="input_checkbox">
					<input type="checkbox" class="input inputEl" />
				</div>
				<div class="todo_text">${obj.title}</div>
			</label>
			<div class="date">
				<div class="dateText">${time}</div>
			</div>
		`;

	// List에 새로운 할 일 목록 추가
	const todoList = document.getElementById("List");
	todoList.appendChild(newTodoItem);

	// li 태그 추가된 후에는 #none 숨김
	// const noneDiv = document.getElementById("none");
	// noneDiv.style.display = "none";

	// 모달 나갈때 삭제, 수정 버튼 비활성화
	const $checkboxes = document.querySelectorAll(".inputEl");
	$checkboxes.forEach(function (checkbox) {
		checkbox.addEventListener("change", checkCheckbox);
	});
}

export { todoEvent, addTodoToList };
const getheaderToday = () => {
	const $today = document.querySelector(".wrapper .selected-date");

	const dateNow = new Date();
	const todayYear = dateNow.getFullYear();
	const todayMonth = dateNow.getMonth();
	const todayDate = dateNow.getDate();
	$today.textContent = `${todayYear}년 ${todayMonth + 1}월 ${todayDate}일`;
}

export default getheaderToday;
/* 
	const toDoList = [
		{
			id: number,
			title: string,
			time: object,
			repeat: number,
			checked: boolean,
			timeStop: object,
		},
	];

	time = {
		year: number,
		month: number,
		date: number,
		day: number,
	}

	timeStop = {
			isRunning: boolean,
			isPause: boolean,
			startTime: object,
			currentTime: object,
		}

	(start/current)Time = {
		hour: number,
		minute: number,
		sec: number,
		ms: number,
	}

*/

const REPEAT = {
	NO: 0,
	EVERYDAY: 1,
	WEEK: 2,
	MONTH: 3,
}

const initTime = {
	hour: 0,
	minute: 0,
	sec: 0,
	ms: 0,
}

const initTimeStop = {
	isRunning: false,
	isPause: false,
	startTime: initTime,
	endTime: initTime
}


const toDoList = [
	{
		id: 1,
		title: "할일 1",
		time: {
			year: 2024,
			month: 3,
			date: 17,
			day: 3,
		},
		repeat: REPEAT.MONTH,
		done: false,
		timeStop: initTimeStop,
		color: '#d8fdb3',
	},
	{
		id: 2,
		title: "할일 2",
		time: {
			year: 2024,
			month: 2,
			date: 5,
			day: 2
		},
		repeat: REPEAT.MONTH,
		done: false,
		timeStop: initTimeStop,
		color: '#fde2b3',
	},
	{
		id: 3,
		title: "할일 3",
		time: {
			year: 2024,
			month: 4,
			date: 17,
			day: 3
		},
		repeat: REPEAT.EVERYDAY,
		done: false,
		timeStop: initTimeStop,
		color: '#FCFFC4',
	},
	{
		id: 4,
		title: "할일 4",
		time: {
			year: 2024,
			month: 4,
			date: 10,
			day: 3
		},
		repeat: REPEAT.NO,
		done: false,
		timeStop: initTimeStop,
		color: '#fed4d2',
	},
	{
		id: 5,
    title: "할일 5",
    time: { year: 2024, month: 2, date: 1, day: 4 },
    repeat: 2,
		done: false,

  },
  {	
		id: 6,
    title: "할일 6",
    time: { year: 2023, month: 12, date: 8, day: 5 },
    repeat: 3,
		done: false,
    color: '#DBF4FF', 
  },
  {
		id: 7,
    title: "할일 7",
    time: { year: 2024, month: 4, date: 10, day: 2 },
    repeat: 2,
		done: false,
    color: '#A9FDE9',
  },
  {	
		id: 8,
    title: "할일 8",
    time: { year: 2024, month: 3, date: 9, day: 2 },
    repeat: 3,
		done: false,
    color: '#f8dbfa',
  },
  {	
		id: 9,
    title: "할일 9",
    time: { year: 2024, month: 4, date: 27, day: 6 },
    repeat: 1,
		done: false,
    color: '#eff6ee',
  },
];

export { toDoList, REPEAT, initTimeStop };



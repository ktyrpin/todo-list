let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;
let popup;
let popupInfo;
let popupInput;
let popupAddBtn;
let popupCloseBtn;
let todoToEdit;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");
	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo);
	popupCloseBtn.addEventListener("click", closePopup);
	ulList.addEventListener("click", checkClick);
	todoInput.addEventListener("keyup", enterKeyCheck);
	popupAddBtn.addEventListener("click", changeTodoText);
};

const addNewTodo = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		createToolsArea();

		ulList.appendChild(newTodo);

		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Wpisz treść zadania!";
	}
};

const createToolsArea = () => {
	const toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");
	newTodo.appendChild(toolsPanel);

	const completeBtn = createButton("complete", '<i class="fas fa-check"></i>');
	const editBtn = createButton("edit", "EDIT");
	const deleteBtn = createButton("delete", '<i class="fas fa-times"></i>');

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const createButton = (className, innerHTML) => {
	const button = document.createElement("button");
	button.classList.add(className);
	button.innerHTML = innerHTML;
	return button;
};

const checkClick = (e) => {
	const target = e.target;
	if (target.matches(".complete")) {
		const listItem = target.closest("li");
		listItem.classList.toggle("completed");
		target.classList.toggle("completed");
	} else if (target.matches(".edit")) {
		editTodo(e);
	} else if (target.matches(".delete")) {
		deleteTodo(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};

const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Musisz podać jakąś treść!";
	}
};

const deleteTodo = (e) => {
	e.target.closest("li").remove();

	const allTodos = ulList.querySelectorAll("li");

	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście.";
	}
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};

document.addEventListener("DOMContentLoaded", main);

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

const taskList = document.getElementById("task-list");

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText);
    saveTask(taskText);

    taskInput.value = "";
}

function createTaskElement(text) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task");
    taskItem.draggable = true;

    const taskContent = document.createElement("span");
    taskContent.innerText = text;
    taskItem.appendChild(taskContent);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => {
        taskList.removeChild(taskItem);
        deleteTask(text);
    };
    taskItem.appendChild(deleteButton);

    taskItem.addEventListener("dragstart", () => {
        taskItem.classList.add("dragging");
    });

    taskItem.addEventListener("dragend", () => {
        taskItem.classList.remove("dragging");
        saveTaskOrder();
    });

    taskList.appendChild(taskItem);
}

function deleteTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveTask(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

function saveTaskOrder() {
    const tasks = Array.from(taskList.children).map(task => task.firstChild.innerText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Drag-and-drop logic
taskList.addEventListener("dragover", e => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
        taskList.appendChild(draggingItem);
    } else {
        taskList.insertBefore(draggingItem, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".task:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

window.addEventListener("load", () => {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (!Array.isArray(savedTasks)) {
    savedTasks = [];
  }

  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list_element = document.querySelector("#tasks");
  const dateInput = document.querySelector("#date-input");
  const timeInput = document.querySelector("#time-input");

  
  function createTaskElement(taskData) {
    const task_element = document.createElement("div");
    task_element.classList.add("task");

    const task_content_element = document.createElement("div");
    task_content_element.classList.add("content");

    task_element.appendChild(task_content_element);

    const task_input_element = document.createElement("input");
    task_input_element.classList.add("text");
    task_input_element.type = "text";
    task_input_element.value = taskData.task;
    task_input_element.setAttribute("readonly", "readonly");

    const task_date_element = document.createElement("input");
    task_date_element.classList.add("task-date");
    task_date_element.type = "text";
    task_date_element.value = ` ${taskData.taskDate.toLocaleString()}`;
    task_date_element.setAttribute("readonly", "readonly");

    task_content_element.appendChild(task_input_element);
    task_content_element.appendChild(task_date_element);

    const task_actions_element = document.createElement("div");
    task_actions_element.classList.add("actions");

    const task_edit_element = document.createElement("button");
    task_edit_element.classList.add("edit");
    task_edit_element.innerText = "Edit";

    const task_delete_element = document.createElement("button");
    task_delete_element.classList.add("delete");
    task_delete_element.innerText = "Delete";

    task_actions_element.appendChild(task_edit_element);
    task_actions_element.appendChild(task_delete_element);

    task_element.appendChild(task_actions_element);

    list_element.appendChild(task_element);

    task_edit_element.addEventListener("click", () => {
      if (task_edit_element.innerText.toLowerCase() === "edit") {
        task_edit_element.innerText = "Save";
        task_input_element.removeAttribute("readonly");
        task_date_element.removeAttribute("readonly");
        task_input_element.focus();
      } else {
        taskData.task = task_input_element.value;
        task_edit_element.innerText = "Edit";
        task_input_element.setAttribute("readonly", "readonly");
        updateLocalStorage(savedTasks);
      }
    });

    task_delete_element.addEventListener("click", () => {
      list_element.removeChild(task_element);
      const index = savedTasks.indexOf(taskData);
      if (index !== -1) {
        savedTasks.splice(index, 1);
        updateLocalStorage(savedTasks);
      }
    });
  }


  
  savedTasks.forEach((taskData) => {
    taskData.taskDate = new Date(taskData.taskDate); // Convert the date string back to a Date object
    createTaskElement(taskData);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;

    if (!task) {
      alert("Please fill out the task");
    } else if (!taskDate || !taskTime) {
      alert("Please pick a date and time");
    } else {
      const taskData = { task, taskDate: new Date(`${taskDate}T${taskTime}`) };
      savedTasks.push(taskData);
      updateLocalStorage(savedTasks);
      createTaskElement(taskData);

      input.value = "";
      dateInput.value = "";
      timeInput.value = "";
    }
  });

  function updateLocalStorage(data) {
    localStorage.setItem("tasks", JSON.stringify(data));
  }
});

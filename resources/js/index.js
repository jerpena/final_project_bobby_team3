const manageTasks = new TaskManager()
manageTasks.load();
manageTasks.render();

const form = document.getElementById('taskForm')

const validFormFieldInput = event => {
    event.preventDefault();
    const currentPage = getCurrentPage();
    const taskName = form.taskName.value;
    const description = form.taskDescription.value;
    const assignedTo = form.taskAssignedTo.value;
    const dueDate = form.taskDue.value;
    const status = form.taskStatus.value;
    const errorMsg = document.getElementById('error-msg')
    const taskId = Number(form.taskId.value);

    if (!taskName || !description || !assignedTo || !dueDate || !status) {
        errorMsg.innerHTML = 'Invalid input in one or more fields.';
        errorMsg.style.display = 'block';
        return
    }

    (currentPage === 'manage.html') ? manageTasks.editTask(taskId, taskName, description, assignedTo, dueDate, status) :
        manageTasks.addTask(taskName, description, assignedTo, dueDate, status);

    manageTasks.render();
    manageTasks.save();
    errorMsg.style.display = 'none';
    form.taskName.value = '';
    form.taskDescription.value = '';
    form.taskAssignedTo.value = '';
    form.taskDue.value = '';
    modal('hide')
}


form.addEventListener('submit', validFormFieldInput);

const taskListDiv = document.querySelector("#task-list");
taskListDiv.addEventListener('click', (event) => {
    const parentTask = event.target.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);

    if (event.target.classList.contains('done-button')) {
        const task = manageTasks.getTaskById(taskId);
        task.status = "DONE";
        manageTasks.save();
        manageTasks.render();
    }

    if (event.target.classList.contains('delete-button')) {
        manageTasks.deleteTask(taskId);
        manageTasks.save();
        manageTasks.render();
    }

    if (event.target.classList.contains('button-edit')) {
        const task = manageTasks.getTaskById(taskId);
        form.taskId.value = taskId
        form.taskName.value = task.taskName;
        form.taskDescription.value = task.description;
        form.taskAssignedTo.value = task.assignedTo;
        form.taskDue.value = task.dueDate;
        form.taskStatus.value = task.status;
    }
});
const manageTasks = new TaskManager()
manageTasks.load();
manageTasks.render();
const form = document.getElementById('taskForm')

const toggleActiveClass = element => {
    let icon = element.querySelector('i')
    icon.classList.toggle('active');
}

const validFormFieldInput = event => {
    event.preventDefault();
    const taskName = form.taskName.value;
    const description = form.taskDescription.value;
    const assignedTo = form.taskAssignedTo.value;
    const dueDate = form.taskDue.value;
    const status = form.taskStatus.value;
    const errorMsg = document.getElementById('error-msg')


    if (!taskName || !description || !assignedTo || !dueDate || !status) {
        errorMsg.innerHTML = 'Invalid input in one or more fields.';
        errorMsg.style.display = 'block';

    } else {
        manageTasks.addTask(taskName, description, assignedTo, dueDate, status);
        manageTasks.render();
        manageTasks.save();
        errorMsg.style.display = 'none';
        form.taskName.value = '';
        form.taskDescription.value = '';
        form.taskAssignedTo.value = '';
        form.taskDue.value = '';
    }
}



form.addEventListener('submit', validFormFieldInput);

const taskListDiv = document.querySelector("#task-list");
taskListDiv.addEventListener('click', (event) => {

    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        const task = manageTasks.getTaskById(taskId)
        task.status = "DONE";
        manageTasks.save();
        manageTasks.render();
    }

    if (event.target.classList.contains('delete-button')) {
        const parentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = Number(parentTask.dataset.taskId);
        manageTasks.deleteTask(taskId);
        manageTasks.save();
        manageTasks.render();
    }

});


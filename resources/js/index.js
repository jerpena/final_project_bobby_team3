const manageTasks = new TaskManager()
manageTasks.load();
manageTasks.render();

const modal = document.getElementById('staticBackdrop');
const modalTitle = document.getElementById('staticBackdropLabel')
const form = document.getElementById('taskForm');
const cancelButton = document.getElementById('cancel');
const formDeleteButton = document.getElementById('delete');
const errorMsg = document.getElementById('error-msg')
const taskListDiv = document.querySelector("#task-list");


const resetFormInputs = () => {
    errorMsg.style.display = 'none';
    form.dataset.editing = '';
    modalTitle.innerHTML = 'Add Task'
    form.taskName.value = '';
    form.taskDescription.value = '';
    form.taskAssignedTo.value = '';
    form.taskStatus.value = 'TODO'
    form.taskDue.value = '';
    form.taskId.value = '';
}

const submitForm = event => {
    event.preventDefault();
    const editingTask = !!form.dataset.editing;
    const taskName = form.taskName.value;
    const description = form.taskDescription.value;
    const assignedTo = form.taskAssignedTo.value;
    const dueDate = form.taskDue.value;
    const status = form.taskStatus.value;
    const taskId = Number(form.taskId.value);
    const formModal = bootstrap.Modal.getInstance(modal)


    if (!taskName || !description || !assignedTo || !dueDate || !status) {
        errorMsg.innerHTML = 'Invalid input in one or more fields.';
        errorMsg.style.display = 'block';
        return
    }

    // check if editing a task
    (editingTask) ? manageTasks.editTask(taskId, taskName, description, assignedTo, dueDate, status) :
        manageTasks.addTask(taskName, description, assignedTo, dueDate, status);

    manageTasks.render();
    manageTasks.save();
    resetFormInputs()
    // hide modal
    formModal.hide()
}


form.addEventListener('submit', submitForm);

cancelButton.addEventListener('click', resetFormInputs)

if (getCurrentPage() === 'manage.html') {
    formDeleteButton.addEventListener('click', () => {
        const formModal = bootstrap.Modal.getInstance(modal)
        const taskId = Number(form.taskId.value)
        manageTasks.deleteTask(taskId);
        manageTasks.save();
        manageTasks.render();
        formModal.hide();
    })
}

taskListDiv.addEventListener('click', (event) => {
    const parentTask = event.target.parentElement.parentElement.parentElement;
    const taskId = Number(parentTask.dataset.taskId);

    // check if done-button on card clicked
    if (event.target.classList.contains('done-button')) {
        const task = manageTasks.getTaskById(taskId);
        task.status = "DONE";
        manageTasks.save();
        manageTasks.render();
    }

    // check if delete-button on card clicked
    if (event.target.classList.contains('delete-button')) {
        manageTasks.deleteTask(taskId);
        manageTasks.save();
        manageTasks.render();
    }

    // check if edit-button clicked
    if (event.target.classList.contains('button-edit')) {
        const task = manageTasks.getTaskById(taskId);
        // set title for modal
        modalTitle.innerHTML = 'Edit Task'
        // set data attribute
        form.dataset.editing = true;
        // set form values 
        form.taskId.value = taskId
        form.taskName.value = task.taskName;
        form.taskDescription.value = task.description;
        form.taskAssignedTo.value = task.assignedTo;
        form.taskDue.value = task.dueDate;
        form.taskStatus.value = task.status;
    }
});
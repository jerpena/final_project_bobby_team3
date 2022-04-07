const manageTasks = new TaskManager()
const form = document.getElementById('taskForm')

const toggleActiveClass = element => {
    let icon = element.querySelector('i')
    icon.classList.toggle('active');
}


form.addEventListener('submit', event => {
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
        errorMsg.style.display = 'none';
        form.taskName.value = '';
        form.taskDescription.value = '';
        form.taskAssignedTo.value = '';
        form.taskDue.value = '';
    }
})

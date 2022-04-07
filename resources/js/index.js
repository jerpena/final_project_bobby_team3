const manageTasks = new taskManager(0)
const form = document.querySelector('#taskForm')

const toggleActiveClass = element => {
    let icon = element.querySelector('i')
    icon.classList.toggle('active');
}


form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.taskName.value;
    const desc = form.taskDescription.value;
    const assignedTo = form.taskAssignedTo.value;
    const dueDate = form.taskDue.value;
    const status = form.taskStatus.value;
    const errorMsg = document.querySelector('#errorMsg')


    if (!name || !desc || !assignedTo || !dueDate || !status) {
        errorMsg.innerHTML = 'Invalid input in one or more fields.';
        errorMsg.style.display = 'block';

    } else {
        manageTasks.addTask(name, desc, assignedTo, dueDate, status);
        errorMsg.style.display = 'none';
        form.taskName.value = '';
        form.taskDescription.value = '';
        form.taskAssignedTo.value = '';
        form.taskDue.value = '';
    }

})

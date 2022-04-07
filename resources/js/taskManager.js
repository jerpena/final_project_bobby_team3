const createTaskHTML = (taskName, desc, assignedTo, dueDate, status) => {
return `<div class="card">
<div class="card-body">
    <div class="d-flex justify-content-between">
        <p class="card-title mb-0 align-self-center">${taskName}</p>
    </div>
    <div id="task-1">
        <p class="card-subtitle">${assignedTo}</p>
        <p class='card-text'>${desc}</p>
    </div>
    <div class="task-footer">
        <p class='footer-date'>${dueDate}</p>
        <span class="task-status">${status}</span>
    </div>
</div>
</div>
`
}



class TaskManager {
    constructor(currentId = 0) {
        this._tasks = []
        this._currentId = currentId
    }
    get taskList() {
        return this._tasks
    }
    addTask(taskName, desc, assignedTo, due, status = 'TODO') {
        const newTask = {
            id: this._currentId++,
            taskName: taskName,
            description: desc,
            assignedTo: assignedTo,
            dueDate: due,
            status: status
        }
        this._tasks.push(newTask);
    }
    render() {
        const tasksHtmlList = []
        for (let i=0; i < this._tasks.length; i++) {
        const currentTask = this._tasks[i];   
        // Format date not needed due to date picker on modal
        //const date = newDate(currentTask.dueDate);
        //const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const taskHtml = createTaskHTML(currentTask.taskName, currentTask.description, currentTask.assignedTo, currentTask.dueDate, currentTask.status)
        tasksHtmlList.push(taskHtml)
    } 
        const tasksHtml = tasksHtmlList.join('\n')
        document.getElementById('task-list').innerHTML = tasksHtml
    }
}
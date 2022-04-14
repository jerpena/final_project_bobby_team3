const createTaskHTML = (id, taskName, description, assignedTo, dueDate, status) => {
    let backgroundColor;
    const currentPage = location.href.split("/").slice(-1).toString()
    const otherButtonHTML = `<button class="done-button btn btn-outline-success ${status !== 'DONE' ? 'visible' : 'invisible'}">Mark Done</button>
        <button class="btn btn-outline-danger delete-button ${status === 'DONE' ? 'visible' : 'invisible'}">Delete</button>`
        const editButtonHTML = `<button type="button" class="button-edit btn btn-outline-dark" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">Edit</button>`
    switch (status) {
        case "todo":
            backgroundColor = "bg-primary";
            break;
        case "inProgress":
            backgroundColor = "bg-warning";
            break;
        case "review":
            backgroundColor = "bg-danger";
            break;
        case "done":
            backgroundColor = "bg-sucess";
            break;
    }

    return `<div class="card" data-task-id = "${id}">

<div class="card-body">
    <div class="d-flex justify-content-between">
        <p class="card-title mb-0 align-self-center">${taskName}</p>
        ${currentPage === 'manage.html' ? editButtonHTML : otherButtonHTML}
    </div>
    <div>
        <p class="card-subtitle">Assignee: ${assignedTo}</p>
        <p class='card-text'>${description}</p>
    </div>
    <div class="task-footer">
        <p class='footer-date'>${dueDate}</p>
        <span class="task-status ${backgroundColor}">${status}</span>
    </div>
</div>
</div>
`
}



class TaskManager {
    constructor() {
        this._tasks = []
        this._currentId = this._tasks.length
    }
    get taskList() {
        return this._tasks
    }
    addTask(taskName, description, assignedTo, dueDate, status = 'TODO') {
        const newTask = {
            id: this._currentId++,
            taskName: taskName,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        }
        this._tasks.push(newTask);
    }
    render() {
        const tasksHtmlList = []
        for (let i = 0; i < this._tasks.length; i++) {
            const currentTask = this._tasks[i];
            // Format date not needed due to date picker on modal
            //const date = newDate(currentTask.dueDate);
            //const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            const taskHtml = createTaskHTML(currentTask.id, currentTask.taskName, currentTask.description, currentTask.assignedTo, currentTask.dueDate, currentTask.status)
            tasksHtmlList.push(taskHtml)
        }
        const tasksHtml = tasksHtmlList.join('\n')
        document.getElementById('task-list').innerHTML = tasksHtml
    }

    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this._tasks.length; i++) {
            let task = this._tasks[i];
            if (task.id === taskId) {
                foundTask = task;
            }

        }
        return foundTask;
    }

    save() {
        const tasksJson = JSON.stringify(this._tasks);
        localStorage.setItem('tasks', tasksJson);
        const currentId = this._currentId.toString()
        localStorage.setItem('currentId', currentId);
    }

    load() {
        if (localStorage.getItem('tasks')) {
            const tasksJson = localStorage.getItem('tasks');
            this._tasks = JSON.parse(tasksJson);
        }
        if (localStorage.getItem('currentId')) {
            const currentId = localStorage.getItem('currentId');
            this._currentId = Number(JSON.parse(currentId))
        }
    }

    deleteTask(taskId) {
        const newTasks = [];

        this._tasks.forEach(task => {
            if (task.id !== taskId) newTasks.push(task)
        })

        this._tasks = newTasks;
    }

    get tasks() {
        return this._tasks
    }
}


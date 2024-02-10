window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    goals = JSON.parse(localStorage.getItem('goals')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    const newGoalForm = document.querySelector('#new-goal-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date().getTime()
        }

        todos.push(todo);
        
        localStorage.setItem('todos', JSON.stringify(todos));
        
        e.target.reset();

        DisplayTodos();
       
    })

    newGoalForm.addEventListener('submit', e => {
        e.preventDefault();
    
        const goal = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date().getTime()
        }

        goals.push(goal);
        
        localStorage.setItem('goals', JSON.stringify(goals));

        e.target.reset();

        DisplayGoals();
    })

    DisplayTodos();
    DisplayGoals();
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } 
        if (todo.category == 'work') {
            span.classList.add('work');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
             input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    })
}

function DisplayGoals () {
    const goalList = document.querySelector('#goal-list');

    goalList.innerHTML = '';

    goals.forEach(goal => {
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = goal.done;
        span.classList.add('bubble');

        if (goal.category == 'spiritual') {
            span.classList.add('spiritual');
        }
        if (goal.category == 'physical') {
            span.classList.add('physical');
        }
        if (goal.category == 'social') {
            span.classList.add('social');
        }
        if (goal.category == 'intellectual') {
            span.classList.add('intellectual');
        }

        content.classList.add('goal-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${goal.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        goalItem.appendChild(label);
        goalItem.appendChild(content);
        goalItem.appendChild(actions);

        goalList.appendChild(goalItem);

        if (goal.done) {
            goalItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            goal.done = e.target.checked;
            localStorage.setItem('goals', JSON.stringify(goals));

            if (goal.done) {
                goalItem.classList.add('done');
            } else {
                goalItem.classList.remove('done');
            }

            DisplayGoals();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                goal.content = e.target.value;
                localStorage.setItem('goals', JSON.stringify(goals));
                DisplayGoals();
            })
        })

        deleteButton.addEventListener('click', e => {
            goals = goals.filter(l => l != goal);
            localStorage.setItem('goals', JSON.stringify(goals));
            DisplayGoals();
        })
    })
}
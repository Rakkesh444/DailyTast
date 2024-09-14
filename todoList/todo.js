
const navbar_icon = document.querySelector('.navbar-icon');
const nav_lists = document.querySelector('.nav_lists');
navbar_icon.addEventListener('click', () => {
    nav_lists.classList.toggle('show');
});

const addtodo = document.querySelector('.addtodo');
const input = document.querySelector('.input');
const todolist = document.querySelector('.todolist');
let todoLit = [];
document.addEventListener('DOMContentLoaded', () => {
    loaded();
    storing();
});
function storing() {
    try {
        const todo = [...JSON.parse(localStorage.getItem("student"))];
        // const todo = localStorage.getItem("student");
        // const store = [...JSON.parse(todo)];
        todo.forEach(element => {
            const user_value = element.stud;
            todoLit.push(user_value);
            //console.log(todoLit);
            // if (!user_value) {
            //     alert('Enter the Student Name in the Input Form');
            //     return;
            // }

            //create element for main todolist container
            const main_el = document.createElement("div");
            //main_el.textContent = todos;
            main_el.classList.add('todolist');

            //create elemen for todolist content
            const sub_el = document.createElement("div");
            sub_el.classList.add("items");
            sub_el.innerText = user_value;
            main_el.appendChild(sub_el);

            //create elements by buttons
            //Append the Tick button
            const btndiv = document.createElement('div');
            btndiv.classList.add('actions')
            const tick = document.createElement('a');
            tick.style.cursor = "pointer";
            tick.className = 'bi bi-check-circle';
            tick.classList.add('tick');

            //Append the delete button
            const del = document.createElement('a');
            del.style.cursor = "pointer";
            del.className = "bi bi-trash";
            del.classList.add('trash');
            btndiv.appendChild(tick);
            btndiv.appendChild(del);
            sub_el.appendChild(btndiv);
            todolist.appendChild(main_el);
            input.value = "";
            tick.addEventListener('click', () => {
                //sub_el.style.textDecoration = "line-through";
                sub_el.classList.toggle('para');
            })
            del.addEventListener('click', () => {
                sub_el.remove();
                const todo = [...JSON.parse(localStorage.getItem("student"))];
                todo.forEach(element => {
                    if (element.stud === sub_el.innerText) {
                        todo.splice(todo.indexOf(element), 1);
                    }
                });
                localStorage.setItem("student", JSON.stringify(todo))
            })
        });
    } catch {

    }
}
function loaded() {
    addtodo.addEventListener('click', () => {
        if (!input.value) {
            alert('Enter the Student Name in the Input Form');
            return;
        }
        addtodos();
    });
    //end
}


function addtodos() {
    const user_value = input.value;
    todoLit.push(user_value);
    //console.log(todoLit);
    // if (!user_value) {
    //     alert('Enter the Student Name in the Input Form');
    //     return;
    // }

    //create element for main todolist container
    const main_el = document.createElement("div");
    //main_el.textContent = todos;
    main_el.classList.add('todolist');

    //create elemen for todolist content
    const sub_el = document.createElement("div");
    sub_el.classList.add("items");
    sub_el.innerText = user_value;
    main_el.appendChild(sub_el);

    //create elements by buttons
    //Append the Tick button
    const btndiv = document.createElement('div');
    btndiv.classList.add('actions')
    const tick = document.createElement('a');
    tick.style.cursor = "pointer";
    tick.className = 'bi bi-check-circle';
    tick.classList.add('tick');

    //Append the delete button
    const del = document.createElement('a');
    del.style.cursor = "pointer";
    del.className = "bi bi-trash";
    del.classList.add('trash');
    //local storage
    //localStorage.setItem('student', JSON.stringify(todoLit));
    localStorage.setItem("student", JSON.stringify([...JSON.parse(localStorage.getItem("student") || '[]'), { stud: input.value },]));
    btndiv.appendChild(tick);
    btndiv.appendChild(del);
    sub_el.appendChild(btndiv);
    todolist.appendChild(main_el);
    input.value = "";
    tick.addEventListener('click', () => {
        //sub_el.style.textDecoration = "line-through";
        sub_el.classList.toggle('para');
    })
    del.addEventListener('click', () => {
        sub_el.remove();
        const todo = [...JSON.parse(localStorage.getItem("student"))];
        todo.forEach(element => {
            if (element.stud === sub_el.innerText) {
                todo.splice(todo.indexOf(element), 1);
            }
        });
        localStorage.setItem("student", JSON.stringify(todo))
    })
}

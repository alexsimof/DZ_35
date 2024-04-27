
const container = document.querySelector('.todo-container')
const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input')
const btnSubmit = document.getElementById('btn-submit')
const taskList = document.getElementById('todo-list')

let toDoList = [];
if (localStorage.getItem('todo')) {
  toDoList = JSON.parse(localStorage.getItem('todo'));
  addToDoList();
}



function addNewTask(e) {
  e.preventDefault()
  const newTask = { msg: input.value }
  if (!input.value) {
    return false
  }
  toDoList.push(newTask)
  input.value = '';

  addToDoList()
  localStorage.setItem('todo', JSON.stringify(toDoList))
}

function removeTask(event) {
  if (event.target.classList.contains('remove')) {
    const itemList = event.target.closest('li')
    const itemValue = itemList.querySelector('.list-item').textContent 
    toDoList = toDoList.filter((item) => item.msg !== itemValue);
    localStorage.setItem('todo', JSON.stringify(toDoList))
    itemList.remove();
  }
}

function editTask(event) {
  if (event.target.classList.contains('edit')) {
    const itemList = event.target.closest('li')
    const itemTextContainer = itemList.querySelector('.list-item')
    modifyButton(event);
    creatInput(itemTextContainer, input);

  }
}

function modifyButton(event) {
  const editBtn = event.target;
  oldBtn = editBtn.textContent
  editBtn.textContent = '✔️';
  editBtn.classList.add('approve');
}

function creatInput(itemTextContainer, input) {
  input = document.createElement('input');
  input.value = itemTextContainer.textContent;
  itemTextContainer.textContent = '';
  itemTextContainer.append(input);
  input.focus();
}

// function saveChangedItem(input, itemTextContainer, editBtn, oldBtn) {
//   const newValue = input.value;
//   itemTextContainer.value = newValue;
//   editBtn.classList.remove('approve');
//   editBtn.textContent = oldBtn;
// }



btnSubmit.addEventListener('click', addNewTask);
taskList.addEventListener('click', removeTask);
taskList.addEventListener('click', editTask);

function addToDoList() {
  let task = ''
  toDoList.forEach((item, i) => {
    task += `<li>
      <span class="list-item" id="item-${i}">${ item.msg }</span>
      <div class="manage-item-buttons">
        <button class="edit">✏️</button>
        <button class="remove">x</button>
      </div>
    </li>`
    taskList.innerHTML = task;
  })
}

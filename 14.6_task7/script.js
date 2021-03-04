const idUser = document.getElementById('number');
const btn = document.querySelector('.btn');
const resultDiv = document.querySelector('.tasks');

btn.addEventListener('click', getResult);

function getResult() {
  const url = `https://jsonplaceholder.typicode.com/users/${idUser.value}/todos`;
  fetch(url)
  .then((response) => { return response.json(); })
  .then((tasks) => {
    if (tasks.length === 0) {
      resultDiv.innerHTML = `<br><p>Данные по пользователю с id: ${idUser.value} отсутствуют</p>`;
      return false;
    }
    let html = listOfTasks(tasks,createOneTask);
    resultDiv.innerHTML = html;
  })
  .catch(() => {console.log('Пользователь с указанным id не найден')});
}

function listOfTasks(tasks,cb) { 
    let title = `<p>Задачи пользователя с id: ${idUser.value}</p>`;
    let startList = '<ul>';
    let itemList = '';
    for (let task in tasks) {
      itemList += cb(tasks[task]);
    };
    let endList = '</ul>';
    return title+startList+itemList+endList;
};

function createOneTask(task) {
  let id, title, completed;
  for (let property in task) {
    switch(property) {
      case 'id': id = task[property]; break;
      case 'title': title = task[property]; break;
      case 'completed': completed = task[property]; break;
    };
  };
  return `<li class="${completed === false ? 'lineThrough': ''}">${id}: ${title}</li>`;
}
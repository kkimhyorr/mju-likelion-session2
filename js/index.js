const todoContainerEL = document.querySelector("#todoContainer");
const todoInputEL = document.querySelector("#todoInput");
const todoButtonEL = document.querySelector("#todoButton");
const logoutButtonEL = document.querySelector("#logoutButton");

const isLogin = () => {
  const loginedUser = localStorage.getItem("login");
  if (!loginedUser) {
    alert("로그인이 필요합니다!");
    location.href = "./signin.html";
  }
};
const readTodo = () => {
  todoContainerEL.innerHTML = "";
  const todos = JSON.parse(localStorage.getItem("todos")).reverse();
  todos.forEach((todo) => {
    const divEl = document.createElement("div");
    const completeEl = document.createElement("input");
    const userEl = document.createElement("p");
    const deleteEl = document.createElement("button");
    const contentEl = document.createElement("label");

    divEl.className = "todoItem";
    completeEl.type = "checkbox";
    completeEl.className = "checkbox";
    completeEl.id = todo.id;
    completeEl.addEventListener("click", () => {
      updateComplete(todo.id, completeEl.checked);
    });
    completeEl.checked = todo.complete;
    deleteEl.type = "button";
    deleteEl.textContent = "X";
    deleteEl.className = "deleteButton";
    deleteEl.addEventListener("click", () => deleteTodo(todo.id));

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id; // 눌러서체크할 수 있는 범위 늘림
    userEl.textContent = todo.user;
    divEl.append(completeEl, contentEl, userEl, deleteEl);
    todoContainerEL.append(divEl);
  });
};
const createTodo = () => {
  const todoText = todoInputEL.value;
  const todos = JSON.parse(localStorage.getItem("todos"));
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  const newTodo = {
    id: newId,
    complete: false,
    content: todoText,
    user: localStorage.getItem("login"),
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInputEL.value = "";

  readTodo();
};
const init = () => {
  isLogin();
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }
  readTodo();
  todoButtonEL.addEventListener("click", createTodo);
  logoutButtonEL.addEventListener("click", logout);
};
const deleteTodo = (deleteId) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const filteredTodos = todos.filter((todo) => todo.id !== deleteId);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  readTodo();
};
// 로그아웃 버튼 클릭시 로그아웃! 메시지와 함께 ‘login’로컬스토리지 자체를 ‘삭제’해야합니다! 그 후 signin.html로 이동해야합니다
const logout = () => {
  alert("로그아웃!");
  localStorage.removeItem("login");
  location.href = "./signin.html";
};

// complete의 값을 바꾸세요
// 체크박스 체크 후 새로고침해도 해당 체크박스가 유지되어야합니다.
const updateComplete = (todoId, ElChecked) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const findTodos = todos.map((item) => {
    if (item.id === todoId) {
      item.complete = ElChecked;
      return item;
    } else {
      return item;
    }
  });
  localStorage.setItem("todos", JSON.stringify(findTodos));
};

document.addEventListener("DOMContentLoaded", init);

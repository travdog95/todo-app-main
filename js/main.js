//Create and set variables
const filterButtons = document.querySelectorAll(".filter-option");
const todoList = document.querySelector(".todo-list");

let filterState = "filter-all";
const todoListItemHtml = `
    <div class="task-container" data-status="active">
      <div class="check-container">
        <div class="check"><img src="./images/icon-check.svg" class="hidden" /></div>
      </div>
      <div class="task"></div>
    </div>
    <div class="delete hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          fill="#494C6B"
          fill-rule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
        />
      </svg>
    </div>
`;

//Functions
const todoListItemEventHandlers = (todoListItem) => {
  //Hover
  todoListItem.addEventListener("mouseover", function (e) {
    this.getElementsByClassName("delete")[0].classList.remove("hidden");
  });

  todoListItem.addEventListener("mouseout", function (e) {
    this.getElementsByClassName("delete")[0].classList.add("hidden");
  });

  //Click Delete
  todoListItem.querySelector(".delete").addEventListener("click", function (e) {
    deleteTodoItem(todoListItem);
  });

  //Click check
  todoListItem.querySelector(".check").addEventListener("click", function (e) {
    //Complete todo list item
    if (todoListItem.getAttribute("data-status") === "active") {
      todoListItem.classList.add("status-completed");
      todoListItem.querySelector(".check img").classList.remove("hidden");
      todoListItem.setAttribute("data-status", "completed");
    } else {
      //Activate todo list item
      todoListItem.classList.remove("status-completed");
      todoListItem.querySelector(".check img").classList.add("hidden");
      todoListItem.setAttribute("data-status", "active");
    }
  });
};

const calcAndUpdateItemsLeft = () => {
  const todoListItems = todoList.querySelectorAll("li.todo-list-item");

  document.querySelector(".items-remaining span").innerText = todoListItems.length;
};

const addTodoItem = (value) => {
  if (value === undefined || value === null || value === "") return;

  //Create li element and add to list
  const newTodoItem = document.createElement("li");
  newTodoItem.className = "todo-list-item";
  newTodoItem.innerHTML = todoListItemHtml;
  todoList.appendChild(newTodoItem);

  //Update task name
  newTodoItem.querySelector(".task").innerHTML = value;

  //Clear add todo item input
  document.getElementById("createTodoInput").value = "";

  //Bind hover event
  todoListItemEventHandlers(newTodoItem);

  //Calculate items left
  calcAndUpdateItemsLeft();
};

const deleteTodoItem = (todoListItem) => {
  todoList.removeChild(todoListItem);

  calcAndUpdateItemsLeft();
};

//Add todo item when user presses enter
document.getElementById("createTodoInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodoItem(event.target.value);
  }
});

//on click for filter buttons
filterButtons.forEach((filterButton) => {
  filterButton.addEventListener("click", function (e) {
    filterButtons.forEach((fb) => {
      fb.classList.remove("enabled");
    });
    this.classList.add("enabled");
  });
});

const init = () => {
  const todoListItems = document.querySelectorAll("li.todo-list-item");

  //Bind hover event for todo list items
  todoListItems.forEach((todoListItem) => {
    todoListItemEventHandlers(todoListItem);
  });

  //Calculate items left
  calcAndUpdateItemsLeft();
};

init();

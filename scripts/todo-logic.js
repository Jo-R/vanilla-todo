class ToDoLogic {
  constructor() {
    this.addHandler = this.addHandler.bind(this);
    this.handleListButtonClick = this.handleListButtonClick.bind(this);
    this.confirmAddHandler = this.confirmAddHandler.bind(this);
    this.toggleShowDone = this.toggleShowDone.bind(this);
    this.removeFadeIn = this.removeFadeIn.bind(this);
    this.removeFadeOut = this.removeFadeOut.bind(this);
    this.todoList = document.getElementById("todo-list");
    this.todoList.addEventListener("click", this.handleListButtonClick);
    this.addBtn = document.getElementById("add-btn");
    this.addBtn.addEventListener("click", this.addHandler);
    this.confirmAddBtn = document.getElementById("confirm-add");
    this.confirmAddBtn.addEventListener("click", this.confirmAddHandler);
    this.showDoneBtn = document.getElementById("show-done-btn");
    this.showDoneBtn.addEventListener("click", this.toggleShowDone);

    this.isShowingDone = false;

    if (localStorage.getItem("todo")) {
      const items = JSON.parse(window.localStorage.getItem("todo"));
      this.displayUpdatedList(items);
    } else {
      const items = [];
      localStorage.setItem("todo", JSON.stringify(items));
    }
  }

  removeFadeIn(evt) {
    evt.target.classList.remove("fade-in");
    evt.target.removeEventListener("animationend", this.removeFadeIn);
  }

  removeFadeOut(evt) {
    evt.target.classList.remove("fade-out");
    evt.target.classList.add("hidden");
    evt.target.removeEventListener("animationend", this.removeFadeOut);
  }

  addHandler(evt) {
    const addPanel = document.getElementById("add-item-panel");
    addPanel.classList.remove("hidden");
    addPanel.classList.add("fade-in");
    addPanel.addEventListener("animationend", this.removeFadeIn);
  }

  displayUpdatedList(newList) {
    let itemsToDisplay;
    if (this.isShowingDone) {
      itemsToDisplay = newList.filter((el) => el.isDone == true);
    } else {
      itemsToDisplay = newList.filter((el) => el.isDone == false);
    }
    this.todoList.innerHTML = "";
    if (itemsToDisplay.length === 0) {
      this.todoList.classList.add("hidden");
      return;
    }
    this.todoList.classList.remove("hidden");
    for (const item of itemsToDisplay) {
      this.createListItem(item);
    }
  }

  handleListButtonClick(evt) {
    const [action, id] = evt.target.id.split("-");
    switch (action) {
      case "edit":
        this.editHandler(id);
        break;
      case "savedEdit":
        this.saveEditHandler(id);
        break;
      case "done":
        this.doneHandler(id);
        break;
      case "delete":
        this.deleteHandler(id);
        break;
    }
  }

  deleteHandler(idToDelete) {
    const newList = JSON.parse(window.localStorage.getItem("todo"))
      .filter((item) => item.id != idToDelete)
      .map((item, idx) => {
        return { ...item, id: idx + 1 };
      });
    localStorage.setItem("todo", JSON.stringify(newList));
    this.displayUpdatedList(newList);
  }

  doneHandler(idToUpdate) {
    const newList = JSON.parse(window.localStorage.getItem("todo")).map(
      (item) => {
        if (item.id == idToUpdate) {
          return {
            ...item,
            isDone: true,
          };
        } else {
          return item;
        }
      }
    );
    localStorage.setItem("todo", JSON.stringify(newList));
    this.displayUpdatedList(newList);
  }

  saveEditHandler(id) {
    document
      .getElementById(`text-${id}`)
      .setAttribute("contenteditable", "false");
    const btn = document.getElementById(`edit-${id}`);
    btn.innerHTML = "edit";
    btn.setAttribute("id", `edit-${id}`);
  }

  editHandler(id) {
    const item = document.getElementById(`text-${id}`);
    item.setAttribute("contenteditable", "true");
    item.focus();
    const btn = document.getElementById(`edit-${id}`);
    btn.innerHTML = "save";
    btn.setAttribute("id", `saveEdit-${id}`);
  }

  createListItem(item) {
    const div = document.createElement("LI");
    div.classList.add("item-container");
    div.setAttribute("id", `item-${item.id}`);
    const para = document.createElement("P");
    const text = document.createTextNode(item.value);
    para.classList.add("item-text");
    para.setAttribute("id", `text-${item.id}`);
    para.setAttribute("contenteditable", "false");
    div.appendChild(para);
    para.appendChild(text);
    const btnDiv = document.createElement("DIV");
    btnDiv.classList.add("item-btn-container");
    if (!item.isDone) {
      const editBtn = document.createElement("BUTTON");
      editBtn.innerText = "edit";
      editBtn.setAttribute("id", `edit-${item.id}`);
      btnDiv.appendChild(editBtn);
      const doneBtn = document.createElement("BUTTON");
      doneBtn.innerText = "done";
      doneBtn.setAttribute("id", `done-${item.id}`);
      btnDiv.appendChild(doneBtn);
    }
    const delBtn = document.createElement("BUTTON");
    delBtn.innerText = "X";
    delBtn.setAttribute("id", `delete-${item.id}`);
    btnDiv.appendChild(delBtn);
    div.appendChild(btnDiv);
    this.todoList.appendChild(div);
  }

  confirmAddHandler(evt) {
    const input = document.getElementById("new-item");
    const newItemText = input.value;
    input.value = "";
    const addPanel = document.getElementById("add-item-panel");
    addPanel.classList.add("fade-out");
    addPanel.addEventListener("animationend", this.removeFadeOut);
    if (newItemText === "") {
      return;
    }
    const existingStoredItems = JSON.parse(window.localStorage.getItem("todo"));
    if (existingStoredItems.length === 0) {
      this.todoList.classList.remove("hidden");
    }
    const newItem = {
      id: existingStoredItems.length + 1,
      value: newItemText,
      isDone: false,
    };
    const newList = [...existingStoredItems, newItem];
    localStorage.setItem("todo", JSON.stringify(newList));
    this.displayUpdatedList(newList);
  }

  toggleShowDone(evt) {
    const items = JSON.parse(window.localStorage.getItem("todo"));
    let itemsToShow;
    if (this.isShowingDone) {
      this.isShowingDone = false;
      this.showDoneBtn.innerHTML = "Show done";
    } else {
      this.isShowingDone = true;
      this.showDoneBtn.innerHTML = "Show todo";
    }
    this.displayUpdatedList(items);
  }
}

new ToDoLogic();

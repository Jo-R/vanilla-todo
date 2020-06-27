class ToDoLogic {
  constructor() {
    this.addHandler = this.addHandler.bind(this);
    this.confirmAddHandler = this.confirmAddHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.addBtn = document.getElementById("add-btn");
    this.addBtn.addEventListener("click", this.addHandler);
    this.addBtn = document.getElementById("confirm-add");
    this.addBtn.addEventListener("click", this.confirmAddHandler);

    if (localStorage.getItem("todo")) {
      const items = JSON.parse(window.localStorage.getItem("todo"));
      if (items.length === 0) {
        return;
      }
      document.getElementById("todo-list").classList.remove("hidden");
      items.map((item, idx) => {
        this.createListItem(item, idx);
      });
    } else {
      const items = [];
      localStorage.setItem("todo", JSON.stringify(items));
    }
  }

  addHandler(evt) {
    document.getElementById("new-item").classList.remove("hidden");
    document.getElementById("confirm-add").classList.remove("hidden");
  }

  deleteHandler(evt) {
    const idToDelete = document.getElementById(evt.target.id).dataset.id;
    const newList = JSON.parse(window.localStorage.getItem("todo")).filter(
      (item) => item.id != idToDelete
    );
    const toRemove = document.getElementById(`item-${idToDelete}`);
    toRemove.parentNode.removeChild(toRemove);
    localStorage.setItem("todo", JSON.stringify(newList));
    if (newList.length === 0) {
      document.getElementById("todo-list").classList.add("hidden");
      return;
    }
    newList.map((item) => {
      this.createListItem(item);
    });
  }

  createListItem(item, index) {
    var div = document.createElement("DIV");
    div.classList.add("item-container");
    div.setAttribute("id", `item-${item.id}`);
    var para = document.createElement("P");
    var text = document.createTextNode(item.value);
    div.appendChild(para);
    para.appendChild(text);
    var btn = document.createElement("BUTTON");
    btn.addEventListener("click", this.deleteHandler);
    btn.innerText = "Delete";
    btn.setAttribute("id", `delete-${item.id}`);
    btn.setAttribute("data-id", item.id);
    div.appendChild(btn);
    document.getElementById("todo-list").appendChild(div);
  }

  confirmAddHandler(evt) {
    const input = document.getElementById("new-item");
    const newItemText = input.value;
    input.value = "";
    input.classList.add("hidden");
    document.getElementById("confirm-add").classList.add("hidden");
    const existingStoredItems = JSON.parse(window.localStorage.getItem("todo"));
    if (existingStoredItems.length === 0) {
      document.getElementById("todo-list").classList.remove("hidden");
    }
    const newItem = {
      id: existingStoredItems.length + 1,
      value: newItemText,
    };
    const newList = [...existingStoredItems, newItem];
    localStorage.setItem("todo", JSON.stringify(newList));
    newList.map((item) => {
      this.createListItem(item);
    });
  }
}

new ToDoLogic();

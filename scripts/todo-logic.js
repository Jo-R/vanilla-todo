class ToDoLogic {
  constructor() {
    this.addHandler = this.addHandler.bind(this);
    this.confirmAddHandler = this.confirmAddHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.removeFadeIn = this.removeFadeIn.bind(this);
    this.removeFadeOut = this.removeFadeOut.bind(this);
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
        this.createListItem(item);
      });
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
    console.log("firing");
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

  deleteHandler(evt) {
    const idToDelete = document.getElementById(evt.target.id).dataset.id;
    const newList = JSON.parse(window.localStorage.getItem("todo"))
      .filter((item) => item.id != idToDelete)
      .map((item, idx) => {
        return { ...item, id: idx + 1 };
      });
    localStorage.setItem("todo", JSON.stringify(newList));
    if (newList.length === 0) {
      const list = document.getElementById("todo-list");
      list.innerHTML = "";
      list.classList.add("hidden");
      return;
    }
    document.getElementById("todo-list").innerHTML = "";
    newList.map((item) => {
      this.createListItem(item);
    });
  }

  createListItem(item) {
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
    if (newItemText === "") {
      return;
    }
    input.value = "";
    const addPanel = document.getElementById("add-item-panel");
    addPanel.classList.add("fade-out");
    addPanel.addEventListener("animationend", this.removeFadeOut);
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
    this.createListItem(newItem);
  }
}

new ToDoLogic();

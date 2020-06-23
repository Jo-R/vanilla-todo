class ToDoLogic {
  constructor() {
    this.addHandler = this.addHandler.bind(this);
    this.confirmAddHandler = this.confirmAddHandler.bind(this);

    this.addBtn = document.getElementById("add-btn");
    this.addBtn.addEventListener("click", this.addHandler);
    this.addBtn = document.getElementById("confirm-add");
    this.addBtn.addEventListener("click", this.confirmAddHandler);

    if (localStorage.getItem("todo")) {
      const items = JSON.parse(window.localStorage.getItem("todo"));
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

  createListItem(newItem, index) {
    var div = document.createElement("DIV");
    div.classList.add("item-container");
    var para = document.createElement("P");
    var text = document.createTextNode(newItem);
    div.appendChild(para);
    para.appendChild(text);
    var btn = document.createElement("BUTTON");
    btn.innerText = "Delete";
    btn.setAttribute("id", `delete-${index}`);
    div.appendChild(btn);
    document.getElementById("todo-list").appendChild(div);
  }

  confirmAddHandler(evt) {
    const input = document.getElementById("new-item");
    const newItem = input.value;
    input.value = "";
    input.classList.add("hidden");
    document.getElementById("confirm-add").classList.add("hidden");
    const existingStoredItems = JSON.parse(window.localStorage.getItem("todo"));
    existingStoredItems.push(newItem); // TODO this needs to be an object really and can probs spread or what have you, needs an id and the delete button needs linking to that so can delete item
    existingStoredItems.map((item, idx) => {
      this.createListItem(item, idx);
    });
    localStorage.setItem("todo", JSON.stringify(existingStoredItems));
  }
}

new ToDoLogic();

function createListItem(newItem) {
  var para = document.createElement("P");
  var text = document.createTextNode(newItem);
  para.appendChild(text);
  document.getElementById("todo-list").appendChild(para);
}

class ToDoLogic {
  constructor() {
    this.addBtn = document.getElementById("add-btn");
    this.addBtn.addEventListener("click", this.addHandler);
    this.addBtn = document.getElementById("confirm-add");
    this.addBtn.addEventListener("click", this.confirmAddHandler);

    if (localStorage.getItem("todo")) {
      const items = JSON.parse(window.localStorage.getItem("todo"));
      items.map((item) => {
        createListItem(item);
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

  confirmAddHandler(evt) {
    const input = document.getElementById("new-item");
    const newItem = input.value;
    // hide inputs
    input.value = "";
    input.classList.add("hidden");
    document.getElementById("confirm-add").classList.add("hidden");
    //display new item8
    createListItem(newItem);
    // add to local storage
    const existingStoredItems = JSON.parse(window.localStorage.getItem("todo"));
    existingStoredItems.push(newItem); // TODO this needs to be an object really and can probs spread or what have you
    localStorage.setItem("todo", JSON.stringify(existingStoredItems));
  }
}

new ToDoLogic();

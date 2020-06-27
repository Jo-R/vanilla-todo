class LoginLogic {
  constructor(loginPanel) {
    this.loginBtn = document.getElementById("login-btn");
    this.loginBtn.addEventListener("click", this.login);
  }

  login(evt) {
    if (
      document.getElementById("username").value === "admin" &&
      document.getElementById("password").value === "admin"
    ) {
      window.location.href = "/todo-list.html";
    } else {
      const para = document.createElement("P");
      const text = document.createTextNode(
        "Your username or password is incorrect"
      );
      para.appendChild(text);
      para.classList.add("error-text");
      document.getElementById("login-box").appendChild(para);
    }
  }
}

new LoginLogic();

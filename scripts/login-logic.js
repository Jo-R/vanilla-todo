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
      // TODO APPENED ERROR MESSGAE or do something like that
    }
  }
}

new LoginLogic();

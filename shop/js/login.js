const userAdmin = {
  username: "admin",
  password: "admin",
  isAdmin: "true",
};

const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.onclick = function () {
  if (
    userAdmin.username === username.value &&
    userAdmin.password === password.value
  ) {
    localStorage.setItem("user", JSON.stringify(userAdmin));
    window.location.href = "admin.html";
  } else {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: username.value,
        password: password.value,
        isAdmin: "false",
      })
    );
    window.location.href = "index.html";
  }
};

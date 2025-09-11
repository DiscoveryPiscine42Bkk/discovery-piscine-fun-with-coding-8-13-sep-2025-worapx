window.onload = function () {
  const saved = getCookie("todos");
  if (saved) {
    try {
      const todos = JSON.parse(saved);
      for (let i = todos.length - 1; i >= 0; i--) {
        addTodo(todos[i], false);
      }
    } catch (e) {}
  }
};

document.getElementById("newBtn").addEventListener("click", function () {
  const text = prompt("Enter new TO DO:");
  if (text && text.trim() !== "") addTodo(text.trim(), true);
});

function addTodo(text, save) {
  const ft_list = document.getElementById("ft_list");
  const div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", function () {
    if (confirm("Do you want to remove this TO DO?")) {
      ft_list.removeChild(div);
      saveTodos();
    }
  });

  ft_list.insertBefore(div, ft_list.firstChild);

  if (save) saveTodos();
}

function saveTodos() {
  const ft_list = document.getElementById("ft_list");
  const todos = [];
  for (const child of ft_list.children) todos.push(child.textContent);
  setCookie("todos", JSON.stringify(todos), 365);
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}
function getCookie(name) {
  const cname = name + "=";
  const parts = document.cookie.split(";");
  for (let c of parts) {
    c = c.trim();
    if (c.indexOf(cname) === 0) return decodeURIComponent(c.substring(cname.length));
  }
  return "";
}

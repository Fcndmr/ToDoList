document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById("value");
    const addButton = document.querySelector("button#add");
    const deleteButton = document.querySelector("button.btn.btn-danger");
    const clearButton = document.querySelector("button.btn.btn-warning");
    const ulElement = document.querySelector(".card-body > ul.list-group");

    const createList = () => {
        const newList = JSON.parse(localStorage.getItem("todos")) || [];
        ulElement.innerHTML = "";
        newList.forEach((element) => {
            const liElement = document.createElement("li");
            liElement.classList.add("list-group-item");
            liElement.textContent = element;
            liElement.addEventListener("click", () => {
                inputElement.value = liElement.textContent;
            });
            ulElement.prepend(liElement);
        });
    };

    clearButton.addEventListener("click", () => {
        localStorage.removeItem("todos");
        createList();
    });

    addButton.addEventListener("click", () => {
        const value = inputElement.value.trim();
        if (!value) {
            alert("Lütfen bir şeyler yazın.");
            return;
        }
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        if (todos.includes(value)) {
            alert("Girilen değer daha önce tanımlanmış...");
        } else {
            todos.push(value);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        inputElement.value = "";
        inputElement.focus();
        createList();
    });

    deleteButton.addEventListener("click", () => {
        const value = inputElement.value.trim();
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        const index = todos.indexOf(value);
        if (index !== -1) {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
        }
        inputElement.value = "";
        inputElement.focus();
        createList();
    });

    createList();
});

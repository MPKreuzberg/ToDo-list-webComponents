class TaskList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM

    this.shadowRoot.innerHTML = `
            <style>
                @import "../styles/TaskList.css";
            </style>
            <div class="task-list">
                <ul></ul>
            </div>
        `;

    // Keeps the task in memory
    this.tasks = [];
  }

  connectedCallback() {
    // Global `add-task` listener
    document.addEventListener("add-task", (event) => {
      console.log("Event recieved", event.detail.task);
      this.addTask(event.detail.task);
    });
  }

  // adding task
  addTask(task) {
    this.tasks.push(task);
    this.render();
  }

  // Render task list
  render() {
    const ul = this.shadowRoot.querySelector("ul");
    ul.innerHTML = ""; // clans up previous tasks
    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${task}`;
      ul.appendChild(li);
    });
  }
}

// Always register component !!!
customElements.define("task-list", TaskList);

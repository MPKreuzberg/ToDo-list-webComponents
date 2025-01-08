class TaskInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Shadow DOM

    // HTML structure inside of component
    this.shadowRoot.innerHTML = `
    <style>
        @import "../styles/TaskInput.css";
    </style>

    <div class="task-input">
        <input type="text" placeholder="Enter today's task" />
        <button>Add Task</button>
    </div>
  `;
  }

  connectedCallback(){
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
        const input = this.shadowRoot.querySelector('input');
        const task = input.value.trim();
        if(task){
            this.dispatchEvent(new CustomEvent('add-task',  {
                detail: {task},
                bubbles: true,
                composed:  true
            }));
            input.value = '';
        }
    });
  }

  disconnectedCallBack(){
    this.shadowRoot.querySelector('button').removeEventListener('click')
  }
}

class TableBody extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });

      // Using temlate for basic structure
      const template = document.createElement("template");
      template.innerHTML = `
          <div class="table-body"></div>
      `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Using `adoptedStyleSheets` for styles  loading
      if (this.constructor.styleSheet) {
          this.shadowRoot.adoptedStyleSheets = [this.constructor.styleSheet];
      }
  }

  // Static css loading
  static loadStyleSheet() {
      if (!this.styleSheet) {
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(`
              .table-body {
                  display: flex;
                  flex-direction: column;
              }
              .row {
                  display: flex;
                  border-bottom: 1px solid #ddd;
              }
              .cell {
                  flex: 1;
                  padding: 10px;
                  text-align: left;
              }
          `);
          this.styleSheet = sheet;
      }
  }

  setData(data = []) {
      console.log("Data received:", data);

      const bodyDiv = this.shadowRoot.querySelector(".table-body");
      bodyDiv.innerHTML = ""; // Previous rows reset

      if (!Array.isArray(data) || data.length === 0) {
          bodyDiv.textContent = "No data available."; // Handles emty state
          return;
      }

      data.forEach(row => {
          const rowDiv = document.createElement("div");
          rowDiv.className = "row";

          Object.values(row).forEach(cellValue => {
              const cell = document.createElement("div");
              cell.className = "cell";
              cell.textContent = cellValue ?? "N/A"; // 
              rowDiv.appendChild(cell);
          });

          bodyDiv.appendChild(rowDiv);
      });
  }
}

// Loads style on component registration 
TableBody.loadStyleSheet();

// Component registration
customElements.define("table-body", TableBody);

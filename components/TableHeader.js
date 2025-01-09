class TableHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <style>
            @import "../styles/TableHeader.css";
        </style>
        <div class="table-header"></div>
        `;
  }

  setColumns(columns, sortColumn, sortDirection) {
    const headerDiv = this.shadowRoot.querySelector(".table-header");
    headerDiv.innerHTML = "";

    columns.forEach((column) => {
      const header = document.createElement("div");
      header.className = "header-cell";
      header.textContent = column;
      header.addEventListener("click", () =>
        this.dispatchEvent(
          new CustomEvent("sort-column", {
            detail: { column },
            bubbles: true,
            composed: true,
          })
        )
      );

      if (column === sortColumn) {
        header.textContent += sortDirection === "asc" ? " 🔼" : " 🔽";
      }
      headerDiv.appendChild(header);
    });
  }
}

customElements.define("table-header", TableHeader);

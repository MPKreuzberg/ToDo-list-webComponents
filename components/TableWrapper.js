class TableWrapper extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });

      this.state = {
          data: [],
          columns: [],
          sortColumn: null,
          sortDirection: "asc",
      };

      this.shadowRoot.innerHTML = `
          <style>
              @import "../styles/TableWrapper.css";
          </style>
          <slot></slot>
      `;
  }

  setData(data) {
      this.state.data = data;
      this.render();
  }

  setColumns(columns) {
      this.state.columns = columns;
      this.render();
  }

  sortData(column) {
      const direction =
          this.state.sortColumn === column && this.state.sortDirection === "asc"
              ? "desc"
              : "asc";
      this.state.sortColumn = column;
      this.state.sortDirection = direction;

      this.state.data.sort((a, b) => {
          if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
          if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
          return 0;
      });

      this.render();
  }

  render() {
      const header = this.querySelector("table-header");
      const body = this.querySelector("table-body");

      if (!header) {
          console.error("TableHeader element not found!");
          return;
      }

      if (!body) {
          console.error("TableBody element not found!");
          return;
      }

      const filteredData = this.state.data.map(row => {
        const filteredRow = {};
        this.state.columns.forEach(column => {
            filteredRow[column] = row[column];
        });
        return filteredRow;
    });
    header.setColumns(this.state.columns, this.state.sortColumn, this.state.sortDirection);
    body.setData(filteredData);
  }
}

customElements.define("table-wrapper", TableWrapper);


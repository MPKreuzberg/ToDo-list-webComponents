class TableWrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.state = {
      data: [],
      column: [],
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

    this.data.sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    this.render();
  }

  render() {
    this.querySelector("table-header").setColumns(
      this.state.columns,
      this.state.sortColumn,
      this.state.sortDirection
    );
    this.querySelector(table - body).setData(this.state.data);
  }
}
customElements.define("table-wrapper", TableWrapper);

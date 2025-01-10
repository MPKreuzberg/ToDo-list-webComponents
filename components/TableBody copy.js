class TableBody extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
<style>
@import "../styles/TableBody.css";
</style>
<div class="table-body"></div>
`;
  }
  setData(data) {
    console.log("Data recieved:", data); 
    const bodyDiv = this.shadowRoot.querySelector(".table-body");
    bodyDiv.innerHTML = "";

    data.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      Object.values(row).forEach((cellValue) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = cellValue;
        rowDiv.appendChild(cell);
      });

      bodyDiv.appendChild(rowDiv);
    });
  }
}

customElements.define("table-body", TableBody);

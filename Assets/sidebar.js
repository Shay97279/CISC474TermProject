class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `<div class="sidebar">
      <div class="row">Input Info</div>
      <form id="expenses">
        <label for="expenseName" style = "text-align:center;">Expense name:</label>
        <input type="text" id="expenseName" name="name">
        <label for="expenseCost" style = "text-align:center;">Expense Cost:</label>
        <input type="text" id="expenseCost" name="cost">
        <input type="submit" value="submit"><br>
      </form>
      <form id="assets">
        <label for="assetName" style = "text-align:center;">Asset name:</label>
        <input type="text" id="assetName" name="name">
        <label for="assetValue" style = "text-align:center;">Asset Value:</label>
        <input type="text" id="assetValue" name="cost">
        <input type="submit" value="Submit"><br>
      </form>
      <form id="income">
        <label for="monthlyIncome" style = "text-align:center;">Monthly Income:</label>
        <input type="text" id="monthlyIncome" name="name">
        <input type="submit" value="Submit"><br>
      </form>
      <form id="goals">
        <label for="goalName" style = "text-align:center;">Goal:</label>
        <input type="text" id="goalName" name="name">
        <label for="goalCost" style = "text-align:center;">Goal Cost:</label>
        <input type="text" id="goalCost" name="cost">
        <label for="goalDate" style = "text-align:center;">Goal Date:</label>
        <input type="text" id="goalDate" name="date">
        <input type="submit" value="Submit">
      </form>
</div>
      `;
    }
  }
  
  customElements.define('sidebar-component', Sidebar);
  
class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `<div class="sidebar">
      <div class="row">Input Info</div>
      <form id="expenses" method="post" action="/">
        <label for="expenseName">Expense name:</label>
        <input type="text" id="expenseName" name="expenseName">
        <label for="expenseCost">Expense Cost:</label>
        <input type="text" id="expenseCost" name="expenseCost">
        <input type="submit" value="submit">
      </form>
      <form id="assets">
        <label for="assetName">Asset name:</label>
        <input type="text" id="assetName" name="name">
        <label for="assetValue">Asset Value:</label>
        <input type="text" id="assetValue" name="cost">
        <input type="submit" value="Submit">
      </form>
      <form id="income">
        <label for="monthlyIncome">Monthly Income:</label>
        <input type="text" id="monthlyIncome" name="name">
        <input type="submit" value="Submit">
      </form>
      <form id="goals">
        <label for="goalName">Goal:</label>
        <input type="text" id="goalName" name="name">
        <label for="goalCost">Goal Cost:</label>
        <input type="text" id="goalCost" name="cost">
        <label for="goalDate">Goal Date:</label>
        <input type="text" id="goalDate" name="date">
        <input type="submit" value="Submit">
      </form>
</div>
      `;
    }
  }
  
  customElements.define('sidebar-component', Sidebar);
  
class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `
      <script>
    $(document).ready(function() {
      // Attach a submit event handler to the form
      var income_or_whatever;
      $("#expenses").submit(function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value from the input field
        var inputValue = $("#name").val();
        income_or_whatever = inputValue
        // Do something with the input values
        // We'll want one of these for each submit button, I guess?
        //Also, this makes the input value accessible in the scope of the script - 
        //Does that make it accessible to other elements on the page? Is it lost
        //when switching pages?
      });
    });
  </script>
</head>
  <div class="container">
    <div class="sibebarcol">
        <div class="row">Input Info</div>
        <form id="expenses">
          <label for="expenseName">Expense name:</label>
          <input type="text" id="expenseName" name="expenseName">
          <label for="expenseCost">Expense Cost:</label>
          <input type="text" id="expenseCost" name="expenseCost">
          <input type="submit" value="Submit">
        </form>
        <form id="assets">
          <label for="assetName">Asset name:</label>
          <input type="text" id="assetName" name="assetName">
          <label for="assetValue">Asset Value:</label>
          <input type="text" id="assetValue" name="assetValue">
          <input type="submit" value="Submit">
        </form>
        <form id="income">
          <label for="monthlyIncome">Monthly Income:</label>
          <input type="text" id="monthlyIncome" name="monthlyIncome">
          <input type="submit" value="Submit">
        </form>
        <form id="goals">
          <label for="goalName">Goal:</label>
          <input type="text" id="goalName" name="goalName">
          <label for="goalCost">Goal Cost:</label>
          <input type="text" id="goalCost" name="goalCost">
          <label for="goalDate">Goal Date:</label>
          <input type="text" id="goalDate" name="goalDate">
          <input type="submit" value="Submit">
        </form>
      </div>
  </div>
      `;
    }
  }
  
  customElements.define('sidebar-component', Sidebar);
  
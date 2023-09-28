class Sidebar extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `
      <style>
      .column {
        float: right;
      }
      </style>
      <div class="column">
        <div class="row">Input Info</div>
        <form action="/somethinggoeshere">
            <label for="name">Expense name:</label>
            <input type="text" id="name" name="name">
            <label for="lname">Expense Cost:</label>
            <input type="text" id="cost" name="cost">
            <input type="submit" value="Submit">
        </form> 
        <form action="/somethinggoeshere">
            <label for="name">Asset name:</label>
            <input type="text" id="name" name="name">
            <label for="lname">Asset Value:</label>
            <input type="text" id="cost" name="cost">
            <input type="submit" value="Submit">
        </form> 
        <form action="/somethinggoeshere">
            <label for="name">Monthly Income:</label>
            <input type="text" id="name" name="name">
            <input type="submit" value="Submit">
        </form> 
        <form action="/somethinggoeshere">
            <label for="name">Goal:</label>
            <input type="text" id="name" name="name">
            <label for="lname">Goal Cost:</label>
            <input type="text" id="cost" name="cost">
            <label for="lname">Goal Date:</label>
            <input type="text" id="date" name="date">
            <input type="submit" value="Submit">
        </form> 
      </div>
      `;
    }
  }
  
  customElements.define('sidebar-component', Sidebar);
  
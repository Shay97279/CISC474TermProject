class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `
      <nav>
        <div class="row">
          <a class="column" href="Pages/landing.html">Home</a>
          <a class="column" href="Pages/expenses.html">Expenses</a>
          <a class="column" href="Pages/projections.html">Projections</a>
          <a class="column" href="Pages/subscriptions.html">Subscriptions</a>
          <a class="column" href="Pages/assets.html">Assets</a>
          <a class="column" href="Pages/about.html">About</a>
          <a class="column" href="Pages/help.html">Finance Fundamentals</a>
        </div>
      </nav>
      `;
    }
  }
  
  customElements.define('header-component', Header);

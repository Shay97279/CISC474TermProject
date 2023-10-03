class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `
      <nav>
        <div class="row">
          <a class="column" href="landing.html">Home</a>
          <a class="column" href="expenses.html">Expenses</a>
          <a class="column" href="landing.html">Projections</a>
          <a class="column" href="expenses.html">Subscriptions</a>
          <a class="column" href="assets.html">Assets</a>
          <a class="column" href="index.html">About</a>
          <a class="column" href="landing.html">Help</a>
        </div>
      </nav>
      `;
    }
  }
  
  customElements.define('header-component', Header);
  
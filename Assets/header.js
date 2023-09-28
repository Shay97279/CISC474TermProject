class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `
      <header>
      <nav>
        <div class="row">
          <a class="column" href="landing.html">Home</a>
          <a class="column" href="expenses.html">Expenses</a>
          <a class="column" href="landing.html">Projections</a>
          <a class="column" href="expenses.html">Subscriptions</a>
          <a class="column" href="assets.html">Assets</a>
          <a class="column" href="landing.html">About</a>
          <a class="column" href="landing.html">Help</a>
        </div>
      </nav>
    </header>
      `;
    }
  }
  
  customElements.define('header-component', Header);
  
class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      //Could move the style stuff to a CSS file
      this.innerHTML = `
        <style>
          nav {
            height: 40px;
            align-items: center;
            justify-content: center;
            background-color:  #009a03;
          }
          
          a {
            font-weight: 700;
            margin: 0 25px;
            color: #fff;
            text-decoration: none;
          }
          
          a:hover {
            padding-bottom: 5px;
            box-shadow: inset 0 -2px 0 0 #fff;
          }
          .column {
            float: left;
            width: 14%;
          }
          
          /* Clear floats after the columns */
          .row:after {
            content: "";
            display: table;
            clear: both;
          }
        </style>
        <header>
          <nav>
            <div class="row">
              <div class="column">Home</div>
              <div class="column">Expenses</div>
              <div class="column">Projections</div>
              <div class="column">Subscriptions</div>
              <div class="column">Assets</div>
              <div class="column">About</div>
              <div class="column">Help</div>
            </div>
          </nav>
        </header>
      `;
    }
  }
  
  customElements.define('header-component', Header);
  
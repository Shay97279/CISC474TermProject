function addSub(event) {
    alert("clicked");
    let newSub = document.createElement('div');
    let subName = document.createElement('h1');
    let subPrice = document.createElement('h2');
    newSub.innerHTML = document.getElementById('subNameInput').value;
    subPrice.innerHTML = document.getElementById('subPriceInput').value;
    document.getElementById('container').appendChild(newSub);
    newSub.appendChild(subName);
    newSub.appendChild(subPrice);
    
    event.preventDefault();
  }
  document.addEventListener('submit', addSub);

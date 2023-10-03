function addSub(event) {
    //alert("clicked");
    //Getting values
    let subName = document.getElementById('expenseName').value;
    let subCost = document.getElementById('expenseCost').value;
    if (subName == "" || subCost == "") {
      alert("Please fill out all fields");
    }
    else{
    //Outer Div
    let newSub = document.createElement('div');
    newSub.className = "row";
    newSub.id = "subName";
    //Inner Div
    let newSubInner = document.createElement('h1');
    newSubInner.className = "name";
    newSubInner.innerHTML = subName;
    let newSubInner2 = document.createElement('h4');
    newSubInner2.className = "cost";
    newSubInner2.innerHTML = subCost;


    //Appending
    newSub.appendChild(newSubInner);
    newSub.appendChild(newSubInner2);
    document.getElementById('subList').appendChild(newSub);
    event.preventDefault();
  }
}
  document.addEventListener('submit', addSub);

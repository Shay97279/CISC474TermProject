// add asset to table and local storage
function addAsset() {
    var name = document.getElementById('name').value;
    var category = document.getElementById('category').value;
    var amount = document.getElementById('amount').value;
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex === '') {
        var assets = JSON.parse(localStorage.getItem('assets')) || [];
        assets.push({name: name, category: category, amount: amount});
        localStorage.setItem('assets', JSON.stringify(assets));
        var tableBody = document.getElementById('assetTable').getElementsByTagName('tbody')[0];
        var row = '<tr><td>' + name + '</td><td>' + category + '</td><td>' + amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteasset(this.parentNode.parentNode)">Delete</button></td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
        console.log("LOCAL STRG", localStorage.getItem('assets'))
    } else {
        editasset(editIndex, name, category, amount);
    }
    console.log(localStorage.getItem('assets'));

    resetForm();
    return false;
}

// reset the form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('editIndex').value = '';
    document.getElementById('addButton').innerHTML = 'Add asset';
}

// delete asset from table and local storage
function deleteasset(row) {
    row.parentNode.removeChild(row);
    var assets = JSON.parse(localStorage.getItem('assets'))
var rowIndex = row.rowIndex - 1;
assets.splice(rowIndex, 1);
localStorage.setItem('assets', JSON.stringify(assets));
}

// edit asset in form
function editForm(row) {
var rowIndex = row.rowIndex - 1;
var assets = JSON.parse(localStorage.getItem('assets')) || [];
var asset = assets[rowIndex];
document.getElementById('name').value = asset.name;
document.getElementById('category').value = asset.category;
document.getElementById('amount').value = asset.amount;
document.getElementById('editIndex').value = rowIndex;
document.getElementById('addButton').innerHTML = 'Update asset';
}

// edit asset in table and local storage
function editasset(index, name, category, amount) {
var assets = JSON.parse(localStorage.getItem('assets')) || [];
assets[index] = {name: name, category: category, amount: amount};
localStorage.setItem('assets', JSON.stringify(assets));
var tableRow = document.getElementById('assetTable').rows[index+1];
tableRow.cells[0].innerHTML = name;
tableRow.cells[1].innerHTML = category;
tableRow.cells[2].innerHTML = amount;
resetForm();
}

// show assets in table
function showassets() {
var assets = JSON.parse(localStorage.getItem('assets')) || [];
console.log("this is the curr ex", assets);
var tableBody = document.getElementById('assetTable').getElementsByTagName('tbody')[0];
for (var i = 0; i < assets.length; i++) {
    var asset = assets[i];
    var row = '<tr><td>' + asset.name + '</td><td>' + asset.category + '</td><td>' + asset.amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteasset(this.parentNode.parentNode)">Delete</button></td></tr>';
    tableBody.insertAdjacentHTML('beforeend', row);
    console.log( "HEY", asset.name, asset.category, asset.amount)
}
}

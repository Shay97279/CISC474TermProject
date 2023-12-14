
// add subscription to table and local storage
function addSubscription() {
    var date = document.getElementById('date').value;
    var category = document.getElementById('category').value;
    var amount = document.getElementById('amount').value;
    var editIndex = document.getElementById('editIndex').value;

    if (editIndex === '') {
        var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
        subscriptions.push({date: date, category: category, amount: amount});
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
        var tableBody = document.getElementById('subscriptionTable').getElementsByTagName('tbody')[0];
        var row = '<tr><td>' + date + '</td><td>' + category + '</td><td>' + amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteSubscription(this.parentNode.parentNode)">Delete</button></td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
        console.log("LOCAL STRG", localStorage.getItem('subscriptions'))
    } else {
        editSubscription(editIndex, date, category, amount);
    }

    resetForm();
    return false;
}

// reset the form
function resetForm() {
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('editIndex').value = '';
    document.getElementById('addButton').innerHTML = 'Add Subscription';
}

// delete subscription from table and local storage
function deleteSubscription(row) {
    row.parentNode.removeChild(row);
    var subscriptions = JSON.parse(localStorage.getItem('subscriptions'))
var rowIndex = row.rowIndex - 1;
subscriptions.splice(rowIndex, 1);
localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

// edit subscription in form
function editForm(row) {
var rowIndex = row.rowIndex - 1;
var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
var subscription = subscriptions[rowIndex];
document.getElementById('date').value = subscription.date;
document.getElementById('category').value = subscription.category;
document.getElementById('amount').value = subscription.amount;
document.getElementById('editIndex').value = rowIndex;
document.getElementById('addButton').innerHTML = 'Update Subscription';
}

// edit subscription in table and local storage
function editSubscription(index, date, category, amount) {
var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
subscriptions[index] = {date: date, category: category, amount: amount};
localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
var tableRow = document.getElementById('subscriptionTable').rows[index+1];
tableRow.cells[0].innerHTML = date;
tableRow.cells[1].innerHTML = category;
tableRow.cells[2].innerHTML = amount;
resetForm();
}

// show subscriptions in table
function showSubscriptions() {
var subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
console.log("this is the curr ex", subscriptions);
var tableBody = document.getElementById('subscriptionTable').getElementsByTagName('tbody')[0];
for (var i = 0; i < subscriptions.length; i++) {
    var subscription = subscriptions[i];
    var row = '<tr><td>' + subscription.date + '</td><td>' + subscription.category + '</td><td>' + subscription.amount + '</td><td><button type="button" class="btn btn-sm btn-primary" onclick="editForm(this.parentNode.parentNode)">Edit</button> <button type="button" class="btn btn-sm btn-danger" onclick="deleteSubscription(this.parentNode.parentNode)">Delete</button></td></tr>';
    tableBody.insertAdjacentHTML('beforeend', row);
    console.log( "HEY", subscription.date, subscription.category, subscription.amount)
}
}

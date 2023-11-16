let db = firebase.database();
function addSub() {
	//Getting values
	let newSub = document.createElement("div");
	newSub.className = "sub";
	let name = document.getElementById("expenseName").value;
	let cost = document.getElementById("expenseCost").value;
	newSub.id = "" + name + "";
	if (name == "" || cost == "" ){
		alert("Please fill out both fields");
		return;
	}
	document.getElementById("subscriptions").appendChild(newSub);
	$(name).html(`
	<div class="newName">
		<h2>${name}</h2>
	</div>
	<div class="newCost">
		<h4>${cost}<h4>
	</div>
	`);
	let subList = document.getElementById("subscriptions");
	
}
document.addEventListener("submit", function (event) {
	event.preventDefault();
	addSub();
});

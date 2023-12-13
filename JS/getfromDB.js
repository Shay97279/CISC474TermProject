function extractAssets(userdata, user){
    const newuser = userdata.find(entry => entry.firstName === user);
    console.log(newuser.income);
    return newuser.income;
}
function extractExpenses(userdata, user){
    const newuser = userdata.find(entry => entry.firstName === user);
    console.log(newuser.expenses);
    return newuser.expenses;
}


$('#getbutton').click(function(){
    $.ajax({
        url: '/user',
        type: 'GET',
        success: function(result) {
            console.log("Filter Returned");
            localStorage.setItem('users', JSON.stringify(result));
            localStorage.setItem('assets', JSON.stringify(extractAssets(result, "Jonathon")));
            localStorage.setItem('expenses', JSON.stringify(extractExpenses(result, "Jonathon")));
        }
    });
})
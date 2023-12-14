function signup() {
    $.ajax({
        url: `/api/v1/addUser?firstName=${document.getElementById("firstName").value}&lastName=${document.getElementById("lastName").value}&email=${document.getElementById("email").value}&password=${document.getElementById("password").value}`,
        type: 'POST',
        success: function(result) {
            console.log("new user");
            location.replace("http://localhost:8080/Pages/landing.html");
            const url = new URL(window.location.href);
            const resultStr = JSON.stringify(result);
            const unquoted = resultStr.replace(/\"/g, "");
            url.searchParams.set("id", unquoted);
            history.pushState({}, "", url);
        }
    })
}

function loginUser() {
    $.ajax({
        url: `/api/v1/login?email=${document.getElementById("inputEmail").value}&password=${document.getElementById("inputPassword").value}`,
        type: 'GET',
        success: function (result) {
            console.log("logged in");
            location.replace("http://localhost:8080/Pages/landing.html");
            const url = new URL(window.location.href);
            const resultStr = JSON.stringify(result);
            const unquoted = resultStr.replace(/\"/g, "");
            url.searchParams.set("id", unquoted);
            history.pushState({}, "", url);
        }
    });
}
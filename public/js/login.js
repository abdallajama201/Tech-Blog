const login = (event) => {
    event.preventDefault();
    const userName = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if(userName && password) {
        fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({userName, password}),
            headers: {"Content-Type" : "application/json"},
        }).then(function (res) {
            if(res.ok) {
                document.location.replace(`/dashboard`)
            }
        });
    }
}

document.querySelector(".loginForm").addEventListener("submit", login);
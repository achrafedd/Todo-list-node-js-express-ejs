const check = document.querySelectorAll(".check");
const span = document.querySelectorAll(".check ~ span");

for (let i = 0; i < check.length; i++) {
    check[i].addEventListener("click", async () => {
        span[i].classList.toggle("done");
        const res = await fetch("http://localhost:3000", {  
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: i + 1, done: check[i].checked, url: window.location.pathname}),
        })
    })
}
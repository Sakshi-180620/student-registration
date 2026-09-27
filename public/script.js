document.addEventListener("DOMContentLoaded", () => {
    // 1. Registration Logic
    const regForm = document.getElementById("regForm");
    if (regForm) {
        regForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const message = document.getElementById("message");

            if (password !== confirmPassword) {
                message.style.color = "red";
                message.textContent = "Passwords do not match!";
                return;
            }

           fetch("/api/students/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        email: email,
        password: password
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        message.style.color = "green";
        message.textContent = "Registration successful! Redirecting to login...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } else {
        message.style.color = "red";
        message.textContent = data.message;
    }
})
.catch(error => {
    console.log(error);
    message.style.color = "red";
    message.textContent = "Registration failed!";
});
        });
    }

    // 2. Login Logic
 // 2. Login Logic
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = document.getElementById("loginEmail").value.trim();
        const passwordInput = document.getElementById("loginPassword").value;
        const loginMessage = document.getElementById("loginMessage");

        fetch("/api/students/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("currentUser", data.student.name);
                window.location.href = "welcome.html";
            } else {
                loginMessage.style.color = "red";
                loginMessage.textContent = data.message;
            }
        })
        .catch(error => {
            console.log(error);
            loginMessage.style.color = "red";
            loginMessage.textContent = "Login failed!";
        });
    });
}

    // 3. Welcome Page Logic
    const welcomeGreeting = document.getElementById("welcomeGreeting");
    if (welcomeGreeting) {
        const currentUser = localStorage.getItem("currentUser") || "Student";
        welcomeGreeting.textContent = `Welcome ${currentUser}!`;

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                window.location.href = "login.html";
            });
        }
    }
});
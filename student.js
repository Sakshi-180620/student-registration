// Student App - Frontend Logic

const API_URL = 'http://localhost:3000/api/students';

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. REGISTRATION FORM LOGIC
    // ----------------------------------------------------
    const regForm = document.getElementById('registrationForm') || document.getElementById('regForm');
    
    if (regForm) {
        regForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showMessage('All required fields must be filled!', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email!', 'error');
                return;
            }

            if (phone && !isValidPhone(phone)) {
                showMessage('Please enter a valid 10-digit phone number!', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage('Password and Confirm Password do not match!', 'error');
                return;
            }

            // Create student payload (Course removed, Password added)
            const studentData = { name, email, phone, password };

            // Send to Registration API
            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(studentData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    showMessage('✓ Registration successful! Redirecting to login...', 'success');
                    regForm.reset();
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    showMessage('Registration failed: ' + data.message, 'error');
                }
            } catch (error) {
                showMessage('Error: ' + error.message, 'error');
                console.error('Registration Error:', error);
            }
        });
    }

    // ----------------------------------------------------
    // 2. LOGIN FORM LOGIC
    // ----------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                showMessage('Please enter both Email and Password!', 'error', 'loginMessage');
                return;
            }

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.success) {
                    // Save logged-in user name to LocalStorage for Welcome page
                    localStorage.setItem('loggedInUser', data.student.name);
                    window.location.href = 'welcome.html';
                } else {
                    showMessage(data.message || 'Invalid Email or Password!', 'error', 'loginMessage');
                }
            } catch (error) {
                showMessage('Error connecting to server!', 'error', 'loginMessage');
                console.error('Login Error:', error);
            }
        });
    }

    // ----------------------------------------------------
    // 3. WELCOME PAGE LOGIC
    // ----------------------------------------------------
    const welcomeHeading = document.getElementById('welcomeGreeting');
    if (welcomeGreeting) {
        const userName = localStorage.getItem('loggedInUser') || 'Student';
        welcomeGreeting.textContent = `Welcome ${userName}...`;

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        }
    }
});

// Helper: Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper: Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// Helper: Show message
function showMessage(msg, type, targetDivId = 'message') {
    const messageDiv = document.getElementById(targetDivId);
    if (!messageDiv) return;
    
    messageDiv.textContent = msg;
    messageDiv.className = type;
    messageDiv.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}

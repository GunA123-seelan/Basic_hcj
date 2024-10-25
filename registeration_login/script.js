document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');
    const formTitle = document.getElementById('formTitle');

    // Check if a user exists in localStorage
    const storedUser = localStorage.getItem('user');

    // If no user is stored, show the registration form
    if (!storedUser) {
        registrationForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        formTitle.innerText = 'Register';
    } else {
        registrationForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        formTitle.innerText = 'Login';
    }

    // Registration
    registerBtn.addEventListener('click', function () {
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        if (username && password) {
            const user = { username, password };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Registration successful! Now you can log in.');

            registrationForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            formTitle.innerText = 'Login';
        } else {
            alert('Please fill all fields.');
        }
    });

    // Login
    loginBtn.addEventListener('click', function () {
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && loginUsername === storedUser.username && loginPassword === storedUser.password) {
            alert('Login successful!');
            window.location.href = 'success.html'; // Redirect to success page
        } else {
            errorMsg.classList.remove('hidden');
        }
    });
});

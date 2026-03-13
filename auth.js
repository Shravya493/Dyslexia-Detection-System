// auth.js

document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.querySelector('form[action="viewprofile.html"]'); // For signup
    const loginForm = document.querySelector('#login-form'); // For login

    // Sign-Up Functionality
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Check if user already exists
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                alert('User already exists! Please log in.');
                window.location.href = 'login.html'; // Redirect to login if user exists
            } else {
                // Save new user info in localStorage
                const newUser = { name: name, email: email, password: password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // Redirect to login page after sign-up
                alert('Sign-up successful! Please log in.');
                window.location.href = 'login.html';
            }
        });
    }

    // Login Functionality
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const loginEmail = document.getElementById('login-email').value;
            const loginPassword = document.getElementById('login-password').value;

            // Retrieve users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === loginEmail && user.password === loginPassword);

            if (user) {
                // Save logged-in user info in session (for the current session only)
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                
                // Redirect to profile page
                alert('Login successful!');
                window.location.href = 'viewprofile.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }

    // Display user info on profile page
    if (window.location.pathname.includes('viewprofile.html')) {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            document.querySelector('h2').innerHTML = `Welcome, ${loggedInUser.name}`;
            document.querySelector('p').innerHTML = `Your email: ${loggedInUser.email}`;
        } else {
            alert('No user is logged in.');
            window.location.href = 'login.html'; // Redirect to login if no user is logged in
        }
    }
});

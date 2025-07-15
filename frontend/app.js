const API_BASE_URL = 'http://localhost:30001/api';

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (token) {
        fetchUserProfile();
    }
});

// Toggle between login and register forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
    
    // Clear messages
    document.getElementById('loginMessage').innerHTML = '';
    document.getElementById('registerMessage').innerHTML = '';
}

// Handle login form submission
document.getElementById('login').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            showUserDashboard(data.user);
            showMessage('loginMessage', 'Login successful!', 'success');
        } else {
            showMessage('loginMessage', data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showMessage('loginMessage', 'Network error. Please try again.', 'error');
    }
});

// Handle register form submission
document.getElementById('register').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            showUserDashboard(data.user);
            showMessage('registerMessage', 'Registration successful!', 'success');
        } else {
            const errorMsg = data.errors ? 
                data.errors.map(err => err.msg).join(', ') : 
                data.message || 'Registration failed';
            showMessage('registerMessage', errorMsg, 'error');
        }
    } catch (error) {
        showMessage('registerMessage', 'Network error. Please try again.', 'error');
    }
});

// Fetch user profile
async function fetchUserProfile() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const user = await response.json();
            showUserDashboard(user);
        } else {
            localStorage.removeItem('token');
            showLoginForm();
        }
    } catch (error) {
        localStorage.removeItem('token');
        showLoginForm();
    }
}

// Show user dashboard
function showUserDashboard(user) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('userDashboard').classList.remove('hidden');
    
    document.getElementById('userDetails').innerHTML = `
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><strong>Member since:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
    `;
}

// Show login form
function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('userDashboard').classList.add('hidden');
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    showLoginForm();
    
    // Clear forms
    document.getElementById('login').reset();
    document.getElementById('register').reset();
    document.getElementById('loginMessage').innerHTML = '';
    document.getElementById('registerMessage').innerHTML = '';
}

// Show message helper
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="${type}">${message}</div>`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        element.innerHTML = '';
    }, 5000);
}
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Client-side validation
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phoneNo = document.getElementById('phoneNo').value;

    if (!username || !password || !fullName || !email || !phoneNo) {
        alert('Please fill in all required fields.');
        return;
    }

    // Basic password strength validation (you can add more stringent checks)
    if (password.length < 8) {
        alert('Password should be at least 8 characters long.');
        return;
    }

    // Prepare data for submission
    const formData = {
        username,
        password,
        fullName,
        email,
        phoneNo
    };

    // Make a POST request to the signup endpoint
    fetch('http://localhost:2020/api/customer/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                // Successful signup
                alert('Signup successful!');
                console.log('Redirecting to homepage...');
                window.location.href = 'index.html'; // Redirect to login page
            } else {
                // Signup failed
                alert('Signup failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Signup failed. Please try again.');
        });
});

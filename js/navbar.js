
function generateNavbar() {
    // Fetch the content of navbar.html using AJAX or a server-side include
    $.get('templates/navbar-footer.html', function (navbarContent) {
        // Append the content to the navbar element
        $('#navbar').html(navbarContent);
    });
}

generateNavbar();


document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    const modal = document.getElementById('loginModal');
    const closeModalBtn = modal.querySelector('.close');

    const openModal = () => {
        modal.style.display = 'block';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    loginButton.addEventListener('click', openModal);

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('https://bookingsystem.azurewebsites.net/api/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const authenticatedCustomer = await response.json();
                // Perform actions after successful login, e.g., redirect to homepage
                window.location.href = 'index.html';
            } else {
                // Handle unsuccessful login
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            alert("An error occurred during login. Please try again later.");
        }
    });
});
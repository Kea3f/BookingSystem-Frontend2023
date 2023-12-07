document.addEventListener('DOMContentLoaded', async function () {
    // Function to open the dropdown
    function openDropdown() {
        const dropdownContent = document.getElementById("cancellationDropdown");
        if (dropdownContent) {
            dropdownContent.style.display = "block";
        }
    }

// Function to close the dropdown
    function closeDropdown() {
        const dropdownContent = document.getElementById("cancellationDropdown");
        if (dropdownContent) {
            dropdownContent.style.display = "none";
        }
    }

    // Function to navigate to a page
    function navigateTo(page) {
        window.location.href = page;
    }

    // Function to toggle the modal
    function toggleModal() {
        modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
    }

    // Fetch and append navbar content
    async function generateNavbar() {
        try {
            const response = await fetch('templates/navbar-footer.html');
            if (response.ok) {
                const navbarContent = await response.text();
                $('#navbar').html(navbarContent);
            } else {
                console.error('Failed to load navbar content.');
            }
        } catch (error) {
            console.error('Error occurred during navbar content fetch:', error);
        }
    }


    // Event listener for the dropdown button
    document.getElementById("dropdownBtnContact").addEventListener("click", function () {
        openDropdown();
    });

    // Event listener to close the dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!event.target.closest("#cancellationDropdown")) {
            closeDropdown();
        }
    });

    // Event listeners for buttons
    document.getElementById('logo-button').addEventListener('click', function () {
        navigateTo('index.html');
    });

    document.getElementById('aboutme-button').addEventListener('click', function () {
        navigateTo('aboutmepage.html');
    });

    document.getElementById('treatments-button').addEventListener('click', function () {
        navigateTo('treatments.html');
    });

    document.getElementById('booking-button').addEventListener('click', function () {
        navigateTo('booking.html');
    });

    // Modal related code
    const loginButton = document.getElementById('login-button');
    const modal = document.getElementById('loginModal');
    const closeModalBtn = modal.querySelector('.close');

    loginButton.addEventListener('click', toggleModal);

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', toggleModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal();
        }
    });

    // Generate navbar content
    await generateNavbar();
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('https://bookingsystem.azurewebsites.net/api/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
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


window.openDropdown = openDropdown;
window.closeDropdown = closeDropdown;
window.navigateTo = navigateTo;
window.toggleModal = toggleModal;
window.generateNavbar = generateNavbar;
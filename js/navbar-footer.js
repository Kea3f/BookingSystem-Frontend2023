document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the dropdown button
    document.getElementById("dropdownBtnContact").addEventListener("click", function () {
        toggleDropdown();
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
});

function toggleDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
}

function closeDropdown() {
    var dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = 'none';
}

function navigateTo(page) {
    window.location.href = page;
}

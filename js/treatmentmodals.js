document.addEventListener("DOMContentLoaded", function () {
    // Get all modal triggers
    const modalTriggers = document.querySelectorAll(".modal-trigger");

    // Attach click event to each modal trigger
    modalTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            const modalId = this.dataset.modal; // Get the modal ID from the data attribute
            const modal = document.getElementById(modalId);

            // Display the modal
            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    // Get all modal close buttons
    const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

    // Attach click event to each modal close button
    modalCloseButtons.forEach(function (closeButton) {
        closeButton.addEventListener("click", function () {
            const modalId = this.dataset.modalClose; // Get the modal ID from the data attribute
            const modal = document.getElementById(modalId);

            // Close the modal
            if (modal) {
                modal.style.display = "none";
            }
        });
    });

    // Get all card elements
    const cardElements = document.querySelectorAll(".card");

    // Attach click event to each card element
    cardElements.forEach(function (card) {
        card.addEventListener("click", function () {
            const modalId = this.dataset.modal; // Get the modal ID from the data attribute of the card
            const modal = document.getElementById(modalId);

            // Display the modal
            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    // Add click event to close modal when clicking outside
    document.addEventListener("mouseup", function (event) {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(function (modal) {
            const modalContent = modal.querySelector(".modal-content");
            if (!modalContent.contains(event.target)) {
                modal.style.display = "none";
            }
        });
    });
});

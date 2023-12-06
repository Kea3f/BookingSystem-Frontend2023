document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    const forgotPasswordModal = document.getElementById('passwordResetModal');
    const closeForgotPasswordModalBtn = forgotPasswordModal.querySelector('.close');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');

    forgotPasswordBtn.addEventListener('click', () => {
        forgotPasswordModal.style.display = 'block';
        emailInput.value = '';
        successMessage.style.display = 'none';
    });
    if (closeForgotPasswordModalBtn) {
        closeForgotPasswordModalBtn.addEventListener('click', () => {
            forgotPasswordModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
    });

    const sendEmailBtn = document.getElementById('sendEmailBtn');
    sendEmailBtn.addEventListener('click', () => {
        // Perform the logic to send the email (you may use AJAX or a backend service)
        // For now, let's just show the success message
        successMessage.style.display = 'block';
    });
});

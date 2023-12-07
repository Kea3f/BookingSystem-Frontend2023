document.write(`
    <div id="navbar">
        <img src="../static/img/logo.png" onclick="location.href='homepage.html'" style="cursor: pointer;" id="logo-button" alt="logo">

        <div id="navbarbuttons">
            <button class="navbar-button aboutme-button" onclick="location.href='aboutmepage.html'">About me</button>
            <button class="navbar-button aboutme-button" onclick="location.href='treatments.html'">Treatments</button>
            <button class="navbar-button aftercare-button" onclick="location.href='aftercare.html'">Aftercare</button>
            <button class="navbar-button booking-button" onclick="location.href='booking.html'">Booking</button>

            <div class="dropdown" id="cancellationDropdown">
                <button class="navbar-button" id="dropdownBtnContact">Contact</button>
                <div class="dropdown-content">
                    <ul>
                        <li><a href="contactpage.html"  data-modal-target="contactmodal">Contact</a></li>
                        <li><a href="cancellationpage.html" data-modal-target="cancellationmodal">Cancellation policy</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="instagram">
            <button id="instagrambtn">
                <a href="https://www.instagram.com/lashesbybiran/" target="_blank">
                    <i class="fab fa-instagram" style="color: #000000; font-size: 24px;"></i>
                </a>
            </button>
        </div>

        <div id="login-container">
            <button id="login-button" class="navbar-button login-button" >Login</button>
        </div>

        <!-- login Modal HTML -->
        <div id="loginModal" class="modal">
            <div class="modal-content">
                <h2>Login into your account</h2>
                <div class="signup">
                    <p>Don't have an account yet? <a href="signup.html" class="signup-link">Create account here</a></p>
                </div>
                <form id="login-form">
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Enter your e-mail address" required>
                    </div>
                    <div class="form-group">
                        <input type="password" id="password" name="password" placeholder="Enter your password" required>
                    </div>
                    <button type="submit">Login</button>
                    <button id="forgotPasswordBtn">Forgot password?</button>
                </form>
            </div>
        </div>
        <div id="passwordResetModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Enter your e-mail to receive the forgotten password:</p>
                <input type="email" id="emailInput" placeholder="Enter your email">
                <button id="sendEmailBtn">Send Email</button>
                <p id="successMessage" style="display: none;">An e-mail with the password has been sent</p>
            </div>
        </div>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="../static/css/navbar-footer.css">
    <link rel="stylesheet" href="../static/css/login.css">
    <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../static/js/navbar-footer.js"></script>
    <script src="../static/js/password-modal.js"></script>
    <script src="../static/js/login.js"></script>
`);

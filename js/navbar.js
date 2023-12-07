function generateNavbar() {
    // Fetch the content of navbar.html using AJAX or a server-side include
    $.get('templates/navbar-footer.html', function (navbarContent) {
        // Append the content to the navbar element
        $('#navbar').html(navbarContent);
    });
}

generateNavbar();

// Getting references to our form and inputs
function handleLoginSignup(formName, url) {
    // When the form is submitted, we validate there's an email and password entered
    $(formName).on("submit", function (event) {
        event.preventDefault();
        $(".container").hide();
        var userData = {
            email: $(this).find('input.email-input').val().trim(),
            password: $(this).find('input.password-input').val().trim()
        };
        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password we run the authUser function and clear the form
        console.log('in event handler');
        authUser(userData.email, userData.password);
        $(this).find('input.email-input').val("");
        $(this).find('input.password-input').val("")
    });
    // AUTHUser does a post to the url and if successful, redirects us the the members page
    function authUser(email, password) {
        
        $.post(url, {
            email: email,
            password: password
        }).then(function (data) {
            console.log(Date)
            window.location.replace(data);
            // If there's an error, log the error
        }).catch(handleAuthErr);
    }
    function handleAuthErr(err) {
        $(".container").show();
        $("#alert.msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
}
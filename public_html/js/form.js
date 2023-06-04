$(document).ready(function () {
  $("#login-form").submit(function (e) {
    e.preventDefault();
    const email = $("#login-email").val();
    const password = $("#login-password").val();
    $.ajax({
      url: "/submit_login",
      method: "POST",
      data: {
        email,
        password,
      },
      success: function (response) {
        // Handle successful login here
        console.log(response);
      },
      error: function (err) {
        // Handle error here
        console.error(err);
      },
    });
  });

  $("#register-form").submit(function (e) {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    const firstname = $("#firstname").val();
    const lastname = $("#lastname").val();
    $.ajax({
      url: "/submit_registration",
      method: "POST",
      data: {
        email,
        password,
        firstname,
        lastname,
      },
      success: function (response) {
        // Handle successful registration here
        console.log(response);
      },
      error: function (err) {
        // Handle error here
        console.error(err);
      },
    });
  });
});

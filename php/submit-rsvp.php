<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $allergies = isset($_POST["allergies"]) ? implode(", ", $_POST["allergies"]) : "None";
    $accept = $_POST["accept"];

    // Save data to a file
    $file = "rsvp_data.txt";
    $data = "Name: {$name}\nEmail: {$email}\nAllergies: {$allergies}\nAccept: {$accept}\n\n";
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
    // Send data via email
    $to = "cargonriv@gmail.com";
    $subject = "New RSVP";
    $message = "Name: {$name}\nEmail: {$email}\nAllergies: {$allergies}\nAccept: {$accept}\n\n";
    $headers = "From: cargonriv@gmail.com" . "\r\n" .
            "Reply-To: cargonriv@gmail.com" . "\r\n" .
            "X-Mailer: PHP/" . phpversion();

    mail($to, $subject, $message, $headers);

    // Redirect to a thank you page
    header("Location: thank-you.html");
    exit();
} else {
    // Redirect to the RSVP form if not a POST request
    header("Location: rsvp.html");
    exit();
}

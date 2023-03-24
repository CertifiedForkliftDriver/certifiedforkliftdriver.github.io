<?php
// Change these values to match your database credentials
$servername = "localhost";
$username = "id20486405_neiel";
$password = "istink321.";
$dbname = "id20486405_login_info";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the username and password from the login form
$user = $_POST["username"];
$pass = $_POST["password"];

// Insert the username and password into a table called "users"
$sql = "INSERT INTO users (username, password) VALUES ('$user', '$pass')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
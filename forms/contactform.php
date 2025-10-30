<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = array(
    "name" => $_POST["name"],
    "email" => $_POST["email"],
    "subject" => $_POST["subject"],
    "message" => $_POST["message"]
  );

  $url = "https://script.google.com/macros/s/AKfycbz9u-iVyuoIQOo1CDku0L3A_9T4iGA8miyvmdaFyaLR-dv5BTj_RbXsUUjcHIld3pfj/exec"; // Replace with your actual Web App URL

  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

  $result = curl_exec($ch);
  $error = curl_error($ch);
  curl_close($ch);

  if ($result === FALSE || $error) {
    echo "Error sending data: " . $error;
  } else {
    echo "OK";
  }
}
?>

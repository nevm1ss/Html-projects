<?php
// Подключение к базе данных
$servername = "mysql-188944.srv.hoster.ru";
$username = "srv188944_nevm";
$password = "yG69tL5u9Y";
$dbname = "srv188944_nevm";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Генерация ключа
$key = generate_key();

// Запись ключа в базу данных
$sql = "INSERT INTO KeyTables (KeyActivation) VALUES ('$key')";
if ($conn->query($sql) === TRUE) {
  echo "Key generated and saved successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Функция для генерации ключа
function generate_key() {
  $key = '';
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for ($i = 0; $i < 16; $i++) {
    $index = rand(0, strlen($characters) - 1);
    $key .= $characters[$index];
  }
  return $key;
}

$conn->close();
?>

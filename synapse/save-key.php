<?php

$host = 'mysql-188944.srv.hoster.ru'; // хост базы данных
$user = 'srv188944_nevm'; // имя пользователя базы данных
$password = 'yG69tL5u9Y'; // пароль пользователя базы данных
$dbname = 'srv188944_nevm'; // имя базы данных

$conn = mysqli_connect($host, $user, $password, $dbname); // подключаемся к базе данных
if (!$conn) {
  die('Ошибка подключения: ' . mysqli_connect_error());
}

$key = mysqli_real_escape_string($conn, $_POST['key']); // получаем ключ из POST-запроса и экранируем его
$timestamp = mysqli_real_escape_string($conn, $_POST['timestamp']); // получаем время из POST-запроса и экранируем его

$sql = "INSERT INTO 'keys' ('key') VALUES ('$key')"; // формируем SQL-запрос
//$sql = INSERT INTO `keys` (`key`) VALUES ('werwefwf');
if (mysqli_query($conn, $sql)) {
  echo 'Ключ успешно сохранен в базе данных'; // отправляем ответ клиенту
} else {
  echo 'Ошибка сохранения ключа в базе данных: ' . mysqli_error($conn); // отправляем ответ клиенту
}

mysqli_close($conn); // закрываем соединение с базой данных
function generateKey() {
    // Создание объекта XMLHttpRequest для отправки запроса на сервер
    let xhr = new XMLHttpRequest();
    
    // Установка функции обратного вызова для обработки ответа от сервера
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };
    
    // Отправка запроса на сервер для генерации ключа и сохранения его в базе данных
    xhr.open("GET", "save-key.php", true);
    xhr.send();
  }
  
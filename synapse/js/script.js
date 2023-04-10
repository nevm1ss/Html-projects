const generateKeyBtn = document.getElementById('generate-key-btn');

generateKeyBtn.addEventListener('click', () => {
  const key = generateKey(); // генерируем ключ
  sendKeyToServer(key); // отправляем ключ на сервер
});

function generateKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // доступные символы
  let key = '';
  for (let i = 0; i < 16; i++) { // генерируем ключ из 16 символов
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters[randomIndex];
  }
  return key;
}

function sendKeyToServer(key) {
  const xhr = new XMLHttpRequest();
  const url = 'save-key.php'; // путь к файлу на сервере, который будет сохранять ключ в базе данных

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText); // выводим ответ сервера в консоль
    }
  };
  xhr.send(`key=${key}`); // отправляем ключ и время на сервер
}
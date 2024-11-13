// Отримуємо елемент canvas і його контекст для малювання
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Встановлюємо розмір одного блоку змійки та початкові значення
const boxSize = 20;
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Початкове розташування змійки
let direction = "RIGHT"; // Початковий напрямок руху змійки
let food = {
  x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize, // Випадкове розташування їжі по x
  y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize, // Випадкове розташування їжі по y
};
let score = 0; // Початковий рахунок
let game; // Змінна для зберігання інтервалу гри

// Елементи для звуку та іконка звуку
const gameSound = document.getElementById("gameSound");
const endGameSound = document.getElementById("endGameSound");
const soundIcon = document.getElementById("soundIcon");
let isSoundOn = true; // Змінна для контролю звуку

// Слухач подій для зміни напрямку руху змійки
document.addEventListener("keydown", changeDirection);

// Змінює напрямок змійки залежно від натиснутої клавіші
function changeDirection(event) {
  if (event.key === "w" && direction !== "DOWN") direction = "UP";
  else if (event.key === "s" && direction !== "UP") direction = "DOWN";
  else if (event.key === "a" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "d" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ц" && direction !== "DOWN") direction = "UP";
  else if (event.key === "і" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ф" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "в" && direction !== "LEFT") direction = "RIGHT";
}

// Малює гру на canvas
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищуємо canvas

  // Малюємо кожен сегмент змійки
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "green" : "lime"; // Голову змійки робимо зеленішою
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
  });

  // Малюємо їжу червоним кольором
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Створюємо нову голову змійки залежно від напрямку
  const head = { ...snake[0] };
  if (direction === "UP") head.y -= boxSize;
  else if (direction === "DOWN") head.y += boxSize;
  else if (direction === "LEFT") head.x -= boxSize;
  else if (direction === "RIGHT") head.x += boxSize;

  // Перевіряємо, чи з'їла змійка їжу
  if (head.x === food.x && head.y === food.y) {
    score += 10; // Збільшуємо рахунок
    document.getElementById("score").innerText = `Очки: ${score}`; // Оновлюємо відображення рахунку
    food = { // Переміщаємо їжу на нове випадкове місце
      x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
      y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
  } else {
    snake.pop(); // Якщо їжу не з'їли, видаляємо останній сегмент змійки
  }

  // Перевірка на зіткнення (з межами canvas або з тілом змійки)
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game); // Зупиняємо гру
    gameSound.pause(); // Зупиняємо звук гри
    gameSound.currentTime = 0; // Перемотуємо звук на початок
    endGameSound.play(); // Відтворюємо звук завершення гри
    alert("Гру закінчено! Ваші очки: " + score); // Повідомлення про завершення гри
    resetGame(); // Скидаємо гру до початкового стану
  } else {
    snake.unshift(head); // Додаємо нову голову змійки на початок
  }
}

// Запускає гру
function startGame() {
  clearInterval(game); // Очищуємо інтервал, якщо гра вже запущена
  score = 0; // Скидаємо рахунок
  document.getElementById("score").innerText = `Очки: ${score}`; // Відображаємо початковий рахунок
  snake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Встановлюємо початкову позицію змійки
  direction = "RIGHT"; // Встановлюємо початковий напрямок
  food = { // Встановлюємо початкову позицію їжі
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
  };
  if (isSoundOn) gameSound.play(); // Відтворюємо звук, якщо він увімкнений
  game = setInterval(drawGame, 200); // Запускаємо гру з інтервалом
}

// Скидає гру до початкового стану без перезапуску
function resetGame() {
  snake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Початкова позиція змійки
  direction = "RIGHT"; // Початковий напрямок
  food = { // Початкова позиція їжі
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
  };
  gameSound.pause(); // Зупиняємо звук гри
  gameSound.currentTime = 0; // Перемотуємо звук на початок
}

// Перемикає звук гри та оновлює іконку звуку
function toggleSound() {
  isSoundOn = !isSoundOn; // Змінюємо статус звуку
  if (isSoundOn) {
    soundIcon.src = "images/sound-on.svg"; // Іконка для увімкненого звуку
    gameSound.play(); // Відтворюємо звук
  } else {
    soundIcon.src = "images/sound-off.svg"; // Іконка для вимкненого звуку
    gameSound.pause(); // Зупиняємо звук
  }
}

const canvas = document.getElementById("gameCanvas"); // Отримуємо елемент canvas з HTML
const ctx = canvas.getContext("2d"); // Отримуємо контекст 2D для малювання на canvas

const boxSize = 20; // Визначаємо розмір кожного блоку змійки та їжі
let snake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Ініціалізуємо змійку в стартовій позиції
let direction = "RIGHT"; // Встановлюємо початковий напрямок руху змійки
let food = { // Генеруємо початкову позицію їжі
  x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
  y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
};
let score = 0; // Ініціалізуємо рахунок
let game; // Змінна для збереження ідентифікатора таймера гри

document.addEventListener("keydown", changeDirection); // Додаємо обробник події клавіатури

// Функція для зміни напрямку змійки в залежності від натиснутої клавіші
function changeDirection(event) {
  if (event.key === "w" && direction !== "DOWN") direction = "UP"; // Зміна на "UP" за натискання "w"
  else if (event.key === "s" && direction !== "UP") direction = "DOWN"; // Зміна на "DOWN" за натискання "s"
  else if (event.key === "a" && direction !== "RIGHT") direction = "LEFT"; // Зміна на "LEFT" за натискання "a"
  else if (event.key === "d" && direction !== "LEFT") direction = "RIGHT"; // Зміна на "RIGHT" за натискання "d"
}

// Основна функція для малювання гри
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаємо canvas для нового кадру

  // Малюємо змійку
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "green" : "lime"; // Голова змійки - зелена, інші сегменти - лаймові
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize); // Малюємо сегмент змійки
    ctx.strokeRect(segment.x, segment.y, boxSize, boxSize); // Малюємо контур сегмента
  });

  ctx.fillStyle = "red"; // Встановлюємо колір для їжі
  ctx.fillRect(food.x, food.y, boxSize, boxSize); // Малюємо їжу

  const head = { ...snake[0] }; // Копіюємо голову змійки для розрахунків
  // Оновлюємо позицію голови в залежності від напрямку
  if (direction === "UP") head.y -= boxSize;
  else if (direction === "DOWN") head.y += boxSize;
  else if (direction === "LEFT") head.x -= boxSize;
  else if (direction === "RIGHT") head.x += boxSize;

  // Перевіряємо, чи змійка з'їла їжу
  if (head.x === food.x && head.y === food.y) {
    score += 10; // Збільшуємо рахунок
    document.getElementById("score").innerText = `Очки: ${score}`; // Оновлюємо відображення рахунку
    food = { // Генеруємо нову позицію для їжі
      x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
      y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
  } else {
    snake.pop(); // Якщо їжа не з'їдена, видаляємо останній сегмент змійки
  }

  // Перевіряємо, чи гра закінчена (зіткнення зі стіною або з самим собою)
  if (
    head.x < 0 || head.y < 0 || 
    head.x >= canvas.width || head.y >= canvas.height || 
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(game); // Зупиняємо гру
    alert("Гру закінчено! Ваші очки: " + score); // Виводимо повідомлення про закінчення гри
    score = 0; // Скидаємо рахунок
    document.getElementById("score").innerText = `Очки: ${score}`; // Оновлюємо відображення рахунку
    resetGame(); // Скидаємо гру
  }

  snake.unshift(head); // Додаємо нову голову до змійки
}

// Функція для старту гри
function startGame() {
  clearInterval(game); // Запобігаємо запуску декількох інтервалів
  score = 0; // Скидаємо рахунок
  document.getElementById("score").innerText = `Очки: ${score}`; // Оновлюємо відображення рахунку
  snake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Відновлюємо початкову позицію змійки
  direction = "RIGHT"; // Встановлюємо початковий напрямок
  food = { // Генеруємо початкову позицію їжі
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
  };
  game = setInterval(drawGame, 200); // Запускаємо цикл гри
}

// Функція для скидання гри
function resetGame() {
  snake = [{ x: 10 * boxSize, y: 10 * boxSize }]; // Відновлюємо позицію змійки
  direction = "RIGHT"; // Встановлюємо початковий напрямок
  food = { // Генеруємо нову позицію для їжі
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
  };
}

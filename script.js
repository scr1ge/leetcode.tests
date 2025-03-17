const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Изображения
const elonImg = new Image();
elonImg.src = "https://i.imgur.com/NhU5Xov.png"; // Голова Илона Маска

const pipeTopImg = new Image();
pipeTopImg.src = "https://i.imgur.com/4ZQZQ9u.png"; // Верхняя труба

const pipeBottomImg = new Image();
pipeBottomImg.src = "https://i.imgur.com/4ZQZQ9u.png"; // Нижняя труба

// Настройки игры
let elon = { x: 50, y: 150, width: 40, height: 40, gravity: 0.3, lift: -8, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;
const pipeGap = 180; // Увеличенное расстояние между колоннами
const pipeSpeed = 1.5; // Уменьшенная скорость труб

// Отрисовка персонажа
function drawElon() {
    ctx.drawImage(elonImg, elon.x, elon.y, elon.width, elon.height);
}

// Обновление позиции персонажа
function updateElon() {
    elon.velocity += elon.gravity;
    elon.y += elon.velocity;

    // Ограничение, чтобы персонаж не вылетел за нижнюю границу
    if (elon.y + elon.height > canvas.height) {
        elon.y = canvas.height - elon.height;
        elon.velocity = 0;
    }
}

// Отрисовка труб
function drawPipes() {
    pipes.forEach(pipe => {
        // Верхняя труба
        ctx.drawImage(pipeTopImg, pipe.x, 0, pipe.width, pipe.top);

        // Нижняя труба
        ctx.drawImage(pipeBottomImg, pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
    });
}

// Обновление позиции труб
function updatePipes() {
    if (frame % 120 === 0) { // Увеличен интервал между появлением труб
        let topHeight = Math.random() * (canvas.height / 2) + 50; // Случайная высота верхней трубы
        pipes.push({ x: canvas.width, width: 60, top: topHeight, bottom: topHeight + pipeGap });
    }

    pipes.forEach(pipe => pipe.x -= pipeSpeed); // Медленное движение труб
    pipes = pipes.filter(pipe => pipe.x + pipe.width > 0); // Удаление труб за пределами экрана
}

// Проверка столкновений
function checkCollision() {
    for (let pipe of pipes) {
        if (elon.x < pipe.x + pipe.width && elon.x + elon.width > pipe.x) {
            if (elon.y < pipe.top || elon.y + elon.height > pipe.bottom) {
                resetGame();
            }
        }
    }
}

// Сброс игры
function resetGame() {
    elon.y = 150;
    elon.velocity = 0;
    pipes = [];
    score = 0;
    frame = 0;
}

// Отрисовка счета
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 20, 40);
}

// Основной игровой цикл
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateElon();
    updatePipes();
    checkCollision();
    drawElon();
    drawPipes();
    drawScore();

    frame++;
    if (frame % 120 === 0) score++; // Увеличение счета каждые 120 кадров

    requestAnimationFrame(gameLoop);
}

// Управление прыжком
document.addEventListener("keydown", () => { elon.velocity = elon.lift; });

// Запуск игры после загрузки изображений
elonImg.onload = gameLoop;

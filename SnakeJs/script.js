// Elementos del DOM
const tableroGame = document.getElementById('TableroGame');
const scoreBoard = document.getElementById('tableroScore');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');
// Game settings
const tableroSize = 10;
const gameSpeed = 100;
const typesSquares = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
}
// Game directions
const direction = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1,
}
// Game variables
let snake;
let score;
let directions;
let boardSquares;


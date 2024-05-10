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
let emptySquares;
let moveInterval;

const drawSnake = () => {
    snake.forEach (square => drawSquare(square, 'snakeSquare'));
}

// Rellena cada cuadrado del tablero
//@params
// square: posicion del cuadrado
// type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)
const drawSquare = (square, type) => {
    const [row, column] = square.split('');
    boardSquares[row][column] = typesSquares[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);
    if(type === 'emptySquare') {
        emptySquares.push(square);
    }else{
        if(emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}

const createBoard = () => {
    boardSquares.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            tableroGame.appendChild(squareElement);
            emptySquares.push(squareValue);
        });
    });
}

const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    directions ='ArrowRight';
    boardSquares = Array.from(Array(tableroSize), () => new Array(tableroSize).fill(typesSquares.emptySquare));
    console.log(boardSquares);
    tableroGame.innerHTML = '';
    emptySquares = [];
    createBoard();
}

const startGame = () => {
    setGame();
    gameOverSign.style.display = 'none';
    startButton.style.display = 'none';
    drawSnake();
}
 startButton.addEventListener('click', startGame);

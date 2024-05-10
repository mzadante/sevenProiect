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

const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0');
    const [row, column] = newSquare.split('');


    if( newSquare < 0 || 
        newSquare > tableroSize * tableroSize  ||
        (direction === 'ArrowRight' && column == 0) ||
        (direction === 'ArrowLeft' && column == 9 ||
        boardSquares[row][column] === squareTypes.snakeSquare) ) {
        gameOver();
    } else {
        snake.push(newSquare);
        if(boardSquares[row][column] === squareTypes.foodSquare) {
            addFood();
        } else {
            const emptySquare = snake.shift();
            drawSquare(emptySquare, 'emptySquare');
        }
        drawSnake();
    }
}

const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}
const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disabled = false;
}

const setDirection = newDirection => {
    directions = newDirection;
}

const directionEvent = key => {
    switch(key.code){
        case 'ArrowUp':
            directions !== 'ArrowDown' && setDirections(key.code);
            break;    
        case 'ArrowDown':
            directions !== 'ArrowUp' && setDirections(key.code);
            break;
        case 'ArrowRight':
            directions !== 'ArrowRight' && setDirections(key.code);
            break;
        case 'ArrowLeft':
            directions !== 'ArrowLeft' && setDirections(key.code);
            break;
        default:
            break;    
    }
}

const createRandomFood = () => {
    const randomEmptysquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptysquare, 'foodSquare');
}

const updateScore = () => {
    scoreBoard.innerText = score;
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
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval(moveSnake, gameSpeed);
}
 startButton.addEventListener('click', startGame);

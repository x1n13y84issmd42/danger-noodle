const math = require('./math.js')
const game = require('./game.js')
const snake = require('./snake.js')
const input = require('./input.js')

let theBoard = new game.Board(35, 20, '░');
let theSnake = new snake.Snake(new math.Point(theBoard.w / 2, theBoard.h / 2), 4, 'o');
let theInput = new input.Keyboard();

let dn = new game.Game(theBoard, theSnake, theInput, '✶');
dn.play();

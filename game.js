const math = require('./math.js');
const readline = require('readline');

module.exports.Board = class Board {
	constructor(w, h, symbol) {
		this.w = w;
		this.h = h;
		this.symbol = symbol;
	}
}

module.exports.Game = class Game {
	constructor(b, s, i, fruitSymbol) {
		this.board = b;
		this.snake = s;
		this.input = i;
		this.fruitSymbol = fruitSymbol;

		this.addFruit();

		this.input.on('left', () => {
			if (this.snake.direction.negation().equals(math.Left)) {
				return;
			}
			this.snake.direction = math.Left;
		});
		
		this.input.on('right', () => {
			if (this.snake.direction.negation().equals(math.Right)) {
				return;
			}
			this.snake.direction = math.Right;
		});
		
		this.input.on('up', () => {
			if (this.snake.direction.negation().equals(math.Up)) {
				return;
			}
			this.snake.direction = math.Up;
		});
		
		this.input.on('down', () => {
			if (this.snake.direction.negation().equals(math.Down)) {
				return;
			}
			this.snake.direction = math.Down;
		});
    }
    
    exit() {
        process.exit(0);
    }

	play() {
		setInterval(() => {
			this.snake.move(this.snake.direction);
			this.collisionCheck();
			this.render();
		}, 150);
	}

	collisionCheck() {
		if (this.snakeHitsWall()) {
			console.log("Snake has hit the wall. Game over.");
			this.exit();
		}
		
		if (this.snakeHitsItself()) {
			console.log("Snake has bit itself. Game over.");
			this.exit();
		}

		if (this.snakeEatsFruit()) {
			this.snake.grow();
			this.addFruit();
		}
	}

	snakeHitsWall() {
		let head = this.snake.getHead();
		return (head.x == 0 || head.x == this.board.w-1 || head.y == 0 || head.y == this.board.h-1);
	}
	
	snakeHitsItself() {
		return this.snake.hasPoint(this.snake.getHead(), true);
	}
	
	snakeEatsFruit() {
		return this.snake.getHead().equals(this.fruit);
	}

	addFruit() {
		let fpt = new math.Point(1 + Math.random() * (this.board.w - 3), 1 + Math.random() * (this.board.h - 3))
		while (this.snake.hasPoint(fpt)) {
			fpt = new math.Point(1 + Math.random() * (this.board.w - 3), 1 + Math.random() * (this.board.h - 3))
		}

		this.fruit = fpt;
	}

	render() {
		this.erase();

		for (let y=0; y<this.board.h; y++) {
			if (y == 0 || y == this.board.h-1) {
				for (let x=0; x<this.board.w; x++) {
					process.stdout.write(this.board.symbol);
				}
				console.log('');
			} else {
				process.stdout.write(this.board.symbol);
				for (let x=1; x<this.board.w-1; x++) {
					let pt = new math.Point(x, y);

					let ss = this.snake.symbolAtPoint(pt);
					if (ss) {
						process.stdout.write(ss);
					} else if (this.fruit.equals(pt)) {
						process.stdout.write(this.fruitSymbol);
					} else {
						process.stdout.write(' ');
					}
				}
				process.stdout.write(this.board.symbol);
				console.log('');
			}
		}
	}
	
	erase() {
		readline.cursorTo(process.stdout, 0, 0);
		readline.clearScreenDown(process.stdout);
	}
}

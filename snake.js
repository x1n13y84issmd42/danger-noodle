const math = require('./math.js');

module.exports.Snake = class Snake {
	constructor(position, length, symbol) {
        this.body = [position];
		this.symbol = symbol;
        this.direction = math.Down;

		while(--length) {
			this.grow(math.Up);
		}
	}

	grow(direction) {
		if (direction == undefined) {
			if (this.body.length == 1) {
				direction = math.Up;
			} else {
				direction = this.body[0].sub(this.body[1]);
			}
		}
		
		this.body.unshift(this.body[0].add(direction));
	}

	getHead() {
		return this.body[this.body.length-1];
	}

	move(direction) {
		let newHead = this.getHead().add(direction);
		let neck = this.body[this.body.length-2];

		if (this.body.length > 1 && newHead.x == neck.x && newHead.y == neck.y) {
			return;
		}

		this.body.push(newHead);
		this.body.shift();
	}

	symbolAtPoint(pt) {
		let head = this.getHead();
		if (head.equals(pt)) {
			if (this.direction.equals(math.Up))
				return '▲'
			if (this.direction.equals(math.Down))
				return '▼'
			if (this.direction.equals(math.Left))
				return '◄'
			if (this.direction.equals(math.Right))
				return '►'
		} else if (this.hasPoint(pt)) {
			return this.symbol;
		}

		return null;
	}

	hasPoint(pt, excludeHead) {
		let pIMax = this.body.length;
		if (excludeHead) {
			if (this.body.length > 1) {
				pIMax--;
			} else {
				return false;
			}
		}
		for (let pI=0; pI<pIMax; pI++) {
			if (this.body[pI].equals(pt)) {
				return true;
			}
		}

		return false;
	}
}

class Point {
	constructor(x, y) {
		this.x = Math.round(x);
		this.y = Math.round(y);
	}
	
	add(pt) {
		return new Point(this.x+pt.x, this.y+pt.y);
	}
	
	sub(pt) {
		return new Point(this.x-pt.x, this.y-pt.y);
	}

	equals(pt) {
		return this.x == pt.x && this.y == pt.y;
	}

	negation() {
		return new Point(-this.x, -this.y);
	}
}

module.exports.Point = Point;

module.exports.Up = new Point(0, -1);
module.exports.Down = new Point(0, 1);
module.exports.Left = new Point(-1, 0);
module.exports.Right = new Point(1, 0);

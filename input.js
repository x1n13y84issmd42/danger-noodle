const readline = require('readline');

module.exports.Keyboard = class Keyboard {
	constructor() {
		this.handlers = {};
		var stdin = process.stdin;
		readline.emitKeypressEvents(process.stdin);
		stdin.setRawMode( true );
		stdin.setEncoding('utf8');

		stdin.on('keypress', (str, key) => {
			if (key.name == "c" && key.ctrl) {
				process.exit(0);
			}
            
            if (key.name == "escape") {
				process.exit(0);
			}

			if (this.handlers[key.name]) {
				this.handlers[key.name]()
			}
		});
	}

	on(key, cb) {
		this.handlers[key] = cb
	}
}

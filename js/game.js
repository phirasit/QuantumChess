
var game = [];

// set turn 
// true : white
// false : black
game.turn = true;

// set table
game.table = [];

function getInitGame () {
	return [
		"",
		" RNBQKBNR",
		" PPPPPPPP",
		"         ",
		"         ",
		"         ",
		"         ",
		" pppppppp",
		" rnbqkbnr"
	];
}


// init game
function init() {
	
	game.table = getInitGame();

}

init();

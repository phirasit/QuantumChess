
// display the current game in board_id
function display( board_id ) {

	var i, j;
	for ( i = 1 ; i <= board_height ; i++ ) {
		for ( j = 1 ; j <= board_width ; j++ ) {

			const square_id = board_id + "_square" + i + j;
			var square = document.getElementById( square_id );

			square.setAttribute( "style", "" );
			
			// display the data
			square.innerText = game.table[i][j];

			// store the data
			square.data = game.table[i][j];
		}
	}
}

function checkTurn ( turn, data ) {
	if ( data == "" ) return false;
	if ( turn == true && 'a' <= data && data <= 'z' ) return true;
	if ( turn == false && 'A' <= data && data <= 'Z' ) return true;
	return false;
}

var Clicked = false;
var pausibleMoves = [];

function MouseOver( square ) {
	if ( not Clicked ) {
		if ( checkTurn( game.turn, square.data ) ) {
			square.setAttribute( "style", "cursor: pointer;");
		}
	} else {
		if ( pausibleMoves.indexOf ( square.id ) != -1 ) {
			square.setAttribute( "style", "cursor: pointer;");			
		}
	}
} 

// normal move
function MouseClick( square ) {


	display();
}
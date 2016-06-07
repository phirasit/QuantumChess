// functions that associate with square
var click = 0;
var plausibleMoves = [];
var position = [];

function squareOnMouseOver( square ) {

	if ( click == 0 ) {
		if ( checkTurn( game.turn, square.data ) ) {
			square.setAttribute( "style", "cursor: pointer;");
		}
	} else if ( click == 1 ) {
		if ( plausibleMoves.indexOf ( square.id ) != -1 ) {
			square.setAttribute( "style", "cursor: pointer;");			
		}
	} else if ( click == 2 ) {
		// do nothing
	} else {
		alert ( " error click more than 2 times " );
	}
} 

// normal move
function squareOnMouseClick( square ) {

	if ( click == 0 ) {
		if ( checkTurn( game.turn, square.data ) ) {
			plausibleMoves = calculateMoves ( square );
			position.push( square );
			click++;
		}
	} else if ( click == 1 ) {
		
		if ( plausibleMoves.indexOf( square.id ) != -1 ) {
			position.push( square );

			const pos = getPosition( square );
			game.position[ position[0].data ][0] = {
				x: pos.x,
				y: pos.y,
				prob: game.position[ position[0].data ][0].prob
			}

			switchTurn( game );

			position = [];
			click = 0;


			// click++;
		}
	} else if ( click == 2 ) {
		// do nothing
	} else {
		alert ( " error click more than 2 times " );		
	}

	display( game );
}

// quantum move

// undo move
function undoSelection() {
	if ( click == 1 ) {
		position = [];
		click = 0;
	}
}

// display the current game in board_name
const color = [ "BLACK", "WHITE" ];

function display( game ) {

	var i, j;
	for ( i = 1 ; i <= game.height ; i++ ) {
		for ( j = 1 ; j <= game.width ; j++ ) {
			var square = document.getElementById( getSquareId( game.name, i , j ) );
			square.setAttribute( "class", "square square" + color[ ( i + j ) % 2 ] );
			square.innerText = "";
			square.data = "";
			square.prob = 0;
		}
	}

	console.log( game.position );
	console.log( click );

	for ( var key in game.position ) {
		for ( var idx in game.position[key] ) {
			const square_id = getSquareId( game.name, game.position[key][idx].x, game.position[key][idx].y );

			var square = document.getElementById( square_id );

			square.prob += game.position[key][idx].prob;
			
			square.setAttribute( "style", "opacity: " + square.prob );
			square.innerText = key;
			square.data = key;

		}
	}

	if ( click == 1 ) {
		position[0].setAttribute( "class", "clicked" );
	}
}


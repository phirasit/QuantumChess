// functions that associate with square
var click = 0;
var plausibleMoves = [];
var moves = [];

var end = false;

function squareOnMouseOver( game, square ) {

	if ( end ) return;

	if ( click == 0 ) {
		if ( checkTurn( game, square.type[0] ) ) {
			square.setAttribute( "style", "cursor: pointer;");
		}
	} else if ( click == 1 ) {
		if ( plausibleMoves.indexOf ( square ) != -1 ) {
			square.setAttribute( "style", "cursor: pointer;");			
		}
	} else if ( click == 2 ) {
		if ( plausibleMoves.indexOf ( square ) != -1 ) {
			square.setAttribute( "style", "cursor: pointer;");			
		}
	} else {
		alert ( " error click more than 2 times " );
	}
} 

// normal move
function squareOnMouseClick( game, square ) {

	if ( end ) return;

	if ( click == 0 ) {
		if ( checkTurn( game, square.type[0] ) ) {
			moves.push( square );
			plausibleMoves = calculateMoves ( game, moves );
			click = 1;
		}
	} else if ( click == 1 ) {
		
		if ( plausibleMoves.indexOf( square ) != -1 ) {
			moves.push( square );
			if ( game.moveType == true ) {
				move( game, moves );
				switchTurn( game );

				moves = [];
				plausibleMoves = [];
				click = 0;
			} else {
				plausibleMoves = calculateMoves( game, moves );
				click = 2;
			}
		} else { 
			undoSelection( game );
		}
	} else if ( click == 2 ) {

		if( plausibleMoves.indexOf( square ) != -1 ) {
			moves.push( square );
			move( game, moves );
			switchTurn( game );
			plausibleMoves = [];
			moves = [];
			click = 0;
		} else {
			undoSelection( game );
		}

	} else {
		alert ( " error click more than 2 times " );		
	}

	display( game );
}

// quantum move

// undo move
function undoSelection( game, move_to = -1 ) {

	if ( end ) return;

	if ( move_to == 0 || ( move_to == -1 && click == 1 ) ) {
		plausibleMoves = [];
		moves = [];
		click = 0;
	} else if ( move_to == 1 || ( move_to == -1 && click == 2 ) ) {
		moves.pop();
		plausibleMoves = calculateMoves( game, moves );
		click = 1;
	} 

	display( game );
}

// swith move type
function switchMoveType ( game ) {
	game.moveType = !game.moveType;
	game.prompt( "using " + ( game.moveType ? "normal" : "quantum" ) + " move" );
	undoSelection( game, 0 );
}

// display the current game in board_name
const color = [ "BLACK", "WHITE" ];

function display( game ) {

	if ( end ) {
		return;
	}

	if ( getWinner( game ) != "" ) {
		end = true;
	}

	// reset every thing
	var i, j;
	for ( i = 1 ; i <= game.height ; i++ ) {
		for ( j = 1 ; j <= game.width ; j++ ) {
			var square = getSquare( game.name, i , j );
			square.setAttribute( "class", "square square" + color[ ( i + j ) % 2 ] );
			square.setAttribute( "style", "");

			square.innerText = "";

			square.data = [];
			square.type = " ";
			square.prob = 0.0;
		}
	}

	// console.log( game.position );
	// console.log( click );

	for ( var key in game.position ) {

		// recursively insert each piece
		postorder_dfs( game.position[key], function( node, prob ) {

			if ( node.square == null || prob == 0.0 ) return;

			var square = node.square;

			square.prob += prob;	
			square.setAttribute( "style", "opacity: " + square.prob );

			square.innerText = key;

			square.type = key;
			square.data.push( node );
		});
	}

	if ( click > 0 ) {
		for ( var key in plausibleMoves ) {
			var square = plausibleMoves[ key ];
			square.setAttribute( "class", square.getAttribute("class") + " possibleMove");
		}
		for ( var key in moves ) {
			moves[ key ].setAttribute( "class", "clicked" );
		}
	}

	if ( end ) {
		game.end( getWinner( game ) );
	}
}


// helper functions
function getPosition ( square ) {
	return {
		x: parseInt( square.id[ square.id.length - 2 ] ),
		y: parseInt( square.id[ square.id.length - 1 ] )
	};
}
function extractName ( id ) {
	return id.split('_')[0];
}
function getBoardId ( tag_name ) {
	return tag_name + "_board";
}
function getRowId ( tag_name, i ) {
	return tag_name + "_row" + i;
}
function getSquareId ( tag_name, i, j ) {
	return tag_name + "_square" + i + j;
}

// piece constructor
function piece( x, y, prob = 1.0 ) {
	return {
		x: x,
		y: y,
		prob: prob
	};
}

function getInitGame () {

	return {
		
		ROOK1 : 	[ piece(1, 1) ],
		KNIGHT1 : 	[ piece(1, 2) ],
		BISHOP1 : 	[ piece(1, 3) ],
		KING : 		[ piece(1, 4) ],
		QUEEN : 	[ piece(1, 5) ],
		BISHOP2 : 	[ piece(1, 6) ],
		KNIGHT2 : 	[ piece(1, 7) ],
		ROOK2 : 	[ piece(1, 8) ],

		PAWN1 : 	[ piece(2, 1) ],
		PAWN2 : 	[ piece(2, 2) ],
		PAWN3 : 	[ piece(2, 3) ],
		PAWN4 : 	[ piece(2, 4) ],
		PAWN5 : 	[ piece(2, 5) ],
		PAWN6 : 	[ piece(2, 6) ],
		PAWN7 : 	[ piece(2, 7) ],
		PAWN8 : 	[ piece(2, 8) ],

		rook1 : 	[ piece(8, 1) ],
		knight1 : 	[ piece(8, 2) ],
		bishop1 : 	[ piece(8, 3) ],
		king : 		[ piece(8, 4) ],
		queen : 	[ piece(8, 5) ],
		bishop2 : 	[ piece(8, 6) ],
		knight2 : 	[ piece(8, 7) ],
		rook2 : 	[ piece(8, 8) ],

		pawn1 : 	[ piece(7, 1) ],
		pawn2 : 	[ piece(7, 2) ],
		pawn3 : 	[ piece(7, 3) ],
		pawn4 : 	[ piece(7, 4) ],
		pawn5 : 	[ piece(7, 5) ],
		pawn6 : 	[ piece(7, 6) ],
		pawn7 : 	[ piece(7, 7) ],
		pawn8 : 	[ piece(7, 8) ]

	};
}

// check the validation of the turn
function checkTurn ( turn, data ) {
	if ( data == "" ) return false;
	if ( turn == true && 'a' <= data && data <= 'z' ) return true;
	if ( turn == false && 'A' <= data && data <= 'Z' ) return true;
	return false;
}

// check whether two points are reachable with the given piece of chess
function reach( type, pos1, pos2 ) {
	return true;
}

// calculate all plausible moves
function calculateMoves ( square ) {

	const tag_name = extractName( square.id );
	const type = square.data[0];
	var moves = [];

	var i, j;
	for ( i = 1 ; i <= board_width ; i++ ) {
		for ( j = 1 ; j <= board_width ; j++ ) {

			const sq = document.getElementById( getSquareId( tag_name, i, j ) );

			if ( reach( type, getPosition( square ), getPosition ( sq ) ) ) {
				moves.push( sq.id );
			}
		}
	}

	return moves;
}

// switch turn 
function switchTurn ( game ) {
	game.turn = !game.turn;
}

// initialized function
function init( game ) {	

	game.turn = true;

	if ( game.name.indexOf("_") != -1 ) {
		alert( "name_error : " + game.name );
	}

	game.position = getInitGame();
}


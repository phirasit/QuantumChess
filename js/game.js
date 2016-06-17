// helper functions
function getPosition ( square ) {
	return {
		x: parseInt( square.id[ square.id.length - 2 ] ),
		y: parseInt( square.id[ square.id.length - 1 ] )
	};
}
function getGameName ( square ) {
	return square.id.split('_')[0];
}
function getBoardId ( game_name ) {
	return game_name + "_board";
}
function getRowId ( game_name, i ) {
	return game_name + "_row" + i;
}

function getSquareId ( game_name, i, j ) {
	return game_name + "_square" + i + j;
}
function getSquare ( game_name, i, j ) {
	return document.getElementById( getSquareId( game_name, i, j ) );
}
// Piece constructor
function createPiece( game_name, x, y ) {
	return new tree( getSquare( game_name, x, y ) );
}

// initialize all position
function getInitGame ( game_name ) {

	return {
		
		ROOK1 : 	createPiece( game_name, 1, 1 ),
		KNIGHT1 : 	createPiece( game_name, 1, 2 ),
		BISHOP1 : 	createPiece( game_name, 1, 3 ),
		KING : 		createPiece( game_name, 1, 4 ),
		QUEEN : 	createPiece( game_name, 1, 5 ),
		BISHOP2 : 	createPiece( game_name, 1, 6 ),
		KNIGHT2 : 	createPiece( game_name, 1, 7 ),
		ROOK2 : 	createPiece( game_name, 1, 8 ),

		PAWN1 : 	createPiece( game_name, 2, 1 ),
		PAWN2 : 	createPiece( game_name, 2, 2 ),
		PAWN3 : 	createPiece( game_name, 2, 3 ),
		PAWN4 : 	createPiece( game_name, 2, 4 ),
		PAWN5 : 	createPiece( game_name, 2, 5 ),
		PAWN6 : 	createPiece( game_name, 2, 6 ),
		PAWN7 : 	createPiece( game_name, 2, 7 ),
		PAWN8 : 	createPiece( game_name, 2, 8 ),

		rook1 : 	createPiece( game_name, 8, 1 ),
		knight1 : 	createPiece( game_name, 8, 2 ),
		bishop1 : 	createPiece( game_name, 8, 3 ),
		king : 		createPiece( game_name, 8, 4 ),
		queen : 	createPiece( game_name, 8, 5 ),
		bishop2 : 	createPiece( game_name, 8, 6 ),
		knight2 : 	createPiece( game_name, 8, 7 ),
		rook2 : 	createPiece( game_name, 8, 8 ),

		pawn1 : 	createPiece( game_name, 7, 1 ),
		pawn2 : 	createPiece( game_name, 7, 2 ),
		pawn3 : 	createPiece( game_name, 7, 3 ),
		pawn4 : 	createPiece( game_name, 7, 4 ),
		pawn5 : 	createPiece( game_name, 7, 5 ),
		pawn6 : 	createPiece( game_name, 7, 6 ),
		pawn7 : 	createPiece( game_name, 7, 7 ),
		pawn8 : 	createPiece( game_name, 7, 8 )

	};
}

// check the validation of the turn
function checkTurn ( game, data ) {
	if ( data == "" ) return false;
	if ( game.turn == true && 'a' <= data && data <= 'z' ) return true;
	if ( game.turn == false && 'A' <= data && data <= 'Z' ) return true;
	return false;
}

// check whether two points are reachable with the given piece of chess
function reach( game, type, pos1, pos2 ) {

	switch ( type[0] ) {
		case 'R': case 'r': // rook 
			return pos1.x == pos2.x || pos1.y == pos2.y;
		case 'b': case 'B': // bishop
			return pos1.x + pos1.y == pos2.x + pos2.y || pos1.x - pos1.y == pos2.x - pos2.y;
		case 'k' : case 'K':
			if ( type[1] == 'I' || type[1] == 'i') { // king
				return Math.max( Math.abs( pos1.x - pos2.x ), Math.abs( pos1.y - pos2.y ) ) == 1;
			} else if ( type[1] == 'N' || type[1] == 'n' ) { // knight
				console.log( )
				return Math.abs( pos1.x - pos2.x ) * Math.abs( pos1.y - pos2.y ) == 2;
			} else { 
				return false;
			}
		case 'q': case 'Q': // queen
			var rook = pos1.x == pos2.x || pos1.y == pos2.y;
			var bishop =  pos1.x + pos1.y == pos2.x + pos2.y || pos1.x - pos1.y == pos2.x - pos2.y;
			return rook || bishop;
		case 'p': // pawn
			if ( Math.abs( pos1.y - pos2.y ) == 1 && pos1.x + 1 == pos2.x ) {
				return getSquare( game.name, pos1.x, pos1.y ).type != "";
			}
			if ( pos2.x == 7 ) {
				return pos1.y == pos2.y && ( pos1.x == 5  || pos1.x == 6 ); 
			}
			return pos1.y == pos2.y && ( pos1.x + 1 == pos2.x ); 
		case 'P': // Pawn
			if ( Math.abs( pos1.y - pos2.y ) == 1 && pos1.x - 1 == pos2.x ) {
				return getSquare( game.name, pos1.x, pos1.y ).type != "";
			}
			if ( pos2.x == 2 ) {
				return pos1.y == pos2.y && ( pos1.x == 3  || pos1.x == 4 ); 
			}
			return pos1.y == pos2.y && ( pos1.x - 1 == pos2.x ); 
	}

	return true;
}

// calculate all plausible moves
function calculateMoves ( game, moves ) {

	if ( moves.length > 2 ) return [];

	var type = moves[ 0 ].type;
	var valid_moves = [];

	var i, j;
	for ( i = 1 ; i <= board_width ; i++ ) {
		for ( j = 1 ; j <= board_width ; j++ ) {

			const square = getSquare( game.name, i, j );
			
			if ( reach( game, type, getPosition ( square ), getPosition( moves[ moves.length - 1 ] ) ) ) {
				valid_moves.push( square );
			}
		}
	}

	return valid_moves;
}

// eat function
// piece1 eats piece2
function eat ( game, piece1, piece2 ) {
	console.log( piece1 + " eats " + piece2 );
	delete game.position[ piece2 ];
}

// move the piece according to moves
function move ( game, moves ) {

	const old_position = getPosition( moves [ 0 ] );
	var old_square = getSquare( game.name, old_position.x, old_position.y );

	const new_position = getPosition( moves [ moves.length - 1 ] );
	var new_square = getSquare( game.name, new_position.x, new_position.y );

	const type = old_square.type;

	const prob = ( moves.length == 2 ? 1.0 : 0.5 );
	
	const pos1 = getPosition ( moves[0] ), pos2 = getPosition ( moves[1] ), pos3 = getPosition( moves[2] );
	switch ( type[0] ) {
		case 'R': case 'r': // rook 
			var i, j;
			
		case 'b': case 'B': // bishop
		case 'q': case 'Q': // queen
		case 'p': case 'P' : case 'k': case 'K': // pawn, knight, king
			if ( moves.length == 3 ) {
				prob *= 1.0 - moves[1].prob;
			}
			break;
	}

	for ( var key in old_square.data ) {
		var node = old_square.data[key];
		node.square = new_square;
		new_square.data.push( node );
	}
	if ( new_square.type != "" && new_square.type != old_square.type ) {
		observeSquare ( game, new_square );
	}
}

// observe function
function observeSquare ( game, square ) {

	console.log( "observing " + square.id );
	var piece_there = null;

	for ( var key in square.data ) {
		
		var piece = square.data[ key ];

		const piece_id = (function( node ) {
			for ( var key in game.position ) {
				if ( game.position[ key ] === node ) {
					return key;
				}
			}
		}) ( piece.root );

		if ( observePosition( game, piece, square ) ) {

			// the piece is there
			const position = getPosition( square );
			game.position[ piece_id ] = createPiece( game.name, position.x, position.y );

			if ( piece_there != null ) {
				eat ( game, piece_id, piece_there );
			}

			piece.root.square = square;
			piece_there = piece_id;
		} 
	}
}

// switch turn 
function switchTurn ( game ) {
	game.turn = !game.turn;
}

// check whether the game is finished
function getWinner ( game ) {

	if ( game.position.hasOwnProperty( "KING" ) == false ) {
		return "win";
	} else if ( game.position.hasOwnProperty( "king" ) == false ) {
		return "WIN";
	} else { 
		return "";
	}
}
// initialized function
function init( game ) {	

	game.turn = true;

	if ( game.name.indexOf("_") != -1 ) {
		alert( "name_error : " + game.name );
	}

	game.position = getInitGame( game.name );
}


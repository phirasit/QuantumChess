// draw a simple chess board
function drawBoard( game ) {

	var board_text = "";
	board_text += "<table \
		id=\"" + getBoardId( game.name ) + "\"\
		class=\"board\" \
		>";

	var i, j;
	for ( i = 1 ; i <= game.height ; i++ ) {
		board_text += "<tr\
			id=\"" + getRowId( game.name, i ) + "\"\
		>";
		for ( j = 1 ; j <= game.width ; j++ ) {
			board_text += "<td \
				id=\"" + getSquareId( game.name, i, j ) + "\"\
				></td>";

		}
		board_text += "</tr>";
	}

	board_text += "</table>";

	return board_text;
}

// change the height of the squares according to their width
function changeBoardSize( board, rows, Width, Height, margin = 50 ) {

	// get the width 
	var board_size = 0.8 * Width;
	board_size = Math.min( board_size, Width - margin );
	board_size = Math.min( board_size, Height - margin );

	// set height and width
	const height = board_size / board_height;
	const width = board_size / board_width;

	// set width
	if ( board !== null ) {
		board.setAttribute( "width", width * board_width + "px" );
	}

	for ( var key in rows ) {

		var row = rows[ key ];

		// set new height
		if ( row !== null ) {
			row.setAttribute( "height", height + "px" );
		}
	}
}

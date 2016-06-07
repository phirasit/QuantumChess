
// set constants
const board_width = 8;
const board_height = 8;
const color = [ "BLACK", "WHITE" ];

function getBoardId ( tag_name ) {
	return tag_name + "_board";
}
function getRowId ( tag_name, i ) {
	return tag_name + "_row" + i;
}
function getSquareId ( tag_name, i, j ) {
	return tag_name + "_square" + i + j;
}
// draw a simple chess board
function drawBoard( tag_name ) {

	var board_text = "";
	board_text += "<table \
		id=\"" + getBoardId( tag_name ) + "\"\
		class=\"board\" \
		>";

	var i, j;
	for ( i = 1 ; i <= board_height ; i++ ) {
		board_text += "<tr\
			id=\"" + getRowId( tag_name, i ) + "\"\
		>";
		for ( j = 1 ; j <= board_width ; j++ ) {
			board_text += "<td \
				id=\"" + getSquareId( tag_name, i, j ) + "\"\
				class=\"square square" + color[ ( i + j ) % 2 ] + "\" \
				onmouseover = \"MouseOver(this)\" \
				onclick = \"Select(this)\" \
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

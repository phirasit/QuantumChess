// constructor
var cnt_id = 0;
function tree( square ) {

	this.parent = null;
	this.root = this;
	this.child = [];
	this.id = cnt_id++;

	this.square = square;
	this.removed = false;
}

// add new edge
function add ( parent, node, prob = 0.5 ) {

	if ( prob == 0.0 ) {
		return parent;
	}

	parent.child[ node.id ] = {
		node: node,
		prob: (function( node, begin ) {
			var ans = 1.0;
			for ( var key in parent.child ) {
				const edge = parent.child[key];
				ans *= 1.0 - edge.prob;
			}
			return ans;
		}) ( parent, true ) * prob
	};
	
	node.parent = parent;
	node.root = parent.root;

	return parent;
}

// make the node appear
function appear ( node ) {
	console.log( "appear", node );
	postorder_dfs( node.root, function( cnode, prob ) {
		if ( cnode != node ) {
			erase ( cnode );
		}
	});
}

// erase the node ( change prob to 0 )
function erase ( node ) {

	if ( node == null || node.removed ) {
		return;
	}

	node.removed = true;

	do {

		var parent = node.parent;

		if ( parent == null || parent == undefined ) {
			break;
		}		

		const changing_factor = 1.0 / ( 1.0 - parent.child[ node.id ].prob );

		delete parent.child[ node.id ];

		for ( var key in parent.child ) {
			parent.child[ key ].prob *= changing_factor;
		}

		node = parent;
	} while ( node != null && node.removed && node.child.length == 0 );

}

// pick the node randomly
function pickRandom( node ) {

	var position = Math.random();
	for ( var key in node.child ) {
		const edge = node.child[key];
		if ( position <= edge.prob ) {
			return pickRandom( edge.node );
		}
		position -= edge.prob;
	}

	return node;
}

// observe the position
function observePosition ( game, node, square ) {

	const pickedNode = pickRandom( node.root );
	const exist = ( pickedNode.square == square );

	if ( exist == true ) {
		appear( pickedNode );
	} else {
		erase ( node );
	}

	return exist;
}

// helper functions
function postorder_dfs ( node, func, prob = 1.0 ) {

	for ( var key in node.child ) {
		const edge = node.child[key];
		postorder_dfs( edge.node, func, prob * edge.prob );
		prob *= 1.0 - edge.prob;
	}

	func( node, prob );
}

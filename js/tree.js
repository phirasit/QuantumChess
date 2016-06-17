// constructor
function tree( square ) {

	this.parent = null;
	this.root = this;
	this.child = [];

	this.square = square;
	this.removed = false;

	this.entanglementT = [];
	this.entanglementF = [];
}

// add new edge
function add ( parent, node, prob = 0.5 ) {

	if ( prob == 0.0 ) {
		return parent;
	}

	parent.child.push ({
		node: node,
		prob: (function( node, begin ) {
			var ans = 1.0;
			for ( var key in parent.child ) {
				const edge = parent.child[key];
				ans *= 1.0 - edge.prob;
			}
			return ans;
		}) ( parent, true ) * prob
	});
	
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
	
	if ( node.child.length > 0 ) {
		node.child [ node.child.length - 1 ].prob += 1.0 - ( function ( edges ) { 
			var sum = 0.0;
			for ( var key in edges ) {
				sum += edges[ key ].prob;
			}
			return sum;
		})( node.child );
	}

	while ( node.child.length == 0 ) {

		var parent = node.parent;

		if ( parent == null || parent == undefined ) {
			break;
		}		

		if ( !parent.remove ) {
			const idx = parent.child.indexOf( node );
			const changing_factor = 1.0 / ( 1.0 - parent.child[ idx ].prob );

			delete parent.child[ idx ];

			for ( var key in parent.child ) {
				parent.child[ key ].prob *= changing_factor;
			}
		}

		node = parent;
	}

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

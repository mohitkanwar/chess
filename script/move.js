function suggestNextMove(screenshot,movesHistory,moveBy){

	var pieceArray = [ "pawn", "rook", "knight",
			"bishop", "queen", "king" ];
	
	var myPiecesUnderAttack={"attacks":[{"mypiece":"opponentpiece"}]};
	var oppPiecesUnderAttack={"attacks":[{"opponentpiece":"mypiece"}]};
	var pieceValue={"pawn":1,"knight":3,"bishop":3,"rook":5,"queen":9,"king":4}
	var myScore=0;
	var opponentScore=0;
	var moveMode="Normal"; // "Attacking" or "Defencive"
	var possibleMoves= {"moves":[{"move":"moverating"}]};
}
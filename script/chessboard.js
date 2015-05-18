var chessBoard = angular.module('chessApp')

.run(function($rootScope){
        $rootScope.nameCells=[
        {'class':'namecell','value':''},
        {'class':'namecell','value':'a'},
        {'class':'namecell','value':'b'},
        {'class':'namecell','value':'c'},
        {'class':'namecell','value':'d'},
        {'class':'namecell','value':'e'},
        {'class':'namecell','value':'f'},
        {'class':'namecell','value':'g'},
        {'class':'namecell','value':'h'},
        {'class':'namecell','value':''}
        ];
        $rootScope.rows=[];
        var rocount=8;
        var divClass='whitecell';
        for(rocount=8;rocount>0;rocount--){
                var row={'cols':[]};
                row.cols[row.cols.length]={'tdClass':'namecell', 'divClass':'','id':'','value':rocount};
                var colidarray=['a','b','c','d','e','f','g','h'];
                for(var colcount=1;colcount<=8;colcount++){
                        row.cols[row.cols.length]={'tdClass':'', 'divClass':divClass,'id':colidarray[colcount-1]+rocount,'value':''};
                        if(divClass=='whitecell'){
                        divClass='blackcell';
                        }
                        else{
                        divClass='whitecell';
                        }
                }
                row.cols[row.cols.length]={'tdClass':'namecell', 'divClass':'','id':'','value':rocount};
        $rootScope.rows[$rootScope.rows.length]=row;
        if(divClass=='whitecell'){
                        divClass='blackcell';
                        }
                        else{
                        divClass='whitecell';
                        }
        }
        }
)
.factory('chessBoardService', function(pawnService) {
var fns=
   {
   updateCurrentScreenShot:function($scope){
   $scope.screenshot={};
   var pieceArray=["pawn","rook","knight","bishop","queen","king"];
   angular.forEach(pieceArray, function(piece) {
	   $scope.screenshot["white"+piece]=fns.findPiece("white"+piece);
	   $scope.screenshot["black"+piece]=fns.findPiece("black"+piece);
   });
   console.log($scope.screenshot);
   },
   playMove:function($scope,suggestedMove){
   if(suggestedMove=="O-O"){
           if($scope.nextmoveby=="black"){
                $("#h8").removeClass("blackrook_black");
                $("#e8").removeClass("blackking_white");
                $("#f8").addClass("blackrook_black");
                $("#g8").addClass("blackking_white");
           }
           else{
            $("#h1").removeClass("whiterook_white");
                $("#e1").removeClass("whiteking_black");
                $("#f1").addClass("whiterook_white");
                $("#g1").addClass("whiteking_black");
           }
   }
   else if(suggestedMove=="O-O-O"){
    if($scope.nextmoveby=="black"){
                $("#a8").removeClass("blackrook_white");
                $("#e8").removeClass("blackking_white");
                $("#d8").addClass("blackrook_black");
                $("#c8").addClass("blackking_white");
           }
           else{
            $("#a1").removeClass("whiterook_black");
                $("#e1").removeClass("whiteking_black");
                $("#d1").addClass("whiterook_white");
                $("#c1").addClass("whiteking_black");
           }
   }
   else{
    var moveparts=suggestedMove.split(" ");
        var piecetype=moveparts[0];
        var oldcellId=moveparts[1];
        var moveTypeSymbol=moveparts[2];
        var newcellId=moveparts[3];
        var currentCell=$("#"+oldcellId);
        var newCell=$("#"+newcellId);
        var piece= fns.getPieceType(currentCell);
        var newCellColour=fns.getCellColour(newCell);
        if(moveTypeSymbol=="x"){
        	if((piecetype=="P")&&(oldcellId.split('')[0]!= newcellId.split('')[0])&&(fns.isEmptyCell(newCell))){
        		var row;
        		if($scope.nextmoveby=="black"){
        			row=4;
        		}
        		else{
        			row=5;
        		}
        		var enpassCell=		$("#"+newcellId.split('')[0]+row);
        		enpassCell.removeClass(fns.getPieceType(enpassCell)+"_"+fns.getCellColour(enpassCell));
        	}
        	else{
        		 newCell.removeClass(fns.getPieceType(newCell)+"_"+fns.getCellColour(newCell));
        	}
        }
        newCell.addClass(piece+"_"+newCellColour);
        currentCell.removeClass(piece+"_"+fns.getCellColour(currentCell));
   }
   },
    restoreFromScreenshot:function($scope){
    	var restorePiece= function(piece){
    		$("."+piece+"_black").removeClass(piece+"_black");
            $("."+piece+"_white").removeClass(piece+"_white");
            for(var i=0;i<$scope.screenshot[piece].length;i++){
            	$scope.screenshot[piece][i].addClass(piece+"_"+fns.getCellColour($scope.screenshot[piece][i]));
            }
    	}
    	 var pieceArray=["pawn","rook","knight","bishop","queen","king"];
    	   angular.forEach(pieceArray, function(piece) {
    		   restorePiece("white"+piece);
    		   restorePiece("black"+piece);
    	   });
   },
   isMoveLegal:function($scope,suggestedMove){
        fns.updateCurrentScreenShot($scope);
        fns.playMove($scope,suggestedMove);
        var stillunderCheck=fns.isKingUnderCheck($scope,$scope.nextmoveby);
        fns.restoreFromScreenshot($scope);
      return !stillunderCheck;
   },
   findPiece:function(piece){
   var cellArray=new Array();
   if($("."+piece +"_white").length>0){
        cellArray[cellArray.length]=$("."+piece +"_white");
   }
   if($("."+piece +"_black").length>0){
        cellArray[cellArray.length]=$("."+piece +"_black");
   }
   return cellArray;
   },
   isKingUnderCheck:function($scope,kingColour){
        var isChecked=false;
        var kingCellArray=fns.findPiece(kingColour+"king");
        var kingCell=kingCellArray[0];
        var opponentColour=fns.getOpponentColour(kingColour);
        var checkByPiece=function(piece,opponentColour,kingCell){
        		var isChecked=false;
                var cellArray=fns.findPiece(opponentColour+piece);
                angular.forEach(cellArray, function(cell) {
                	  if(fns.getPossibleMovesByPieceOnCell($scope,cell).indexOf(kingCell.attr('id'))>-1){
                          isChecked=true;
                  }
                });
                return isChecked;
        }
        var pieceArray=["pawn","rook","knight","bishop","queen","king"];
        angular.forEach(pieceArray, function(piece) {
        	if(!isChecked){
            	isChecked=checkByPiece(piece,opponentColour,kingCell);
            }
        });
   return isChecked;
   },
  initilizePlayer:function(player){
	  if(player.piececolour=="black"){
		  $("#BlackPlayer").text(player.name);
	  }
	  else{
		  $("#WhitePlayer").text(player.name);
	  }
	  angular.forEach(player.pieces, function(piece) {
          $("#"+piece.position).addClass(player.piececolour+  piece.type+"_"+fns.getCellColour($("#"+piece.position)));
      });
  },
  getCellColour:function(cell){
   if(cell.is(".blackcell")){
        return "black";
    }
    else if(cell.is(".whitecell")){
        return "white";
        }
        return" not a board cell";
  },
  getPieceType:function (cell){
        var piece="";
        var color=""
                if(cell.hasClass("blackcell")){
                        color="black";
                }
                else if(cell.hasClass("whitecell")){
                        color="white";
                }
        var pieceArray=["pawn","rook","knight","bishop","queen","king"];
        var checkByPiece= function(cell,pieceToBeChecked,color){
        	var piece="";
        	 if(cell.hasClass("white"+pieceToBeChecked+"_"+color)){
                     piece="white"+pieceToBeChecked;
        	 }
	         else if(cell.hasClass("black"+pieceToBeChecked+"_"+color)){
	                 piece="black"+pieceToBeChecked;
	         }
        	 return piece;
        }
        angular.forEach(pieceArray, function(pieceInArray) {
        	if(piece==""){
            	piece=checkByPiece(cell,pieceInArray,color);
            }
        });
                return piece;
        },
        isEmptyCell:function (cell){
                return fns.getPieceType(cell)=="";
        },
        isLegalCell:function (cell){
                return cell.hasClass("blackcell")||cell.hasClass("whitecell");
        },
        getOpponentColour:function (colour){
                if(colour=="black"){
                        return "white";
                }
                else {
                        return "black";
                }
        },
        
        selectCell:function (cell){
                if(!fns.isEmptyCell(cell)){
                         $(".active").removeClass("active");
                         $(".possiblemovecell").removeClass("possiblemovecell");
                         cell.addClass("active");
                }
        },
        getMoveRepresentation:function($scope,piece,oldCell,newCell,specialCase){
                                var pieceSymbol=fns.getPieceSymbol(piece);
                                var moverepresentation;
                                var casesymbol="-";
                                if((specialCase=="capture")||(!fns.isEmptyCell(newCell))){
                                casesymbol="x";
                                }
                                if(pieceSymbol=="P"){
                                	var oldCellRow=oldCell.attr("id").split('');
                                	var newCellRow=newCell.attr("id").split('');
                                	if((oldCellRow[0]!=newCellRow[0])&&(fns.isEmptyCell(newCell))){
                                		casesymbol="x";
                                	}
                                }
                                moverepresentation=pieceSymbol+" " +oldCell.attr("id")+" "+casesymbol+" "+newCell.attr('id');
                                if((moverepresentation=="K e1 - g1")||(moverepresentation=="K e8 - g8")){
                                        moverepresentation="O-O";
                                }
                                else if((moverepresentation=="K e1 - c1")||(moverepresentation=="K e8 - c8")){
                                        moverepresentation="O-O-O";
                                }
                                return moverepresentation;
        },
        logMove:function($scope,piece,oldCell,newCell,specialCase){
                                moverepresentation=fns.getMoveRepresentation($scope,piece,oldCell,newCell,specialCase);
                                if( fns.getPieceColour(piece)=="white"){
                                        $("#logtable").append("<tr><td class='whitelog'>"+moverepresentation+"</td><td class='blacklog lastBlackLog'></td></tr>");
                                }
                                else{
                                $(".lastBlackLog").append(moverepresentation);
                                $(".lastBlackLog").removeClass("lastBlackLog");
                                }
               return moverepresentation;
                       
        },
        isCheckmate:function(){
        alert("tbd:: is checkmate");
        },
        moveTo:function ($scope,cell){
                        var currentCell=$(".active");
                var piece= fns.getPieceType(currentCell);
                var newCellColour=fns.getCellColour(cell);
                var isCapture=false;
                var specialCase="";
                if(fns.isPawnPromotion(piece,cell)){
                        fns.showPromotionOptions(piece,cell);
                        specialCase="pawn-promotion";
                }
                else{
                 if(!fns.isEmptyCell(cell)){
                        cell.removeClass(fns.getPieceType(cell)+"_"+newCellColour);
                        isCapture=true;
                        specialCase="capture";
                }
                }
                var moverep=fns.getMoveRepresentation($scope,piece,currentCell,cell,specialCase);
                if(fns.isMoveLegal($scope,moverep)){
                        fns.logMove($scope,piece,currentCell,cell,specialCase);
                        fns.playMove($scope,moverep);
                        currentCell.removeClass("active");
                $(".possiblemovecell").removeClass("possiblemovecell");
                $scope.nextmoveby=fns.getOpponentColour(fns.getPieceColour(piece));
                if(fns.hasMoveResultedInCheck($scope,cell)){
                	$("#warning").text("Check!!");
                }
                else{
                	$("#warning").text("");
                }
                }
        },
        getPieceColour:function (pieceName){
                if(pieceName!=""){
                        if(pieceName.indexOf("black")>-1){
                                return "black";
                        }
                        else {
                                return "white";
                        }
                }
        },
       highlightPossibleMoves: function ($scope,cell){
        var highlightCellArray=fns.getPossibleMovesByPieceOnCell($scope,cell);
        for(i=0;i<highlightCellArray.length;i++){
                $("#"+highlightCellArray[i]).addClass("possiblemovecell");
                }
        },
        getPossibleMovesByPieceOnCell:function ($scope,cell){
                var piece= fns.getPieceType(cell);
                var possibleMovesCellArray= new Array();
                var movesMethods= new Array();
                movesMethods["blackpawn"]=fns.getPawnMoves;
                movesMethods["blackrook"]=fns.getRookMoves;
                movesMethods["blackknight"]=fns.getKnightMoves;
                movesMethods["blackbishop"]=fns.getBishopMoves;
                movesMethods["blackking"]=fns.getKingMoves;
                movesMethods["blackqueen"]=fns.getQueenMoves;
                movesMethods["whitepawn"]=fns.getPawnMoves;
                movesMethods["whiterook"]=fns.getRookMoves;
                movesMethods["whiteknight"]=fns.getKnightMoves;
                movesMethods["whitebishop"]=fns.getBishopMoves;
                movesMethods["whiteking"]=fns.getKingMoves;
                movesMethods["whitequeen"]=fns.getQueenMoves;
                possibleMovesCellArray=movesMethods[piece]($scope,cell,fns.getPieceColour(piece));
                if(($scope.nextmoveby==fns.getPieceColour(piece))){
                var filteredMoves= new Array();
                        for(var i=0;i<possibleMovesCellArray.length;i++){
                        var newcell=$("#"+possibleMovesCellArray[i]);
                         var moverep=fns.getMoveRepresentation($scope,piece,cell,newcell,"");
                                if(fns.isMoveLegal($scope,moverep)){
                                filteredMoves[filteredMoves.length]=possibleMovesCellArray[i];
                                 }
                        }
                        if(piece=="whiteking"){
                                //if current position of king is original (unmoved) and casteling wali move is there, but middle pe check hai, to remove castelign wali cell also
                                if(cell.attr("id")=="e1"){
                                if((possibleMovesCellArray.indexOf("f1")>-1)&&(possibleMovesCellArray.indexOf("g1")>-1)&&(filteredMoves.indexOf("f1")<0)){
                                     var index=filteredMoves.indexOf("g1");
                                        if (index > -1) {
                                                filteredMoves.splice(index, 1);
                                        }
                                // remove g1 from filteredMoves
                                }
                                if((possibleMovesCellArray.indexOf("d1")>-1)&&(possibleMovesCellArray.indexOf("c1")>-1)&&(filteredMoves.indexOf("d1")<0)){
                                // remove c1 from filteredMoves
                                 var index=filteredMoves.indexOf("c1");
                                        if (index > -1) {
                                                filteredMoves.splice(index, 1);
                                        }
                                }
                                }
                        }
                        if(piece=="blackking"){
                         //if current position of king is original (unmoved) and casteling wali move is there, but middle pe check hai, to remove castelign wali cell also
                                if(cell.attr("id")=="e8"){
	                                if((possibleMovesCellArray.indexOf("f8")>-1)&&(possibleMovesCellArray.indexOf("g8")>-1)&&(filteredMoves.indexOf("f8")<0)){
	                                // remove g1 from filteredMoves
	                                 var index=filteredMoves.indexOf("g8");
	                                        if (index > -1) {
	                                                filteredMoves.splice(index, 1);
	                                        }
	                                }
	                                if((possibleMovesCellArray.indexOf("d8")>-1)&&(possibleMovesCellArray.indexOf("c8")>-1)&&(filteredMoves.indexOf("d8")<0)){
	                                // remove c1 from filteredMoves
	                                 var index=filteredMoves.indexOf("c8");
	                                        if (index > -1) {
	                                                filteredMoves.splice(index, 1);
	                                        }
	                                }
                                }
                        }
                        possibleMovesCellArray=filteredMoves;
                }
                return possibleMovesCellArray;
        },
        getPawnMoves_moves: function($scope,currentcell,pawnColour){
        
        var piece=pawnColour+"pawn";
        var oldCell=currentcell;
        var specialCase="";
                       var cellPosition=currentcell.attr("id").split("");
                        var possibleMovesArray=[];
                        //seedha chalne wale
                        if(pawnColour=="black" ){
                                var cellId=cellPosition[0]+(parseInt(cellPosition[1])-1);
                                if(fns.isEmptyCell($("#"+cellId))){
                                        
                                        possibleMovesArray[0]=getMoveRepresentation($scope,piece,oldCell,$("#"+cellId),specialCase);
                                }
                                if(cellPosition[1]==7){
                                	var cellId2=cellPosition[0]+(parseInt(cellPosition[1])-2);
	                                if(fns.isEmptyCell($("#"+cellId))&&fns.isEmptyCell($("#"+cellId2))){
	                                        possibleMovesArray[1]=getMoveRepresentation($scope,piece,oldCell,$("#"+cellId2),specialCase);
	                                }
                                }
                                // kaatne wale
                                var adjacentcols=fns.getAdjacentCols(cellPosition[0]);
                                for(var i=0;i<adjacentcols.length;i++){
                                        if(fns.cellHasTeamPiece($("#"+adjacentcols[i]+(parseInt(cellPosition[1])-1)),"white")){
                                                possibleMovesArray[possibleMovesArray.length]=
                                                getMoveRepresentation($scope,piece,oldCell,$("#"+adjacentcols[i]+(parseInt(cellPosition[1])-1)),specialCase);
                                        }
                                }
                        }
                        else if(pawnColour=="white" ){
                               var cellId=cellPosition[0]+(parseInt(cellPosition[1])+1);
                                if(fns.isEmptyCell($("#"+cellId))){
                                        possibleMovesArray[0]=getMoveRepresentation($scope,piece,oldCell,$("#"+cellId),specialCase);
                                }
                                if(cellPosition[1]==2){
                                	var cellId2=cellPosition[0]+(parseInt(cellPosition[1])+2);
	                                if(fns.isEmptyCell($("#"+cellId))&&fns.isEmptyCell($("#"+cellId2))){
	                                        possibleMovesArray[1]=getMoveRepresentation($scope,piece,oldCell,$("#"+cellId2),specialCase);
	                                }
                                }
                                var adjacentcols=fns.getAdjacentCols(cellPosition[0]);
                                for(var i=0;i<adjacentcols.length;i++){
                                        if(fns.cellHasTeamPiece($("#"+adjacentcols[i]+(parseInt(cellPosition[1])+1)),"black")){
                                                possibleMovesArray[possibleMovesArray.length]= getMoveRepresentation($scope,piece,oldCell,$("#"+adjacentcols[i]+(parseInt(cellPosition[1])+1)),specialCase);
                                        }
                                }
                        }
                return possibleMovesArray;
        },
        getPawnMoves: function($scope,currentcell,pawnColour){
                       var cellPosition=currentcell.attr("id").split("");
                        var possibleMovesArray=[];
                        //seedha chalne wale
                        if(pawnColour=="black" ){
                                var cellId=cellPosition[0]+(parseInt(cellPosition[1])-1);
                                if(fns.isEmptyCell($("#"+cellId))){
                                        possibleMovesArray[0]=cellId;
                                }
                                if(cellPosition[1]==7){
                                	var cellId2=cellPosition[0]+(parseInt(cellPosition[1])-2);
	                                if(fns.isEmptyCell($("#"+cellId))&&fns.isEmptyCell($("#"+cellId2))){
	                                        possibleMovesArray[1]=cellId2;
	                                }
                                }
                               
                                angular.forEach(fns.getAdjacentCols(cellPosition[0]),function(value){
                                	if(fns.cellHasTeamPiece($("#"+value+(parseInt(cellPosition[1])-1)),"white")){
                                        possibleMovesArray[possibleMovesArray.length]=value+(parseInt(cellPosition[1])-1);
                                	}
                                });
                                // en pas on
                                // if current pawn is on fifth line, and in last move a neighbour moved 2 cells 
                                if(cellPosition[1]==4){
	                                var logtobeChecked=".whitelog";
	                                var lastMove=$(logtobeChecked)[$(logtobeChecked).length-1];
	                                var neighbour=fns.getAdjacentCols(cellPosition[0]);
	                                //for all neighnours
	                                var move="P "+neighbour[0]+"2 - "+neighbour[0]+"4";
	                                if(move==lastMove.textContent){
	                                	possibleMovesArray[possibleMovesArray.length]=neighbour[0]+"3";
	                                }
	                                var move="P "+neighbour[1]+"2 - "+neighbour[1]+"4";
	                                if(move==lastMove.textContent){
	                                	possibleMovesArray[possibleMovesArray.length]=neighbour[1]+"3";
	                                }
                                }
                        }
                        else if(pawnColour=="white" ){
                               var cellId=cellPosition[0]+(parseInt(cellPosition[1])+1);
                                if(fns.isEmptyCell($("#"+cellId))){
                                        possibleMovesArray[0]=cellId;
                                }
                                if(cellPosition[1]==2){
                                 var cellId2=cellPosition[0]+(parseInt(cellPosition[1])+2);
                                if(fns.isEmptyCell($("#"+cellId))&&fns.isEmptyCell($("#"+cellId2))){
                                        possibleMovesArray[1]=cellId2;
                                }
                                     
                                }
                                angular.forEach(fns.getAdjacentCols(cellPosition[0]),function(value){
                                	if(fns.cellHasTeamPiece($("#"+value+(parseInt(cellPosition[1])+1)),"black")){
                                        possibleMovesArray[possibleMovesArray.length]=value+(parseInt(cellPosition[1])+1);
                                	}
                                });
                               
                                
                                // if current pawn is on fifth line, and in last move a neighbour moved 2 cells 
                                if(cellPosition[1]==5){

                                    var logtobeChecked=".blacklog";
                                    var lastMove=$(logtobeChecked)[$(logtobeChecked).length-1];
                                    var neighbour=fns.getAdjacentCols(cellPosition[0]);
                                    //for all neighnours
                                    var move="P "+neighbour[0]+"7 - "+neighbour[0]+"5";
                                    if(move==lastMove.textContent){
                                    	possibleMovesArray[possibleMovesArray.length]=neighbour[0]+"6";
                                    }
                                    
                                    var move="P "+neighbour[1]+"7 - "+neighbour[1]+"5";
                                    if(move==lastMove.textContent){
                                    	possibleMovesArray[possibleMovesArray.length]=neighbour[1]+"6";
                                    }
                                    }
                        }
                        
                return possibleMovesArray;
                
        },
        getAdjacentCols:function (col){
                var adjacentcols=[];
                var west=fns.getWestCols(col);
                if(west.length>0){
                	adjacentcols[0]=west[0];
                }
                var east=fns.getEastCols(col);
                if(east.length>0){
                	adjacentcols[adjacentcols.length]=east[0];
                }
                
        return adjacentcols;
        },
        getWestCols:function (col){
        	var cols = ["h", "g", "f", "e", "d", "c", "b", "a"];
        	
        	return cols.slice(cols.indexOf(col)+1, cols.length);
        }
,
getEastCols:function (col){
	var cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return cols.slice(cols.indexOf(col)+1, cols.length);
},
cellHasTeamPiece:function (cell,colour){
if("white"==colour){
return cell.is(".whitepawn_white,.whiterook_white,.whiteknight_white,.whitebishop_white,.whiteking_white,.whitequeen_white,.whitepawn_black,.whiterook_black,.whiteknight_black,.whitebishop_black,.whiteking_black,.whitequeen_black");
}
else if("black"==colour){
return cell.is(".blackpawn_white,.blackrook_white,.blackknight_white,.blackbishop_white,.blackking_white,.blackqueen_white,.blackpawn_black,.blackrook_black,.blackknight_black,.blackbishop_black,.blackking_black,.blackqueen_black");
}

},
getRookMoves:function ($scope,currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");
var getverticalMoves=function(method){
	var i=1;
	var cellId=method(cellPosition,i);
	var possibleMovesArray=[];
	while(fns.isLegalCell($("#"+cellId))){
	        if(fns.isEmptyCell($("#"+cellId))){
	        possibleMovesArray[possibleMovesArray.length]=cellId;
	        i=i+1;
	        cellId=method(cellPosition,i);
	        }
	        else{
                if(fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour){
                	possibleMovesArray[possibleMovesArray.length]=cellId;
                 }
                 break;
	        }
	}
	return possibleMovesArray;
}

$.merge(possibleMovesArray,getverticalMoves(function(cellPosition,i){
	return cellPosition[0]+(parseInt(cellPosition[1])+i);
}));
$.merge(possibleMovesArray,getverticalMoves(function(cellPosition,i){
	return cellPosition[0]+(parseInt(cellPosition[1])-i);
}));
var getHorizontalMoves=function(dirColsArray){
	var possibleMovesArray=[];
	for(var i=0;i<dirColsArray.length;i++){
		var cellId=dirColsArray[i]+cellPosition[1];
		 if(fns.isEmptyCell($("#"+cellId))){
		        possibleMovesArray[possibleMovesArray.length]=cellId;
		        }
		        else{
	                if(fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour){
	                	 possibleMovesArray[possibleMovesArray.length]=cellId;
	                 }
	                 break;
		        }
	}
	return possibleMovesArray;
}

$.merge(possibleMovesArray,getHorizontalMoves(fns.getWestCols(cellPosition[0])));
$.merge(possibleMovesArray,getHorizontalMoves(fns.getEastCols(cellPosition[0])));

return possibleMovesArray;
},
/************************************************************************************************************************************
*
* knight Functions
************************************************************************************************************************************/
getKnightMoves:function ($scope,currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");

var isCellValid=function(cellId,colour){
	if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
		return true;
	}
		return false;
}
var allMovesArray= new Array();
allMovesArray[allMovesArray.length]=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+2);
allMovesArray[allMovesArray.length]=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+2);
allMovesArray[allMovesArray.length]=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-2);
allMovesArray[allMovesArray.length]=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-2);
allMovesArray[allMovesArray.length]=fns.getEastCols(cellPosition[0])[1]+(parseInt(cellPosition[1])-1);
allMovesArray[allMovesArray.length]=fns.getWestCols(cellPosition[0])[1]+(parseInt(cellPosition[1])-1);
allMovesArray[allMovesArray.length]=fns.getEastCols(cellPosition[0])[1]+(parseInt(cellPosition[1])+1);
allMovesArray[allMovesArray.length]=fns.getWestCols(cellPosition[0])[1]+(parseInt(cellPosition[1])+1);
angular.forEach(allMovesArray, function(value,key) {
	if(isCellValid(value,colour)){
		possibleMovesArray[possibleMovesArray.length]= value;
	}
});
return possibleMovesArray;
},

/************************************************************************************************************************************
*
* Bishop Functions
************************************************************************************************************************************/
getBishopMoves:function ($scope,cell,colour){
var possibleMovesArray=[];
var cellPosition=cell.attr("id").split("");
var checkContinuousCells=function(cellIdentifyFunction){
							var possibleMovesArray=[];
							var i=1;
							var cellId=cellIdentifyFunction(i);
							while(fns.isLegalCell($("#"+cellId))){
							        if(fns.isEmptyCell($("#"+cellId))){
							        possibleMovesArray[possibleMovesArray.length]=cellId;
							        i=i+1;
							        cellId=cellIdentifyFunction(i);
							        }
							        else{
							                var blockingpiececolour=fns.getPieceColour(fns.getPieceType($("#"+cellId)));
							                if(blockingpiececolour==colour){
							                        break;
							                 }
							                 else{
							                 possibleMovesArray[possibleMovesArray.length]=cellId;
							                 break;
							                 }
							        }
							}
							return possibleMovesArray;
						}
						var cellFunctions= new Array();
						cellFunctions[cellFunctions.length]=function(i){return fns.getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);};
						cellFunctions[cellFunctions.length]=function(i){return fns.getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);};
						cellFunctions[cellFunctions.length]=function(i){return fns.getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);};
						cellFunctions[cellFunctions.length]=function(i){return fns.getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);};
						angular.forEach(cellFunctions,function(method){
							$.merge(possibleMovesArray,checkContinuousCells(method));
						});
						return possibleMovesArray;
},

/************************************************************************************************************************************
*
* Queen Functions
************************************************************************************************************************************/
getQueenMoves:function ($scope,cell,colour){
var possibleMovesArray=fns.getBishopMoves($scope,cell,colour);
angular.forEach(fns.getRookMoves($scope,cell,colour), function(move) {
	possibleMovesArray[possibleMovesArray.length]=move;
});
return possibleMovesArray;
},
/************************************************************************************************************************************
*
* King Functions
************************************************************************************************************************************/

getKingMoves:function ($scope,currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");
var isMoveValid= function(cellId,colour){
	 if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
         return true;
	 }
	return false;
}

var cellIdArray= new Array();
cellIdArray[cellIdArray.length]=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+1);
cellIdArray[cellIdArray.length]=cellPosition[0]+(parseInt(cellPosition[1])+1);
cellIdArray[cellIdArray.length]=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+1);
cellIdArray[cellIdArray.length]=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1]));
cellIdArray[cellIdArray.length]=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1]));
cellIdArray[cellIdArray.length]=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-1);
cellIdArray[cellIdArray.length]=cellPosition[0]+(parseInt(cellPosition[1])-1);
cellIdArray[cellIdArray.length]=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-1);

angular.forEach(cellIdArray, function(cellId) {
	if(isMoveValid(cellId,colour)){
		possibleMovesArray[possibleMovesArray.length]=cellId;
	}
});
        // if king has not moved, and rook has not moved, and there is no check on the path, allow casteling
        var logtobeChecked=".blacklog";
        var hasKingMoved=false;
        var hasRook1Moved=false;
        var hasRook2Moved=false;
        var rook1= "R a8";
        var rook2= "R h8";
        var row=8;
        var kingcol="e";
        if(colour=="white"){
        logtobeChecked=".whitelog";
         rook1= "R a1";
         rook2= "R h1";
         row=1;
        }
        for(var i=0;i<$(logtobeChecked).length;i++){
                if(($(logtobeChecked)[i].textContent.indexOf("K")==0)||($(logtobeChecked)[i].textContent.indexOf("O")==0)){
                        hasKingMoved=true;
                        break;
                }
                if($(logtobeChecked)[i].textContent.indexOf(rook1)==0){
                        hasRook1Moved=true;
                        break;
                }
                if($(logtobeChecked)[i].textContent.indexOf(rook2)==0){
                        hasRook2Moved=true;
                        break;
                }
        }
        if(!((hasKingMoved)||(hasRook1Moved)||($("#warning").text()=="Check!!"))){
        var cell1ToBeChecked=$("#d"+row);
        var cell2ToBeChecked=$("#c"+row);
               
                        if(fns.isEmptyCell(cell1ToBeChecked)&&fns.isEmptyCell(cell2ToBeChecked)){
                        //  If there is a check on c/d don't add this cell: Filtered out in next step
                                possibleMovesArray[possibleMovesArray.length]='c'+row;
                        }
        }
        if(!((hasKingMoved)||(hasRook2Moved)||($("#warning").text()=="Check!!"))){
      var cell1ToBeChecked=$("#f"+row);
        var cell2ToBeChecked=$("#g"+row);
                        if(fns.isEmptyCell(cell1ToBeChecked)&&fns.isEmptyCell(cell2ToBeChecked)){
                         // If there is a check on f/g don't add this cell : filtered out in next step
                                possibleMovesArray[possibleMovesArray.length]='g'+row;
                        }
        }
        
return possibleMovesArray;
},
isPawnPromotion:function (piece,cell){
        if(((piece=="whitepawn")&&(cell.attr("id").split("")[1]==8))||((piece=="blackpawn")&&(cell.attr("id").split("")[1]==1))){
                return true;
        }
        else{
                return false;
        }
},
getPieceSymbol:function (piece){
			var symbolMap= new Array();
			symbolMap["blackpawn"]="P";
			symbolMap["whitepawn"]="P";
			symbolMap["blackrook"]="R";
			symbolMap["whiterook"]="R";
			symbolMap["blackknight"]="N";
			symbolMap["whiteknight"]="N";
			symbolMap["blackbishop"]="B";
			symbolMap["whitebishop"]="B";
			symbolMap["blackking"]="K";
			symbolMap["whiteking"]="K";
			symbolMap["blackqueen"]="Q";
			symbolMap["whitequeen"]="Q";
	        return symbolMap[piece];
        },
        hasMoveResultedInCheck:function ($scope,cell){
        	// TODO improve logic for shade check. e.g. if opponent knight is in path of opp queen and our king, opponent moves knight, should result in check
                var cellArray=fns.getPossibleMovesByPieceOnCell($scope,cell);
                for(var i=0;i<cellArray.length;i++){
                var piece=fns.getPieceType($("#"+cellArray[i]));
                if (piece.indexOf($scope.nextmoveby+"king")>-1){
                return true;
                }
                }
                return false;
          }
  }
  return fns;
})
.controller('chessBoardController', function ($scope, chessBoardService) {
 $scope.nextmoveby="white";
 $scope.player1={
        "name":"Mohit",
        "piececolour":"white",
        "pieces":[
                        {"type":"pawn","position":"a2"},
                        {"type":"pawn","position":"b2"},
                        {"type":"pawn","position":"c2"},
                        {"type":"pawn","position":"d2"},
                        {"type":"pawn","position":"e2"},
                        {"type":"pawn","position":"f2"},
                        {"type":"pawn","position":"g2"},
                        {"type":"pawn","position":"h2"},
                        {"type":"rook","position":"a1"},
                        {"type":"knight","position":"b1"},
                        {"type":"bishop","position":"c1"},
                        {"type":"queen","position":"d1"},
                        {"type":"king","position":"e1"},
                        {"type":"bishop","position":"f1"},
                        {"type":"knight","position":"g1"},
                        {"type":"rook","position":"h1"}
                        ]
        };
        $scope.player2={
        "name":"Comp",
        "piececolour":"black",
        "pieces":[
                        {"type":"pawn","position":"a7"},
                        {"type":"pawn","position":"b7"},
                        {"type":"pawn","position":"c7"},
                        {"type":"pawn","position":"d7"},
                        {"type":"pawn","position":"e7"},
                        {"type":"pawn","position":"f7"},
                        {"type":"pawn","position":"g7"},
                        {"type":"pawn","position":"h7"},
                        {"type":"rook","position":"a8"},
                        {"type":"knight","position":"b8"},
                        {"type":"bishop","position":"c8"},
                        {"type":"queen","position":"d8"},
                        {"type":"king","position":"e8"},
                        {"type":"bishop","position":"f8"},
                        {"type":"knight","position":"g8"},
                        {"type":"rook","position":"h8"}
                  ]
        };
                        chessBoardService.initilizePlayer($scope.player1);
                        chessBoardService.initilizePlayer($scope.player2);
                        $scope.alertval=function(val){ 
                        var thisCell=$("#"+val);
                                         if(thisCell.is(".possiblemovecell")){
                                                chessBoardService.moveTo($scope,thisCell);
                                        }
                                        else if(thisCell.is(".blackcell,.whitecell")){
                                        if($scope.nextmoveby==chessBoardService.getPieceColour(chessBoardService.getPieceType(thisCell))){
                                                $(".active").removeClass("active");
                                                $(".possiblemovecell").removeClass("possiblemovecell");
                                               thisCell.addClass("active");
                                                chessBoardService.highlightPossibleMoves($scope,thisCell);
                                             }
                                        }
                        }        
})
.directive('chessCell', function() {
  return {
    template:"onclick(alert(this.id))"
  };
})
;
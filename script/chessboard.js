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
   $scope.screenshot.whitepawns=  fns.findPiece("whitepawn");
   $scope.screenshot.whiterook=  fns.findPiece("whiterook");
   $scope.screenshot.whiteknight=  fns.findPiece("whiteknight");
   $scope.screenshot.whitebishop=  fns.findPiece("whitebishop");
   $scope.screenshot.whitequeen=  fns.findPiece("whitequeen");
   $scope.screenshot.whiteking=  fns.findPiece("whiteking");
   $scope.screenshot.blackpawns=  fns.findPiece("blackpawn");
   $scope.screenshot.blackrook=  fns.findPiece("blackrook");
   $scope.screenshot.blackknight=  fns.findPiece("blackknight");
   $scope.screenshot.blackbishop=  fns.findPiece("blackbishop");
   $scope.screenshot.blackqueen=  fns.findPiece("blackqueen");
   $scope.screenshot.blackking=  fns.findPiece("blackking");
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
            $(".whitepawn_black").removeClass("whitepawn_black");
            $(".whitepawn_white").removeClass("whitepawn_white");
            for(var i=0;i<$scope.screenshot.whitepawns.length;i++){
            $scope.screenshot.whitepawns[i].addClass("whitepawn_"+fns.getCellColour($scope.screenshot.whitepawns[i]));
            }
            $(".whiterook_black").removeClass("whiterook_black");
            $(".whiterook_white").removeClass("whiterook_white");
            for(var i=0;i<$scope.screenshot.whiterook.length;i++){
            $scope.screenshot.whiterook[i].addClass("whiterook_"+fns.getCellColour($scope.screenshot.whiterook[i]));
            }
           $(".whiteknight_black").removeClass("whiteknight_black");
            $(".whiteknight_white").removeClass("whiteknight_white");
            for(var i=0;i<$scope.screenshot.whiteknight.length;i++){
            $scope.screenshot.whiteknight[i].addClass("whiteknight_"+fns.getCellColour($scope.screenshot.whiteknight[i]));
            }
           $(".whitebishop_black").removeClass("whitebishop_black");
            $(".whitebishop_white").removeClass("whitebishop_white");
            for(var i=0;i<$scope.screenshot.whitebishop.length;i++){
            $scope.screenshot.whitebishop[i].addClass("whitebishop_"+fns.getCellColour($scope.screenshot.whitebishop[i]));
            }
           $(".whitequeen_black").removeClass("whitequeen_black");
            $(".whitequeen_white").removeClass("whitequeen_white");
            for(var i=0;i<$scope.screenshot.whitequeen.length;i++){
            $scope.screenshot.whitequeen[i].addClass("whitequeen_"+fns.getCellColour($scope.screenshot.whitequeen[i]));
            }
          $(".whiteking_black").removeClass("whiteking_black");
            $(".whiteking_white").removeClass("whiteking_white");
            for(var i=0;i<$scope.screenshot.whiteking.length;i++){
            $scope.screenshot.whiteking[i].addClass("whiteking_"+fns.getCellColour($scope.screenshot.whiteking[i]));
            }
    
   
       $(".blackpawn_black").removeClass("blackpawn_black");
    $(".blackpawn_white").removeClass("blackpawn_white");
    for(var i=0;i<$scope.screenshot.blackpawns.length;i++){
    $scope.screenshot.blackpawns[i].addClass("blackpawn_"+fns.getCellColour($scope.screenshot.blackpawns[i]));
    }
    $(".blackrook_black").removeClass("blackrook_black");
    $(".blackrook_white").removeClass("blackrook_white");
    for(var i=0;i<$scope.screenshot.blackrook.length;i++){
    $scope.screenshot.blackrook[i].addClass("blackrook_"+fns.getCellColour($scope.screenshot.blackrook[i]));
    }
   $(".blackknight_black").removeClass("blackknight_black");
    $(".blackknight_white").removeClass("blackknight_white");
    for(var i=0;i<$scope.screenshot.blackknight.length;i++){
    $scope.screenshot.blackknight[i].addClass("blackknight_"+fns.getCellColour($scope.screenshot.blackknight[i]));
    }
   $(".blackbishop_black").removeClass("blackbishop_black");
    $(".blackbishop_white").removeClass("blackbishop_white");
    for(var i=0;i<$scope.screenshot.blackbishop.length;i++){
    $scope.screenshot.blackbishop[i].addClass("blackbishop_"+fns.getCellColour($scope.screenshot.blackbishop[i]));
    }
   $(".blackqueen_black").removeClass("blackqueen_black");
    $(".blackqueen_white").removeClass("blackqueen_white");
    for(var i=0;i<$scope.screenshot.blackqueen.length;i++){
    $scope.screenshot.blackqueen[i].addClass("blackqueen_"+fns.getCellColour($scope.screenshot.blackqueen[i]));
    }
  $(".blackking_black").removeClass("blackking_black");
    $(".blackking_white").removeClass("blackking_white");
    for(var i=0;i<$scope.screenshot.blackking.length;i++){
    $scope.screenshot.blackking[i].addClass("blackking_"+fns.getCellColour($scope.screenshot.blackking[i]));
    
    }
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
        
        var cellArray=fns.findPiece(opponentColour+"pawn");
        for (var i=0;i<cellArray.length;i++){
                if(fns.getPossibleMovesByPieceOnCell($scope,cellArray[i]).indexOf(kingCell.attr('id'))>-1){
                        isChecked=true;
                }
        }
        if(!isChecked){
        var cellArray=fns.findPiece(opponentColour+"rook");
        for (var i=0;i<cellArray.length;i++){
                if(fns.getPossibleMovesByPieceOnCell($scope,cellArray[i]).indexOf(kingCell.attr('id'))>-1){
                        isChecked=true;
                }
        }
        if(!isChecked){
        var cellArray=fns.findPiece(opponentColour+"knight");
        for (var i=0;i<cellArray.length;i++){
                if(fns.getPossibleMovesByPieceOnCell($scope,cellArray[i]).indexOf(kingCell.attr('id'))>-1){
                        isChecked=true;
                }
        }
        if(!isChecked){
        var cellArray=fns.findPiece(opponentColour+"bishop");
        for (var i=0;i<cellArray.length;i++){
                if(fns.getPossibleMovesByPieceOnCell($scope,cellArray[i]).indexOf(kingCell.attr('id'))>-1){
                        isChecked=true;
                }
        }
        if(!isChecked){
        var cellArray=fns.findPiece(opponentColour+"queen");
        for (var i=0;i<cellArray.length;i++){
                if(fns.getPossibleMovesByPieceOnCell($scope,cellArray[i]).indexOf(kingCell.attr('id'))>-1){
                        isChecked=true;
                }
        }
        if(!isChecked){
        var cellArray=fns.findPiece(opponentColour+"king");
        for (var i=0;i<cellArray.length;i++){
                if(fns.getPossibleMovesByPieceOnCell($scope,cellArray[i]).indexOf(kingCell.attr('id'))>-1){
                        isChecked=true;
                }
        }
        
        }
        }
        }
        }
        }
        
        
        
   return isChecked;
   },
  initilizePlayer:function(player){
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
                
                if(cell.hasClass("whitepawn_"+color)){
                
                        piece="whitepawn";
                }
                else if(cell.hasClass("blackpawn_"+color)){
                        piece="blackpawn";
                }
                else if(cell.hasClass("whiterook_"+color)){
                        piece="whiterook";
                }
                else if(cell.hasClass("blackrook_"+color)){
                        piece="blackrook";
                }
                else if(cell.hasClass("whiteknight_"+color)){
                        piece="whiteknight";
                }
                else if(cell.hasClass("blackknight_"+color)){
                        piece="blackknight";
                }
                else if(cell.hasClass("whitebishop_"+color)){
                        piece="whitebishop";
                }
                else if(cell.hasClass("blackbishop_"+color)){
                        piece="blackbishop";
                }
                else if(cell.hasClass("whiteking_"+color)){
                        piece="whiteking";
                }
                else if(cell.hasClass("blackking_"+color)){
                        piece="blackking";
                }
                else if(cell.hasClass("whitequeen_"+color)){
                        piece="whitequeen";
                }
                else if(cell.hasClass("blackqueen_"+color)){
                        piece="blackqueen";
                }
                
                
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
                                	console.log("---------------");
                                	console.log(oldCellRow[0]);
                                	console.log(newCellRow[0]);
                                	console.log(oldCellRow[0]!=newCellRow[0]);
                                	console.log("fns.isEmptyCell(newCell)"+fns.isEmptyCell(newCell));
                                	console.log((oldCellRow[0]!=newCellRow[0])&&(fns.isEmptyCell(newCell)));
                                	
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
                alert("check");
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
                if(piece=="blackpawn"){
                       possibleMovesCellArray=fns.getPawnMoves(cell,"black");
                }
                else if(piece=="blackrook"){
                        possibleMovesCellArray=fns.getRookMoves(cell,"black");
                }
                else if(piece=="blackknight"){
                 possibleMovesCellArray=fns.getKnightMoves(cell,"black");
                }
                else if(piece=="blackbishop"){
                possibleMovesCellArray=fns.getBishopMoves(cell,"black");
                }
                else if(piece=="blackking"){
                possibleMovesCellArray=fns.getKingMoves($scope,cell,"black");
                }
                else if(piece=="blackqueen"){
                possibleMovesCellArray=fns.getQueenMoves(cell,"black");
                }
                else if(piece=="whitepawn"){
                possibleMovesCellArray=fns.getPawnMoves(cell,"white");
                }
                else if(piece=="whiterook"){
                 possibleMovesCellArray=fns.getRookMoves(cell,"white");
                }
                else if(piece=="whiteknight"){
                possibleMovesCellArray=fns.getKnightMoves(cell,"white");
                }
                
                else if(piece=="whitebishop"){
                possibleMovesCellArray=fns.getBishopMoves(cell,"white");
                }
                else if(piece=="whiteking"){
                possibleMovesCellArray=fns.getKingMoves($scope,cell,"white");
                }
                else if(piece=="whitequeen"){
                possibleMovesCellArray=fns.getQueenMoves(cell,"white");
                }
                
                
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
        getPawnMoves: function(currentcell,pawnColour){
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
                                
                                
                                // kaatne wale
                                var adjacentcols=fns.getAdjacentCols(cellPosition[0]);
                                for(var i=0;i<adjacentcols.length;i++){
                                        if(fns.cellHasTeamPiece($("#"+adjacentcols[i]+(parseInt(cellPosition[1])-1)),"white")){
                                                possibleMovesArray[possibleMovesArray.length]=adjacentcols[i]+(parseInt(cellPosition[1])-1);
                                        }
                                }
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
                                
                                var adjacentcols=fns.getAdjacentCols(cellPosition[0]);
                                for(var i=0;i<adjacentcols.length;i++){
                                        if(fns.cellHasTeamPiece($("#"+adjacentcols[i]+(parseInt(cellPosition[1])+1)),"black")){
                                                possibleMovesArray[possibleMovesArray.length]=adjacentcols[i]+(parseInt(cellPosition[1])+1);
                                        }
                                }
                                
                                // if current pawn is on fifth line, and in last move a neighbour moved 2 cells 
                                if(cellPosition[1]==5){

                                    var logtobeChecked=".blacklog";
                                    var lastMove=$(logtobeChecked)[$(logtobeChecked).length-1];
                                    var neighbour=fns.getAdjacentCols(cellPosition[0]);
                                    //for all neighnours
                                    var move="P "+neighbour[0]+"7 - "+neighbour[0]+"5";
                                    console.log(move);
                                    console.log(lastMove.textContent);
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
                if(col=="a"){
                        adjacentcols[0]="b";
                }
                else if(col=="b"){
                        adjacentcols[0]="a";
                        adjacentcols[1]="c";
                }
                else if(col=="c"){
                        adjacentcols[0]="b";
                        adjacentcols[1]="d";
                }
                else if(col=="d"){
                        adjacentcols[0]="c";
                        adjacentcols[1]="e";
                }
                else if(col=="e"){
                        adjacentcols[0]="d";
                        adjacentcols[1]="f";
                }
                else if(col=="f"){
                        adjacentcols[0]="e";
                        adjacentcols[1]="g";
                }
                else if(col=="g"){
                        adjacentcols[0]="f";
                        adjacentcols[1]="h";
                }
                else if(col=="h"){
                        adjacentcols[0]="g";
                }
        return adjacentcols;
        },
        getWestCols:function (col){
        var westcols=[];
       
        if(col=="b"){
                westcols[westcols.length]="a";
                
        }
        else if(col=="c"){
                westcols[westcols.length]="b";
                westcols[westcols.length]="a";
        }
        else if(col=="d"){
                westcols[westcols.length]="c";
                westcols[westcols.length]="b";
                westcols[westcols.length]="a";
        }
        else if(col=="e"){
                westcols[westcols.length]="d";
                westcols[westcols.length]="c";
                westcols[westcols.length]="b";
                westcols[westcols.length]="a";
        }
        else if(col=="f"){
                westcols[westcols.length]="e";
                westcols[westcols.length]="d";
                westcols[westcols.length]="c";
                westcols[westcols.length]="b";
                westcols[westcols.length]="a";
        }
        else if(col=="g"){
                westcols[westcols.length]="f";
                 westcols[westcols.length]="e";
                westcols[westcols.length]="d";
                westcols[westcols.length]="c";
                westcols[westcols.length]="b";
                westcols[westcols.length]="a";
        }
        else if(col=="h"){
                westcols[westcols.length]="g";
                westcols[westcols.length]="f";
                 westcols[westcols.length]="e";
                westcols[westcols.length]="d";
                westcols[westcols.length]="c";
                westcols[westcols.length]="b";
                westcols[westcols.length]="a";
        }
return westcols;
}
,
getEastCols:function (col){
        var eastcols=[];
        if(col=="a"){
                 eastcols[eastcols.length]="b";
                eastcols[eastcols.length]="c";
                 eastcols[eastcols.length]="d";
                eastcols[eastcols.length]="e";
                eastcols[eastcols.length]="f";
                eastcols[eastcols.length]="g";
                eastcols[eastcols.length]="h";
        }
        else if(col=="b"){
                eastcols[eastcols.length]="c";
                 eastcols[eastcols.length]="d";
                eastcols[eastcols.length]="e";
                eastcols[eastcols.length]="f";
                eastcols[eastcols.length]="g";
                eastcols[eastcols.length]="h";
                
        }
        else if(col=="c"){
                eastcols[eastcols.length]="d";
                eastcols[eastcols.length]="e";
                eastcols[eastcols.length]="f";
                eastcols[eastcols.length]="g";
                eastcols[eastcols.length]="h";
        }
        else if(col=="d"){
                eastcols[eastcols.length]="e";
                eastcols[eastcols.length]="f";
                eastcols[eastcols.length]="g";
                eastcols[eastcols.length]="h";
        }
        else if(col=="e"){
              eastcols[eastcols.length]="f";
                eastcols[eastcols.length]="g";
                eastcols[eastcols.length]="h";
        }
        else if(col=="f"){
                 eastcols[eastcols.length]="g";
                eastcols[eastcols.length]="h";
        }
        else if(col=="g"){
               
                eastcols[eastcols.length]="h";
        }
        
return eastcols;
},
cellHasTeamPiece:function (cell,colour){
if("white"==colour){
return cell.is(".whitepawn_white,.whiterook_white,.whiteknight_white,.whitebishop_white,.whiteking_white,.whitequeen_white,.whitepawn_black,.whiterook_black,.whiteknight_black,.whitebishop_black,.whiteking_black,.whitequeen_black");
}
else if("black"==colour){
return cell.is(".blackpawn_white,.blackrook_white,.blackknight_white,.blackbishop_white,.blackking_white,.blackqueen_white,.blackpawn_black,.blackrook_black,.blackknight_black,.blackbishop_black,.blackking_black,.blackqueen_black");
}

},
getRookMoves:function (currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");

//north moves
var i=1;
var cellId=cellPosition[0]+(parseInt(cellPosition[1])+i);
while(fns.isLegalCell($("#"+cellId))){
        if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=cellPosition[0]+(parseInt(cellPosition[1])+i);
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
//south moves

var i=-1;
var cellId=cellPosition[0]+(parseInt(cellPosition[1])+i);
while(fns.isLegalCell($("#"+cellId))){
        if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i-1;
        cellId=cellPosition[0]+(parseInt(cellPosition[1])+i);
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
//west moves


var westColsArray=fns.getWestCols(cellPosition[0]);

for(var i=0;i<westColsArray.length;i++){
var cellId=westColsArray[i]+cellPosition[1];
 if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        
     
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


//east moves

var eastColsArray=fns.getEastCols(cellPosition[0]);

for(var i=0;i<eastColsArray.length;i++){
var cellId=eastColsArray[i]+cellPosition[1];
 if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        
     
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
},
/************************************************************************************************************************************
*
* knight Functions
************************************************************************************************************************************/
getKnightMoves:function (currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");
var cellId=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+2);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
       
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+2);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-2);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-2);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}

var cellId=fns.getEastCols(cellPosition[0])[1]+(parseInt(cellPosition[1])-1);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=fns.getWestCols(cellPosition[0])[1]+(parseInt(cellPosition[1])-1);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=fns.getEastCols(cellPosition[0])[1]+(parseInt(cellPosition[1])+1);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=fns.getWestCols(cellPosition[0])[1]+(parseInt(cellPosition[1])+1);
if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour( fns.getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}


return possibleMovesArray;
},

/************************************************************************************************************************************
*
* Bishop Functions
************************************************************************************************************************************/
getBishopMoves:function (cell,colour){
var possibleMovesArray=[];
var cellPosition=cell.attr("id").split("");

//NE
var i=1;
var cellId=fns.getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
while(fns.isLegalCell($("#"+cellId))){
        if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=fns.getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
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
//Nw
var i=1;
var cellId=fns.getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
while(fns.isLegalCell($("#"+cellId))){
        if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=fns.getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
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
//SE
var i=1;
var cellId=fns.getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
while(fns.isLegalCell($("#"+cellId))){
        if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=fns.getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
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
//SW
var i=1;
var cellId=fns.getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
while(fns.isLegalCell($("#"+cellId))){
        if(fns.isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=fns.getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
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
},

/************************************************************************************************************************************
*
* Queen Functions
************************************************************************************************************************************/
getQueenMoves:function (cell,colour){
var possibleMovesArray=fns.getBishopMoves(cell,colour);
var rookMoves=fns.getRookMoves(cell,colour);
for(var i=0;i<rookMoves.length;i++){
possibleMovesArray[possibleMovesArray.length]=rookMoves[i];
}
return possibleMovesArray;
},
/************************************************************************************************************************************
*
* King Functions
************************************************************************************************************************************/

getKingMoves:function ($scope,currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");

//   X * *
//   * K *
//   * * *
var cellId=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+1);

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * X *
//   * K *
//   * * *
var cellId=cellPosition[0]+(parseInt(cellPosition[1])+1);

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * X
//   * K *
//   * * *
var cellId=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+1);

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * *
//   X K *
//   * * *
var cellId=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1]));

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
//   * * *
//   * K X
//   * * *
var cellId=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1]));

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
   
//   * * *
//   * K *
//   X * *
var cellId=fns.getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-1);

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * *
//   * K *
//   * X *
var cellId=cellPosition[0]+(parseInt(cellPosition[1])-1);

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * *
//   * K *
//   * * X
var cellId=fns.getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-1);

        if(fns.isLegalCell($("#"+cellId))&&(fns.isEmptyCell($("#"+cellId))||fns.getPieceColour(fns.getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
       
        
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
        // check for empty and safe path  
        
        
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
        var symbol;
        if(piece.indexOf("pawn")>-1){
                symbol='P';
        }
        else if(piece.indexOf("rook")>-1){
                symbol='R';
        }
         else if(piece.indexOf("knight")>-1){
                symbol='N';
        }
        else if(piece.indexOf("bishop")>-1){
                symbol='B';
        }
        else if(piece.indexOf("king")>-1){
                symbol='K';
        }
        else if(piece.indexOf("queen")>-1){
                symbol='Q';
        }
                return symbol;
        },
        hasMoveResultedInCheck:function ($scope,cell){
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




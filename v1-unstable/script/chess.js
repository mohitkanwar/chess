/*****************************************************************************************
*       Common functions
*
******************************************************************************************/

var nextmoveby="white";
$("#dialog").hide();
$("div").click(function() {
        if($(this).is(".possiblemovecell")){
                 moveTo($(this));
        }
        else if($(this).is(".blackcell,.whitecell")){
        if(nextmoveby==getPieceColour(getPieceType($(this)))){
                $(".active").removeClass("active");
                $(".possiblemovecell").removeClass("possiblemovecell");
                $(this).addClass("active");
                highlightPossibleMoves($(this));
             }
        }
        
});

function moveTo(cell){
        var currentCell=$(".active");
        var piece= getPieceType(currentCell);
        var newCellColour=getCellColour(cell);
        var isCapture=false;
        if(isPawnPromotion(piece,cell)){
        showPromotionOptions(piece,cell);
        }
       // else if(isCheck()){
        //}
        //else if(isCheckmate()){
       // }
        else{
         if(!isEmptyCell(cell)){
                cell.removeClass(getPieceType(cell)+"_"+newCellColour);
                isCapture=true;
        }
        cell.addClass(piece+"_"+newCellColour);
        currentCell.removeClass(piece+"_"+getCellColour(currentCell));
        currentCell.removeClass("active");
        $(".possiblemovecell").removeClass("possiblemovecell");
        logMove(piece,cell,isCapture,currentCell);
        nextmoveby=getOpponentColour(getPieceColour(piece));
        }
        if(hasMoveResultedInCheck(cell)){
        $("#warning").text("Check!!");
        }
        else{
        $("#warning").text("");
        }
        
}
function hasMoveResultedInCheck(cell){
var cellArray=getPossibleMovesByPieceOnCell(cell);
for(var i=0;i<cellArray.length;i++){
var piece=getPieceType($("#"+cellArray[i]));
if (piece.indexOf(nextmoveby+"king")>-1){
return true;
}
}
return false;

}
function promotePawn(promoteTo,newcell){
        var newCellColour=getCellColour(newcell);
        var currentCell=$(".active");
        var capture=false;
        if(!isEmptyCell(newcell)){
                newcell.removeClass(getPieceType(newcell)+"_"+newCellColour);
                capture=true;
        }
        var piece=nextmoveby+promoteTo;
        newcell.addClass(piece+"_"+newCellColour);
        currentCell.removeClass(getPieceType(currentCell)+"_"+getCellColour(currentCell));
        currentCell.removeClass("active");
        $(".possiblemovecell").removeClass("possiblemovecell");
        // logging
        
        
        var move=newcell.attr('id')+"="+getPieceSymbol(piece);
        if(capture){
        move=currentCell.attr("id").split("")[0]+' x '+move;
        }
        if( nextmoveby=="white"){
                
                $("#logtable").append("<tr><td class='whitelog'>"+move+"</td><td class='blacklog lastBlackLog'></td></tr>");
        }
        else{
        $(".lastBlackLog").append(move);
        $(".lastBlackLog").removeClass("lastBlackLog");
        }
        //logging over
        nextmoveby=getOpponentColour(getPieceColour(piece));
}
function showPromotionOptions(piece,moveTocell){

    $( "#dialog" ).dialog({
    dialogClass: 'no-close',
      modal: true,
      buttons: {
        "Queen": function() {
                promotePawn('queen',moveTocell);
          $( this ).dialog( "close" );
        },
        "Rook": function() {
        promotePawn('rook',moveTocell);
          $( this ).dialog( "close" );
        },
        "Knight": function() {
        promotePawn('knight',moveTocell);
          $( this ).dialog( "close" );
        },
        "Bishop": function() {
        promotePawn('bishop',moveTocell);
          $( this ).dialog( "close" );
        }
    }
    });
   

}
function isPawnPromotion(piece,cell){
        if(((piece=="whitepawn")&&(cell.attr("id").split("")[1]==8))||((piece=="blackpawn")&&(cell.attr("id").split("")[1]==1))){
                return true;
        }
        else{
                return false;
        }
}
function logMove(piece,cell,isCapture,oldcell){
        var pieceSymbol=getPieceSymbol(piece);
        var move=pieceSymbol;
        if(isCapture){
        if(pieceSymbol==""){
        move=oldcell.attr("id").split("")[0];
        }
        move=move+' x ';
        }
        move=move+cell.attr('id');
        if( getPieceColour(piece)=="white"){
                
                $("#logtable").append("<tr><td class='whitelog'>"+move+"</td><td class='blacklog lastBlackLog'></td></tr>");
        }
        else{
        $(".lastBlackLog").append(move);
        $(".lastBlackLog").removeClass("lastBlackLog");
        }
}
              


function getPieceSymbol(piece){
        var symbol;
        if(piece.indexOf("pawn")>-1){
                symbol='';
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
}
function getPieceColour(pieceName){
if(pieceName!=""){
if(pieceName.indexOf("black")>-1){
return "black";
}
else {
return "white";
}
}
}
function getOpponentColour(colour){
if(colour=="black"){
return "white";
}
else {
return "black";
}
}
function selectCell(cell){
                if(!isEmptyCell(cell)){
                         $(".active").removeClass("active");
                         $(".possiblemovecell").removeClass("possiblemovecell");
                         
                         cell.addClass("active");
                }
}
function getCellColour(cell){
        if(cell.is(".blackcell")){
        return "black";
        }
        else if(cell.is(".whitecell")){
        return "white";
        }
}
function highlightPossibleMoves(cell){
var highlightCellArray=getPossibleMovesByPieceOnCell(cell);
for(i=0;i<highlightCellArray.length;i++){
        $("#"+highlightCellArray[i]).addClass("possiblemovecell");
        }
}
function getPossibleMovesByPieceOnCell(cell){
        var piece= getPieceType(cell);
        var possibleMovesCellArray= new Array();
        if(piece=="blackpawn"){
               possibleMovesCellArray=getPawnMoves(cell,"black");
        }
        else if(piece=="blackrook"){
                possibleMovesCellArray=getRookMoves(cell,"black");
        }
        else if(piece=="blackknight"){
         possibleMovesCellArray=getKnightMoves(cell,"black");
        }
        else if(piece=="blackbishop"){
        possibleMovesCellArray=getBishopMoves(cell,"black");
        }
        else if(piece=="blackking"){
        possibleMovesCellArray=getKingMoves(cell,"black");
        }
        else if(piece=="blackqueen"){
        possibleMovesCellArray=getQueenMoves(cell,"black");
        }
        else if(piece=="whitepawn"){
        possibleMovesCellArray=getPawnMoves(cell,"white");
        }
        else if(piece=="whiterook"){
         possibleMovesCellArray=getRookMoves(cell,"white");
        }
        else if(piece=="whiteknight"){
        possibleMovesCellArray=getKnightMoves(cell,"white");
        }
        
        else if(piece=="whitebishop"){
        possibleMovesCellArray=getBishopMoves(cell,"white");
        }
        else if(piece=="whiteking"){
        possibleMovesCellArray=getKingMoves(cell,"white");
        }
        else if(piece=="whitequeen"){
        possibleMovesCellArray=getQueenMoves(cell,"white");
        }
        return possibleMovesCellArray;
}

function isEmptyCell(cell){
return getPieceType(cell)=="";
}
function isLegalCell(cell){
return cell.hasClass("blackcell")||cell.hasClass("whitecell");
        
}
function getPieceType(cell){
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
}
function getAdjacentCols(col){
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
}
function getWestCols(col){
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

function getEastCols(col){
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
}
function cellHasTeamPiece(cell,colour){
if("white"==colour){
return cell.is(".whitepawn_white,.whiterook_white,.whiteknight_white,.whitebishop_white,.whiteking_white,.whitequeen_white,.whitepawn_black,.whiterook_black,.whiteknight_black,.whitebishop_black,.whiteking_black,.whitequeen_black");
}
else if("black"==colour){
return cell.is(".blackpawn_white,.blackrook_white,.blackknight_white,.blackbishop_white,.blackking_white,.blackqueen_white,.blackpawn_black,.blackrook_black,.blackknight_black,.blackbishop_black,.blackking_black,.blackqueen_black");
}

}
/*****************************************************************************************
*       Pawn functions
*
******************************************************************************************/
function getPawnMoves(currentcell,pawnColour){
        var cellPosition=currentcell.attr("id").split("");
        var possibleMovesArray=[];
        //seedha chalne wale
        if(pawnColour=="black" ){
                var cellId=cellPosition[0]+(parseInt(cellPosition[1])-1);
                if(isEmptyCell($("#"+cellId))){
                        if($("#warning").text()=="Check!!"){
                              
                        }
                        possibleMovesArray[0]=cellId;
                }
                if(cellPosition[1]==7){
                 var cellId2=cellPosition[0]+(parseInt(cellPosition[1])-2);
                if(isEmptyCell($("#"+cellId))&&isEmptyCell($("#"+cellId2))){
                        possibleMovesArray[1]=cellId2;
                }
                     
                }
                
                
                // kaatne wale
                var adjacentcols=getAdjacentCols(cellPosition[0]);
                for(var i=0;i<adjacentcols.length;i++){
                        if(cellHasTeamPiece($("#"+adjacentcols[i]+(parseInt(cellPosition[1])-1)),"white")){
                                possibleMovesArray[possibleMovesArray.length]=adjacentcols[i]+(parseInt(cellPosition[1])-1);
                        }
                }
        }
        else if(pawnColour=="white" ){
               var cellId=cellPosition[0]+(parseInt(cellPosition[1])+1);
                if(isEmptyCell($("#"+cellId))){
                        possibleMovesArray[0]=cellId;
                }
                if(cellPosition[1]==2){
                 var cellId2=cellPosition[0]+(parseInt(cellPosition[1])+2);
                if(isEmptyCell($("#"+cellId))&&isEmptyCell($("#"+cellId2))){
                        possibleMovesArray[1]=cellId2;
                }
                     
                }
                
                var adjacentcols=getAdjacentCols(cellPosition[0]);
                for(var i=0;i<adjacentcols.length;i++){
                        if(cellHasTeamPiece($("#"+adjacentcols[i]+(parseInt(cellPosition[1])+1)),"black")){
                                possibleMovesArray[possibleMovesArray.length]=adjacentcols[i]+(parseInt(cellPosition[1])+1);
                        }
                }
        }
        
return possibleMovesArray;
}

//TODO En-Pas-On move to be added
//TODO Growing to other elements on reaching last line


/************************************************************************************************************************************
*
* Rook Functions
************************************************************************************************************************************/


function getRookMoves(currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");

//north moves
var i=1;
var cellId=cellPosition[0]+(parseInt(cellPosition[1])+i);
while(isLegalCell($("#"+cellId))){
        if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=cellPosition[0]+(parseInt(cellPosition[1])+i);
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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
while(isLegalCell($("#"+cellId))){
        if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i-1;
        cellId=cellPosition[0]+(parseInt(cellPosition[1])+i);
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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


var westColsArray=getWestCols(cellPosition[0]);

for(var i=0;i<westColsArray.length;i++){
var cellId=westColsArray[i]+cellPosition[1];
 if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        
     
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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

var eastColsArray=getEastCols(cellPosition[0]);

for(var i=0;i<eastColsArray.length;i++){
var cellId=eastColsArray[i]+cellPosition[1];
 if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        
     
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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



/************************************************************************************************************************************
*
* knight Functions
************************************************************************************************************************************/
function getKnightMoves(currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");
var cellId=getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+2);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
       
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+2);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-2);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-2);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}

var cellId=getEastCols(cellPosition[0])[1]+(parseInt(cellPosition[1])-1);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=getWestCols(cellPosition[0])[1]+(parseInt(cellPosition[1])-1);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=getEastCols(cellPosition[0])[1]+(parseInt(cellPosition[1])+1);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}
var cellId=getWestCols(cellPosition[0])[1]+(parseInt(cellPosition[1])+1);
if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour( getPieceType($("#"+cellId)))!=colour)){
possibleMovesArray[possibleMovesArray.length]= cellId;
}


return possibleMovesArray;
}

/************************************************************************************************************************************
*
* Bishop Functions
************************************************************************************************************************************/
function getBishopMoves(cell,colour){
var possibleMovesArray=[];
var cellPosition=cell.attr("id").split("");

//NE
var i=1;
var cellId=getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
while(isLegalCell($("#"+cellId))){
        if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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
var cellId=getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
while(isLegalCell($("#"+cellId))){
        if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])+i);
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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
var cellId=getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
while(isLegalCell($("#"+cellId))){
        if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=getEastCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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
var cellId=getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
while(isLegalCell($("#"+cellId))){
        if(isEmptyCell($("#"+cellId))){
        possibleMovesArray[possibleMovesArray.length]=cellId;
        i=i+1;
        cellId=getWestCols(cellPosition[0])[i-1]+(parseInt(cellPosition[1])-i);
        }
        else{
                var blockingpiececolour=getPieceColour(getPieceType($("#"+cellId)));
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
/************************************************************************************************************************************
*
* Queen Functions
************************************************************************************************************************************/
function getQueenMoves(cell,colour){
var possibleMovesArray=getBishopMoves(cell,colour);
var rookMoves=getRookMoves(cell,colour);
for(var i=0;i<rookMoves.length;i++){
possibleMovesArray[possibleMovesArray.length]=rookMoves[i];
}
return possibleMovesArray;
}

/************************************************************************************************************************************
*
* King Functions
************************************************************************************************************************************/

function getKingMoves(currentcell,colour){
var possibleMovesArray=[];
var cellPosition=currentcell.attr("id").split("");

//   X * *
//   * K *
//   * * *
var cellId=getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+1);

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * X *
//   * K *
//   * * *
var cellId=cellPosition[0]+(parseInt(cellPosition[1])+1);

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * X
//   * K *
//   * * *
var cellId=getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])+1);

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * *
//   X K *
//   * * *
var cellId=getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1]));

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
//   * * *
//   * K X
//   * * *
var cellId=getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1]));

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
   
//   * * *
//   * K *
//   X * *
var cellId=getEastCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-1);

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * *
//   * K *
//   * X *
var cellId=cellPosition[0]+(parseInt(cellPosition[1])-1);

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
        
//   * * *
//   * K *
//   * * X
var cellId=getWestCols(cellPosition[0])[0]+(parseInt(cellPosition[1])-1);

        if(isLegalCell($("#"+cellId))&&(isEmptyCell($("#"+cellId))||getPieceColour(getPieceType($("#"+cellId)))!=colour)){
                possibleMovesArray[possibleMovesArray.length]=cellId;
        }
return possibleMovesArray;
}

//TODO Add Casteling

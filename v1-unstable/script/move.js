var CAPTURE_SYMBOL='x';

// works on sparkchess notation
// <startingCellId><moveTypeSymbol><destinationCellId>[=][promotedTo]
//Move-type 
//              to: -
//              capture: x
//
function move(move){
var splitby='-';
if(move.indexOf(CAPTURE_SYMBOL)>-1){
splitby='x';
}
var fromCell=move.split(splitby)[0];
       
}

function

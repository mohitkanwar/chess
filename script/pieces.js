
var pawn = angular.module('chessApp');

pawn.factory('pawnService', function() {
var pawnServiceFunctions={
       moveTo:function(cell){
                alert("moving to "+cell);
        }
       }
        
        
        return pawnServiceFunctions;
});


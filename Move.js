/*
 * File: Move.js, represents a potential move from one spot (currentSpot) to another (destination).
 *       A move is made when one instances' move method is called which will move the piece at currentSpot on the board
 *       to destination and then update the game by calling the Chess objects' update method
 *
 */



function Move(curr, dest){
    this.currentSpot = curr;
    this.destination = dest;
    
    this.Constructor
    
    //get the destination coordinate
    this.getDestination = function(){
        return this.destination;
    }
    //get the currentSpot coordinate
    this.getCurrentSpot = function(){
        return this.currentSpot;
    }
    
    //make the move by moving the piece on the board at currentSpot to destination and creating a new Empty space
    //at the currentSpot then call the Chess' update method
    this.move = function(){
        var row = Number(this.currentSpot.getRow());
        var col = Number(this.currentSpot.getCol());
        var p = ChessGame.getItem(this.currentSpot);
        p.setCoordinates(this.destination);
        ChessGame.setItem(this.destination, p);
        
        ChessGame.setItem(this.currentSpot, new Empty("empty", row, col, true));
        
        ChessGame.update();
    }
    
    //calculate and return all of the valid moves for a rook at Coordinate cord
    this.getValidMovesRook = function(cord){
        var ret = [];
        var row = Number(cord.getRow());
        var col = Number(cord.getCol());
        
        var topRow = (row - 1 < 0) ? row : (row - 1);
        var leftCol = (col - 1 < 0) ? col : (col - 1);
        var bottomRow = (row + 1 > ChessGame.dimmension - 1) ? row : (row + 1);
        var rightCol = (col + 1 > ChessGame.dimmension - 1) ? col : (col + 1);
        
        var c;
        
        //get all the spaces above the current location
        for (var r = topRow; r > -1; r--){
            c = new Coordinate(r, col);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
            }
        }
        
        //get all of the spaces below the current location
        for (var r = bottomRow; r < ChessGame.dimmension; r++){
            c = new Coordinate(r, col);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
            }
        }
        
        //get all of the spaces to the left of the current location
        for (var r = leftCol; r > -1; r--){
            c = new Coordinate(row, r);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
            }
        }
        
        //get all of the spaces to the right of the current location
        for (var r = rightCol; r < ChessGame.dimmension; r++){
            c = new Coordinate(row, r);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
            }
        }
        
        
        return ret;
    }
    
    this.getValidMovesBishop = function(cord){
        var ret = [];
        
        var row = Number(cord.getRow());
        var col = Number(cord.getCol());
        
        var topRow = (row - 1 < 0) ? row : (row - 1);
        var leftCol = (col - 1 < 0) ? col : (col - 1);
        var bottomRow = (row + 1 > ChessGame.dimmension - 1) ? row : (row + 1);
        var rightCol = (col + 1 > ChessGame.dimmension - 1) ? col : (col + 1);
        
        var c;
        
        var r = topRow;
        var co = rightCol;
        while (r > -1 && co < ChessGame.dimmension){
            c = new Coordinate(r, co);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            else if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
                r -= 1;
                co += 1;
            }
        }
        
        r = topRow;
        co = leftCol;
        while (r > -1 && co > -1){
            c = new Coordinate(r, co);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            else if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
                r -= 1;
                co -= 1;
            }
        }
        
        r = bottomRow;
        co = rightCol;
        while (r < ChessGame.dimmension && co < ChessGame.dimmension){
            c = new Coordinate(r, co);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            else if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
                r+= 1;
                co+= 1;
            }
        }
        
        
        r = bottomRow;
        co = leftCol;
        while (r < ChessGame.dimmension && co > -1){
            c = new Coordinate(r, co);
            var p = ChessGame.getItem(c);
            if (!p.isEmpty() && p.getColor() == ChessGame.getItem(cord).getColor()){
                break;
            }
            else if (!p.isEmpty() && !(p.getColor() == ChessGame.getItem(cord).getColor())){
                ret[ret.length] = (new Move(cord, c));
                break;
            }
            else{
                ret[ret.length] = (new Move(cord, c));
                r += 1;
                co -= 1;
            }
        }
        
        
        return ret;
    }
    
    this.getValidMovesPawn = function(cord){
        var row = Number(cord.getRow());
        var col = Number(cord.getCol());
        var ret = [];
        
        var nextPos;
        var nextPosHaventMoved;
        
        if (ChessGame.getItem(cord).getColor() == "b"){
            nextPos = (row + 1 > ChessGame.dimmension - 1) ? row : (row + 1);
            nextPosHaventMoved = (row + 2 > ChessGame.dimmension - 1) ? row : (row + 2);
            if (nextPos != row && ChessGame.getItem(new Coordinate(nextPos, col)).isEmpty()){
                ret[ret.length] = (new Move(cord,new Coordinate(nextPos, col)));
            }
            if (nextPosHaventMoved != row && ChessGame.getItem(new Coordinate(nextPos, col)).isEmpty()){
                if (cord.getRow() == 1){
                    ret[ret.length] = new Move(cord, new Coordinate(nextPosHaventMoved, col));
                }
            }
            
            
            return ret;
        }
        
        else{

            nextPos = (row - 1 < 0) ? row : (row - 1);
            nextPosHaventMoved = (row - 2 < 0) ? row : (row - 2);
            if (nextPos != row && ChessGame.getItem(new Coordinate(nextPos, col)).isEmpty()){
                ret[ret.length] = (new Move(cord,new Coordinate(nextPos, col)));
            }
            if (nextPosHaventMoved != row && ChessGame.getItem(new Coordinate(nextPos, col)).isEmpty()){
                if (cord.getRow() == 6){
                    ret[ret.length] = new Move(cord, new Coordinate(nextPosHaventMoved, col));
                }
            }
           
            return ret;
        }
    }
    
    this.getValidAttacksPawn = function(cord){
        var ret = [];
        
        var row = Number(cord.getRow());
        var col = Number(cord.getCol());
        
        var topRow = (row - 1 < 0) ? row : (row - 1);
        var leftCol = (col - 1 < 0) ? col : (col - 1);
        var bottomRow = (row + 1 > ChessGame.dimmension - 1) ? row : (row + 1);
        var rightCol = (col + 1 > ChessGame.dimmension - 1) ? col : (col + 1);
        
        var TR = new Coordinate(topRow, rightCol);
        var TL = new Coordinate(topRow, leftCol);
        
        var BR = new Coordinate(bottomRow, rightCol);
        var BL = new Coordinate(bottomRow, leftCol);
        
        var color = ChessGame.getItem(cord).getColor();
        
        if (color == "b"){
            if (BR.getCol() != col && !ChessGame.getItem(BR).isEmpty() && !(color == ChessGame.getItem(BR).getColor())){
                ret[ret.length] = (new Move(cord, BR));
            }
            if (BL.getCol() != col && !ChessGame.getItem(BL).isEmpty() && !(color == ChessGame.getItem(BL).getColor())){
                ret[ret.length] = (new Move(cord, BL));
            }
            
            
            return ret;
        }
        
        else{
            if (TR.getCol() != col && !ChessGame.getItem(TR).isEmpty() && !(color == ChessGame.getItem(TR).getColor())){
                ret[ret.length] = (new Move(cord, TR));
            }
            if (TL.getCol() != col && !ChessGame.getItem(TL).isEmpty() && !(color == ChessGame.getItem(TL).getColor())){
                ret[ret.length] = (new Move(cord, TL));
            }
            
            
            return ret;
        }
    }
    
    this.getValidMovesKnight = function(cord){
        var ret = [];
        
        var row = Number(cord.getRow());
        var col = Number(cord.getCol());
        
        var topRow2 = (row - 2 < 0) ? row : (row - 2);
        var leftCol2 = (col - 2 < 0) ? col : (col - 2);
        var bottomRow2 = (row + 2 > ChessGame.dimmension - 1) ? row : (row + 2);
        var rightCol2 = (col + 2 > ChessGame.dimmension - 1) ? col : (col + 2);
        var topRow1 = (row - 1 < 0) ? row : (row - 1);
        var leftCol1 = (col - 1 < 0) ? col : (col - 1);
        var bottomRow1 = (row + 1 > ChessGame.dimmension - 1) ? row : (row + 1);
        var rightCol1 = (col + 1 > ChessGame.dimmension - 1) ? col : (col + 1);
        
        var color = ChessGame.getItem(cord).getColor();
        var temp;
        
        if (topRow2 != row && rightCol1 != col){
            temp = new Coordinate(topRow2, rightCol1);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
            
        }
        
        if (topRow1 != row && rightCol2 != col){
            temp = new Coordinate(topRow1, rightCol2);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        if (bottomRow1 != row && rightCol2 != col){
            temp = new Coordinate(bottomRow1, rightCol2);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        if (bottomRow2 != row && rightCol1 != col){
            temp = new Coordinate(bottomRow2, rightCol1);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        
        
        
        
        if (topRow2 != row && leftCol1 != col){
            temp = new Coordinate(topRow2, leftCol1);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        if (topRow1 != row && leftCol2 != col){
            temp = new Coordinate(topRow1, leftCol2);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        if (bottomRow1 != row && leftCol2 != col){
            temp = new Coordinate(bottomRow1, leftCol2);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        if (bottomRow2 != row && leftCol1 != col){
            temp = new Coordinate(bottomRow2, leftCol1);
            
            if (!ChessGame.getItem(temp).isEmpty()){
                if (!(color == ChessGame.getItem(temp).getColor())){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            else{
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        
        return ret;
    }
    
    this.getValidMovesKing = function(cord){
        var ret = [];
        
        var color = ChessGame.getItem(cord).getColor();
        
        var row = Number(cord.getRow());
        var col = Number(cord.getCol());
        
        var topRow = (row - 1 < 0) ? row : (row - 1);
        var leftCol = (col - 1 < 0) ? col : (col - 1);
        var bottomRow = (row + 1 > ChessGame.dimmension - 1) ? row : (row + 1);
        var rightCol = (col + 1 > ChessGame.dimmension - 1) ? col : (col + 1);
        
        var temp;
        
        if (topRow != row){
            
            
            if (leftCol != col){
                temp = new Coordinate(topRow, leftCol);
                if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            
            if (rightCol != col){
                temp = new Coordinate(topRow, rightCol);
                if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                    ret[ret.length] = (new Move(cord, temp));
                }
                
            }
            
            temp = new Coordinate(topRow, col);
            if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                ret[ret.length] = (new Move(cord, temp));
            }
            
        }
        
        if (bottomRow != row){
            if (leftCol != col){
                temp = new Coordinate(bottomRow, leftCol);
                if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            
            if (rightCol != col){
                temp = new Coordinate(bottomRow, rightCol);
                if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                    ret[ret.length] = (new Move(cord, temp));
                }
            }
            
            temp = new Coordinate(bottomRow, col);
            if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                ret[ret.length] = (new Move(cord, temp));
            }
            
        }
        
        if (rightCol != col){
            temp = new Coordinate(row, rightCol);
            if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        if (leftCol != col){
            temp = new Coordinate(row, leftCol);
            if (!(ChessGame.getItem(temp).getColor() == color) || ChessGame.getItem(temp).isEmpty()){
                ret[ret.length] = (new Move(cord, temp));
            }
        }
        
        var movesToRemove = [];
        
        var move;
        if (ChessGame.getItem(cord).getColor() == "w"){
            var listo = ChessGame.playerBlack.getMoves();
            for (ind = 0; ind < listo.length; ind++){
                var m = listo[ind];
                for (indie = 0; indie < ret.length; indie++){
                    var move = ret[indie];
                    if (move.getDestination().equals(m.getDestination())){
                        movesToRemove[movesToRemove.length] = (move);
                    }
                }
            }
            
            var mo;
            
            for (i = 0; i < movesToRemove.length; i++){
                var mo = movesToRemove[i];
                var index = movesToRemove.indexOf(mo);
                if (index > -1) {
                    ret.splice(index, 1);
                }
            }
        }
        
        
        if (ChessGame.getItem(cord).getColor() == ("b")){
            var listo = ChessGame.playerWhite.getMoves();
            for (ind = 0; ind < listo.length; ind++){
                var m = listo[ind];
                for (indie = 0; indie < ret.length; indie++){
                    var move = ret[indie];
                    if (move.getDestination().equals(m.getDestination())){
                        movesToRemove[movesToRemove.length] = (move);
                    }
                }
            }
            
            var mo;
            
            for (i = 0; i < movesToRemove.length; i++){
                var mo = movesToRemove[i];
                var index = movesToRemove.indexOf(mo);
                if (index > -1) {
                    ret.splice(index, 1);
                }
            }
        }
        
        
        return ret;
    }
    
    this.getValidMovesQueen = function(cord){
        var ret = [];
    
        var mueves = this.getValidMovesBishop(cord);
        for (lo = 0; lo < mueves.length; lo++){
            ret[ret.length] = mueves[lo];
        }
        
        var moves = this.getValidMovesRook(cord);
        for(ra = 0; ra < moves.length; ra++){
            ret[ret.length] = moves[ra];
        }
        
        
        return ret;
    }
}
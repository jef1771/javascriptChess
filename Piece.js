/*
 * File: Piece.js, Represents a Piece on a Chess Board. All sub-pieces such as a Pawn
 * object inherit from the Piece object by using Piece.apply(this, args) and setting 
 * the prototype to be Piece
 */
var Piece = function(color, row, col, isEmpty) {
    
    this.Empty = isEmpty;
    this.color = color;
    this.coordinates = new Coordinate(row, col);
    
    //check to see if the piece represents an empty square
    this.isEmpty = function(){
        return this.Empty;
    }
    
    //return the color of the piece
    this.getColor = function(){
        return this.color;
    }
    
    //return the coordinates of the piece
    this.getCoordinates = function(){
        return this.coordinates;
    }
    
    //set the coordinates of a piece, called when a move is made
    this.setCoordinates = function(cord){
        this.coordinates = cord;
    }
    
    
    
    
};

//Represents a Pawn piece.
var Pawn = function(color, row, col){
    Piece.apply(this, [color, row, col, false]);
    this.PAWN = "P";
    this.toString = function(){
        return this.PAWN;
    }
    
    //return the valid moves for this pawn
    this.getMoves = function(){
        var mueves = MoveToUse.getValidMovesPawn(this.coordinates);
        var moe;
        for (moe in MoveToUse.getValidAttacksPawn(this.coordinates)){
            mueves[mueves.length] = moe;
        }
        
        return mueves;
    }
    
}
Pawn.prototype = Object.create(Piece.prototype, {
                               'constructor': Pawn
                               });

//Represents a Knight Piece
var Knight = function(color, row, col){
    Piece.apply(this, [color, row, col, false]);
    this.KNIGHT = "N";
    this.toString = function(){
        return this.KNIGHT;
    }
    //return the valid moves for this Knight
    this.getMoves = function(){
        var mueves = MoveToUse.getValidMovesKnight(this.coordinates);
        return mueves;
    }
    
}
Knight.prototype = Object.create(Piece.prototype, {
                               'constructor': Knight
                               });

//Represents a Rook piece
var Rook = function(color, row, col){
    Piece.apply(this, [color, row, col, false]);
    this.ROOK = "R";
    this.toString = function(){
        return this.ROOK;
    }
    //return the valid moves for this Rook
    this.getMoves = function(){
        var mueves = MoveToUse.getValidMovesRook(this.coordinates);
        return mueves;
    }
    
}
Rook.prototype = Object.create(Piece.prototype, {
                               'constructor': Rook
                               });

//represents a Bishop piece
var Bishop = function(color, row, col){
    Piece.apply(this, [color, row, col, false]);
    this.BISHOP = "B";
    this.toString = function(){
        return this.BISHOP;
    }
    //return the valid moves for this Bishop
    this.getMoves = function(){
        var mueves = MoveToUse.getValidMovesBishop(this.coordinates);
        return mueves;
    }
    
}
Bishop.prototype = Object.create(Piece.prototype, {
                               'constructor': Bishop
                               });

//Represents a Queen piece
var Queen = function(color, row, col){
    Piece.apply(this, [color, row, col, false]);
    this.QUEEN = "Q";
    this.toString = function(){
        return this.QUEEN;
    }
    //return the valid moves for this Queen
    this.getMoves = function(){
        var mueves = MoveToUse.getValidMovesQueen(this.coordinates);
        return mueves;
    }
    
}
Queen.prototype = Object.create(Piece.prototype, {
                               'constructor': Queen
                               });

//represents a King piece
var King = function(color, row, col){
    Piece.apply(this, [color, row, col, false]);
    this.KING = "K";
    this.toString = function(){
        return this.KING;
    }
    //return the valid moves for this King
    this.getMoves = function(){
        var mueves = MoveToUse.getValidMovesKing(this.coordinates);
        return mueves;
    }
    
}
King.prototype = Object.create(Piece.prototype, {
                               'constructor': King
                               });


//represents an Empty space on the board
var Empty = function(color, row, col){
    Piece.apply(this, [color, row, col, true]);
    this.EMPTY = ".";
    this.toString = function(){
        return this.EMPTY;
    }
    
    //Empty doesn't have a valid move so empty array returned
    this.getMoves = function(){
        var mueves = [];
        return mueves;
    }
}
Empty.prototype = Object.create(Piece.prototype, {
                               'constructor': Empty
                               });
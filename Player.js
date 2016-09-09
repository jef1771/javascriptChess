/*
 * File: Player.js, used for creating a representaion of a Player for a Chess game
 */


/*
 * Constructor method for a player object, populates the moves and pieces lists according to the initial
 * state of the chess board when they are first called
 */
var Player = function(color){
    this.moves = [];
    this.color = color;
    this.pieces = [];
    
    if (color == ("b")){
        for (var r = 0; r < 2; r++){
            for (var c = 0; c < ChessGame.dimmension; c++){
                var p = ChessGame.getItem(new Coordinate(r, c));
                this.pieces[this.pieces.length] = p;
            }
        }
        
        for (index = 0; index < this.pieces.length; index++){
            var p = this.pieces[index];
            if (p instanceof King){
                continue;
            }

            var m = p.getMoves();
            for (ind = 0; ind < m.length; ind++){
                this.moves[this.moves.length] = m[ind];
            }
        }
        
    }
    
    if (color == ("w")){
        for (var r = 6; r < ChessGame.dimmension; r++){
            for (var c = 0; c < ChessGame.dimmension; c++){
                var p = ChessGame.getItem(new Coordinate(r, c));
                this.pieces[this.pieces.length] = p;
            }
        }
        
        for (var index = 0; index < this.pieces.length; index++){
            var p = this.pieces[index];
            if (p instanceof King){
                continue;
            }
            
            var m = p.getMoves();
            for (var ind = 0; ind < m.length; ind++){
                this.moves[this.moves.length] = m[ind];
            }
        }
    }
    
    //Method to retrieve all of the valid moves of the current player
    this.getMoves = function(){
        return this.moves;
    }
    
    this.getPieces = function(){
        return this.pieces;
    }
    
    this.updateKingMoves = function(){
        for (var pie = 0; pie < this.pieces.length; pie++){
            var pee = this.pieces[pie];
            if (!(pee instanceof King)){
                continue;
            }
            var set = pee.getMoves();
            for(var mue = 0; mue < set.length; mue++){
                this.moves[this.moves.length] = set[mue];
            }
            break;
        }
    }
    
    //Method to update the lists of pieces and moves. Called after a move is made
    this.update = function(){
        this.moves = [];
        this.pieces = [];
        
        for (var r = 0; r < ChessGame.dimmension; r++){
            for (var c = 0; c < ChessGame.dimmension; c++){
                var p = ChessGame.getItem(new Coordinate(r, c));
                if (p.getColor() == this.color){
                    this.pieces[this.pieces.length] = p;
                }
            }
        }
        
        for (var pie = 0; pie < this.pieces.length; pie++){
            var pee = this.pieces[pie];
            if (pee instanceof King){
                continue;
            }
            var set = pee.getMoves();
            
            for(var mue = 0; mue < set.length; mue++){
                console.log(typeof (set[mue]));
                this.moves[this.moves.length] = new Move(set[mue].getCurrentSpot(), set[mue].getDestination());
            }
        }
        
    }
}
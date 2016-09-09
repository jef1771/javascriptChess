/*
 * File: Chess.js, Main file for operating all functions pertaining to the chess board
 */

//the instance of the Chess object, representing the game
var ChessGame;

//The instance of a move object to access the getValidMoves methods for each piece
var MoveToUse;

/* The id containing the row and column of the last image that was clicked on
 * id format is "1 0" 1 being the row and 0 being the column. lastPressed is set
 * to null after the second click
 */
var lastPressed;

/*
 * createGrid creates a grid of the current state of the chess board and writes it to contact.html
 * in the div section of id "hep".
 */
function createGrid(hasWinner){
    document.getElementById("hep").innerHTML = "";
    var buttonGrid = document.createElement("div");
    var dark = false;
    for (var r = 0; r < ChessGame.dimmension; r++){
        dark = !dark;
        var row = document.createElement("div");
        for (var c = 0; c < ChessGame.dimmension; c++){
            var b = document.createElement("BUTTON");
            var child = document.createElement("img")
            var p = ChessGame.getItem(new Coordinate(r, c));
            switch (p.toString()){
                    case "P":
                        if (p.getColor() == "w"){
                            child.src = "images/wPawn.png";
                            break;
                        }
                        child.src = "images/bPawn.png";
                        break;
                    case "R":
                        if (p.getColor() == "w"){
                            child.src = "images/wRook.png";
                            break;
                        }
                        child.src = "images/bRook.png";
                        break;
                    case "B":
                        if (p.getColor() == "w"){
                            child.src = "images/wBishop.png";
                            break;
                        }
                        child.src = "images/bBishop.png";
                        break;
                    case "N":
                        if (p.getColor() == "w"){
                            child.src = "images/wKnight.png";
                            break;
                        }
                        child.src = "images/bKnight.png";
                        break;
                    case "Q":
                        if (p.getColor() == "w"){
                            child.src = "images/wQueen.png";
                            break;
                        }
                        child.src = "images/bQueen.png";
                        break;
                    case "K":
                        if (p.getColor() == "w"){
                            child.src = "images/wKing.png";
                            break;
                        }
                        child.src = "images/bKing.png";
                        break;
                    case ".":
                        child.src = "images/Empty.png";
                        break;
                    
            }
            
            if (dark){
                child.style.height = "60px";
                child.style.width = "60px";
                child.id = r + " " + c;
                if(!hasWinner){
                    child.addEventListener("click", function(){
                                           eventHandler();
                                           });
                }
                child.style.background = "blue";
                row.appendChild(child);
                dark = !dark;
            }
            else{
                child.style.height = "60px";
                child.style.width = "60px";
                child.id = r + " " + c;
                if (!hasWinner){
                    child.addEventListener("click", function(){
                                           eventHandler();
                                           });
                }
                child.style.background = "lightcyan";
                row.appendChild(child);
                dark = !dark;
            }
        }
        buttonGrid.appendChild(row);
    }
    
    document.getElementById("hep").appendChild(buttonGrid);
}

/*
 * Begin() is called when the "Start game!" button is clicked on the contact.html page
 * this method will create a new instance of Chess, create a new Instance of move, create
 * both of the players, and display the initial state of the board on the html page
 */
function Begin(){
    ChessGame = new Chess();
    MoveToUse = new Move(new Coordinate(-1, -1), new Coordinate(-1, -1));
    createPlayers();
    createGrid(false);
    
}

/*
 * This method is called when two spots have been clicked on the board. it checks to see if 
 * a move from the first coordinate (first) to the second coordinate (second) is a valid move.
 * if it is a valid move, the move will be made and the board will be updated and redisplayed.
 */
function play(first, second){
    var canMove = false;
    
    var lst = ChessGame.playerWhite.getMoves();
    
    for (ind = 0; ind < lst.length; ind++ ){
        var m = lst[ind];
        if (m.getCurrentSpot().equals(first) && m.getDestination().equals(second)){
            canMove = true;
            break;
        }
    }
    
    if (canMove){
        var attempt = new Move(first, second);
        attempt.move();
    }
}

/*
 * This is the method called when one of the images from the board on the html page is clicked. 
 * if lastpressed is null, that means this is the first image to be clicked and the id is simply stored.
 * if lastpressed isn't null, then the id of lastpressed is parsed into a new coordinate as well as the id
 * of the one that was just pressed and then play is called with both of the coordinates
 */
function eventHandler(){
    var e = window.event.srcElement.id;
    
    if (lastPressed == null){
        lastPressed = e;
    }
    else{
        var first = lastPressed.split(" ");
        var second = e.split(" ");
        
        var firstCord = new Coordinate(first[0], first[1]);
        var secondCord = new Coordinate(second[0], second[1]);
        
        lastPressed = null;
        play(firstCord, secondCord);
    }
}

/*
 * this method creates and returns a 2d array representing the board
 * items are accessed as like array[5][6] where 5 represents the row and 6 the column
 */
function Create2DArray(rows) {
    var arr = [];
    
    for (var i=0;i<rows;i++) {
        arr[i] = [];
    }
    
    return arr;
}

/*
 * Method to display to HTML that a player won
 */
function playerWon(color){
    
    var winnerTag = document.createElement("div");
    var text = document.createElement("p");
    if (color == "b"){
        text.innerHTML = "Player Black Won!!!";
        winnerTag.padding = "10px";
        winnerTag.appendChild(text);
        document.getElementById("hep").prepend(winnerTag);
    }
    else{
        text.innerHTML = "Player White Won!!!";
        winnerTag.padding = "10px";
        winnerTag.appendChild(text);
        document.getElementById("hep").prepend(winnerTag);
    }
}

/*
 * Method to determine if there is a winner.  Checks each players' pieces to see if there is a King
 */
function someOneWon(){
    var blackPieces = ChessGame.playerBlack.getPieces();
    var whitePieces = ChessGame.playerWhite.getPieces();
    var whiteHasKing = false;
    var blackHasKing = false;
    
    for(var i = 0; i < blackPieces.length; i++){
        if(blackPieces[i] instanceof King){
            blackHasKing = true;
            break;
        }
    }
    
    
    for(var i = 0; i < whitePieces.length; i++){
        if(whitePieces[i] instanceof King){
            whiteHasKing = true;
            break;
        }
    }
    
    if (!whiteHasKing){
        return "b";
    }
    if (!blackHasKing){
        return "w";
    }
    
    else{
        return null;
    }
    
    
}

/*
 * this method initializes the players and stores them in the ChessGame's variables
 */
function createPlayers(){
    ChessGame.playerBlack = new Player("b");
    ChessGame.playerWhite = new Player("w");
}

/*
 * This is the constructor method for a Chess object.  The board is initialized using create2DArray.
 * the board is then filled with Piece objects representing all of the pieces on the initial state of the board.
 */
function Chess(){
    lastPressed = null;
    this.playerBlack;
    this.playerWhite;
    this.dimmension = 8;
    this.board = Create2DArray(this.dimmension);

    //method to access a piece on the board using a coordinate object
    this.getItem = function(cort){
        return this.board[cort.getRow()][cort.getCol()];
    }
    
    //method to update the players and re-display the board to the html page
    this.update = function(){
        this.playerWhite.update();
        this.playerBlack.update();
        this.playerBlack.updateKingMoves();
        this.playerWhite.updateKingMoves();
        var isWinner = someOneWon();
        if (isWinner == null){
            createGrid(false);
        }
        else{
            createGrid(true);
            playerWon(isWinner);
        }
    }
    
    //place a new piece (p) onto the board at a specific coordinate (c)
    this.setItem = function(c, p){
        this.board[c.getRow()][c.getCol()] = p;
    }
    
    this.board[0][0] = new Rook("b", 0, 0);
    this.board[0][7] = new Rook("b", 0, 7);
    this.board[7][0] = new Rook("w", 7, 0);
    this.board[7][7] = new Rook("w", 7, 7);
    
    this.board[0][1] = new Knight("b", 0, 1);
    this.board[0][6] = new Knight("b", 0, 6);
    this.board[7][1] = new Knight("w", 7, 1);
    this.board[7][6] = new Knight("w", 7, 6);
    
    this.board[0][2] = new Bishop("b", 0, 2);
    this.board[0][5] = new Bishop("b", 0, 5);
    this.board[7][2] = new Bishop("w", 7, 2);
    this.board[7][5] = new Bishop("w", 7, 5);
    
    this.board[0][3] = new Queen("b", 0, 3);
    this.board[7][3] = new Queen("w", 7, 3);
    
    this.board[0][4] = new King("b", 0, 4);
    this.board[7][4] = new King("w", 7, 4);


    
    for (var pos = 0; pos < this.dimmension; pos++){
        this.board[1][pos] = new Pawn("b", 1, pos);
        this.board[6][pos] = new Pawn("w", 6, pos);
    }
    
    for (var r = 2; r < 6; r++){
        for (var c = 0; c < this.dimmension; c++){
            this.board[r][c] = new Empty("wahoo", r, c);
        }
    }
}

/*
 * File: Coordinate.js, represents a coordinate on a grid with a row and column number
 */

var Coordinate = function(r, c){
    this.row = r;
    this.col = c;
    
    //return the row of the coordinate
    this.getRow = function(){
        return this.row;
    }
    
    //return the column of the coordinate
    this.getCol = function(){
        return this.col;
    }
    
    //check if one this coordinate is equal to another (meaning same row and column)
    this.equals = function(other){
        if (this.row != other.getRow()){
            return false;
        }
        return this.col == other.getCol();
    }
}

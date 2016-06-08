/**
 * Created by Michael on 8/20/2015.
 */
    $(document).ready(function() {
        function newBoard() {
            var board = [[], [], [], [], [], [], [], [], []];
       /*     var board = [
                [0,9,0,0,0,0,0,0,6],
                [0,0,0,9,6,0,4,8,5],
                [0,0,0,5,8,1,0,0,0],
                [0,0,4,0,0,0,0,0,0],
                [5,1,7,2,0,0,9,0,0],
                [6,0,2,0,0,0,3,7,0],
                [1,0,0,8,0,4,0,2,0],
                [7,0,6,0,0,0,8,1,0],
                [3,0,0,0,9,0,0,0,0]
            ]; */
            createBoard = function () {
                for (var row = 0; row <= 8; row++) {
                    for (var col = 0; col <= 8; col++) {
                        board[row].push(0);
                    }
                }
            };
            hardBoard = function () {
                board = [
                    [8,0,0,0,0,0,0,0,0],
                    [0,0,3,6,0,0,0,0,0],
                    [0,7,0,0,9,0,2,0,0],
                    [0,5,0,0,0,7,0,0,0],
                    [0,0,0,0,4,5,7,0,0],
                    [0,0,0,1,0,0,0,3,0],
                    [0,0,1,0,0,0,0,6,8],
                    [0,0,8,5,0,0,0,1,0],
                    [0,9,0,0,0,0,4,0,0]
                ];
            };
            showBoard = function() {
                console.log(board);
            };
            getEmptySquares = function () {
                var emptySquares = [];
                for (var row = 0; row <= 8; row++) {
                    for (var col = 0; col <= 8; col++) {
                        if (returnSquare(row,col) == 0) {
                            emptySquares.push([row, col]);
                        }
                    }
                }
                return emptySquares;
            };
            getFullSquares = function () {
                var fullSquares = [];
                for (var row = 0; row <= 8; row++) {
                    for (var col = 0; col <= 8; col++) {
                        if (returnSquare(row,col) >> 0) {
                            fullSquares.push([row, col]);
                        }
                    }
                }
                return fullSquares;
            };
            returnSquare = function (row, col) {
             //   console.log(board[row][col]);
                return board[row][col];
            };
            addSquare = function (row, col, val) {
                board[row][col] = (val);
                return board;
            };

            editBoard = function () {
                board = [[], [], [], [], [], [], [], [], []];
                var boldSquares = [];
                returnBold = function() {
                    return boldSquares;
                };
                for (var row = 0; row <= 8; row++) {
                    for (var col = 0; col <= 8; col++) {
                        var loc = String(row) + String(col);
                        var x = parseInt($('#sq' + loc).val());
                        var y = loc;
                    //    console.log(row + ','+ col + ',',x);
                       // addSquare(row, x);

                        if (x > 0 && x < 10) {
                            board[row].push(x);
                            boldSquares.push(y);
                        }
                        else {
                           board[row].push(0);
                        }
                    }
                }
             //   console.log(board);
            };

            checkRow = function(row, numToCheck,checkcol) {


                for (var z = 0; z < 9; z++) {
                    if (returnSquare(row, z) == numToCheck && z != checkcol) {
                            return false;
                    }
                }
                //  return true;
            };

            checkCol = function (col, numToCheck, checkrow) {

                for (var z = 0; z < 9; z++) {
                    if (returnSquare(z, col) == numToCheck && z != checkrow) {

                            return false;

                    }
                }
               //  return true;
            };

            checkSection = function (row, col, numToCheck) {
                var rowMin = 0;
                var rowMax = 0;
                var colMin = 0;
                var colMax = 0;
                if (row >= 0 && row <= 2) {
                    rowMin = 0;
                    rowMax = 2;
                }
                else if (row >= 3 && row <= 5) {
                    rowMin = 3;
                    rowMax = 5;
                }
                else if (row >= 6 && row <= 8) {
                    rowMin = 6;
                    rowMax = 8;
                }
                if (col >= 0 && col <= 2) {
                    colMin = 0;
                    colMax = 2;
                }
                else if (col >= 3 && col <= 5) {
                    colMin = 3;
                    colMax = 5;
                }
                else if (col >= 6 && col <= 8) {
                    colMin = 6;
                    colMax = 8;
                }
                for (var x = rowMin; x <= rowMax; x++) {
                    for (var z = colMin; z <= colMax; z++) {
                        if (returnSquare(x, z) == numToCheck && x != row && z != col) {
                            return false;
                        }
                    }
                }

            };
            validboard = function () {
                var squares = getFullSquares(); //Squares();
               // console.log(squares.length);
                var pointer = -1;
               // var count = 1;
                var iteration = 0;
               for (var x = 0; x< squares.length;x++) {  // loop until grid is filled
                   // pointer++;
                    var row = squares[x][0];
                    var col = squares[x][1];
                    var count = returnSquare(row,col);
                  //  console.log(count);
                   if (count < 0 || count > 9) {
                       alert('Invalid Board');
                       return false;
                   }
                    if (checkRow(row, count, col) == false || checkCol(col, count, row) == false || checkSection(row, col, count) == false) {  // if everything checks attempt solution
                        alert ('Invalid Board');
                        return false;  // place current number
                       // pointer++;  // move to next box
                       // count = 1;
                    }
                }
                return true;
            };

            fill = function () {
                var squares = getEmptySquares();
                var pointer = 0;
                var fillboard = function(col,row) {
                    var row = squares[pointer][0];
                    var col = squares[pointer][1];
                    for (var c = returnSquare(row,col)+1; c<=9;c++) {
                        if (checkRow(row, c,col) != false && checkCol(col, c,row) != false && checkSection(row, col, c) != false) {  // if everything checks attempt solution
                            addSquare(row, col, c);  // place current number
                            pointer++;  // move to next box) {
                            if (pointer == squares.length){
                                return true;
                            }

                            if (fillboard(col, row) == true) {
                                //  console.log(board);
                                return true;
                            }

                        }
                    }
                    addSquare(row,col,0);
                    pointer--;
                    if (pointer <= 0) {
                        return false;
                    }
                    return false;
                };
                fillboard(0,0);
            };



            displayBoard = function () {
                var count = 0;
                var colDiv = 0;
                var count = 1;


                for (var x = 0; x < 9; x++) {

                        $('#grid').append('<tr>');
                        for (var y = 0; y < 9; y++) {

                            //   $('#grid tbody').append('>' + board[x][y] + '</td>');
                            if (returnSquare(x, y) > 0) {
                                var thisId = ('<td> <input id = "sq' + [x] + [y] + '" type = "text" value=' + returnSquare(x, y) + ' disabled> </td>');
                            }
                            else {
                                thisId = ('<td> <input id = "sq' + [x] + [y] + '" type = "text"> </td>');
                            }
                            $('#tr'+ [count]).append(thisId);

                        }
                    count++;


                }
            };

            genBoard = function() {
                $('td').remove();
                newBoard();
                createBoard();
                //showBoard();


                addSquare(0,8,Math.floor(Math.random()*8+1));
                addSquare(8,0,Math.floor(Math.random()*8+1));
                //addSquare(4,0,Math.floor(Math.random()*8+1));
               // addSquare(8,4,Math.floor(Math.random()*8+1));
               // var x = Math.floor(Math.random() * 3 + 10);
                var row = 0;
                var col = 0;
                for (var y = 0; y <= 8; y++) {
                    var count = Math.floor(Math.random() * 9 + 1);
                    if (checkRow(row, count,col) != false && checkCol(col, count,row) != false && checkSection(row, col, count) != false && count < 10) {  // if everything checks attempt solution
                        addSquare(row, col, count);
                    }
                    col++;

                }
                var rr = Math.floor(Math.random() * 8 + 1);
                var cc = Math.floor(Math.random() * 8 + 1);

                fill();
                var gotonum = Math.floor(Math.random()*3+47);
                for (var yy=0; yy<=gotonum;yy++){

                    var xx = getFullSquares();
                    var newval = Math.floor(Math.random() * getFullSquares().length);

                    rr = xx[newval][0];
                    cc = xx[newval][1];

                    addSquare(rr,cc,0);

                }
                displayBoard();
              //  $('input').addClass('addBold');

            };

        }



        newBoard();
        createBoard();
        hardBoard();
        displayBoard();
       // genBoard();
       // $('input').addClass('addBold');

        $(document).on('click','input[type=text]',function(){ this.select(); });

        $('#solve').click(function() {
            editBoard();
            if (validboard() == true) {
            $('input').remove();
            $('td').remove();
                fill();
                displayBoard();
                var yy = returnBold();
                for (var countcount = 0; countcount < yy.length; countcount++) {
                    $('#sq' + [yy[countcount]]).addClass('addShade');
                }
            }
        });
        $('#clear').on('click',function() {
            $('td').remove();
            newBoard();
            createBoard();
            displayBoard();
         //   $('input').addClass('addBold');
        });
        $('#gen').click(function() {
            editBoard();
            validboard();
            genBoard();
        });


    });

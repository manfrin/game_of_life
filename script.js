function Board(){

  // Constants
  this.BOARD_HEIGHT   = 40;
  this.BOARD_WIDTH    = 40;
  this.BEGINNING_SEED = 140

  // Boards
  this.board     = [];
  this.nextBoard = [];

  // Board Canvas
  this.boardEl = $('#board')

  // Runner
  this.start = function(){
    this.newBoard();
    this.seedNewBoard();
    this.renderBoard();

    this.tic();
  };


  // 
  // HELPERS
  // 
  // Returns a zeroed-out array representing the board
  this.clearBoard = function(){
    var board = [];
    for (var y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
      for (var x = this.BOARD_WIDTH - 1; x >= 0; x--) {
        board[x + this.BOARD_HEIGHT*y] = 0;
        };
      };
    return board;
  };
  // Sets a random cell to the living state
  this.setRandomLiveCell = function(){
    this.board[Math.floor(Math.random()*this.board.length)] = 1;
  };
  // Creates a new random board
  this.seedNewBoard = function(){
    for (var i = this.BEGINNING_SEED - 1; i >= 0; i--) {
      this.setRandomLiveCell();
    };
  };


  // 
  // FIRST RUN METHODS
  // 
  // Sets Main Board to a new, zeroed board
  this.newBoard = function(){
    this.board = this.clearBoard();
  };
  // Creates the elements to represent cells
  this.renderBoard = function(){
    for (var i = this.board.length - 1; i >= 0; i--) {
      el = "<div class='cell' id='" + i + "'></div>";
      this.boardEl.append(el);
    };
  };


  // 
  // LOGIC
  // 
  // Fills in the next generation of cells.
  this.nextGeneration = function(){
    for (var i = this.board.length - 1; i >= 0; i--) {
      if (this.shallItLive(i) === true) {
        this.nextBoard[i] = 1
      } else {
        this.nextBoard[i] = 0
      };
    };
    this.board     = this.nextBoard
    this.nextBoard = this.clearBoard();
  };
  // Sets the graphics
  this.draw = function(){
    for (var i = this.board.length - 1; i >= 0; i--) {

      if (this.board[i] === 1){
          this.boardEl.find('#' + i).addClass('living')
        } else {
          el = this.boardEl.find('#' + i);
          if (el.hasClass('living')) {
            el.addClass('dead');
          };
          el.removeClass('living');
        };
      };
    };
  // Computes the number of living neighbors
  this.livingNeighbors = function(index){
    var liveNeighbors = [];
    liveNeighbors.push(this.board[index + 1]);
    liveNeighbors.push(this.board[index - 1]);
    liveNeighbors.push(this.board[index + 1 + this.BOARD_HEIGHT]);
    liveNeighbors.push(this.board[index - 1 + this.BOARD_HEIGHT]);
    liveNeighbors.push(this.board[index + 0 + this.BOARD_HEIGHT]);
    liveNeighbors.push(this.board[index + 1 - this.BOARD_HEIGHT]);
    liveNeighbors.push(this.board[index + 0 - this.BOARD_HEIGHT]);
    liveNeighbors.push(this.board[index - 1 - this.BOARD_HEIGHT]);

    var neighbors = 0;
    console.log(liveNeighbors);
    for (var i = liveNeighbors.length - 1; i >= 0; i--) {
      if(typeof liveNeighbors[i] != 'undefined') { 
        neighbors += liveNeighbors[i];
      };
    };

    return neighbors;
  };
  // The Judge
  this.shallItLive = function(index){
    var neighborhood = this.livingNeighbors(index);
    var living       = this.board[index]

    if (!living && neighborhood === 3) {
      return true
    } else if ((!!living) && (neighborhood > 1) && (neighborhood < 4)) {
      return true
    } else {
      return false
    };
  };


  // 
  // TIC
  // 
  this.tic = function(){
    var that = this
    var timer = setInterval(function(){
      that.nextGeneration();
      that.draw();
    }, 1000/4);
  };
};

$(document).ready(function(){
  var board = new Board;
  board.start();
});
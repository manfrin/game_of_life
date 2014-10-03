function Board(){
	this.BOARD_HEIGHT   = 100;
	this.BOARD_WIDTH    = 100;
  this.BEGINNING_SEED = 1000

	this.board     = [];
  this.nextBoard = [];

  this.boardEl = $('#board')

	this.clearBoard = function(){
    var board = [];
		for (var y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
			for (var x = this.BOARD_WIDTH - 1; x >= 0; x--) {
				board[x + this.BOARD_HEIGHT*y] = 0;
			};
		};
    return board;
	};

  this.newBoard = function(){
    this.board = this.clearBoard();
  };

	this.start = function(){
		this.newBoard();
    this.seedNewBoard();
    this.renderBoard();

    this.tic();
	};

  this.renderBoard = function(){
    for (var i = this.board.length - 1; i >= 0; i--) {
      var klass ='empty';
      el = "<div class='cell " + klass + "' id='" + i + "'></div>";
      this.boardEl.append(el);
    };
  };

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

  this.setRandomLiveCell = function(){
    this.board[Math.floor(Math.random()*this.board.length)] = 1;
  };

  this.seedNewBoard = function(){
    for (var i = this.BEGINNING_SEED - 1; i >= 0; i--) {
      this.setRandomLiveCell();
    };
  };

  this.livingNeighbors = function(index){
    var liveNeighbors = 0;
    liveNeighbors += this.board[index + 1];
    liveNeighbors += this.board[index - 1];
    liveNeighbors += this.board[index + 1 + this.BOARD_HEIGHT];
    liveNeighbors += this.board[index - 1 + this.BOARD_HEIGHT];
    liveNeighbors += this.board[index + 0 + this.BOARD_HEIGHT];
    liveNeighbors += this.board[index + 1 - this.BOARD_HEIGHT];
    liveNeighbors += this.board[index + 0 - this.BOARD_HEIGHT];
    liveNeighbors += this.board[index - 1 - this.BOARD_HEIGHT];
    return liveNeighbors;
  };

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
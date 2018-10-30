function Tile(grid, val, pos) {
    let this.val = val;
    let this.pos = pos;
    let this.grid = grid;

    function createRandomTile(grid) {
        let val = Math.floor(Math.random(2) * 2);
        let pos = nil;
        while grid(pos) {
            pos = generateRandomPos();
        }
        newTile = Tile.new(grid, val, pos)
        this.grid(pos) = newTile;
    }

    function generateRandomPos() {
        [Math.random(4)][Math.random(4)]
    }
}

function Game() {
    new Game
        generates a new grid
        populates grid with 2 new random tiles
        this.gameOver = false;
    end

    gameOverCheck() {
        if (!hasValidMoves? && !grid.includes?(null)) {
            this.gameOver = true;
            endGame()
        }
    }

    endGame() {
        if gameOver
    }
        

    hasValidmoves?
        up down left right
        if grid !== grid(direction) if new grid position 

    turn
        takes in direction
            execute
        generateNewTile
        if !grid.includes?(null)
            gameOverCheck?

    until gameOver

    combine tiles


        

}

function Board() {
    
    const blankGrid() => {(new Array(4).fill(new Array(4).fill(null))}; //creates a blank 4 by 4 grid)

    this.grid = this.blankGrid;
    this.emptyPos = [[0, 0], [0, 1], [0, 2], [0, 3], //stores empty squares when tiles are moved and placed we alter this
                     [1, 0], [1, 1], [1, 2], [1, 3],
                     [2, 0], [2, 1], [2, 2], [2, 3],
                     [3, 0], [3, 1], [3, 2], [3, 3]];
    
    shift(direction)
                    

}
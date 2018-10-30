function Tile(grid, val, pos) {
    this.val = val;
    this.pos = pos;
    this.grid = grid;

    function createRandomTile(grid) {
        let val = Math.floor(Math.random(2) * 2);
        let pos = nil;
        while (this.grid(pos)) {
            pos = generateRandomPos();
        }
        newTile = Tile.new(grid, val, pos)
        this.grid(pos) = newTile;
    }

    function generateRandomPos() {
        return [Math.random(4),Math.random(4)];
    }
}

module.exports = Tile;


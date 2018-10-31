class Tile {
    const TILE_COLORS = {
        null: 'yellow',
        2: 'red',
        4: 'green,'
    }

    constructor(val = null) {
        this.val = val
        this.color = TILE_COLORS[val];
    }
}
module.exports = Tile;
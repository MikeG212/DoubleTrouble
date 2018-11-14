const TILE_COLORS = {
    null: "yellow",
    2: "red",
    4: "orange",
    8: "green",
    16: "blue",
    32: "indigo",
    64: "purple",
    128: "red",
    256: "orange",
    512: "green",
    1024: "blue",
    2048: "indigo",
    4096: "purple"
};

class Tile {

    constructor(val = null) {
        this.val = val
        this.color = TILE_COLORS[val];
        this.x;
        this.y;
    }

    drawTile(){

    }
}
module.exports = Tile;
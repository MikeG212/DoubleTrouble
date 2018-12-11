const TILE_COLORS = {
    null: "yellow",
    2: "#FFFFF0",
    4: "red",
    8: "orange",
    16: "#6F00FF",
    32: "#003CFF",
    64: "#00EBFF",
    128: "green",
    256: "#00FF22",
    512: "#7CFF00",
    1024: "#F7FF00",
    2048: "#FF7C00",
    4096: "#FF2F00",
};

class Tile {

    constructor(val = null, pos) {
        this.val = val
        this.color = TILE_COLORS[val];
        this.col = pos.col;
        this.row = pos.row;
    }

    // drawTile(){

    // }
}
module.exports = Tile;
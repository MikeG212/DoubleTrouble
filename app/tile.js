const TILE_COLORS = {
    null: "#FFFFFF",
    2: "#FFFFF0",
    4: "#FF00A6",
    8: "#DEOOFF",
    16: "#6F00FF",
    32: "#003CFF",
    64: "#00EBFF",
    128: "#000000",
    256: "#00FF22",
    512: "#7CFF00",
    1024: "#F7FF00",
    2048: "#FF7C00",
    4096: "#FF2F00",
};

class Tile {

    constructor(val = null) {
        this.val = val
        this.color = TILE_COLORS[val];
        this.x;
        this.y;
    }

    // drawTile(){

    // }
}
module.exports = Tile;
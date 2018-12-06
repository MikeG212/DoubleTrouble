const TILE_COLORS = {
    null: "#FF0000"; break;
    2: "#FF0033"; break;
    4: "#FF00A6"; break;
    8: "#DEOOFF"; break;
    16: "#6F00FF"; break;
    32: "#003CFF"; break;
    64: "#00EBFF"; break;
    128: "#00FF8D"; break;
    256: "#00FF22"; break;
    512: "#7CFF00"; break;
    1024: "#F7FF00"; break;
    2048: "#FF7C00"; break;
    4096: "#FF2F00"; break;
    default: "#FFFFFF"
};

class Tile {

    constructor(val = null) {
        debugger;
        this.val = val
        this.color = TILE_COLORS[val];
        this.x;
        this.y;
    }

    // drawTile(){

    // }
}
module.exports = Tile;
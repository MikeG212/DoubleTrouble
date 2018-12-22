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

class Tile (val, pos) {// constructor we make them into divs
        this.val = val
        this.y = pos[0];
        this.x = pos[1];
        this.delta = 0;

        let tile = document.createElement('div');
        tile.innerHTML = val;
        tile.classList.add("tile");

        containerNode.appendChild(tile);
        this.tileNode = tile;

    calcDelta() {

    }



    drawTile(ctx, topLeftX, topLeftY, boxWidth, boxHeight) { //update properties on the divs (transform, translate background color)
        if (this.val) {
            this.tileNode.style.opacity = "1";
            this.tileNode.style.backgroundColor = this.color;
            this.tileNode.style.left = `${topLeftX}px`;
            this.tileNode.style.top = `${topLeftY}px`;
        }
    }


}
module.exports = Tile;
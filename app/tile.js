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

    constructor(val = null, pos, containerNode) {// constructor we make them into divs
        this.val = val
        this.color = TILE_COLORS[this.val];
        this.col = pos.col;
        this.row = pos.row;
        this.mergable = false;
        let tile = document.createElement('div');
        tile.innerHTML = val;
        tile.classList.add("tile");
        
        containerNode.appendChild(tile);
        this.tileNode = tile;
    }

    makeMergable() {
        this.mergable = true;
    }



    drawTile(ctx, topLeftX, topLeftY, boxWidth, boxHeight) { //update properties on the divs (transform, translate background color)
            // ctx.fillStyle = this.color;
            // ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
            // let fontSize = 20;
            if (!this.val) {
                this.tileNode.style.opacity = "0";
            } else {
                this.tileNode.style.opacity = "1";
                this.tileNode.style.backgroundColor = this.color;

            }
            this.tileNode.style.left = `${topLeftX}px`;
            this.tileNode.style.top = `${topLeftY}px`;
            // ctx.font = `${fontSize}px serif`;
            // ctx.textAlign = "center";
            // ctx.fillStyle = "black";
            // if (this.val) {
            //     ctx.fillText(`${this.val}`, topLeftX + 50, topLeftY + 50);
            // }
    }


}
module.exports = Tile;
/**
 * Application entry point
 */

// Load application styles
// import 'styles/index.scss';

// ================================
// START YOUR APP HERE
import Board from './board'
const b = new Board();
console.log(b.grid);
const t = Tile.createRandomTile(grid);
console.log(t);
// ================================

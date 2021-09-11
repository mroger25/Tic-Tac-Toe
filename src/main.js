import { Board } from "./Board.js";
import { CanvasActuator } from "./CanvasActuator.js";


class Sketck {
  constructor() {
    this.court = { pos: { x: 0, y: 0 }, dim: { w: 400, h: 400 } };
    this.game = new CanvasActuator(this.court, "#CCC");
    this.board = new Board(this.court);
    this.setup();
  }
  setup() {
    this.game.on("draw", this.draw.bind(this));
    this.game.on("click", this.board.play.bind(this.board));
  }
  draw(ctx) {
    this.board.draw(ctx);
  }
}

new Sketck();

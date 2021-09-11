const drawX = (ctx, x, y, w, h) => {
  const p = w * 0.25;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(x + p, y + p);
  ctx.lineTo(x - p + w, y - p + h);
  ctx.moveTo(x + p, y - p + h);
  ctx.lineTo(x - p + w, y + p);
  ctx.closePath();
  ctx.stroke();
};
const drawO = (ctx, x, y, r) => {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.arc(x + r, y + r, r * 0.5, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
};
const drawB = (ctx, { w, h }) => {
  const p = w / 3;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#EEE";
  ctx.beginPath();
  ctx.moveTo(p, 0);
  ctx.lineTo(p, h);
  ctx.moveTo(w - p, 0);
  ctx.lineTo(w - p, h);
  ctx.moveTo(0, p);
  ctx.lineTo(w, p);
  ctx.moveTo(0, h - p);
  ctx.lineTo(w, h - p);
  ctx.closePath();
  ctx.stroke();
};
const drawW = (ctx, index, { w, h }) => {
  const opt = [
    { i: { x: 1, y: 0 }, f: { x: 1, y: 6 } },
    { i: { x: 3, y: 0 }, f: { x: 3, y: 6 } },
    { i: { x: 5, y: 0 }, f: { x: 5, y: 6 } },
    { i: { x: 0, y: 1 }, f: { x: 6, y: 1 } },
    { i: { x: 0, y: 3 }, f: { x: 6, y: 3 } },
    { i: { x: 0, y: 5 }, f: { x: 6, y: 5 } },
    { i: { x: 0, y: 0 }, f: { x: 6, y: 6 } },
    { i: { x: 6, y: 0 }, f: { x: 0, y: 6 } },
  ];
  const p = w / 6;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#F00";
  ctx.beginPath();
  ctx.moveTo(opt[index].i.x * p, opt[index].i.y * p);
  ctx.lineTo(opt[index].f.x * p, opt[index].f.y * p);
  ctx.closePath();
  ctx.stroke();
};
export class Board {
  constructor(court) {
    this.court = court;
    this.grid = [];
    this.players = ["O", "X"];
    this.result = null;
    this.init();
  }
  init() {
    for (let i = 0; i < 3; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 3; j++) {
        this.grid[i][j] = null;
      }
    }
    this.currentTurn = 0;
  }

  play({ x, y, w, h }) {
    const i = Math.floor((x * 3) / w);
    const j = Math.floor((y * 3) / h);
    if (!this.grid[i][j] && !this.result) {
      this.grid[i][j] = this.players[this.currentTurn % 2];
      this.checkWinner();
      if (this.result) {
        console.log(this.result);
      }
      this.currentTurn++;
    }
  }

  checkWinner() {
    const opt = [
      [this.grid[0][0], this.grid[0][1], this.grid[0][2]],
      [this.grid[1][0], this.grid[1][1], this.grid[1][2]],
      [this.grid[2][0], this.grid[2][1], this.grid[2][2]],
      [this.grid[0][0], this.grid[1][0], this.grid[2][0]],
      [this.grid[0][1], this.grid[1][1], this.grid[2][1]],
      [this.grid[0][2], this.grid[1][2], this.grid[2][2]],
      [this.grid[0][0], this.grid[1][1], this.grid[2][2]],
      [this.grid[2][0], this.grid[1][1], this.grid[0][2]],
    ];
    for (let i = 0; i < 8; i++) {
      const group = opt[i];
      if (group[0] && group[1] && group[2]) {
        if (this.checkEqual(group[0], group[1], group[2])) {
          this.result = { value: group[0], index: i };
          break;
        }
      }
    }
  }

  checkEqual(a, b, c) {
    return a == b && a == c ? !0 : !1;
  }

  draw(ctx) {
    drawB(ctx, this.court.dim);
    const w = this.court.dim.w / 3;
    const h = this.court.dim.h / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const spot = this.grid[i][j];
        const x = i * w;
        const y = j * h;
        if (spot == this.players[0]) {
          drawO(ctx, x, y, w / 2);
        } else if (spot == this.players[1]) {
          drawX(ctx, x, y, w, h);
        }
      }
    }
    if (this.result) {
      drawW(ctx, this.result.index, this.court.dim);
    }
  }
}

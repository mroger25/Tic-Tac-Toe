export class CanvasActuator {
  constructor({ dim: { w, h } }, color) {
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = color;
    this.events = {};
    this.start(w, h);
  }

  start(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.render();
    this.click();
    this.keyListen();
  }

  emit(e, t) {
    const i = this.events[e];
    if (i) {
      i.forEach((e) => {
        e(t);
      });
    }
  }

  on(e, t) {
    if (this.events[e]) {
      this.events[e].push(t);
    } else {
      this.events[e] = [];
      this.events[e].push(t);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  click() {
    this.canvas.addEventListener("click", (e) => {
      const n = {
        x: e.layerX,
        y: e.layerY,
        w: e.target.clientWidth,
        h: e.target.clientHeight,
      };
      this.emit("click", n);
    });
  }

  keyListen() {
    document.addEventListener("keypress", (e) => {
      const n = e.code;
      this.emit("keypress", n);
    });
    document.addEventListener("keydown", (e) => {
      const n = e.code;
      this.emit("keydown", n);
    });
    document.addEventListener("keyup", (e) => {
      const n = e.code;
      this.emit("keyup", n);
    });
  }

  render() {
    this.emit("update");
    this.clear();
    this.emit("draw", this.ctx);
    requestAnimationFrame(() => {
      this.render();
    });
  }
}

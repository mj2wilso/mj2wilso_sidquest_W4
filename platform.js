/*
Platform.js (Example 5)

A Platform is a single axis-aligned rectangle in the world.

Why a class for something "simple"?
- It standardizes the shape of platform data.
- It makes later upgrades easy (e.g., moving platforms, icy platforms, spikes).
- It keeps drawing code in the object that knows what it is.

In JSON, platforms are stored like:
{ "x": 0, "y": 324, "w": 640, "h": 36 } 
*/

class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    rect(this.x, this.y, this.w, this.h);
  }
}

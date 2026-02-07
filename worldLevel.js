/*
WorldLevel.js (Example 5)

WorldLevel wraps ONE level object from levels.json and provides:
- Theme colours (background/platform/blob)
- Physics parameters that influence the player (gravity, jump velocity)
- Spawn position for the player (start)
- An array of Platform instances
- A couple of helpers to size the canvas to fit the geometry

This is directly inspired by your original blob sketch’s responsibilities: 
- parse JSON
- map platforms array
- apply theme + physics
- infer canvas size

Expected JSON shape for each level (from your provided file): 
{
  "name": "Intro Steps",
  "gravity": 0.65,
  "jumpV": -11.0,
  "theme": { "bg":"...", "platform":"...", "blob":"..." },
  "start": { "x":80, "y":220, "r":26 },
  "platforms": [ {x,y,w,h}, ... ]
}
*/

class WorldLevel {
  constructor(levelData) {
    // Basic metadata
    this.name = levelData.name;
    this.gravity = levelData.gravity;
    this.jumpV = levelData.jumpV;
    this.theme = levelData.theme;

    // Player start info
    this.start = levelData.start;

    // Platforms array (generated from JSON)
    this.platforms = [];

    // LOOP: dynamically create platform objects
    for (let i = 0; i < levelData.platforms.length; i++) {
      let p = levelData.platforms[i];
      this.platforms.push(new Platform(p.x, p.y, p.w, p.h));
    }
    // Add 2 extra platforms procedurally
    let baseX = 90;
    let baseY = 120;
    let gap = 190;

    for (let i = 0; i < 2; i++) {
      let x = baseX + i * gap;
      let y = baseY - i * 40;

      this.platforms.push(new Platform(x, y, 100, 12));
    }

    // Triangle obstacles (array-based, loop-generated)
    this.triangles = [];

    let ground = this.platforms[0];
    let size = 30;
    let spacing = ground.w / 3; // spread them out

    for (let i = 1; i <= 2; i++) {
      this.triangles.push({
        x: ground.x + spacing * i,
        y: ground.y,
        size: size,
      });
    }
  }

  drawWorld() {
    // Background
    background(this.theme.bg);

    // LOOP: draw all platforms
    fill(this.theme.platform);
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].draw();
    }

    fill(200, 50, 50);

    for (let t of this.triangles) {
      triangle(t.x - t.size / 2, t.y, t.x + t.size / 2, t.y, t.x, t.y - t.size);
    }
  }

  getTriangleBoxes() {
    return this.triangles.map((t) => ({
      x: t.x - t.size / 2,
      y: t.y - t.size, // top of triangle
      w: t.size,
      h: t.size,
    }));
  }

  // Used by your sketch to size the canvas
  inferWidth(defaultW) {
    let maxX = defaultW;
    for (let p of this.platforms) {
      maxX = max(maxX, p.x + p.w);
    }
    return maxX;
  }

  inferHeight(defaultH) {
    let maxY = defaultH;
    for (let p of this.platforms) {
      maxY = max(maxY, p.y + p.h);
    }
    return maxY;
  }
}

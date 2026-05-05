export class WardrobeScene2 extends Phaser.Scene {

  constructor() {
    super({ key: 'WardrobeScene2' });
    this.equippedItems = {}; // tracks what's on the girl
  }

  preload() {
    // These should already be loaded, but just in case:
    this.load.image('baseB', 'assets/Base_Body.png');
    this.load.image('sunglasses_pink', 'assets/sunglasses_pink.png');
   // this.load.image('sunglasses_black', 'assets/sunglasses_black.png');
  // this.load.image('sunglasses_brown', 'assets/sunglasses_brown.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Pink background
    this.add.rectangle(0, 0, width, height, 0xff9ec8).setOrigin(0);

    // The girl - left side of screen
    this.girl = this.add.image(width * 0.28, height * 0.5, 'baseB');

    // Sunglasses ON the girl (hidden by default)
    this.girlSunglasses = this.add.image(width * 0.28, height * 0.5, 'sunglasses_pink');
    this.girlSunglasses.setVisible(false);

    // Sunglasses options
    const glasses = [
      { key: 'sunglasses_pink',  x: width * 0.58, y: height * 0.3 }
      //{ key: 'sunglasses_black', x: width * 0.72, y: height * 0.3 },
      //{ key: 'sunglasses_brown', x: width * 0.86, y: height * 0.3 },
    ];

    glasses.forEach(g => {
      const item = this.add.image(g.x, g.y, g.key)
        .setScale(0.4)
        .setInteractive({ useHandCursor: true });

      item.on('pointerdown', () => {
        this.girlSunglasses.setTexture(g.key);
        this.girlSunglasses.setVisible(true);
        this.equippedItems.sunglasses = g.key;
      });
    });
  }
}
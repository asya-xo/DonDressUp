export class WardrobeScene2 extends Phaser.Scene {

  constructor() {
    super({ key: 'WardrobeScene2' });
    this.equippedItems = {};
  }

  preload() {
    this.load.image('body', 'assets/DressUpSceneBody.png');
    this.load.image('sunglasses_pink', 'assets/sunglasses_pink.png');
    this.load.image('backB', 'assets/back_button.png');
    this.load.audio('buttonSD', 'assets/button_sound.mp3');
    this.load.image('closet', 'assets/closet.png');
    this.load.image('sunglasses_black', 'assets/sunglasses_black.png');
    this.load.image('top1', 'assets/top_1.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.rectangle(0, 0, width, height, 0xff9ec8).setOrigin(0);
    
    //Adding the closet
    this.add.image(width * 0.65, height * 0.5, 'closet');
    
    this.girl = this.add.image(width * 0.28, height * 0.5, 'body');

    this.girlSunglasses = this.add.image(width * 0.28, height * 0.5, 'sunglasses_pink');
    this.girlSunglasses.setVisible(false);

    //Adding the top overlay on girl hidden by default, 
    this.girlTop = this.add.image(width * 0.28, height * 0.5, 'top1');
    this.girlTop.setVisible(false);

    const glasses = [
      { key: 'sunglasses_pink', x: width * 0.58, y: height * 0.3 },
      { key: 'sunglasses_black', x: width * 0.72, y: height * 0.3 }
    ];

    glasses.forEach(g => {
      const item = this.add.image(g.x, g.y, g.key)
        .setScale(0.3)
        .setInteractive({ useHandCursor: true, pixelPerfect: true });  //enabling pixel perfect interaction for better click accuracy

      item.on('pointerdown', () => {
        if (this.equippedItems.sunglasses === g.key) {
          this.girlSunglasses.setVisible(false);
          this.equippedItems.sunglasses = null;
        } else {
          this.girlSunglasses.setTexture(g.key);
          this.girlSunglasses.setVisible(true);
          this.equippedItems.sunglasses = g.key;
        }
      });
    });

    // Color swatches for tops!!
const topColors = [
  0xff9ec8, // pink
  0xff0000, // red
  0xc8a2c8, // purple
  0x000000, // black
  0xffdd00, // yellow
];

// Top in closet, just one user can choose the style but can change color
const topItem = this.add.image(width * 0.58, height * 0.5, 'top1')
  .setScale(0.3)
  .setInteractive({ useHandCursor: true, pixelPerfect: true });

// Color palette (hidden by default)
const palette = this.add.container(width * 0.35, height * 0.75);
palette.setVisible(false);

topColors.forEach((color, i) => {
  const swatch = this.add.circle(i * 30 - 75, 0, 12, color)
    .setInteractive({ useHandCursor: true });
  swatch.on('pointerdown', () => {
    this.girlTop.setTint(color);
    this.girlTop.setVisible(true);
    topItem.setTint(color);
  });
  palette.add(swatch);
});

// Click top to show/hide
topItem.on('pointerdown', () => {
  if (this.equippedItems.top) {
    this.girlTop.setVisible(false);
    this.equippedItems.top = null;
    palette.setVisible(false);
    topItem.clearTint();
  } else {
    this.girlTop.setTint(0xff9ec8);
    this.girlTop.setVisible(true);
    this.equippedItems.top = 'top1';
    palette.setVisible(true);
  }
});
 



    // Back button
    const clickSfx = this.sound.add('buttonSD', { volume: 0.6 });
    const press = (btn) => {
      this.tweens.add({
        targets: btn,
        scaleX: btn.scaleX * 0.96,
        scaleY: btn.scaleY * 0.96,
        duration: 60,
        yoyo: true
      });
    };

    const backBtn = this.add.image(0, 0, 'backB');
    backBtn.setOrigin(0, 1);
    backBtn.setPosition(30, height - 30);
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on('pointerdown', () => {
      clickSfx.play();
      press(backBtn);
      this.time.delayedCall(120, () => {
        this.scene.start('WardrobeScene');
      });
    });
  }
}
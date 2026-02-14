export class Welcome extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  preload() {
    this.load.image('menuBg', 'assets/clear_background.png');
    this.load.image('okBtn', 'assets/ok_button.png');
    this.load.image('nameTitle', 'assets/whats_ur_name_title.png');
    this.load.audio('buttonSD', 'assets/button_sound.mp3');
    this.load.image('backB', 'assets/back_button.png');
  }

  create() {
    const { width, height } = this.scale;

    const inputY = height * 0.55;

    this.add.image(width / 2, height / 2, 'menuBg').setDisplaySize(width, height);

    const nameTitleImg = this.add.image(width / 2, height / 2, 'nameTitle');
    this.tweens.add({
      targets: [nameTitleImg],
      y: '-=10',
      duration: 1200,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    // HTML INPUT (overlay)
    const form = document.getElementById('nameForm');
    const input = document.getElementById('nameInput');

    const placeForm = (x, y) => {
      const rect = this.game.canvas.getBoundingClientRect();
      const sx = rect.width / width;
      const sy = rect.height / height;

      form.style.left = `${rect.left + x * sx}px`;
      form.style.top  = `${rect.top + y * sy}px`;
    };

    form.style.display = 'block';
    placeForm(width / 2, inputY);
    input.focus();

    // keep it in place if the canvas resizes
    this.scale.on('resize', () => placeForm(width / 2, inputY));

    // hide + cleanup when leaving the scene
    this.events.once('shutdown', () => {
      form.style.display = 'none';
    });

    // buttons under the input
    const gap = 10;

    const okBtn = this.add.image(width / 2, inputY + 70, 'okBtn');

    const backBtn = this.add.image(width / 2, 0, 'backB');
    backBtn.y = okBtn.y + (okBtn.displayHeight / 2) + gap + (backBtn.displayHeight / 2);

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

    okBtn.setInteractive({ useHandCursor: true });
    backBtn.setInteractive({ useHandCursor: true });

    okBtn.on('pointerdown', () => {
      clickSfx.play();
      press(okBtn);

      const playerName = (input.value || '').trim();
      this.registry.set('playerName', playerName);
      localStorage.setItem('playerName', playerName);


      form.style.display = 'none';

      this.time.delayedCall(120, () => {
        this.scene.start('WardrobeScene');
      });
    });

    backBtn.on('pointerdown', () => {
      clickSfx.play();
      press(backBtn);

      form.style.display = 'none';

      this.time.delayedCall(120, () => {
        this.scene.start('Start');
      });
    });

    // just incase the user clicks "enter" in input field = works
    const onEnter = (e) => {
      if (e.key === 'Enter') okBtn.emit('pointerdown');
    };
    input.addEventListener('keydown', onEnter);

    // cleanup so it doesn't duplicate if you revisit the scene
    this.events.once('shutdown', () => {
      input.removeEventListener('keydown', onEnter);
      form.style.display = 'none';
    });
  }
}

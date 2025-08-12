// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Game");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
  this.load.image("sky", "./assets/space3.png");
  this.load.image("logo", "./assets/phaser3-logo.png");
  this.load.image("red", "./assets/particles/red.png");
  // Usaremos el logo como pelota y la "red" como obstáculo, por falta de assets específicos
  }

  create() {
    // create game objects
    this.add.image(400, 300, "sky");

    // Pelota (usando el logo de Phaser)
    this.ball = this.physics.add.image(400, 500, "logo");
    this.ball.setDisplaySize(32, 32);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1, 1);
    this.ball.setVelocity(150, -200);

    // Paleta (rectángulo blanco)
    this.paddle = this.add.rectangle(400, 570, 100, 20, 0xffffff);
    this.physics.add.existing(this.paddle, true); // true = estática

    // Obstáculo (bloque rojo)
    this.block = this.add.rectangle(400, 200, 80, 30, 0xff0000);
    this.physics.add.existing(this.block, true);

    // Colisiones
    this.physics.add.collider(this.ball, this.paddle);
    this.physics.add.collider(this.ball, this.block, () => {
      this.block.destroy();
    });

    // Input para mover la paleta
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Movimiento de la paleta con el teclado
    if (this.cursors.left.isDown) {
      this.paddle.x -= 8;
    } else if (this.cursors.right.isDown) {
      this.paddle.x += 8;
    }
    // Limitar la paleta a los bordes
    this.paddle.x = Phaser.Math.Clamp(this.paddle.x, 50, 750);
    // Actualizar el cuerpo físico de la paleta
    this.paddle.body.updateFromGameObject();
  }
}

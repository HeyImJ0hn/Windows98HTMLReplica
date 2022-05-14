let unit = 32;
let gameX = 1 * unit;
let gameY = 3 * unit;
let gameW = 17 * unit;
let gameH = 15 * unit;
let interval = 100;
let i = 0;
let gm;
let loaded = false;
let running = false;

setTimeout(function() {
    gm = new GameManager();
}, 500);

let outsideColor = '#1A1A1A'

function initGame() {
    if (!loaded && !running)
        gm.setup();
    else if (loaded && !running)
        gm.game.end = false;
    else
        return;
}

function stopGame(){
    gm.restartGame(gm.game);
    gm.game.end = true;
    running = false;
}

class GameManager {
    constructor() {
        this.game = new Game(0, gameX, gameY, gameW, gameH, false);
        
        this.endScreen = new Image();
        this.endScreen.src = 'imgs/endscreen.png';
    }

    setup() {
        running = true;
        loaded = true;
        let cnv = document.getElementById('snakecanvas');
        let ctx = cnv.getContext('2d');
        console.log(this.game);

        window.setInterval(() => {
            if (!this.game.end) {
                ctx.clearRect(0, 0, cnv.width, cnv.height);
                this.game.drawGame();

                this.game.snake.drawSnake(cnv);
                this.game.snake.updateSnake();
                this.game.checkEndGame();
                this.game.fruit.draw(cnv);

                if (this.game.snake.eatFruit(this.game.fruit)) {
                    this.game.fruit.newLocation(this.game.snake.body);
                    this.game.increaseScore();
                    this.game.snake.addPart();
                    console.log('Score: ' + this.game.score);
                }
            } else {
                this.gameEnded(cnv);
            }

        }, interval);
    }

    gameEnded(cnv) {
        let ctx = cnv.getContext('2d');

        ctx.clearRect(0, 0, cnv.width, cnv.height);

        ctx.fillStyle = outsideColor;
        ctx.fillRect(0, 0, cnv.width, cnv.height);

        ctx.font = '50px "Press Start 2P"';
        ctx.fillStyle = '#fff';
        ctx.textAlign = "center";
        ctx.drawImage(this.endScreen, 0, 0);
        ctx.fillText(this.game.score, 9.5 * unit, 8.5 * unit);
        let btn = new Button(7 * unit, 10 * unit, unit, 5 * unit);
        btn.draw(cnv);
        const self = this;
        if (i == 0) {
            i++;
            cnv.addEventListener('mousedown', function(e) {
                if (btn.mouseOver(e.offsetX, e.offsetY)) {
                    if (self.game.end) {
                        self.restartGame(self.game, cnv);
                        console.log(self.game);
                    }
                }
            });
        } 
    }

    restartGame(game) {
        game.score = 0;
        game.snake.direction = '';
        game.fruit.newLocation(game.snake.body);
        if (game.snake.body.length > 2) {
            while(game.snake.body.length > 2)
                game.snake.body.pop();
        }
        game.snake.body[0].x = 8 * unit;
        game.snake.body[0].y = 10 * unit;
        game.snake.body[1].x = 7 * unit;
        game.snake.body[1].y = 10 * unit;
        game.snake.collision = false;
        game.end = false;
        
    }
}

class Button {
    constructor(posx, posy, h, w) {
        this.posx = posx;
        this.posy = posy;
        this.height = h;
        this.width = w;

        this.button = new Image();
        this.button.src = 'imgs/restart_btn.png';
    }

    draw(cnv) {
        let ctx = cnv.getContext('2d');

        ctx.drawImage(this.button, this.posx, this.posy);
    }

    mouseOver(mx, my) {
        return (mx > this.posx && mx < (this.posx + this.width) && my > this.posy && my < (this.posy + this.height));
    }

}
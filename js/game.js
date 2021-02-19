class Game {
    constructor(score, x, y, width, height, end) {
        this.x = x;
        this.y = y;
        this.score = score;
        this.snake = new Snake(8 * unit, 10 * unit);
        this.fruit = new Fruit();
        this.height = height;
        this.width = width;
        this.end = end;

        this.bg = new Image(608, 608);
        this.bg.src = 'imgs/UI.png';

        const self = this;

        this.fruit.newLocation(this.snake.body);

        document.addEventListener("keydown", function (e) {
            let dir;

            if (e.key.includes('Arrow'))
                dir = e.key.replace('Arrow', '');
            else
                return;

            self.snake.changeDir(dir);
        });
    }

    drawGame() {
        let cnv = document.getElementById('snakecanvas');
        let ctx = cnv.getContext('2d');

        ctx.drawImage(this.bg, 0, 0, cnv.width, cnv.height);
        //ctx.fillStyle = '#C8FA6A';
        //ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.font = '25px "Press Start 2P"';
        ctx.textAlign = "left";
        ctx.fillStyle = '#fff';
        ctx.fillText(this.score, 5.6 * unit, 1.48 * unit);
    }

    increaseScore() {
        this.score++;
    }

    checkEndGame() {
        if (this.snake.body[0].x > ((this.x + this.width) - unit / 2) || this.snake.body[0].x < (this.x - unit / 2) ||
            this.snake.body[0].y > ((this.y + this.height) - unit / 2) || this.snake.body[0].y < (this.y - unit / 2)) {
            this.end = true;
            return;
        }
        if (this.snake.collision) {
            this.end = true;
            return;
        }
    }

}
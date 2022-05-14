class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.body = [];
        this.collision = false;
        this.direction = '';

        this.body[0] = { x: this.x, y: this.y };
        this.body[1] = { x: this.x - unit, y: this.y };
    }

    drawSnake(cnv) {
        let ctx = cnv.getContext('2d');

        for (let i = 0; i < this.body.length; i++) {
            if (i == 0) {
                /*ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.strokeRect(this.body[i].x, this.body[i].y, unit, unit);*/
                ctx.fillStyle = '#3E873B';
                ctx.fillRect(this.body[i].x, this.body[i].y, unit, unit);

                ctx.fillStyle = 'black';

                switch (this.direction) {
                    case "UP":
                        ctx.fillRect(this.body[i].x + 5, this.body[i].y + 10, 5, 5);
                        ctx.fillRect(this.body[i].x + 20, this.body[i].y + 10, 5, 5);
                        ctx.fillStyle = 'red';
                        ctx.fillRect(this.body[i].x + unit/2, this.body[i].y - 10, 2, 10);
                        break;
                    case "DOWN":
                        ctx.fillRect(this.body[i].x + 5, this.body[i].y + 20, 5, 5);
                        ctx.fillRect(this.body[i].x + 20, this.body[i].y + 20, 5, 5);
                        ctx.fillStyle = 'red';
                        ctx.fillRect(this.body[i].x + unit/2, this.body[i].y + unit, 2, 10);
                        break;
                    case "LEFT":
                        ctx.fillRect(this.body[i].x + 10, this.body[i].y + 5, 5, 5);
                        ctx.fillRect(this.body[i].x + 10, this.body[i].y + 20, 5, 5);
                        ctx.fillStyle = 'red';
                        ctx.fillRect(this.body[i].x - 10, this.body[i].y + unit/2, 10, 2);
                        break;
                    case "RIGHT":
                        ctx.fillRect(this.body[i].x + 20, this.body[i].y + 5, 5, 5);
                        ctx.fillRect(this.body[i].x + 20, this.body[i].y + 20, 5, 5);
                        ctx.fillStyle = 'red';
                        ctx.fillRect(this.body[i].x + unit, this.body[i].y + unit/2, 10, 2);
                        break;
                    default:
                        ctx.fillRect(this.body[i].x + 20, this.body[i].y + 5, 5, 5);
                        ctx.fillRect(this.body[i].x + 20, this.body[i].y + 20, 5, 5);
                        ctx.fillStyle = 'red';
                        ctx.fillRect(this.body[i].x + unit, this.body[i].y + unit/2, 10, 2);
                        break;
                }
            } else  {
                ctx.fillStyle = '#3E873B';
                ctx.fillRect(this.body[i].x, this.body[i].y, unit, unit);
            }
            
        }
    }

    updateSnake() {
        let snakeX = this.body[0].x;
        let snakeY = this.body[0].y;

        switch (this.direction) {
            case "UP":
                snakeY -= unit;
                break;
            case "DOWN":
                snakeY += unit;
                break;
            case "LEFT":
                snakeX -= unit;
                break;
            case "RIGHT":
                snakeX += unit;
                break;
            default:
                return;
        }

        this.body.pop();

        let head = { x: snakeX, y: snakeY };

        if (this.headCollision(head, this.body))
            this.collision = true;

        this.body.unshift(head);

    }

    addPart() {
        let len = this.body.length;
        this.body.push({ x: this.body[len - 1].x, y: this.body[len - 1].y });
    }

    changeDir(dir) {
        if (dir == 'Up' && this.direction != 'DOWN') {
            this.direction = 'UP';
        } else if (dir == 'Down' && this.direction != 'UP') {
            this.direction = 'DOWN';
        } else if (dir == 'Left' && this.direction != 'RIGHT') {
            this.direction = 'LEFT';
        } else if (dir == 'Right' && this.direction != 'LEFT') {
            this.direction = 'RIGHT';
        } else {
            return;
        }
    }

    eatFruit(fruit) {
        return this.body[0].x == fruit.x && this.body[0].y == fruit.y;
    }

    headCollision(newHead, snake) {
        for (let i = 0; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                return true;
            }
        }
        return false;
    }

}

class Fruit {
    constructor() {
        this.x = -10;
        this.y = -10;
        this.h = unit;
        this.w = unit;
        this.imgobj = new Image(this.h, this.w);
        this.imgobj.src = 'imgs/apple2.png';
    }

    newLocation(snake) {
        this.x = (Math.floor(Math.random() * 17 + 1)) * unit;
        this.y = (Math.floor(Math.random() * 15 + 3)) * unit;

        for (let i = 0; i < snake.length; i++) {
            while (snake[i].x == this.x && snake[i].y == this.y) {
                this.x = (Math.floor(Math.random() * 17 + 1)) * unit;
                this.y = (Math.floor(Math.random() * 15 + 3)) * unit;
            }            
        }
    }

    draw(cnv) {
        let ctx = cnv.getContext("2d");

        if (this.imgobj.complete) {
            ctx.drawImage(this.imgobj, this.x, this.y, this.w, this.h);

        } else {
            let self = this;
            this.imgobj.addEventListener('load', function () {
                ctx.drawImage(this.imgobj, self.posx, self.posy, self.w, self.h);
            }, false);
        }
    }
}
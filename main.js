const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let player1 = { x: 10, y: 50, score: 0 };
let player2 = { x: 280, y: 50, score: 0 };
let ball = { x: 150, y: 100, dx: 5, dy: 5 };

function setup() {
    ctx.fillColor = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // setup keydown event listener
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 87: // w
                player1.y -= 10;
                break;
            case 83: // s
                player1.y += 10;
                break;
            case 38: // up arrow
                player2.y -= 10;
                break;
            case 40: // down arrow
                player2.y += 10;
                break;
        }
    });

}

function clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBat(x, y, color = 'white') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 30);
}

function drawBall(x, y) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, 5, 5);
}

function update() {
    checkCollision();
    ball.x += ball.dx;
    ball.y += ball.dy;
    render();
}

function checkCollision() {
    if (ball.y < 0 || ball.y > canvas.height) {
        ball.dy *= -1;
    }
    if (ball.x < 0) {
        player2.score++;
        ball.x = 150;
        ball.y = 100;
    }
    if (ball.x > canvas.width) {
        player1.score++;
        ball.x = 150;
        ball.y = 100;
    }
    if (ball.x > player1.x && ball.x < player1.x + 10 && ball.y > player1.y && ball.y < player1.y + 30) {
        ball.dx *= -1;
    }
    if (ball.x > player2.x && ball.x < player2.x + 10 && ball.y > player2.y && ball.y < player2.y + 30) {
        ball.dx *= -1;
    }
}

function drawScore(player1Score, player2Score) {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(player1Score, 100, 30);
    ctx.fillText(player2Score, 200, 30);
}

function render() {
    clear();
    drawBat(player1.x, player1.y);
    drawBat(player2.x, player2.y, 'yellow');
    drawBall(ball.x, ball.y);
    drawScore(player1.score, player2.score);
}


setup();

setInterval(update, 1000 / 5);



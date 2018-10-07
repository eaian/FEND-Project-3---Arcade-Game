let playerLife = $(".playerLife");
let maxCounter = 3;
//modal declaration and initial status shown
endGame = $(".modal_gameover");
endGame.hide();
//player's lives reduce as she collides with bugs
function playerStatus() {
    if (maxCounter > 1) {
        maxCounter--;
        playerLife.text(maxCounter);
    } else {
        maxCounter = 0;
        playerLife.text(maxCounter);
        endGame.show();
    }
};
//functions for buttons Close and Play Again
$('.button_play').on('click', function() {
    maxCounter = 3;
    playerLife.text(maxCounter);
    player.reset();
    endGame.hide();
});
$('.button_close').on('click', function() {
    endGame.hide();
});
//Enemy declaration and properties that includes positon x,y and speed
//most codes are base github FEND: https://dimakm.github.io/Classic-Arcade-Game-FEND/
var Enemy = function(speed, x, y) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    //make sure that the enemy loops from left to right 
    if (this.x > 510) {
        this.x = Math.random() - 500;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [];
// array of the X coordinates for enimes starting position: enemyXLoc
// array of the Y coordinates for enimes starting position: enemyYLoc
var enemyXLoc = [-500, -100];
var enemyYLoc = [30, 150, 250];
enemyYLoc.forEach(function(yCoordinate) {
    enemyXLoc.forEach(function(xCoordinate) {
        //randomSpeed to generate random speeds for the enemy
        var randomSpeed = 50 * Math.floor(Math.random() * 5 + 1);
        enemy = new Enemy(randomSpeed, xCoordinate, yCoordinate);
        allEnemies.push(enemy);
    });
});
//the player position x,y coordinates
var Player = function(x, y) {
    this.x = x;
    this.y = y;
};
const player = new Player(200, 400);
/*check the collision by going through the allEnemies array and compare the players position to the enemy's position
the number 85 and 50 are half the dimension of the bug */
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 85 && this.x + 85 > allEnemies[i].x && this.y < allEnemies[i].y + 50 && 50 + this.y > allEnemies[i].y) {
            this.x = 200;
            this.y = 400;
            playerStatus();
        };
    };
};
Player.prototype.update = function() {
    this.checkCollisions();
};
Player.prototype.render = function() {
    var image = new Image();
    image.src = 'images/char-princess-girl.png';
    ctx.drawImage(image, this.x, this.y);
};
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};
/*the Player.handleInput function that handles the players movement when an arrow key is pressed (up down left and right)
the character moves 102 on the x axis and 83 of the y so it jumps from a block to another
so first we check what the key is and we make sure the player is within the canvas area.
then we add and subtract depending on the key and the position .*/
Player.prototype.handleInput = function(key) {
    if (key == 'up' && this.y > -10) {
        this.y -= 85;
        if (this.y <= -9) {
            setTimeout(function() {
                player.reset();
            }, 100);
        };
    };
    if (key == 'down' && this.y < 400) {
        this.y += 85;
    };
    if (key == 'left' && this.x > 0) {
        this.x -= 100;
    };
    if (key == 'right' && this.x < 400) {
        this.x += 100;
    };
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
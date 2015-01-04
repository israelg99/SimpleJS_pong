
/* Main JavaScript file for The Snake */
      
window.onload = function() {

	// The canvas board variables :
	var board = document.getElementById('board');
    var ctx = board.getContext('2d');
	
	var delay = 20; // The idling time between frames.
	
	// The size of the blocks :
	var sizeW = 12;
	var sizeH = 79;
	
	// The position variables :
	var posX = 15;
	var posY = board.height / 2 - sizeH;
	var posXright = board.width - (posX + 10); // Position in axis X for the right Green Block.
	var posYright = board.height / 2 - sizeH; // Position in axis X for the right Green Block.
	
	var speed = 25 // The moving speed of the Green Blocks.
	var ball_speedX = Math.random() > 0.5 ? 6 : -6; // The moving speed of the BALL for axis X
													// Generate random direction for start.
	var ball_speedY = ball_speedX; // The moving speed of the BALL for axis Y.

	var radius = 8; // The Ball radius.
	
	// The BALL position axis :
	var ball_posX = board.width/2 - radius * 2;
	var ball_posY = board.height/2 - radius * 2;
	
	var move = { // JSON of The keycodes of the arrow keys.
		up     : 38,
		down   : 40
	};
	
	main();
	
	function main() {
		document.onkeydown = KeyCheck; // Checks if the user is pressing a key.
		
		// BALL Collide Logic :
		if( ball_posX < 0 || ball_posX > 680) { history.go(0); } // If the paddle misses the ball so the game is restarted.
		if( ball_posY < 0 || ball_posY > 430) { ball_speedY=-ball_speedY; } // Checks if the Ball collide the boundrays of the board.										 
		if(collides(posX, posY, sizeW + 5, sizeH, ball_posX, ball_posY, radius, radius)) { // Checks if the Ball collide the left paddle.
			ball_speedX=-ball_speedX;
			ball_speedY=+ball_speedY;
		}
		if(collides(posXright, posYright, sizeW + 5, sizeH, ball_posX, ball_posY, radius, radius)) { // Checks if the Ball collide the right paddle.
			ball_speedX=-ball_speedX;
			ball_speedY=+ball_speedY;
		}
		ball_posX+=ball_speedX;
		ball_posY+=ball_speedY;
		
		// BOT playing :
		posYright = ball_posY - 50;
		if(posYright > 365) { posYright = 365; }
		if(posYright < 5) { posYright = 5; }
		
		clearBoard(ctx); // Clearing Board.
		DrawBoard(ctx, sizeW, sizeH,radius,  posX, posY); // Drawing Board.
		
		idle(); // Idling between frames.
	}
	
	function DrawBoard(ctx, sizeW, sizeH, radius, posX, posY) { // Drawing the Board : BALL, Left Paddle, Right Paddle.
		
		// Drawing LEFT Green Block :
		ctx.beginPath();
		ctx.rect(posX, posY, sizeW, sizeH);
		ctx.fillStyle = '#00D100';
		ctx.fill();
		// Drawing the Border :
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#009E28';
		ctx.stroke();
		
		
		// Drawing RIGHT Green Block :
		ctx.beginPath();
		ctx.rect(posXright, posYright, sizeW, sizeH);
		ctx.fillStyle = '#00D100';
		ctx.fill();
		// Drawing the Border :
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#009E28';
		ctx.stroke();
		
		
		// Drawing The BALL :
		ctx.beginPath();
		ctx.fillStyle='E5E5FF';
		ctx.arc(ball_posX, ball_posY, radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		// Drawing the Border :
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#CCCCFF';
		ctx.stroke();
	}
	function collides(ax, ay, aw, ah, bx, by ,bw, bh) { // Check collision of the ball.
		return ax < bx + bw &&
			   ax + aw > bx &&
			   ay < by + bh &&
			   ay + ah > by;
	}
	
	function clearBoard(ctx) {
		ctx.clearRect(0, 0, board.width, board.height); // Making a rech of eraser.
	}
	
	function KeyCheck() { // Check The key the the use has clicked.
		var KeyID = (window.event) ? event.keyCode : e.keyCode;
		
		switch(KeyID) {
			case move.up:
			if(posY > 5) {
				posY -= speed;
				console.log(posY);
			}
			else { posY = 5; }
			break;
			
			case move.down:
			if(posY < 365) {
				posY += speed;
				console.log(posY);
			}
			else { posY = 365; }
			break;
		}
	}
	
	function idle() {
		setTimeout(main, delay); // Delay between frames, you can go drink coffe now (ohh this joke never gets old) :) 
	}
}
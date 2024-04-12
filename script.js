const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Load sprite images
const barbie = new Image();
barbie.src = 'barbie.png';

const unicorns = new Image();
unicorns.src = 'unicorns.png';

// Define sprite properties
const spriteWidth = 200; // Width of each sprite frame
const spriteHeight = 200; // Height of each sprite frame
const numFrames = 2; // Number of frames in the sprite
let currentFrame = 0; // Current frame to display

// Function to draw sprite
function drawSprite(target) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    target, 
    0, // X coordinate of the sprite frame
    0, // Y coordinate of the sprite frame (assuming it's on the top)
    spriteWidth, // Width of the sprite frame
    spriteHeight, // Height of the sprite frame
    0, // X coordinate on the canvas to draw the sprite
    0, // Y coordinate on the canvas to draw the sprite
    spriteWidth, // Width to draw the sprite
    spriteHeight // Height to draw the sprite
  );
}

// Update animation frame
function updateFrame() {
  currentFrame = (currentFrame + 1) % numFrames;
  if (currentFrame === 0){
    drawSprite(barbie);
  } else {
    drawSprite(unicorns);
  }
}

// Start animation
setInterval(updateFrame, 100); // Change the interval to adjust the animation speed


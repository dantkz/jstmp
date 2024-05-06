const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Load sprite images

const welcome = new Image();
welcome.src = "images/welcome.jpeg"

const background = new Image();
// background.fill(255);
// background.src = "images/background.jpeg"

const fruit_sprite_names = [["apple", 2], ["banana", 2], ["blueberry", 2], ["orange", 2], ["raspberry", 2]]
let sprites = []
for (let i = 0; i < fruit_sprite_names.length; i++) {
    let fruit_name = fruit_sprite_names[i][0];
    let num_frames = fruit_sprite_names[i][1];
    sprites.push([])
    for (let f_i=0; f_i < num_frames; f_i++) {
        const frame = new Image();
        frame.src = "images/" + fruit_name + f_i + ".png";
        sprites[i].push(frame);
    }
}


let active_fruits = []
let active_coordinates = []
let current_frames = []
let fruits_to_remove = []


function addRandomFruit() {
    sprite_index = Math.floor(Math.random() * sprites.length);
    xOffset = Math.floor(Math.random() * (canvas.width - spriteWidth + 0.999));
    yOffset = Math.floor(Math.random() * (canvas.height - spriteHeight + 0.999));

    active_fruits.push(sprite_index);
    current_frames.push(0);
    active_coordinates.push([xOffset, yOffset]);

}

function removeFruits() {
    fruits_to_remove.sort();
    console.log(fruits_to_remove);
    for (let i = fruits_to_remove.length - 1; i >= 0; i--) {
        fruit_index = fruits_to_remove[i];
        fruits_to_remove.splice(i, 1);
        active_fruits.splice(fruit_index, 1);
        active_coordinates.splice(fruit_index, 1);
        current_frames.splice(fruit_index, 1);
    }
    fruits_to_remove = []
}

function fruitClicked(fruit_index, X, Y) {
    if (current_frames[fruit_index] + 1 == sprites[active_fruits[fruit_index]].length) {
        fruits_to_remove.push(fruit_index);
    }
    else {
        current_frames[fruit_index]++;
    }
}

function clickHandler(event) {
    X = event.offsetX;
    Y = event.offsetY;
    for (let fruit_index=0; fruit_index < active_fruits.length; fruit_index++) {
        xOffset = active_coordinates[fruit_index][0];
        yOffset = active_coordinates[fruit_index][1];
        if (X >= xOffset && X <= xOffset + spriteWidth && Y>=yOffset && Y <= yOffset + spriteHeight) {
            fruitClicked(fruit_index, X - xOffset, Y - yOffset);
            break;
        }
    }
}


// Define sprite properties
const spriteWidth = 256; // Width of each sprite frame
const spriteHeight = 256; // Height of each sprite frame


function drawBackground(target) {
    ctx.drawImage(
        target, 
        0, // X coordinate of the sprite frame
        0, // Y coordinate of the sprite frame (assuming it's on the top)
        target.width, // Width of the sprite frame
        target.height, // Height of the sprite frame
        0, // X coordinate on the canvas to draw the sprite
        0, // Y coordinate on the canvas to draw the sprite
        canvas.width, // Width to draw the sprite
        canvas.height// Height to draw the sprite
    );
}

// Function to draw sprite
function drawFruits(fruit_index) {
    target_sprite = sprites[active_fruits[fruit_index]][current_frames[fruit_index]];
    xOffset = active_coordinates[fruit_index][0];
    yOffset = active_coordinates[fruit_index][1];
    ctx.drawImage(
        target_sprite, 
        0, // X coordinate of the sprite frame
        0, // Y coordinate of the sprite frame (assuming it's on the top)
        spriteWidth, // Width of the sprite frame
        spriteHeight, // Height of the sprite frame
        xOffset, // X coordinate on the canvas to draw the sprite
        yOffset, // Y coordinate on the canvas to draw the sprite
        spriteWidth, // Width to draw the sprite
        spriteHeight // Height to draw the sprite
    );
}

function drawSprites(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i = 0;
    while (i < active_fruits.length) {
        drawFruits(i);
        i++;
    }
}

let frame_count = -1;

// Update animation frame
function updateFrame() {
    if (frame_count < 0) {
        drawBackground(welcome);
        frame_count++;
    }
    else {
        drawBackground(background);
        drawSprites();
        removeFruits();
        if (frame_count == 0) {
            addRandomFruit();
        }
        frame_count = (frame_count + 1) % 5;
    }
}

canvas.addEventListener("click", clickHandler);

// Start animation
setInterval(updateFrame, 500); // Change the interval to adjust the animation speed


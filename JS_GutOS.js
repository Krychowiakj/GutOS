var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

// Initialize screen dimensions
var WIDTH, HEIGHT;

function setCanvasDimensions() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    // Set canvas dimensions
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

function handleWindowResize() {
    // Update canvas dimensions when window is resized
    setCanvasDimensions();

    // Reset logo position based on new screen dimensions
    logoX = Math.random() * (WIDTH - LOGO_WIDTH);
    logoY = Math.random() * (HEIGHT - LOGO_HEIGHT);
}

// Logo dimensions (increased by 3 times)
var LOGO_WIDTH = 600;
var LOGO_HEIGHT = 300;

// Logo position and velocity
var logoX, logoY;
var logoDX = 2;
var logoDY = 2;

// Array of colors with reduced intensity
var colors = [
    "rgba(255, 0, 0, 0.5)",     // Red
    "rgba(0, 255, 0, 0.5)",     // Green
    "rgba(0, 0, 255, 0.5)",     // Blue
    "rgba(255, 255, 0, 0.5)",   // Yellow
    "rgba(255, 165, 0, 0.5)",   // Orange
    "rgba(128, 0, 128, 0.5)"    // Purple
];

// Current color variable
var currentColor = "";

function getRandomColor() {
    // Generate a random index to pick a color from the array
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function drawLogo() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw the image (scaled to new dimensions)
    ctx.drawImage(image, logoX, logoY, LOGO_WIDTH, LOGO_HEIGHT);

    // Change the image color with reduced intensity
    if (currentColor !== "") {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = currentColor;
        ctx.fillRect(logoX, logoY, LOGO_WIDTH, LOGO_HEIGHT);
        ctx.globalCompositeOperation = "source-over";
    }
}

function updateLogoPosition() {
    logoX += logoDX;
    logoY += logoDY;

    // Check collision with screen edges
    if (logoX <= 0 || logoX + LOGO_WIDTH >= WIDTH) {
        logoDX = -logoDX;
        currentColor = getRandomColor();
    }
    if (logoY <= 0 || logoY + LOGO_HEIGHT >= HEIGHT) {
        logoDY = -logoDY;
        currentColor = getRandomColor();
    }
}

function animate() {
    drawLogo();
    updateLogoPosition();

    requestAnimationFrame(animate);
}

// Load and draw the logo image
var image = new Image();
image.src = "https://raw.githubusercontent.com/Krychowiakj/GutOS/main/GutOS_logo.png";
image.onload = function () {
    // Once the image is loaded, initialize and start the animation
    setCanvasDimensions();
    logoX = Math.random() * (WIDTH - LOGO_WIDTH);
    logoY = Math.random() * (HEIGHT - LOGO_HEIGHT);
    animate();
};

// Handle window resize event
window.addEventListener("resize", handleWindowResize);

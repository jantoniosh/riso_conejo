let pinkLayer;
let tealLayer;
let scarLayer;
let greenLayer;
let indiLayer;
let reLayer;
let compressChannels = true;
let posA_x, posA_y, posB_x, posB_y, posC_x, posC_y;
let black;

function preload() {
    img = loadImage('main.png');
    texto = loadImage('texto.png');
}

function setup() {
    createCanvas(1080, 1080);
    pinkLayer = new Riso('fluorescentpink');
    tealLayer = new Riso('teal');
    scarLayer = new Riso('scarlet');
    greenLayer = new Riso('green');
    indiLayer = new Riso('indigo');
    redLayer = new Riso('red');
    black = new Riso('black');

    posA_x = width / 4;
    posA_y = height / 4;
    posB_x = width * 0.75;
    posB_y = height / 4;
    posC_x = width / 4;
    posC_y = height * 0.75;
}

function draw() {
    background(255);
    clearRiso();

    let warms;
    let cools;

    warms = extractCMYKChannel(img, "my");
    cools = extractCMYKChannel(img, "ck");

    pinkLayer.imageMode(CENTER);
    tealLayer.imageMode(CENTER);
    scarLayer.imageMode(CENTER);
    greenLayer.imageMode(CENTER);
    indiLayer.imageMode(CENTER);
    redLayer.imageMode(CENTER);
    black.imageMode(CENTER);

    // Filtro 1
    pinkLayer.image(warms, posB_x, posB_y, img.width * 0.5, img.height * 0.5);
    tealLayer.image(cools, posB_x, posB_y, img.width * 0.5, img.height * 0.5);

    // Filtro 2
    scarLayer.image(warms, posC_x, posC_y, img.width * 0.5, img.height * 0.5);
    greenLayer.image(cools, posC_x, posC_y, img.width * 0.5, img.height * 0.5);

    // Filtro 3
    indiLayer.image(warms, posA_x, posA_y, img.width * 0.5, img.height * 0.5);
    redLayer.image(cools, posA_x, posA_y, img.width * 0.5, img.height * 0.5);

    tealLayer.cutout(pinkLayer);
    greenLayer.cutout(scarLayer);
    redLayer.cutout(indiLayer);

    let dithered = ditherImage(texto, 'atkinson', 50);
    black.image(dithered, width * 0.75, height * 0.75, img.width * 0.5, img.height * 0.5);

    drawRiso();
}
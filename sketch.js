
let score = 0, collision;

const colors = {
    'GRID': '#BBADA0',
    'TEXTANDMARGIN': '#776E65',
    'DEFAULT': '#EDC53F',
    'TWO': '#EEE4DA',
    'FOUR': '#EDE0C8',
    'EIGHT': '#F2B179',
    'ONESIX': '#F59563',
    'THREETWO': '#F67C5F',
    'SIXFOUR': '#F6FE3B',
    'ONETWOEIGHT': '#EDCF72',
    'TWOFIVESIX': '#EDCC61',
    'FIVEONETWO': '#EDC850'
};

const grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function setup() {
    createCanvas(windowWidth, windowHeight);
    init();
    init();
}

function draw() {
    background('#FAF8EF');
    fill(colors.TEXTANDMARGIN);
    text(`Score: ${score}`, 50, 100);
    drawGrid();
}

function drawGrid() {
    fill(colors.TEXTANDMARGIN);
    rect(400, 80, 501, 501);
    let x, y = 95;
    let size = 106.5;
    for (let i = 0; i < grid.length; i++) {
        x = 415;
        for (let j = 0; j < grid[i].length; j++) {
            switch (grid[i][j]) {
                case 0: fill(colors.GRID);
                        break;
                case 2: fill(colors.TWO);
                        break;
                case 4: fill(colors.FOUR);
                        break;
                case 8: fill(colors.EIGHT);
                        break;
                case 16: fill(colors.ONESIX);
                        break;
                case 32: fill(colors.THREETWO);
                        break;
                case 64: fill(colors.SIXFOUR);
                        break;
                case 128: fill(colors.ONETWOEIGHT);
                        break;
                case 256: fill(colors.TWOFIVESIX);
                        break;
                case 512: fill(colors.FIVEONETWO);
                        break;
                default: fill(colors.DEFAULT);
            }
            rect(x, y, size, size);
            if (grid[i][j] != 0) {
                fill(colors.TEXTANDMARGIN);
                textSize(40);
                if (grid[i][j] < 10) {
                    text(grid[i][j], x + 45, y + 65);
                }
                else
                if (grid[i][j] < 100) {
                    text(grid[i][j], x + 30, y + 65);
                }
                else
                if (grid[i][j] < 1000) {
                    text(grid[i][j], x + 20, y + 65);
                }
                if (grid[i][j] > 1000) {
                    text(grid[i][j], x + 10, y + 65);
                }
            }
            x += size + 15;
        }
        y += size + 15;
    }
}

function init() {
    let num = random() < 0.5 ? 2 : 4;
    while (true) {
        if (isEmpty()) {
            let i = floor(random(0, 4));
            let j = floor(random(0, 4));
            if (grid[i][j] == 0) {
                grid[i][j] = num;
                break;
            }
        }
        else 
        if (hasPairs()) {
            break;
        }
        else {
            alert(`Game Over. Your score is ${score}.`);
            score = 0;
            window.location.reload();
            break;
        }
    }
}

function hasPairs() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i == 0 || i == grid.length - 1) {
                if (j == 0 || j == grid[i].length - 1) {
                    //corners
                    if (i == 0 && j == 0) {
                        //left
                        if (grid[i][j] == grid[i][j + 1] || grid[i][j] == grid[i + 1][j]) {
                            return true;
                        }
                    }
                    else 
                    if (i == 0 && j == grid[i].length - 1) {
                        //right
                        if (grid[i][j] == grid[i][j - 1] || grid[i][j] == grid[i + 1][j]) {
                            return true;
                        }
                    } 
                    else 
                    if (i == grid.length - 1 && j == 0) {
                        //bottom left
                        if (grid[i][j] == grid[i - 1][j] || grid[i][j] == grid[i][j + 1]) {
                            return true;
                        }
                    }
                    else 
                    if (i == grid.length - 1 && j == grid[i].length - 1) {
                        //bottom right
                        if (grid[i][j] == grid[i][j - 1] || grid[i][j] == grid[i - 1][j]) {
                            return true;
                        }
                    }
                }   
                else {
                    //horizontal edge
                    if (i == 0) {
                        //top
                        if (grid[i][j] == grid[i][j + 1] || grid[i][j] == grid[i][j - 1] || grid[i][j] == grid[i + 1][j]) {
                            return true;
                        }
                    }
                    else {
                        //bottom
                        if (grid[i][j] == grid[i][j + 1] || grid[i][j] == grid[i][j - 1] || grid[i][j] == grid[i - 1][j]) {
                            return true;
                        }
                    }
                }
            }
            else {
                if (j == 0 || j == grid[i].length - 1) {
                    //vertical edge
                    if (j == 0) {
                        //left
                        if (grid[i][j] == grid[i + 1][j] || grid[i][j] == grid[i - 1][j] || grid[i][j] == grid[i][j + 1]) {
                            return true;
                        }
                    }
                    else {
                        //right
                        if (grid[i][j] == grid[i + 1][j] || grid[i][j] == grid[i - 1][j] || grid[i][j] == grid[i][j - 1]) {
                            return true;
                        }
                    }
                }   
                else {
                    //center
                    if (grid[i][j] == grid[i + 1][j] || grid[i][j] == grid[i - 1][j] || grid[i][j] == grid[i][j - 1] || grid[i][j] == grid[i][j + 1]) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function isEmpty() {
    if (grid[0].includes(0) || grid[1].includes(0) || grid[2].includes(0) || grid[3].includes(0)) {
        return true;
    }
    return false;
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        shiftUp();
        init();
    }
    else 
    if (keyCode == DOWN_ARROW) {
        shiftDown();
        init();
    }
    else 
    if (keyCode == LEFT_ARROW) {
        shiftLeft();
        init();
    }
    else 
    if (keyCode == RIGHT_ARROW) {
        shiftRight();
        init();
    }
    if (collision) {
        score += 4;
    }
    collision = false;
}

function shiftUp() {
    for (let i = 0; i < grid.length; i++) {
        let limit = 1;
        for (let j = 1; j < grid[i].length; j++) {
            for (let k = j; k >= limit; k--) {
                if (grid[k - 1][i] == 0) {
                    grid[k - 1][i] = grid[k][i];
                    grid[k][i] = 0;
                }
                else 
                if (grid[k - 1][i] == grid[k][i]) {
                    grid[k - 1][i] *= 2;
                    grid[k][i] = 0;
                    limit = k;
                    collision = true;
                }
            }
        }   
    }
}

function shiftDown() {
    for (let i = 0; i < grid.length; i++) {
        let limit = grid[i].length - 1;
        for (let j = grid[i].length - 1; j >= 0; j--) {
            for (let k = j; k < limit; k++) {
                if (grid[k + 1][i] == 0) {
                    grid[k + 1][i] = grid[k][i];
                    grid[k][i] = 0;
                }
                else 
                if (grid[k + 1][i] == grid[k][i]) {
                    grid[k + 1][i] *= 2;
                    grid[k][i] = 0;
                    limit = k;
                    collision = true;
                }
            }
        }   
    }
}

function shiftLeft() {
    for (let i = 0; i < grid.length; i++) {
        let limit = 1;
        for (let j = 1; j < grid[i].length; j++) {
            for (let k = j; k >= limit; k--) {
                if (grid[i][k - 1] == 0) {
                    grid[i][k - 1] = grid[i][k];
                    grid[i][k] = 0;
                }
                else 
                if (grid[i][k - 1] == grid[i][k]) {
                    grid[i][k - 1] *= 2;
                    grid[i][k] = 0;
                    limit = k;
                    collision = true;
                }
            }
        }   
    }
}

function shiftRight() {
    for (let i = 0; i < grid.length; i++) {
        let limit = grid[i].length - 1;
        for (let j = grid[i].length - 1; j >= 0; j--) {
            for (let k = j; k < limit; k++) {
                if (grid[i][k + 1] == 0) {
                    grid[i][k + 1] = grid[i][k];
                    grid[i][k] = 0;
                }
                else 
                if (grid[i][k + 1] == grid[i][k]) {
                    grid[i][k + 1] *= 2;
                    grid[i][k] = 0;
                    limit = k;                   
                    collision = true;
                }
            }
        }   
    }
}
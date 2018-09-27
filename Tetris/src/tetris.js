var fieldWidth = 10;
var fieldHeight = 20;

var tetrisF;
var nextF;

var currentFigure;
var nextFigure;

var board = [];

var render_interval;

var deletedLines;
var multiplier;
var score;
var level;


function startGame()
{
    localStorage["tetris.gamePlayed"] = 'true';
    deletedLines = 0;
    multiplier = 1;
    score = 0;
    level = 1;
    tetrisF = new Canvas(fieldWidth, fieldHeight, "tetrisfield");
    nextF = new Canvas (4, 4, "nextfigure");

    for (let i=0; i<fieldWidth; i++)
    {
        board[i] = [];
        for (let j=0; j<fieldHeight; j++)
            board[i][j] = 0;
    }

    generateFigure();
    startRender(1000);
}

function startRender(speed)
{
    if (speed <= 0)
        speed = 100;
    if (render_interval)
        clearInterval(render_interval);
    render_interval = setInterval(() => {moveFigure(0, 1)}, speed);
}

function gameOver()
{
    localStorage["tetris.score"] = score;
    document.location.href = '../web/records.html';
}

function generateFigure()
{
    if (!nextFigure)
        nextFigure = Figure.makeFigure();
    currentFigure = nextFigure;
    currentFigure.x = 5;
    nextFigure = Figure.makeFigure();
    nextF.resetAll();
    nextF.drawFigure(nextFigure);

    if (!checkState())
        gameOver();
}

function checkState() {
    let valid = true;
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++) {
            if (currentFigure.matrix[i][j] === 1) {
                valid = valid && (currentFigure.x + i >= 0) && (currentFigure.x + i < fieldWidth);
                valid = valid && (currentFigure.y + j >= 0) && (currentFigure.y + j < fieldHeight);
                valid = valid && (!board[currentFigure.x + i][currentFigure.y + j]);
                if (!valid)
                    break;
            }
        }
    return valid;
}

function moveFigure(offsetX, offsetY)
{
    currentFigure.x += offsetX;
    currentFigure.y += offsetY;

    let valid = checkState();
    if (!valid)
    {
        currentFigure.x -= offsetX;
        currentFigure.y -= offsetY;
        if ((offsetX === 0) && (offsetY === 1))
        {
            saveFigure();
            generateFigure();
        }
    }
    update();
}

    function checkLines()
    {
        let deleteNeeded = false;
        for (let i=0; i<fieldHeight; i++)
        {
            let deleteThis = true;
            for (let j=0; j<fieldWidth; j++)
            {
                deleteThis = deleteThis && board[j][i];
                if (!deleteThis)
                    break;
            }
            if (deleteThis)
            {
                deleteNeeded = true;
                for (let j=0; j<fieldWidth; j++)
                {
                    board[j].splice(i, 1);
                    board[j].unshift(0);
                }
                break;
            }
        }

        if (deleteNeeded)
        {
            deletedLines++;
            score += 100*multiplier;
            multiplier++;
            if (score >= 1000*level)
            {
                level++;
                startRender(1000 / 1.1**(level-1));
            }
            checkLines();
        }
        multiplier = 1;
    }

function update()
{
    checkLines();
    tetrisF.resetAll();
    tetrisF.drawBoard(board);
    tetrisF.drawFigure(currentFigure);
    document.getElementById("info").innerHTML = "Login: " + localStorage["tetris.username"] +
        "<br> Lines: " + deletedLines + "<br>Level: " + level + "<br>Score: " + score;
}


function rotateFigure()
{
    currentFigure.rotate();
    if (!checkState())
        currentFigure.rotate('Left');
    update();

}

function saveFigure()
{
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            if ((currentFigure.matrix[i][j] === 1))
                board[i + currentFigure.x][j + currentFigure.y] = currentFigure.color;
}

function keyListener(event)
{
    const keyName = event.key;
    switch (keyName) {
        case 'ArrowLeft':
            moveFigure(-1, 0);
            break;
        case 'ArrowRight':
            moveFigure(1, 0);
            break;
        case 'ArrowDown':
        case ' ':
            moveFigure(0, 1);
            break;
        case 'ArrowUp':
            rotateFigure();
            break;
    }
}

document.addEventListener('keydown', keyListener);
startGame();
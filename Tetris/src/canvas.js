class Canvas
{
    constructor(width, height, id)
    {
        this.width = width;
        this.height = height;
        this.canva = document.getElementById(id);
        this.context = this.canva.getContext('2d');

        this.borderWidth = 3;

        let dpi = window.devicePixelRatio;
        let style_height = +getComputedStyle(this.canva).getPropertyValue("height").slice(0, -2);
        let style_width = +getComputedStyle(this.canva).getPropertyValue("width").slice(0, -2);
        this.canva.setAttribute('height', style_height * dpi);
        this.canva.setAttribute('width', style_width * dpi);

        this.pixWidth = this.canva.width;
        this.pixHeight = this.canva.height;

        this.squWidth = Math.floor(this.pixWidth / this.width);
        this.squHeight = Math.floor(this.pixHeight / this.height);
    }

    drawSquare(x, y, color='#00FF00')
    {
        this.context.fillStyle = '#ffffff';
        this.context.fillRect(x*this.squWidth, y*this.squHeight, this.squWidth + this.borderWidth, this.squHeight + this.borderWidth);

        this.context.fillStyle = color;
        this.context.fillRect(x*this.squWidth + this.borderWidth, y*this.squHeight + this.borderWidth,
                                                this.squWidth - this.borderWidth, this.squHeight - this.borderWidth);
    }

    drawFigure (figure)
    {
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
                if (figure.matrix[i][j])
                    this.drawSquare(figure.x + i, figure.y + j, figure.color);
    }

    resetAll()
    {
        this.context.clearRect(0, 0, this.pixWidth, this.pixHeight);
    }

    drawBoard(board)
    {
        for (let i=0; i<this.width; i++)
            for(let j=0; j<this.height; j++)
                if (board[i][j])
                    this.drawSquare(i, j);
    }
}
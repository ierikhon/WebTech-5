class Entity {
    constructor() {
        this.pos_x = 0;
        this.pos_y = 0;
        this.size_x = 0;
        this.size_y = 0;
    }
}

class Player extends Entity{
    constructor(){
        super();
        this.strong = 3;
        this.weak = 10;
        this.waypoints = 16;
    }
}

class Enemy extends Entity{
    constructor(){
        super();
        this.strong = 0;
        this.weak = 0;
    }
}

class Gold extends Entity{
    constructor(){
        super();
        this.ammount = 0;
    }
}




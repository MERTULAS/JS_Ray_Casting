class Player{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = -30;
        this.viewAngle = 60;
        this.visionDistance = 400;
        this.rays = [];
        this.castingPoints = [];
        this.controller = {
            "87": {pressed: false, dx: 10, dy: 10, angle: 0},
            "83": {pressed: false, dx: -10, dy:-10, angle: 0},
            "68": {pressed: false, dx: 0, dy: 0, angle: 1},
            "65": {pressed: false, dx: 0, dy: 0, angle: -1}
        };
    }

    fieldOfView(){
        /*let dx = this.visionDistance * Math.cos(this.radius * Math.PI / 180) + this.x + this.width / 2;
        let dy = this.visionDistance * Math.sin(this.radius * Math.PI / 180) + this.y + this.height / 2;
        let dx2 = this.visionDistance * Math.cos((this.radius + this.viewAngle) * Math.PI / 180) + this.x + this.width / 2;
        let dy2 = this.visionDistance * Math.sin((this.radius + this.viewAngle) * Math.PI / 180) + this.y + this.width / 2;
        */

        ctx.beginPath();
        this.rays = [];
        for (let i = 0; i <= this.viewAngle; i+=0.5){
            let dx = this.visionDistance * Math.cos((this.radius + i) * Math.PI / 180) + this.x + this.width / 2;
            let dy = this.visionDistance * Math.sin((this.radius + i) * Math.PI / 180) + this.y + this.width / 2;
            ctx.strokeStyle = "white";
            ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2);
            ctx.lineTo(dx, dy);
            this.rays.push([dx, dy]);
        }
        ctx.stroke();
    }
    
    rayCasting(wall){
        const x1 = wall.x1;
        const y1 = wall.y1;
        const x2 = wall.x2;
        const y2 = wall.y2;
        const x3 = this.x + this.width / 2;
        const y3 =  this.y + this.height / 2;
        this.castingPoints = [];
        this.rays.forEach(ray => {
            const x4 = ray[0];
            const y4 = ray[1];
            let divider = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / divider;
            let u = -1 * ((x1 - x2) * (y1 - y3) - (y1 - y2)*(x1 - x3)) / divider;
            if(t > 0 && t < 1 && u > 0){
                const point = {
                    x: x1 + t * (x2 - x1),
                    y: y1 + t * (y2 - y1)
                };
                this.castingPoints.push(point);
                console.log(point);
            }
        });
    }

    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

    move(keyCode){
        Object.keys(this.controller).forEach(key => {
            this.controller[keyCode].pressed = true;
        });
        Object.keys(this.controller).forEach(key => {
            if(this.controller[keyCode].pressed){
                this.x += this.controller[keyCode].dx * Math.cos((this.radius + this.viewAngle / 2) * Math.PI / 180);
                this.y += this.controller[keyCode].dy * Math.sin((this.radius + this.viewAngle / 2) * Math.PI / 180);
                this.radius += this.controller[keyCode].angle;
            }
        });
    }
    stop(keyCode){
        Object.keys(this.controller).forEach(key => {
            this.controller[keyCode].pressed = false;
        });
    }
}
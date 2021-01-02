const body = document.querySelector("body");
const canvas = document.createElement("canvas");
body.appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const wallPoints = [
    [200, 300, 200, 600],
    [1500, 300, 1500, 600],
    [900, 900, 500, 900],
    [300, 300, 600, 100],
    [200, 700, 500, 800],
];
const walls = [];
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("load", game);

function game(){

    wallPoints.forEach(points => {
        const x1 = points[0]
        const y1 = points[1]
        const x2 = points[2]
        const y2 = points[3]
        walls.push(new Wall(x1, y1, x2, y2));
    });

    let player = new Player(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
    
    window.addEventListener("keydown", (e) => {
        player.move(e.keyCode);
    });

    window.addEventListener("keyup", (e) => {
        player.stop(e.keyCode);
    });
    let i = 0;
    function play(){
        ctx.fillStyle = "rgba(33, 33, 33, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        player.draw();
        walls.forEach(wall => {
            wall.drawWall();
            player.fieldOfView(wall);
        });
        player.rays();
        /*
        player.castingPoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
            ctx.fill();
        })*/
        
        requestAnimationFrame(play);
    }
    play();
    
}

const body = document.querySelector("body");
const canvas = document.createElement("canvas");
body.appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.setAttribute("id", "canvas1");

const wallPoints = [
    [200, 300, 200, 700],
    [200, 700, 800, 1000],
    [200, 300, 600, 100],
    [800, 1000, 1900, 1100],
    [1900, 1100, 1900, 100],
    [1900, 100, 600, 100],
    [1600, 300, 1500, 800],
    [1500, 800, 900, 750],
    [900, 750, 500, 500],
    [900, 400, 500, 500],
    [900, 400, 1400, 400],
    
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
        ctx.fillStyle = "rgba(33, 33, 33, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx2.fillStyle = "rgba(33, 33, 33, 0.5)";
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height / 2);
        ctx2.fillStyle = "rgba(0, 200, 0, 0.5)";
        ctx2.fillRect(0, canvas2.height / 2, canvas2.width, canvas2.height / 2);
        player.draw();
        walls.forEach(wall => {
            wall.drawWall();
            player.fieldOfView(wall);
        });
        player.rays();
        Object.keys(player.points).forEach((key, index) => {
            let distance = player.distance(player.x + player.width / 2, player.y + player.height / 2, player.points[key][0], player.points[key][1]);
            let maxHeight = canvas2.height * 0.6;
            let wallHeightScaler = (maxHeight - distance) / maxHeight;
            let wallHeight = maxHeight * wallHeightScaler;
            let dx = 4;
            let dy = canvas2.height / 2 - wallHeight / 2;
            ctx2.fillStyle = "rgba(255, 255, 255," + wallHeightScaler + ")";
            ctx2.fillRect(index * dx, dy, dx, wallHeight);
            ctx2.strokeStyle = "rgba(255, 0, 0," + wallHeightScaler + ")";
            ctx2.strokeRect(index * dx, dy, dx, wallHeight);
            ctx2.fill();
            
            
        });
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

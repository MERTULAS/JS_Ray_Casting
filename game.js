const body = document.querySelector("body");
const canvas = document.createElement("canvas");
body.appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const wallPoints = [];
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("load", game);

function game(){

    let wall = new Wall(400, 300, 400, 600);

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
        wall.drawWall();
        player.rayCasting(wall);
        console.log(player.castingPoints);
        player.castingPoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
            ctx.fill();
        })
        player.fieldOfView();
        requestAnimationFrame(play);
    }
    play();
    
}



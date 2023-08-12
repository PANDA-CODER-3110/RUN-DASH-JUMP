/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH=canvas.width=500;
CANVAS_HEIGHT=canvas.height=1000;
const noofenemies = 50;
const enemiesarray = [];




let gameframe = 0 ;

// enemy1 = {
//     x: 0 ,
//     y: 0 , 
//     width: 200,
//     height: 200,
// }
class enemy{
    constructor(){
        this.image = new Image();
        this.image.src='enemy2.png';

     
        this.speed=Math.random()*4 +1;
        this.spritewidth = 266;
        this.spriteheight=188;
        this.width=this.spritewidth/2.5;
        this.height=this.spriteheight/2.5; 
        this.x=Math.random() * (canvas.width-this.width);
        this.y=Math.random() * (canvas.height-this.height);
        this.frame = 0 ; 
        this.flapspeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.anglespeed = Math.random() *0.2; 
        this.curve = Math.random()* 7;
    }
    update(){
        this.x-=this.speed;
        this.y+=this.curve * Math.sin(this.angle);
        this.angle+=this.anglespeed;
        if(this.x+this.width<0)this.x=CANVAS_WIDTH;
        if(gameframe%this.flapspeed === 0)
        this.frame>4?this.frame=0:this.frame++;
    }
    draw(){
        ctx.drawImage(this.image,this.frame*this.spritewidth,0,
            this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height);
    }
}
//const enemy1 = new enemy();
for(let i=0;i<noofenemies;i++)
{
        enemiesarray.push(new enemy());
}

//console.log(enemiesarray);
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    // enemy1.update();
    enemiesarray.forEach(enemy=>{
        enemy.update();
        enemy.draw();
    });
   // ctx.fillRect(enemy1.x,enemy1.y,enemy1.width,enemy1.height);
   gameframe++;
    requestAnimationFrame(animate);
}
animate();
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosion=[];
const canvaspos = canvas.getBoundingClientRect();

class Explosion{
    constructor(x,y)
    {
        this.spritewidth =200; 
        this.spriteheight = 179;
        this.width = this.spritewidth*0.7;
        this.height = this.spriteheight *0.7;
        this.x =x;
        this.y = y;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0 ; 
        this.timer = 0 ; 
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = 'fire_impact_1.wav';
    }

    update(){
        if(this.frame===0) this.sound.play();
        this.timer++;
        if(this.timer %10 === 0)
        {
            this.frame++;
        }
    }
    draw(){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,this.spritewidth*this.frame,
            0,this.spritewidth,this.spriteheight,0-this.width/2,0-this.height/2,this.width
            ,this.height);
         ctx.restore();   
    }
}

window.addEventListener('click',function(e){

createAnimation(e);

});
function createAnimation(e){
    let posx =e.x-canvaspos.left;
let posy = e.y-canvaspos.top;
explosion.push(new Explosion(posx,posy));
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i =0 ; i<explosion.length;i++)
    {
        explosion[i].update();
        explosion[i].draw();
        if(explosion[i].frame > 5)
        {
            explosion.splice(i,1);
            i--;
        }
    }
 
    requestAnimationFrame(animate);
};

animate();

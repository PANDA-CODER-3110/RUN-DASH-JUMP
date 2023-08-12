const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Collisioncanvas = document.getElementById('Collisioncanvas');
const collisionCtx = Collisioncanvas.getContext('2d');
Collisioncanvas.width = window.innerWidth;
Collisioncanvas.height = window.innerHeight;

let timetonectRaven=0;
let raveninterval = 500  ; 
let lasttime = 0;
let score =0 ; 
ctx.font = '50px Impact';
let gameove = false ; ; 

let ravens = [];

class Ravens{
    constructor(){
        this.spritewidth = 271 ; 
        this.spriteheight = 194 ; 
        this.sizeModifier = Math.random()*0.6 + 0.4;
        this.width=this.spritewidth * this.sizeModifier;
        this.height = this.spriteheight * this.sizeModifier;
        this.x=canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.driectionx=Math.random()*5 +3;
        this.driectiony = Math.random() * 5 - 2.5;
        this.markedfordeletion = false; 
        this.image = new Image();
        this.image.src = 'raven.png';
        this.frame =0 ; 
        this.maxframe = 4 ;
        this.timesinceflap =0;
        this.flapinterval = Math.random()*50 +50;
        this.randomColors = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),
        Math.floor(Math.random()*255)];
        this.color = 'rgb('+this.randomColors[0] + ','+ this.randomColors[1] + ',' + 
        this.randomColors[2] +')';
        
   
    }

    update(delta){
        if(this.y<0 ||this.y>canvas.height-this.height){
            this.driectiony=this.driectiony*-1;
        }
        this.x -= this.driectionx;
       this.y+=this.driectiony;
        if(this.x<0-this.width) this.markedfordeletion=true ; 
        this.timesinceflap+=delta;
        if(this.timesinceflap > this.flapinterval){
            if(this.frame > this.maxframe) this.frame=0;
            else
            this.frame++;
            this.timesinceflap=0
        }
       
        if(this.x< 0-this.width)gameove = true ; 
    }

    draw(){ 
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x,this.y,this.width,this.height);
       // ctx.strokeRect(this.x,this.y , this.width,this.height);
        
          ctx.drawImage(this.image,this.frame*this.spritewidth,0,this.spritewidth,this.spriteheight,
            this.x,this.y,this.width,this.height);
    }
}

let explosion = [];
class Explosion{
    constructor(x,y,size)
    {  this.image = new Image();
        this.image.src = 'boom.png';
        this.spritewidth =200; 
        this.spriteheight = 179;
        this.x =x;
        this.y = y;
       this.size = size;
        this.frame = 0 ; 
        this.timer = 0 ; 
        this.sound = new Audio();
        this.sound.src = 'fire_impact_1.wav';
        this.timesincelastframe = 0 ; 
        this.frameinterval= 200;
        this.markedfordeletion=false ; 
    }

    update(delta){

        if(this.frame===0) this.sound.play();
        this.timesincelastframe+=delta;
        if(this.timesincelastframe>this.frameinterval){
            this.frame++;
        }
        if(this.frame>5) this.markedfordeletion=true ;
    }
    draw(){
        ctx.drawImage(this.image,this.spritewidth*this.frame,
            0,this.spritewidth,this.spriteheight,this.x,this.y-this.size/4,
            this.size,this.size);
    }
}

function drawscore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Score:' + score,50,75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score:' + score,55,80);
}


function drawgameover(){
    ctx.textAlign= 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER , your score is '+score,canvas.width/2,
    canvas.height/2);
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER , your score is '+score,canvas.width/2+5,
    canvas.height/2+5);
}
window.addEventListener('click',function(e){
    const detectpixelcolour = collisionCtx.getImageData(e.x,e.y,1,1);
    console.log(detectpixelcolour);
    const pc = detectpixelcolour.data;
    ravens.forEach(object=>{
            if(object.randomColors[0]===pc[0] && object.randomColors[1] === pc[1] &&
                object.randomColors[2] === pc[2] ){
                    object.markedfordeletion=true ;
                    score++;
                    explosion.push(new Explosion(object.x,object.y,object.width));
                }
    });

});


function animate(timestamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionCtx.clearRect(0,0,canvas.width,canvas.height);
    let delta  = timestamp- lasttime;
    lasttime= timestamp;
    timetonectRaven+=delta;

    if(timetonectRaven>raveninterval)
    {
        ravens.push(new Ravens());
        timetonectRaven = 0  ; 
        ravens.sort(function(a,b){
            return a.width - b.width;
        });
    };
    drawscore();
    [...ravens,...explosion].forEach(object => object.update(delta));
    [...ravens,...explosion].forEach(object => object.draw());
    ravens = ravens.filter(object=>!object.markedfordeletion);
    explosion = explosion.filter(object=>!object.markedfordeletion);
    if(!gameove)requestAnimationFrame(animate);
    else drawgameover();
}
animate(0);
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH=canvas.width=800;
const CANVAS_HEIGHT=canvas.height=700;
let gamespeed = 4 ;

const backgroundlayer1= new Image();
backgroundlayer1.src='layer-1.png'; 
const backgroundlayer2= new Image();
backgroundlayer2.src='layer-2.png';
const backgroundlayer3= new Image();
backgroundlayer3.src='layer-3.png';
const backgroundlayer4= new Image();
backgroundlayer4.src='layer-4.png';
const backgroundlayer5= new Image();
backgroundlayer5.src='layer-5.png';

const slider = document.getElementById('slider');
slider.value =  gamespeed;
const showgamespeed = document.getElementById('showgamespeed');
showgamespeed.innerHTML=gamespeed;
slider.addEventListener('change',function(e){
    gamespeed = e.target.value;
    showgamespeed.innerHTML=e.target.value;
});
// let x =0 ; 
// let x2 =2400;
class Layer{
    constructor(image,speedModifier){
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=700;
        this.x2=this.width;
        this.image=image;
        this.speedModifier=speedModifier;
        this.speed=gamespeed*this.speedModifier;
    }
    update()
    {
        this.speed=gamespeed*this.speedModifier;
        if(this.x<= -this.width)
        {
            this.x=this.width+this.x-this.speed;
        }
        if(this.x2<= -this.width)
        {
            this.x2=this.width+this.x2-this.speed;
        }
        this.x=Math.floor(this.x - this.speed);
        this.x2=Math.floor(this.x2 - this.speed);
    }
    draw()
    {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x2,this.y,this.width,this.height);
    }
}

const layer1 = new Layer(backgroundlayer1,0.2);
const layer2 = new Layer(backgroundlayer2,0.4);
const layer3 = new Layer(backgroundlayer3,0.6);
const layer4 = new Layer(backgroundlayer4,0.8);
const layer5 = new Layer(backgroundlayer5,1)

const gameObject = [layer1,layer2,layer3,layer4,layer5] ;


function animate()
{       ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
//    ctx.drawImage(backgroundlayer4,x,0);
//    ctx.drawImage(backgroundlayer4,x2,0);
//    if(x<-2400)x=2400+x2-gamespeed;
//   else x-=gamespeed;
//   if(x2<-2400)x2=2400+x-gamespeed;
//   else x2-=gamespeed;
// layer4.update();
// layer4.draw();
// layer5.update();
// layer5.draw();
gameObject.forEach(object => {
object.update();
object.draw();
});
    requestAnimationFrame(animate);
};
animate();
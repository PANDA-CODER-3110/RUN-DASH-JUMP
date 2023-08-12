let playerstate = 'getHit';
const dropdown=document.getElementById('animations');
document.addEventListener('change',function(e)
{
 playerstate= e.target.value ; 
})

const canvas = document.getElementById('canvas1'); // here taking the element by id 
const ctx =   canvas.getContext('2d'); /// all 2d animation stored in ctx var

// problem that height = 300x150 pixels which scatter the image so we need an appropiate scaling 
 // therefore same size as style css
 const CANVAS_WIDTH = canvas.width = 600 ;
 const CANVAS_HEIGHT = canvas.height = 600 ;


 const playerImage = new Image();
 playerImage.src = 'shadow_dog.png';
 const spritewidth = 575; 
 const spriteheight = 523; 

//  let framex = 0; // it helps in hori.. movent to  access all the ovement 
//  let framey = 1; // it helps to access all the particular movement of a posture 
 let gameframe= 0;
const staggerframe = 5 ; // both uper two are used to reduce the delay im the animation 
const spriteanimation = [];
const animationstates=[
  {
    name : 'idle',
    frames : 7,
  },
  {
    name : 'jump',
    frames : 7,
  },
  {
    name : 'fall',
    frames : 7,
  },
  {
    name : 'run',
    frames : 9,
  },
  {
    name : 'dizzy',
    frames : 9,
  },
  {
    name : 'sit',
    frames : 5,
  },
  {
    name : 'roll',
    frames : 7,
  },
  {
    name : 'bite',
    frames : 7,
  },
  {
    name : 'ko',
    frames : 12,
  },
  {
    name : 'getHit',
    frames : 4,
  },
  
];

animationstates.forEach((state,index) => {
  let frames = {
    loc : [],
  }
  for(let j =0;j<state.frames;j++)
  {
      let posx = j*spritewidth;
      let posy = index *spriteheight;
      frames.loc.push({x:posx,y:posy});
  }
  spriteanimation[state.name ] = frames;
});

console.log(animationstates);
 function animate()
 {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        let position = Math.floor(gameframe/staggerframe)% spriteanimation[playerstate].loc.length;
       let  framex = spritewidth*position;
       let framey = spriteanimation[playerstate].loc[position].y;
        ctx.drawImage(playerImage,framex,framey,
          spritewidth,spriteheight,0,0,spritewidth,spriteheight);
          // it hels to assign the part from source to 
          //destination where the spriite is to be positioned
     

        gameframe++;
        requestAnimationFrame(animate);
 }
 animate();
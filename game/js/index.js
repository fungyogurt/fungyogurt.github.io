//tile object
function tile_box(){
  this.tile_type;
  this.addToScene = function(id){
    document.getElementById('container').innerHTML += '<span href="#" id="'+id+'" data-type="'+this.tile_type+'" class="tile_box"><i class="fa fa-question"></i></span>';
  }
}

//variables
var number_of_tiles = 20;
var tiles_per_row = 5;
var openings = 0;
var tries = 0;
var tiles = new Array();
var tile = new tile_box();
var picked_tiles = new Array();
var can_pick = true;
var pictures = ['<i <img src="http://oi65.tinypic.com/154vel5.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi65.tinypic.com/2vafjmx.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi67.tinypic.com/30nac10.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi67.tinypic.com/15zpll3.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi67.tinypic.com/i5wrvc.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi68.tinypic.com/vraoea.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi63.tinypic.com/v4asyp.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi67.tinypic.com/2iw9ge8.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi63.tinypic.com/4haw61.jpg" width="50px;" style="margin-top:20px;"/></span>', '<img src="http://oi67.tinypic.com/206o1p0.jpg" width="50px;" style="margin-top:20px;"/></span>', ,];

function givePic(i){
  return pictures[i];
}

//tiles creation loop
for(var i=0; i<number_of_tiles; i++){
  tiles.push(Math.floor(i/2));
}

//shuffling loop
var swap,tmp;
for(var i=number_of_tiles-1; i>0; i--){
  swap = Math.floor(Math.random()*i);
  tmp = tiles[i];
  tiles[i] = tiles[swap];
  tiles[swap] = tmp;
}

//tile placing loop
for(var i=0; i<number_of_tiles; i++){
  tile = new tile_box;
  var id = Math.floor(Math.random()*300);
  tile.tile_type = tiles[i];
  tile.addToScene(id);
}

function resetGame(){
  alert("Congratulations! You have tried "+tries+" times.");
}

//tile click function
function clicked(){
  if(can_pick){
    var picked = this;
    if(picked_tiles.indexOf(picked) == -1){
      picked_tiles.push(picked);
      picked.innerHTML = givePic(picked.dataset['type']);
    }
    
    if(picked_tiles.length == 2){
      tries++;
      can_pick = false;
      if(picked_tiles[0].dataset['type'] == picked_tiles[1].dataset['type']){
        setTimeout(function(){
          picked_tiles[0].removeEventListener('click',clicked,false);
          picked_tiles[1].removeEventListener('click',clicked,false);
          picked_tiles[0].innerHTML = "";
          picked_tiles[1].innerHTML = "";
          picked_tiles[0].className = picked_tiles[0].className + " removed";
          picked_tiles[1].className = picked_tiles[1].className + " removed";
          picked_tiles = new Array();
          can_pick = true;
          openings++;
          if(openings == (number_of_tiles/2)){
            resetGame();
          }
        },1000);
      } else {
        setTimeout(function(){
          picked_tiles[0].innerHTML = '<i class="fa fa-question"></i>';
          picked_tiles[1].innerHTML = '<i class="fa fa-question"></i>'; 
          picked_tiles = new Array();
          can_pick = true;
        },1000);
      }
    }
  }
}

//add event listeners to tiles
var elements = document.getElementsByTagName("span");
for(var i=0; i<elements.length; i++){
  elements[i].addEventListener('click',clicked);
}
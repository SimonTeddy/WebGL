/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

let item_length = 10;
let item_height = 10;
let item_width = 10;
let item_texture = 1;

function touchhandler(e) { if (e.touches) {} }
  
function clickMouse(e){ shoot_projectile = true; }
  
function upMouse(e) {}
 
function moveMousePosition(e){
  
  let diff = mousePos[0] - e.pageX;

  // When the left or right key is pressed then lock out the mouse left and right for better control response
  
  if (e.pageX > mousePos[0] ) {
      let adjustment = (e.pageX - mousePos[0]);
      if (adjustment > 3)
        adjustment = 3;
      camera_angle += (adjustment);
      if (camera_angle > 360)
        camera_angle = 0;
      
    }
    else if (e.pageX < mousePos[0] ) { 
      let adjustment = (mousePos[0] - e.pageX);
      if (adjustment > 3)
        adjustment = 3;
      camera_angle -= (adjustment);
      if (camera_angle < 0)
        camera_angle = 360;
 
    }
    else {
      rotate_direction = 0;
    }
  
    if (e.pageY > mousePos[1])
      y_camera_angle += (e.pageY - mousePos[1]) / 20;
    else
    y_camera_angle -= (mousePos[1] - e.pageY) / 20;
  
    if (y_camera_angle > 5)
    y_camera_angle = 5;
  
    if (y_camera_angle < -5)
    y_camera_angle = -5;
  
    mousePos[0] = e.pageX;
    mousePos[1] = e.pageY;

}

function checkKeyUnPressed(e) {
  
    if (e.keyCode == "37") {
      rotate_direction = 0;
      player_rotation_speed = 0.01;
    }
    if (e.keyCode == "39") {
      rotate_direction = 0;
      player_rotation_speed = 0.01;
    }
    if (e.keyCode == "40") {
      movement_direction = 0;
    }
    if (e.keyCode == "38") {
      movement_direction = 0;
    }
    if (e.keyCode == "87") {
      movement_direction = 0;
    }
    if (e.keyCode == "83") {
      movement_direction = 0;
    } 
    if (e.keyCode == "41") {
      movement_direction = 0;
    }
    if (e.keyCode == "44") {
      movement_direction = 0;
    }
    if (e.keyCode == "65") {
      rotate_direction = 0;
      player_rotation_speed = 0.01;
    }
    if (e.keyCode == "68") {
      rotate_direction = 0;
      player_rotation_speed = 0.01;
    }
    if (e.keyCode == "188") {
      movement_direction = 0;
      //rotate_direction = 0;
    }
    if (e.keyCode == "190") {
      movement_direction = 0;
      //rotate_direction = 0;
    }
    if (e.keyCode == "79") {
      movement_direction = 0;
    }
    if (e.keyCode == "76") {
      movement_direction = 0;
    }
  } 
  
  
function checkKeyPressed(e) {
  
    if (e.keyCode == "37") {
        rotate_direction = 1;
    }
    if (e.keyCode == "188") { // angled bracket key left
      movement_direction = 3;  // move left ( not rotate )
    }
    if (e.keyCode == "190") { // angled bracket key right
      movement_direction = 4; // move right ( not rotate )
    }
    if (e.keyCode == "79") {
      movement_direction = 5;
    }
    if (e.keyCode == "76") {
      movement_direction = 6;
    }
    if (e.keyCode == "65") {
        rotate_direction = 1;
    }
    if (e.keyCode == "68") {
      rotate_direction = 2;
    }
    if (e.keyCode == "87") {
      movement_direction = 1;
    }
    if (e.keyCode == "38") {
        movement_direction = 1;
    }
    if (e.keyCode == "40") {
        movement_direction = 2;
    }
    if (e.keyCode == "83") {
      movement_direction = 2;
    }
    if (e.keyCode == "39") {
      rotate_direction = 2;
    }
    if (e.keyCode == "73") { // letter i
      z_building_location-=10;
      item_width = 10;
        item_height = 10;
        item_length = 10;
    }
    if (e.keyCode == "77") { // letter M
      z_building_location+=10;
      item_width = 10;
        item_height = 10;
        item_length = 10;
    }
    if (e.keyCode == "74") { // letter J
      x_building_location-=10;
      item_width = 10;
        item_height = 10;
        item_length = 10;
    }
    if (e.keyCode == "75") { // letter K
      x_building_location+=10;
      item_width = 10;
      item_height = 10;
      item_length = 10;
    }
    if (e.keyCode == "85") { // letter U
      y_building_location += 10;
      if (y_building_location > 400)
        y_building_location = 400;
    }
    if (e.keyCode == "89") { // letter U
      y_building_location -= 10;
      if (y_building_location <= 0)
        y_building_location = 0;
    }
    if (e.keyCode == "45") {
    }
    if (e.keyCode == "32" || e.keyCode == "16") {
        shoot_projectile = true;
    }
    if (e.keyCode == "48") { // zero key
      if (building_mode) {
        item_width = 10;
        item_height = 10;
        item_length = 10;
        addSceneryItem(item_width,item_height,item_length,0);
      }
    }
    if (e.keyCode == "49") { // key 1
      if (building_mode) {
        
        item_width += 10;
        if (item_width > 400)
          item_width = 400;
        addSceneryItem(item_width,item_height,item_length,item_texture);
      }
    }
    if (e.keyCode == "50") { // key 2
      if (building_mode) {
        
        item_length += 10;
        if (item_length > 400)
          item_length = 400;
        addSceneryItem(item_width,item_height,item_length,item_texture);
      }
    }
    if (e.keyCode == "51") { // key 3
      if (building_mode) {
        
        item_height += 10;
        if (item_height > 400)
          item_height = 400;
        addSceneryItem(item_width,item_height,item_length,item_texture);
      }
        
    }
    if (e.keyCode == "52") { // key 4
      if (building_mode) {
        
        item_texture++;
        if (item_texture>4)
          item_texture=1;
        addSceneryItem(item_width,item_height,item_length,item_texture);
      }
    }
    if (e.keyCode == "53") { // key 5
      if (building_mode) {
        characters_x.push(x_building_location);
        characters_y.push(0);
        characters_z.push(z_building_location);
        characters_texture.push(1);
        characters_health.push(3);
        characters_direction.push(0);
        characters_spin.push(0);
        characters_hurting_countdown.push(0);
        characters_active.push(false);
        characters_projectile_x.push(0);
        characters_projectile_y.push(0);
        characters_projectile_z.push(0);
        characters_projectile_active.push(false);
        characters_projectile_direction.push(0);
        characters_projectile_distance.push(0);

        outputGameParams();
      }
    }
    if (e.keyCode == "54") { // key 6
      if (building_mode) {
        characters_x.push(x_building_location);
        characters_y.push(0);
        characters_z.push(z_building_location);
        characters_texture.push(2);
        characters_health.push(5);
        characters_direction.push(0);
        characters_spin.push(0);
        characters_hurting_countdown.push(0);
        characters_active.push(false);
        characters_projectile_x.push(0);
        characters_projectile_y.push(0);
        characters_projectile_z.push(0);
        characters_projectile_active.push(false);
        characters_projectile_direction.push(0);
        characters_projectile_distance.push(0);

        outputGameParams();
      }
    }
    if (e.keyCode == "55") { // key 7
      if (building_mode) {
        characters_x.push(x_building_location);
        characters_y.push(0);
        characters_z.push(z_building_location);
        characters_texture.push(3);
        characters_health.push(20);
        characters_direction.push(0);
        characters_spin.push(0);
        characters_hurting_countdown.push(0);
        characters_active.push(false);
        characters_projectile_x.push(0);
        characters_projectile_y.push(0);
        characters_projectile_z.push(0);
        characters_projectile_active.push(false);
        characters_projectile_direction.push(0);
        characters_projectile_distance.push(0);

        outputGameParams();
      }
    }
    if (e.keyCode == "56") { // 8 key

      if (building_mode) {
        powerup_x.push(x_building_location);
        powerup_y.push(y_building_location);
        powerup_z.push(z_building_location);
        powerup_type.push(1);
        powerup_active.push(false);
        powerup_collected.push(false);

        outputGameParams();
      }
    }
    if (e.keyCode == "57") { // 9 key
      if (building_mode) {
        finish_x = x_building_location;
        finish_z = z_building_location;

        outputGameParams();
      }
    }
    if (e.keyCode == "66") { // B button
      if (building_mode) {
        building_mode = false;
        document.getElementById("mapbuilderoutput").style.visibility = "hidden";
      }
      else {
        building_mode = true;
        document.getElementById("mapbuilderoutput").style.visibility = "visible";
        outputGameParams();
      }
    }
    if (e.keyCode == "71") { // G button

      if (building_mode) {
        door_x.push(x_building_location);
        door_y.push(y_building_location);
        door_z.push(z_building_location);
        door_texture.push(1);
        door_opened.push(false);
        door_key.push(false);

        outputGameParams();
      }
    }
    if (e.keyCode == "70") { // F button to place the secret keys

      if (building_mode) {
        powerup_x.push(x_building_location);
        powerup_y.push(y_building_location);
        powerup_z.push(z_building_location);
        powerup_type.push(2);
        powerup_active.push(false);
        powerup_collected.push(false);

        outputGameParams();
      }
    }
  }
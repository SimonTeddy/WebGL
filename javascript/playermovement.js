/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacats

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

let player_speed = 1.0;
let acceleration = 0;
let player_rotation_speed = 0.01;
let rotation_acceleration = 0;
let camera_rotation_direction = 1;
let y_camera_angle = 0;
let rotate_direction = 3;
let movement_direction = 0;
let x_your_character = x_location;
let y_your_character = -100;
let z_your_character = z_location;
let y_location = -20;
let health = 500;

function ControlPlayerMovement() {

    if (movement_direction>0) {
      acceleration+=0.01;
      if (acceleration>1.5)
        acceleration=1.5;
    }
    else {
      acceleration-=0.1;
      if (acceleration<0)
        acceleration=0;
    }
    
    if (rotate_direction>0) {
      rotation_acceleration+=0.01;
      if (rotation_acceleration > 1.0)
        rotation_acceleration = 1.0;
    }
    else {
      rotation_acceleration-=0.2;
      if (rotation_acceleration<0)
        rotation_acceleration=0;
    }

    if (movement_direction == 2) {
    
        let camera_angle_in_radians = camera_angle * 0.0174532925;
        let x_probable = x_location;
        let z_probable = z_location;
    
        x_probable += Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
        z_probable -= Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
        if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false)
          x_location = x_probable;
            
        if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false)
          z_location = z_probable;
    }
    
    if (movement_direction == 1) {
    
        let camera_angle_in_radians = camera_angle * 0.0174532925;
        let x_probable = x_location;
        let z_probable = z_location;

        x_probable -= Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
        z_probable += Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
        if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false)
          x_location = x_probable;
            
        if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false)
          z_location = z_probable;
      
    } 

    if (movement_direction == 3) { // Move left ( straff )
    
        let camera_angle_in_radians = (camera_angle-90) * 0.0174532925;
        let x_probable = x_location;
        let z_probable = z_location;
    
        x_probable -= Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
        z_probable += Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
        if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false )
          x_location = x_probable;
            
        if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false )
          z_location = z_probable;

    } 

    if (movement_direction == 4) { // move right ( straff )
    
        let camera_angle_in_radians = (camera_angle + 90) * 0.0174532925;
        let x_probable = x_location;
        let z_probable = z_location;
    
        x_probable -= Math.sin( camera_angle_in_radians ) * (player_speed+acceleration);
        z_probable += Math.cos( camera_angle_in_radians ) * (player_speed+acceleration);
    
        if (CollisionDetection(x_probable*-1,(y_location+20)*-1,z_location*-1) == false )
          x_location = x_probable;
            
        if (CollisionDetection(x_location*-1,(y_location+20)*-1,z_probable*-1) == false )
          z_location = z_probable;

    } 

    
          
    if (rotate_direction == 1) {
      camera_angle-=(player_rotation_speed + rotation_acceleration);
      reversed_camera_angle +=(player_rotation_speed + rotation_acceleration);

      if (camera_angle < 0)
        camera_angle = 360;

      if (reversed_camera_angle > 360)
        reversed_camera_angle = 0;
    }
    else if (rotate_direction == 2) {
      camera_angle+=(player_rotation_speed + rotation_acceleration);
      reversed_camera_angle -=(player_rotation_speed + rotation_acceleration);
      if (camera_angle > 360)
        camera_angle = 0;

      if (reversed_camera_angle < 0)
        reversed_camera_angle = 360;
    }
      
    if (shoot_projectile) {
      if (how_much_ammo > 0 ) {
        how_much_ammo--;

        document.getElementById("shootAudio").play();

        weapon_spin+=weapon_deceleration;
        if (weapon_spin>360)
          weapon_spin=0

        weapon_deceleration+=10;
    
        // You only have a set number of projectiles and so check if any of them is unassigned
        for (let projectile = 0; projectile < your_projectile_x.length; projectile++) {
          if (your_projectile_active[projectile] == false &&
              projectile_collected_count > projectile ) {
              
              // Initialise projectile into its starting position and make it active
              let x_placement = x_location;
              let z_placement = z_location;
              let camera_angle_in_radians = camera_angle * 0.0174532925;
              your_projectile_x[projectile] = x_placement * -1;
              your_projectile_y[projectile] = (y_location+10) * -1;
              your_projectile_z[projectile] = z_placement * -1;
              your_projectile_angle[projectile] = camera_angle_in_radians; // it will then follow this tragectory
              your_projectile_active[projectile] = true;
              shoot_projectile = false;
              projectile_distance[projectile] = 0;
              break;
          }
        }
      }
    }
  }
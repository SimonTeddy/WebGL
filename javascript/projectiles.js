/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

let shoot_projectile = false;
let projectile_collected_count = 100;
let projectile_distance = [];
let your_projectile_x = [];
let your_projectile_y = [];
let your_projectile_z = [];
let your_projectile_active = [];
let your_projectile_angle = [];
let projectile_damage = 1;
let projectile_spin = 0;
let how_much_ammo = 500;
let magazine_size = 10;

function MoveProjectiles() {

  projectile_spin+=60;
  if (projectile_spin > 360)
    projectile_spin = 0;

  for (let projectile = 0; projectile < your_projectile_x.length; projectile++) { 

    if (your_projectile_active[projectile] && projectile_distance[projectile] <= 500) {

      your_projectile_x[projectile] += Math.sin( your_projectile_angle[projectile] ) * 20.0;
      your_projectile_z[projectile] -= Math.cos( your_projectile_angle[projectile] ) * 20.0;
      projectile_distance[projectile] += 20;

      for (let character_no = 0; character_no < characters_x.length; character_no++) {
        if (characters_health[character_no] > 0) {
          if (distanceBetweenPoints(your_projectile_x[projectile], characters_x[character_no],your_projectile_z[projectile], characters_z[character_no] ) < 50) {
            characters_health[character_no]-=projectile_damage;

            if (characters_health[character_no]<=0)
              characters_health[character_no] = 0; // i want to make sure this is exactly zero so that spinning can take that number down lower

            characters_direction[character_no] = your_projectile_angle[projectile];
            your_projectile_active[projectile] = false;
            score += 100;
            document.getElementById("score").value = score;
            document.getElementById("enemyDownAudio").play();
            break;
          }
        }
      }  
    }
    else if (projectile_distance[projectile] > 500)
      your_projectile_active[projectile] = false;
  }
}

function ResetProjectiles() {
  for (let i = 0; i < magazine_size; i++) {
    your_projectile_angle[i] = 0;
    projectile_distance[i] = 0;
    your_projectile_x[i] = 0;
    your_projectile_y[i] = 0;
    your_projectile_z[i] = 0;
    your_projectile_active[i] = false;
  }
}

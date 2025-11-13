/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

let weapon_spin = 0;
let weapon_deceleration = 0;
let difficulty_delay_powerup = 5;
let powerup_spin = 0;
let delay_til_next_powerup = difficulty_delay_powerup;
let damage = 0;
let powerup_requirement = 1; 
let powerup_count = 0;
let difficulty_delay = 10;

function LevelUp(id) {
  
  document.getElementById("levelupdiv").style.visibility = "hidden";
  
  powerup_count = 0;
  powerup_requirement++;
  
  for (let i = 0; i < powerup_x.length; i++) {
    powerup_active[i] = true;
    powerup_collected[i] = false;
  }

  if (id == "1") {
    projectile_damage = 1;
    alert("you bought the mega " + id)
    zombie_damage+=1;
    zombie_initial_health+=1;
  }
  else if (id == "2") {
    projectile_damage = 2;
    alert("you bought the mega " + id)
    zombie_damage+=1;
    zombie_initial_health+=2;
  }
  else {
    projectile_damage = 3;
    alert("you bought the mega " + id)
    zombie_damage+=1;
    zombie_initial_health+=3;
  }

  zombie_object.ResetZombies();
  
  phase_of_game = "game";
}


function ControlPowerups() {
  // Check if the player has picked up any of the active powerups
  powerup_spin++;
  if (powerup_spin > 360)
    powerup_spin = 0;

  for (let i = 0; i < powerup_x.length; i++) {
    if (powerup_active[i] && powerup_collected[i] == false ) {
      if (x_location*-1 > powerup_x[i] - 40 && x_location*-1 < powerup_x[i] + 40 &&
          z_location*-1 > powerup_z[i] - 40 && z_location*-1 < powerup_z[i] + 40 ) {
            powerup_collected[i] = true;
            health+=150;
            how_much_ammo+=200;
            powerup_active[i] = false;   
                
            document.getElementById("powerupAudio").play();   
            powerup_count++;    
      }
    }
  }
} 
  
function DropPowerups() {
  
  if (phase_of_game == "game" ) {
  
    if (delay_til_next_powerup > 0) {
      delay_til_next_powerup--;
    }
    else {
      for (let powerup_no = 0; powerup_no < powerup_x.length; powerup_no++) {
        if (powerup_active[powerup_no] == false ) {
          powerup_active[powerup_no] = true;
          delay_til_next_powerup = difficulty_delay_powerup;    
          break;
        }
      }
    }
  }
}
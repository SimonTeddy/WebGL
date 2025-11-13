/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacats

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/


let character_active_range = 10000;
let character_damage = 1;


function AnyCharactersLeftAlive() {
    let how_many_characters_alive = 0;
    for (var character_no = 0; character_no < characters_x.length; character_no++) {
        if (characters_health[character_no] > 0)
            how_many_characters_alive++;
    }    
    return how_many_characters_alive;
}


function MoveCharacter(character_no,angle_to_move_in) {
        
    var character_speed = 0.5;

    let proposed_x = characters_x[character_no];
    proposed_x -= Math.cos( angle_to_move_in ) * ((characters_texture[character_no])*character_speed);
    let proposed_z = characters_z[character_no];
    proposed_z += Math.sin( angle_to_move_in ) * ((characters_texture[character_no])*character_speed);

    // collision detection
    if (CollisionDetection(proposed_x,characters_y[character_no],proposed_z) == false ) { 

        // check the sprite doesn't get too close to the player ( so we can see them properly )
        if ( distanceBetweenPoints(x_location*-1,proposed_x,z_location*-1,proposed_z) > 50 ) {
            characters_x[character_no] = proposed_x;
            characters_z[character_no] = proposed_z;
        }
        else {       
            AdjustPlayerHealth(character_damage);
            characters_hurting_countdown[character_no] = 50; // stop Character doing too much damage too fast                    proposed_x = characters_x[character_no];
            proposed_x -= Math.cos( angle_to_move_in - 180) * (2);
            proposed_z = characters_z[character_no];
            proposed_z += Math.sin( angle_to_move_in -180 ) * (2);
            characters_x[character_no] = proposed_x;
            characters_z[character_no] = proposed_z;
            
        }
    }
}

function ActivateProjectile(character_no,angle_of_projectile) {
        characters_projectile_x[character_no] = characters_x[character_no];
        characters_projectile_y[character_no] = characters_y[character_no];
        characters_projectile_z[character_no] = characters_z[character_no];
        characters_projectile_active[character_no] = true;
        characters_projectile_distance[character_no] = 0;

        var angle_of_projectile = characters_direction[character_no] + 90;
        if (angle_of_projectile > 360)
            angle_of_projectile -= 360;
        characters_projectile_direction[character_no] = angle_of_projectile * 0.0174532925;               
    }

function SpinCharacters(character_no) {
        characters_spin[character_no]-=5;
        if (characters_spin[character_no] < 0)
            characters_spin[character_no] = 360;

        characters_active[character_no] = false;
        characters_x[character_no] += Math.sin( characters_direction[character_no] ) * 3;
        characters_z[character_no] -= Math.cos( characters_direction[character_no] ) * 3;
        characters_spin_distance[character_no]++;

        if (characters_spin_distance[character_no]>100 && 
            characters_lives[character_no]>0) {
            CharacterAfterSpin(character_no);
        }
    }

    function CharacterAfterSpin(character_no) {
        // Pause for a while before reseting the Character
        characters_lives[character_no]--;
        //CharacterInitialPositionAfterInjury(character_no);
        //characters_active[character_no] = true;
        //characters_health[character_no] = 1;
    }

    function MoveCharacterProjectile(character_no) {
        var proposed_projectile_x = characters_projectile_x[character_no];
        var proposed_projectile_z = characters_projectile_z[character_no];
        proposed_projectile_x -= Math.cos( characters_projectile_direction[character_no]) * 5;
        proposed_projectile_z += Math.sin( characters_projectile_direction[character_no]) * 5;
                  
        characters_projectile_distance[character_no]+=1;
        characters_projectile_x[character_no] = proposed_projectile_x;
        characters_projectile_z[character_no] = proposed_projectile_z; 

        // determine if hits player ( injure player if necessary and deactivate)
        if ( distanceBetweenPoints(x_location*-1,characters_projectile_x[character_no],z_location*-1,characters_projectile_z[character_no]) < 30 ) {
            characters_projectile_active[character_no] = false;
            AdjustPlayerHealth(character_damage);
        } 

        if (characters_projectile_distance[character_no] > 400) {
            characters_projectile_active[character_no] = false;
        }
    }

    function ControlCharacters(phase_of_game) {
  
        if (phase_of_game == "game" ) {
  
            for (var character_no = 0; character_no < characters_x.length; character_no++) {

                var angle_to_move_in = AngleToTarget(characters_x[character_no], characters_z[character_no], x_location*-1, z_location*-1);

                characters_direction[character_no] = angle_to_move_in - 180;
                if (characters_direction[character_no]<0)
                    characters_direction[character_no] = 360 + characters_direction[character_no];

                if ( building_mode == false ) {

                    if (characters_health[character_no] > 0 ) {
                
                        if ( distanceBetweenPoints(x_location*-1,characters_x[character_no],z_location*-1,characters_z[character_no]) <= character_active_range ) {
                            characters_active[character_no] = true;
                        }
                        else {
                            characters_active[character_no] = false;
                        }

                        if (characters_active[character_no]) {
       
                            // Small Characters
                            characters_spin[character_no] = 0;
                            if (characters_hurting_countdown[character_no] <= 0 && 
                                characters_texture[character_no] < 3) { 
                                MoveCharacter(character_no,angle_to_move_in);
                            }
              
                            // tall shooting Characters
                            if (characters_texture[character_no] >= 3 && characters_active[character_no]) {
                                if (characters_projectile_active[character_no] == false) {
                                    ActivateProjectile(character_no,angle_to_move_in);
                                }
                                else {
                                    CharacterProjectile(character_no);
                                }
                            }
              
                            if (characters_hurting_countdown[character_no] > 0)
                                characters_hurting_countdown[character_no]--;
                        }
                    }
                    else {
                        // Health hits zero
                        SpinCharacters(character_no);
                    }
                }
            }    
        }
    }



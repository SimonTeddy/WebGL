/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

function ControlDoor() {
    
  for (let d = 0; d < door_x.length; d++) {
    
    let distance = distanceBetweenPoints(x_location*-1, door_x[d], z_location*-1, door_z[d] );
      
    if (distance < 200) { //near enough to activate
      door_y[d] = (200 - distance) / 4; // cheap way to get an animated effect of a door opening !
    }  
  }
}

function AreYouOrSpriteStandingOnACube() {

  for (let sprite_no = 0; sprite_no < characters_x.length; sprite_no++) {

    characters_y[sprite_no] = 0;

    for (cube in cube_location) {

      let first_corner = cube.split(",");
      let cube_x = Number(first_corner[0]);
      let cube_y = Number(first_corner[1]);
      let cube_z = Number(first_corner[2]);
      let options = cube_location[cube].split(",");
      let width = Number(options[0]);
      let height = Number(options[1]);
      let length = Number(options[2]);
      let texture = Number(options[3]);

      if ( characters_x[sprite_no] >= cube_x - 10 && characters_x[sprite_no] <= cube_x + width + 10 &&
        characters_z[sprite_no] >= cube_z - 10 && characters_z[sprite_no] <= cube_z + length + 10 && texture == 4) {
        characters_y[sprite_no] = (height);
      }
    }
  }

  // Confusingly the player coordinates are inverted from the scenery because of the way movement is achieved
  let your_x = x_location * -1;
  let your_z = z_location * -1;
  y_location = -20;

  for (cube in cube_location) {

    let first_corner = cube.split(",");
    let cube_x = Number(first_corner[0]);
    let cube_y = Number(first_corner[1]);
    let cube_z = Number(first_corner[2]);
    let options = cube_location[cube].split(",");
    let width = Number(options[0]);
    let height = Number(options[1]);
    let length = Number(options[2]);
    let texture = Number(options[3]);

    if ( your_x >= cube_x - 10 && your_x <= cube_x + width + 10 &&
      your_z >= cube_z - 10 && your_z <= cube_z + length + 10 &&
      //y >= cube_y - 5 && y <= cube_y + height + 5 &&
      texture == 4) {
        y_location = (height + 20) * -1;
      }            
    }
  }
  
  function CollisionDetection(x,y,z) {

    // First check against leaving the game area
    if (x >= 20 && x < 1480 && z >= 20 && z <= 1480) {
  
      // Now check against each cube
      for (cube in cube_location) {

        let first_corner = cube.split(",");
        let cube_x = Number(first_corner[0]);
        let cube_y = Number(first_corner[1]);
        let cube_z = Number(first_corner[2]);
        let options = cube_location[cube].split(",");
        let width = Number(options[0]);
        let height = Number(options[1]);
        let length = Number(options[2]);
        let texture = Number(options[3]);

        if ( x >= cube_x - 10 && x <= cube_x + width + 10 &&
             z >= cube_z - 10 && z <= cube_z + length + 10 &&
             y >= cube_y - 5 && y <= cube_y + height + 5 &&
             texture > 0 && texture < 4) {
          return true
        }            
      }
    }
    else {
      return true;
    }
    return false;
  }
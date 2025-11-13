/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

var building_mode = false;
var x_building_location = 800;
var y_building_location = 0;
var z_building_location = 800;

function outputGameParams() {
    document.getElementById("game_params").value = "var characters_x = [" + characters_x + "];\n";
    document.getElementById("game_params").value += "var characters_y = [" + characters_y + "];\n";
    document.getElementById("game_params").value += "var characters_z = [" + characters_z + "];\n";
    document.getElementById("game_params").value += "var characters_texture = [" + characters_texture + "];\n";
    document.getElementById("game_params").value += "var characters_health = [" + characters_health + "];\n";
    document.getElementById("game_params").value += "var characters_direction = [" + characters_direction + "];\n";
    document.getElementById("game_params").value += "var characters_spin = [" + characters_spin + "];\n";
    document.getElementById("game_params").value += "var characters_hurting_countdown = [" + characters_hurting_countdown + "];\n";
    document.getElementById("game_params").value += "var characters_active = [" + characters_active + "];\n";
    document.getElementById("game_params").value += "var characters_projectile_x = [" + characters_projectile_x + "];\n";
    document.getElementById("game_params").value += "var characters_projectile_y = [" + characters_projectile_y + "];\n";
    document.getElementById("game_params").value += "var characters_projectile_z = [" + characters_projectile_z + "];\n";
    document.getElementById("game_params").value += "var characters_projectile_active = [" + characters_projectile_active + "];\n";
    document.getElementById("game_params").value += "var characters_projectile_direction = [" + characters_projectile_direction + "];\n";
    document.getElementById("game_params").value += "var characters_projectile_distance = [" + characters_projectile_distance + "];\n";

    document.getElementById("game_params").value += "var powerup_x = [" + powerup_x + "];";
    document.getElementById("game_params").value += "var powerup_y = [" + powerup_y + "];";
    document.getElementById("game_params").value += "var powerup_z = [" + powerup_z + "];";
    document.getElementById("game_params").value += "var powerup_type = [" + powerup_type + "];";
    document.getElementById("game_params").value += "var powerup_active = [" + powerup_active + "];";
    document.getElementById("game_params").value += "var powerup_collected = [" + powerup_collected + "];";

    document.getElementById("game_params").value += "var door_x = [" + door_x + "];";
    document.getElementById("game_params").value += "var door_y = [" + door_y + "];";
    document.getElementById("game_params").value += "var door_z = [" + door_z + "];";
    document.getElementById("game_params").value += "var door_texture = [" + door_texture + "];";
    document.getElementById("game_params").value += "var door_opened = [" + door_opened + "];";
    document.getElementById("game_params").value += "var door_key = [" + door_key + "];";

    document.getElementById("game_params").value += "var finish_x = " + finish_x + ";";
    document.getElementById("game_params").value += "var finish_z = " + finish_z + ";";

    output_list = "";
    for (c in cube_location) {
      output_list += '"' + c + '" : "' + cube_location[c] + '",';
    }
    document.getElementById("cube_location").value = "var cube_location = {" + output_list + "};";
  }

  function addSceneryItem(width,height,length,texture) {

    cube_location[x_building_location + "," + y_building_location + "," + z_building_location] = width + "," + height + "," + length + "," + texture;

    generateVerteces();

    outputGameParams();
    
    initBuffers();
  }
  
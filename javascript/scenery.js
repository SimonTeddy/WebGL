/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/


function DrawBuildingCursor() {
  DrawModel(x_building_location, y_building_location, z_building_location, 0, "sprite", 0, 0);
}

function DrawCharacters() {

  count_visible_sprites = 0;

  for (var character_no = 0; character_no < characters_x.length; character_no++) { 

    if (characters_health[character_no] > -200 ) {

      count_visible_sprites++;

      if (characters_texture[character_no] < 3) {

	      DrawModel(characters_x[character_no],
                 characters_y[character_no], 
                 characters_z[character_no],
                 characters_texture[character_no],
                 "sprite",
                 characters_direction[character_no],
                 characters_spin[character_no]);
      }
      else {
        DrawModel(characters_x[character_no],
          characters_y[character_no], 
          characters_z[character_no],
          characters_texture[character_no],
          "sprite_tall",
          characters_direction[character_no],
          characters_spin[character_no]);
      }
    }
  }
}

function DrawWeapon() {

  mvPushMatrix();
  mvRotate(reversed_camera_angle, [0, 1, 0]);
  DrawModel(0,-10,50,0,"weapon",0,0);
  mvPopMatrix();
}

function DrawProjectiles() {

  for (var your_projectile_count = 0; your_projectile_count <= your_projectile_x.length; your_projectile_count++ ) {
    if (your_projectile_active[your_projectile_count]) {
      DrawModel(your_projectile_x[your_projectile_count],
        your_projectile_y[your_projectile_count],
        your_projectile_z[your_projectile_count],
        0,
        "projectile",0,0);
    }
  }

  // Sprite projectiles
  for (var sprite_no = 0; sprite_no < characters_x.length; sprite_no++) {
    if (characters_texture[sprite_no] >= 3 && characters_active[sprite_no] && characters_health[sprite_no] > 0) {
      DrawModel(
          characters_projectile_x[sprite_no],
          characters_projectile_y[sprite_no] + 20,
          characters_projectile_z[sprite_no],
          0,
          "projectile",
          0,
          0);
    }
  }
}

function DrawPowerups() {

  for (var powerup_count = 0; powerup_count < powerup_x.length; powerup_count++ ) {
    if (powerup_active[powerup_count] && powerup_collected[powerup_count] == false) {
      var powerup_model = "powerup";
      if (powerup_type[powerup_count] == 2)
        powerup_model = "key";
      DrawModel(powerup_x[powerup_count],powerup_y[powerup_count],
              powerup_z[powerup_count],
              0,
              powerup_model,0,0);
    }
  }
}

function DrawDoors() {

  for (var door = 0; door < door_x.length; door++ ) {
      DrawModel(door_x[door],door_y[door],door_z[door],
        0,
        "door",0,0);
  }
}

function DrawStartAndEnd() {

  DrawModel(finish_x,20,finish_z, 0,"powerup",0,0);

  //if (a_previous_level)
  //  DrawModel(previous_level_x,20,previous_level_z,0,"powerup",0,0);
}

function DrawScenery() {

  mvPushMatrix();
  
  var x = 0;
  var z = 0;
  
  mvTranslate([x,0,z]);

  gl.bindBuffer(gl.ARRAY_BUFFER, sceneryVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[5]); // was cubeTexture
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, sceneryVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sceneryVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 30 * num_cubes, gl.UNSIGNED_SHORT, 0);

  mvPopMatrix();
}

function DisplayFloorCeiling() {

  mvPushMatrix();
  
  mvTranslate([0,0,0]);

  gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[6]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, floorVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, floorVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[6]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
 
  if (ceiling_required) {
    gl.bindBuffer(gl.ARRAY_BUFFER, ceilingVerticesTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, game_texture[5]);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ceilingVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ceilingVerticesIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, 18, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, ceilingVerticesTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, game_texture[5]);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, boundaryVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[12]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, boundaryVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boundaryVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 24, gl.UNSIGNED_SHORT, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, boundaryVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, game_texture[12]);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  mvPopMatrix();
}

function DrawModel(x,y,z,texture_num,model_type,direction,spin) { 

  mvPushMatrix();
  mvTranslate([x, y, z]);

  if (model_type == "sprite") {
    mvRotate(direction, [0, 1, 0]);
    mvRotate(spin, [1, 0, 0]);
  }

  if (model_type == "sprite_tall") {
    mvRotate(direction, [0, 1, 0]);
    mvRotate(spin, [1, 0, 0]);
  }

  if (model_type == "projectile") { // make projectile spin
    mvRotate(projectile_spin,[0,1,0]);
  }

  if (model_type == "weapon") {
    mvRotate(weapon_spin,[0,0,1]);
  }

  if (model_type == "powerup" || model_type == "key") { // make powerup look more fun
    mvRotate(powerup_spin,[0,1,0]);
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, spriteVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);

  if (model_type == "powerup")
    gl.bindTexture(gl.TEXTURE_2D, game_texture[7]);
  else if (model_type == "weapon")
    gl.bindTexture(gl.TEXTURE_2D, game_texture[14]);
  else if (model_type == "key")
    gl.bindTexture(gl.TEXTURE_2D, game_texture[8]);
  else if (model_type == "projectile")
    gl.bindTexture(gl.TEXTURE_2D, game_texture[9]);
  else if (model_type == "door")
    gl.bindTexture(gl.TEXTURE_2D, game_texture[10]);
  else
    gl.bindTexture(gl.TEXTURE_2D, game_texture[1]);

  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

  if (model_type == "sprite")
    gl.bindBuffer(gl.ARRAY_BUFFER, spriteVerticesBuffer);
  else if (model_type == "sprite_tall")
    gl.bindBuffer(gl.ARRAY_BUFFER, spriteTallVerticesBuffer);
  else if (model_type == "powerup" || model_type == "key")
    gl.bindBuffer(gl.ARRAY_BUFFER, powerupVerticesBuffer);
  else if (model_type == "weapon")
    gl.bindBuffer(gl.ARRAY_BUFFER, weaponVerticesBuffer);
  else if (model_type == "door")
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVerticesBuffer);
  else if (model_type == "projectile")
    gl.bindBuffer(gl.ARRAY_BUFFER, projectileVerticesBuffer);

  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, spriteVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_SHORT, 0);
 
  mvPopMatrix();
}

function DrawMessage(id) { 

  mvPushMatrix();
  mvTranslate([0, -10, 50]);
  gl.bindBuffer(gl.ARRAY_BUFFER, spriteVerticesTextureCoordBuffer);
  gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, powerupTexture);
  gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, powerupVerticesBuffer);
  gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, spriteVerticesIndexBuffer);
  setMatrixUniforms();
  gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_SHORT, 0);
  mvPopMatrix();
}
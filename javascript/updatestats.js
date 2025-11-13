/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacatz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

let level_just_loaded = true;

function UpdateStats() {

  if (level_just_loaded) {
    var url = new URL(location.href);
    var health_param = url.searchParams.get("health");
    var ammo_param = url.searchParams.get("ammo");
    document.getElementById("health").value = health_param;
    document.getElementById("ammo").value = ammo_param;
    level_just_loaded = false;
    if (! health_param)
      health_param = 500;
    if (! ammo_param)
      ammo_param = 200;
    health = health_param;
    how_much_ammo = ammo_param;
  }
  
  document.getElementById("health").value = health;
  document.getElementById("ammo").value = how_much_ammo;
}

function AdjustPlayerHealth(damage) {
    health-=damage;
    document.getElementById("gnawAudio").play();
    if (health<=0) {
      window.location.href = "gameover.html";
    }
}

function IsLevelComplete() {
    if (AnyCharactersLeftAlive() == 0) {
      window.location.href = "levelcomplete.html";
    }
}


function GameOver(which_ending) {}
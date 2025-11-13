/*

License

(The MIT License)

Copyright (c) 2015-2025 Simon Andacats

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

*/

let sprite_vertices = [

    // Front face
    -6, 0,  1,
     6, 0,  1,
     6,  34,  1,
    -6,  34,  1,
    // Back face
    -6, 0, -1,
    -6,  34, -1,
     6,  34, -1,
     6, -0, -1,
    // Right face
     6, 0, -1,
     6,  34, -1,
     6,  34,  1,
     6, 0,  1,
    // Left face
    -6, 0, -1,
    -6, 0,  1,
    -6,  34,  1,
    -6,  34, -1,
    // Top face
    -6, 34, -1,
    6, 34, -1,
    6, 34,  1,
    -6, 34,  1,
];

let sprite_tall_vertices = [

    // Front face
    -10, 0,  1,
     10, 0,  1,
     10,  50,  1,
    -10,  50,  1,
    // Back face
    -10, 0, -1,
    -10,  50, -1,
     10,  50, -1,
     10, -0, -1,
    // Right face
     10, 0, -1,
     10,  50, -1,
     10,  50,  1,
     10, 0,  1,
    // Left face
    -10, 0, -1,
    -10, 0,  1,
    -10,  50,  1,
    -10,  50, -1,
    // Top face
    -10, 50, -1,
    10, 50, -1,
    10, 50,  1,
    -10, 50,  1,
];

let door_vertices = [

    // Front face
    -40, 0,  2,
     40, 0,  2,
     40,  100,  2,
    -40,  100,  2,
    // Back face
    -40, 0,  -2,
    -40,  100,-2,
     40,  100,-2,
     40, -0, -2,
    // Right face
     40, 0, -2,
     40,  100, -2,
     40,  100,  2,
     40, 0,  2,
    // Left face
    -40, 0, -2,
    -40, 0,  2,
    -40,  100,  2,
    -40,  100, -2,
    // Top face
    -40, 100, -2,
    40, 100, -2,
    40, 100,  2,
    -40, 100,  2,
];


let projectile_vertices = [

    // Front face
    -3, -1.0,  3,
    3, -1.0,  3,
    3,  1.0,  3,
    -3,  1.0,  3,
    // Back face
    -3, -1.0, -3,
    -3,  1.0, -3,
    3,  1.0, -3,
    3, -1.0, -3,
    // Right face
    3, -1.0, -3,
    3,  1.0, -3,
    3,  1.0,  3,
    3, -1.0,  3,
    // Left face
    -3, -1.0, -3,
    -3, -1.0,  3,
    -3,  1.0,  3,
    -3,  1.0, -3,
    // Top face
    -3, 1.0, -3,
    3, 1.0, -3,
    3, 1.0,  3,
    -3, 1.0,  3     
];

let powerup_vertices = [

    // Front face
    -4, -2,  4,
    4, -2,  4,
    4,  30,  4,
   -4,  30,  4,
   // Back face
   -4, -2, -4,
   -4,  30, -4,
    4,  30, -4,
    4, -2, -4,
   // Right face
    4, -2, -4,
    4,  30, -4,
    4,  30,  4,
    4, -2,  4,
   // Left face
   -4, -2, -4,
   -4, -2,  4,
   -4,  30,  4,
   -4,  30, -4,
   // Top face
   -4, 30, -4,
   4, 30, -4,
   4, 30,  4,
   -4, 30,  4
];

let weapon_vertices = [

    // Front face
    -3, -2, -10,
    3, -2,  -10,
    3,  3,  -10,
   -3,  3,  -10,
   // Back face
   -3, -2, -30,
   -3,  3, -30,
    3,  3, -30,
    3, -2, -30,
   // Right face
    3, -2, -30,
    3,  3, -30,
    3,  3,  -10,
    3, -2,  -10,
   // Left face
   -3, -2, -30,
   -3, -2,  -10,
   -3,  3,  -10,
   -3,  3, -30,
   // Top face
   -3, 3, -30,
   3, 3, -30,
   3, 3,  -10,
   -3, 3, -10
];
 
let sprite_texture_coordinates = [

    0.0,  1.0,
    0.5,  1.0,
    0.5,  0.0,
    0.0,  0.0,
    
    0.5,  1.0,
    0.5,  0.0,
    1.0,  0.0,
    1.0,  1.0,
	
    0.5,  1.0,
    0.5,  0.0,
    1.0,  0.0,
    1.0,  1.0,
	
    0.5,  1.0,
    1.0,  1.0,
    1.0,  0.0,
    0.5,  0.0,
	
    0.0,  0.0,
    0.1,  0.0,
    0.1,  0.1,
    0.0,  0.1,

    /*0,1,
    1,1,
    1,0,
    0,0,

    0,1,
    1,1,
    1,0,
    0,0,

    0,1,
    1,1,
    1,0,
    0,0,

    0,1,
    1,1,
    1,0,
    0,0,

    0,1,
    1,1,
    1,0,
    0,0,*/
 ];
 
 let sprite_vertex_indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,    // left
];

let floor_vertices = [
    0, 0, 0,
    1500, 0, 0,
    1500, 0, 1500,
    0, 0,  1500,
];

let ceiling_vertices = [

    // first part of floor
    0, 60, 0,
    600, 60, 0,
    600, 60, 400,
    0, 60,  400,

    // second part of floor
    0,60,401,
    600,60,401,
    600,60,800,
    0,60,800,

    // third part of floor
    0,60,801,
    600,60,801,
    600,60,1200,
    0,60,1200,
    ];


let ceiling_vertex_indices = [
    0,  1,  2,      
    0,  2,  3,  

    4,5,6,
    4,6,7,

    8,9,10,
    8,10,11,
];

let ceiling_texture_coordinates = [
	0.0,  0.0,
    0.5,  0.0,
    0.5,  0.5,
    0.0,  0.5,

    0.5,  0.0,
    1.0,  0.0,
    1.0,  0.5,
    0.5,  0.5,

    0.0,  0.5,
    0.5,  0.5,
    0.5,  1.0,
    0.0,  1.0,

 ];
	
let floor_vertex_indices = [
    0,  1,  2,      
    0,  2,  3, 
];
	
let floor_texture_coordinates = [
	0.0,  0.0,
    12,  0.0,
    12,  12,
    0.0,  12,
 ];


 let boundary_vertices = [

    // Front face
    0, 0,  1500,
    0, 1000,  1500,
    1500,  1000,  1500,
    1500,  0,  1500,
    // Back face
    0, 0,  0,
    0, 1000,  0,
    1500,  1000,  0,
    1500,  0,  0,
    // Right face
     0, 0, 0,
     0,  1000, 0,
     0,  1000, 1500,
     0, 0,  1500,
    // Left face
     1500, 0, 0,
     1500,  1000, 0,
     1500,  1000, 1500,
     1500, 0,  1500,
    // Top face
    0, 100, 0,
     1500, 1000, 0,
     1500, 1000, 1500,
    0, 100,  1500,
 ];

 let boundary_texture_coordinates = [
	0.0,  1.0,
    0,  0,
    2,  0,
    2,  1,

	0.0,  1.0,
    0,  0,
    2,  0,
    2,  1,

	0.0,  1.0,
    0,  0,
    2,  0,
    2,  1,

	0.0,  1.0,
    0,  0,
    2,  0,
    2,  1,

	0.0,  1.0,
    0,  0,
    2,  0,
    2,  1,
 ];

 let boundary_vertex_indices = [
    0,  1,  2,      0,  2,  3,    
    4,  5,  6,      4,  6,  7,    
    8,  9,  10,     8,  10, 11,   
    12, 13, 14,     12, 14, 15,   
    16, 17, 18,     16, 18, 19,   
    20, 21, 22,     20, 22, 23,    
];
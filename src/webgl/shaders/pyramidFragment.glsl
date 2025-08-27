// #define PI 3.1415926535897932384626433832795

uniform samplerCube tCube;
uniform float uGreenShift;
uniform float uBlueShift;

varying vec3 vRefract[3];

void main() {

	vec4 color = vec4(1.0);

	color.r = textureCube(tCube, vec3(-vRefract[0].x, vRefract[0].yz)).r;
	color.g = textureCube(tCube, vec3(-vRefract[1].x, vRefract[1].yz)).g;
	color.b = textureCube(tCube, vec3(-vRefract[2].x, vRefract[2].yz)).b;

	// Warping Shift
	color.g *= uGreenShift;
	color.b *= uBlueShift;

	// Brightness (1.2) & Contrast (-0.1)
	color.rgb = (color.rgb) * 1.2 + vec3(-0.1);

	gl_FragColor = color;

}
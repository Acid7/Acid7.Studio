// #pragma glslify: pnoise = require(glsl-noise/periodic/3d)
// #define PI 3.1415926535897932384626433832795

uniform float uMouseX;
uniform float uMouseY;

varying vec3 vRefract[3];

void main() {

	float refractionRatio = 0.6;

	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

	vec3 eyeVector = normalize(modelPosition.xyz - cameraPosition);
	vec3 worldNormal = normalize(mat3(modelMatrix) * normal);

	vRefract[0] = refract(eyeVector, worldNormal, refractionRatio);
	vRefract[1] = refract(eyeVector, worldNormal, refractionRatio * uMouseX);
	vRefract[2] = refract(eyeVector, worldNormal, refractionRatio * uMouseY);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}

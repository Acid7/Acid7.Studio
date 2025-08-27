
varying vec3 vWorldNormal;

void main() {

	vWorldNormal = normalize(modelMatrix * vec4(position, 0.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
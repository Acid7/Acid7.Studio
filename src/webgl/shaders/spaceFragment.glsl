
uniform samplerCube tCube;
uniform float uWarp;

varying vec3 vWorldNormal;

void main() {

    vec4 envColor = vec4(1.0);

    // RGB Distortion
    float waveX = sin(vWorldNormal.x * uWarp * 10.);
    float waveY = sin(vWorldNormal.y * uWarp * 10.);
    vec2 d = vec2(waveX, waveY);

    // CubeMap Texture
    envColor.r = textureCube(tCube, vec3(-1.0 * vWorldNormal.x - d.x * 10., vWorldNormal.y, vWorldNormal.z)).r;
    envColor.g = textureCube(tCube, vec3(-1.0 * vWorldNormal.x + d.x, vWorldNormal.y - d.y / 2., vWorldNormal.z)).g;
    envColor.b = textureCube(tCube, vec3(-1.0 * vWorldNormal.x - d.x, vWorldNormal.y + d.y, vWorldNormal.z)).b;

    // Brightness (0.7) & Contrast (-0.1)
    envColor.rgb = (envColor.rgb) * 0.7 + vec3(-0.1);

	gl_FragColor = envColor;

}
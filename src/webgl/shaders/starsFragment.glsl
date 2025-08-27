
uniform float uTime;

varying vec2 vPosition;

mat2 Rotation(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

void main() {

    vec3 color = vec3(0.0);
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

    // Glow
    float strength = 0.05 / distanceToCenter - 0.05 * 2.0;
    strength *= sin((uTime * 0.85 + vPosition.x) * 2.5) * 0.5 + 1.0;
    color += strength;

    // Rays
    vec2 uv = gl_PointCoord - 0.5;
    vec3 rays = 1. - vec3(abs(uv.x * uv.y * 1000.0));
    rays = max(vec3(0.0), rays);
    color += rays;

    // Rotated rays
    uv *= Rotation(3.1415 / 4.0);
    rays = 0.25 - vec3(abs(uv.x * uv.y * 1000.0));
    rays = max(vec3(0.0), rays);
    color += rays;

    gl_FragColor = vec4(color, strength);

}
import * as THREE from 'three'
import Events from 'events'

// Events

export const events = new Events()
events.setMaxListeners(Infinity)

// Viewport

class Viewport {
	constructor() {
		window.addEventListener('resize', () => { this.resize() })
		this.resize()
	}

	resize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
		events.emit('resize')
	}
}

// Time

class Clock {
	constructor() {
		const clock = new THREE.Clock()
		return clock
	}
}

export const viewport = new Viewport()
export const clock = new Clock()

import * as THREE from 'three'

import { events } from '@/webgl/utils/Events'
import audioFile from '@/assets/audio.mp3'
import { introTextIn, introTextOut } from '@/webgl/world/Animations'

export default class Audio {
	constructor(scene) {
		this.space = scene.space
		this.pyramid = scene.pyramid
		this.stars = scene.stars
	}

	init() {
		document.body.classList.add('audio-loading')
		document.getElementById('audio').innerHTML = "Transmitting..."
		const listener = new THREE.AudioListener()
		const audioLoader = new THREE.AudioLoader()
		this.audio = new THREE.Audio(listener)

		audioLoader.load(audioFile, (buffer) => {
			document.body.classList.remove('audio-loading')
			this.audio.setBuffer(buffer)
			this.play()
		})
	}

	play() {

		// Animation

		introTextOut()

		// Analyze Audio

		const audioData = {
			lowFreq: 0,
			analyser: new THREE.AudioAnalyser(this.audio, 128),
		}

		// Play Audio

		setTimeout(() => {
			this.audio.play()
			document.body.classList.add('audio-playing')
		}, 1000)

		// End Audio

		this.audio.onEnded = () => {
			this.audio.stop()
			document.body.classList.remove('audio-playing')
			document.getElementById('audio').innerHTML = "Open Channel"
			setTimeout(() => {
				introTextIn(0)
			}, 1000)
		}


		// Update uniforms

		const lerp = THREE.MathUtils.lerp
		this.spaceUniforms = this.space.mesh.material.uniforms
		this.pyramidUniforms = this.pyramid.mesh.material.uniforms

		events.on('tick', () => {

			const audioTime = (this.audio.context.currentTime - this.audio._startedAt)

			// Space

			if (this.audio.isPlaying && audioTime < 34) {
				const frequencyData = audioData.analyser.getFrequencyData()
				audioData.lowFreq = this.getAverageValue(frequencyData.slice(0, 21))
				audioData.lowFreq = audioData.lowFreq / 255 / 20
			} else {
				audioData.lowFreq = lerp(audioData.lowFreq, 0, 0.03)
			}
			this.spaceUniforms.uWarp.value = lerp(this.spaceUniforms.uWarp.value, audioData.lowFreq, 0.5)

			// Stars

			if (this.audio.isPlaying && audioTime > 14.5) {
				this.stars.mesh.position.z = ((audioTime * 0.5) - (14.5 * 0.5))
			} else {
				this.stars.mesh.position.z = lerp(this.stars.mesh.position.z, 0, 0.03)
			}

			// Pyramid

			if (this.audio.isPlaying && audioTime > 7.9) {
				this.pyramidUniforms.uGreenShift.value = lerp(
					this.pyramidUniforms.uGreenShift.value,
					Math.sin(1 / 500) / 2 + 2,
					0.03
				)
				this.pyramidUniforms.uBlueShift.value = lerp(
					this.pyramidUniforms.uBlueShift.value,
					Math.sin(1 / 500) / 4 + 0.7,
					0.03
				)
			} else {
				this.pyramidUniforms.uGreenShift.value = lerp(this.pyramidUniforms.uGreenShift.value, 1, 0.03)
				this.pyramidUniforms.uBlueShift.value = lerp(this.pyramidUniforms.uBlueShift.value, 1, 0.03)
			}

		})

	}

	// Get Average Value

	getAverageValue(array) {
		return array.reduce((a, b) => a + b, 0) / array.length
	}

}

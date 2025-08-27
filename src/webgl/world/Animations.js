import anime from 'animejs'
import Splitting from 'splitting'

// Intro Pyramid

const introPyramid = (delay) => {
	anime({
		delay: delay,
		targets: window._acid7.pyramid.mesh.position,
		delay: delay,
		y: [-2, 0],
		z: [-7, -4],
		duration: 1500,
		easing: 'easeOutQuad',
	})
}

// Splitting

const splittingText = () => {
	const subTitle = document.querySelector('.intro-subtitle')
	const splittingText = Splitting({
		target: subTitle,
		by: 'lines'
	})

	splittingText.forEach(splitResult => {
		Splitting({ target: splitResult.el, by: 'chars', force: true })
	})

	splittingText.forEach((splitResult) => {
		if (splitResult.lines.length != 0) {
			const wrappedLines = splitResult.lines.map((wordsArr) => `
				<span class="line">
					${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
				</span>`).join('')}
			</span>`).join('')
			splitResult.el.innerHTML = wrappedLines
		}
	})

	// Unwrap

	subTitle.querySelectorAll('.word .word').forEach((item) => {
		item.outerHTML = item.innerHTML
	})
}



// Intro Text

const introTextIn = (delay) => {

	const animation = anime.timeline()

	animation.add({
		targets: document.querySelectorAll('.intro-title'),
		delay: delay,
		opacity: 1,
		duration: 700,
		scaleY: [2, 1],
		easing: 'linear',
		translateY: ['-25%', '0%'],
		filter: ['blur(10px)', 'blur(0px)'],
		complete: () => {
			anime({
				targets: document.querySelectorAll('.intro-title .shadow'),
				opacity: [0, 1],
				duration: 1000,
				easing: 'easeOutCirc',
			})
		}
	}).add({
		targets: document.querySelectorAll('#content .button'),
		opacity: [0, 1],
		translateY: ['25px', '0px'],
		filter: ['blur(10px)', 'blur(0px)'],
		duration: 500,
		easing: 'easeOutQuad',
		delay: delay + 1000,
		complete: () => {
			setTimeout(() => {
				headerFadeIn()
				footerFadeIn()
			}, 100)}
	})

	// Subtitle - Transport random

	const subTitle = document.querySelector('.intro-subtitle')
	let textArray = Array.from(subTitle.querySelectorAll('.char'))

	setTimeout(() => {
		for (let i = textArray.length; i > 0; i--) {
			let rndIndex = Math.floor(Math.random() * textArray.length)

			anime({
				targets: textArray[rndIndex],
				opacity: 1,
				duration: 1000,
				easing: 'easeOutCirc',
				filter: ['blur(10px)', 'blur(0px)'],
				scaleY: [3, 1],
				begin: () => {
					subTitle.style.opacity = 1
				},
				translateY: () => {
					return i % 2 === 0 ? ['-25%', '0%'] : ['25%', '0%']
				},
				delay: i * 100 + 1500,
			})

			var removeIndex = textArray.indexOf(textArray[rndIndex])
			textArray.splice(removeIndex, 1)
		}
	}, delay ? delay - 500 : 10)

}

const introTextOut = () => {

	anime({
		begin: () => {
			headerFadeOut()
			footerFadeOut()
			anime({
				targets: document.querySelectorAll('.intro-title .shadow'),
				opacity: [1, 0],
				duration: 1000,
				easing: 'easeOutCirc',
			})
		},
		targets: document.querySelectorAll('.intro-title, .intro-subtitle .char'),
		duration: 500,
		delay: 500,
		opacity: 0,
		scaleY: ['1', '2'],
		translateY: ['0%', '-25%'],
		filter: ['blur(0px)', 'blur(10px)'],
		easing: 'linear'
	})
	anime({
		targets: document.querySelectorAll('#content .button'),
		opacity: [1, 0],
		translateY: ['0px', '25px'],
		filter: ['blur(0px)', 'blur(10px)'],
		duration: 500,
		easing: 'easeOutQuad',
		delay: 500,
	})
}

// Header Fade In

const headerFadeIn = () => {
	document.body.classList.add('header-visible')
}

// Footer Fade In

const footerFadeIn = () => {
	if (document.body.scrollTop + document.body.clientHeight >= document.body.scrollHeight - 25) { // If at the bottom
		document.body.classList.add('footer-visible')
	}
}

// Header Fade Out

const headerFadeOut = () => {
	document.body.classList.remove('header-visible')
}

// Footer Fade Out

const footerFadeOut = () => {
	document.body.classList.remove('footer-visible')
}

export { introPyramid, splittingText, introTextIn, introTextOut }
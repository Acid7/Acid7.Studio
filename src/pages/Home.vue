<template>
	<h1 class="intro-title">Acid7.Studio<span class="shadow"></span></h1>
	<p class="intro-subtitle">Interactive Experiences.®</p>
	<div class="button-wrapper">
		<a href="#" class="button" id="audio">Open Channel</a>
	</div>
</template>



<script>
import imagesLoaded from 'imagesloaded'
import { introPyramid, introTextIn } from '@/webgl/world/Animations'
export default {
	beforeRouteEnter (to, from, next) {
		next(vm => {
			imagesLoaded(vm.$el, () => {
				introPyramid(400)
				introTextIn(2000)
				document.addEventListener('click', (e) => {
					if (e.target.id == "audio") {
						window._acid7.audio.init()
					}
				})

				if (!from.name) { // First load transition
				} else { // Enter transition
					introTextIn()
				}
			})
		})
	},
	beforeRouteLeave(to, from) {
		// Leave transition (return promise)
	},
}
</script>



<style lang="stylus" scoped>
.intro-title:first-child
	margin-top 25px
.intro-title
	position relative
	font-size var(--intro-size)
	line-height 1.2
	margin 0
	display inline-block
	opacity 0
	will-change transform, opacity, filter
	.dot
		display inline-block
		margin-left -.1em
	.shadow
		position absolute
		z-index -1
		top 0
		left 0
		right 0
		bottom 0
		opacity 0
		will-change opacity
		&::before
		&::after
			position absolute
			top 0
			left 0
			right 0
			bottom 0
		&::before
			content ''
			z-index -1
			background-repeat repeat-x
			background-position 0 .8em
			background-size 100% .2em
			background-image linear-gradient(to right, rgb(233, 186, 0) 0%, rgb(233, 186, 0) 100%)
		&::after
			z-index -2
			content 'Acid7.Studio'
			color transparent
			text-shadow .07em -.055em 0 rgba(100,0,255,0.75),
						-.07em -.105em 0 rgba(100,0,255,0.5),
						0 -.155em 0 rgba(100,0,255,0.25)

.intro-subtitle
	font-size 1.75rem
	line-height 1.429
	opacity 0

.button-wrapper
	text-align center
	margin-top 50px
.button
	display inline-block
	font-size 16px
	line-height 21px
	text-transform uppercase
	padding 20px 48px
	border 3px solid currentColor
	border-radius 50px
	text-decoration none
	animation none
	opacity 0
	will-change opacity, transform
	position relative
	background-color rgba(0,0,0,0.5)
	&::before
		position absolute
		content ''
		top -3px
		left -3px
		right -3px
		bottom -3px
		transform scale(1.25)
		filter blur(5px)
		border 3px solid currentColor
		border-radius 50px
		opacity 0
		transition opacity .5s, transform .5s, filter .5s
	&:hover
		color secondary-color
	&:hover::before
		opacity 1
		transform scale(1)
		filter blur(0px)

@keyframes loadingAudio
	0%
		opacity 1
	50%
		opacity 0

body.audio-loading .button
	animation loadingAudio 1s linear infinite

body.audio-playing .button
	pointer-events none

@media (max-width: 1112px)
	.intro-subtitle
		font-size 1.3125rem
	.button
		padding 18px 40px

@media (max-width: 667px)
	.intro
		margin-bottom 4rem
	.intro-title
		display inline
		text-shadow .07em -.055em 0 rgba(100,0,255,0.75),
					-.07em -.105em 0 rgba(100,0,255,0.5),
					0 -.155em 0 rgba(100,0,255,0.25)
		background-repeat repeat-x
		background-position 0 .8em
		background-size 100% .2em
		background-image linear-gradient(to right, rgb(233, 186, 0) 0%, rgb(233, 186, 0) 100%)
		.shadow::before
		.shadow::after
			display none
	.intro-subtitle
		margin-bottom -1rem

@media (max-width: 413px)
	h1
		font-size 37px !important
		line-height 48px !important
	.button-wrapper
		margin-top 25px
	.button
		padding 16px 30px

</style>
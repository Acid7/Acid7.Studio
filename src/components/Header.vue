<template>
	<header>
		<router-link to="/" class="logo-link">
			<svg width="46px" height="17px" viewBox="0 0 46 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<title>Acid7</title>
				<g id="Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="Artboard" transform="translate(-88.000000, -80.000000)" fill="#EEEEEE" fill-rule="nonzero">
						<path d="M133.15802,80 L133.15802,83.8275155 L119.299899,96.9269423 L116.1,96.913 L116.104763,96.9269423 L111.848794,96.9019564 L110.920608,93.5120278 L93.2549298,93.5120278 L92.33075,96.9019564 L88,96.9019564 L92.4499894,80 L133.15802,80 Z M115.508,94.718 L127.29875,83.6341963 L112.513,83.634 L115.508,94.718 Z M108.294263,83.6341963 L95.7539044,83.6341963 L94.1356451,89.8796986 L110.00188,89.8796986 L108.294263,83.6341963 Z" id="Acid7"></path>
					</g>
				</g>
			</svg>
		</router-link>
	</header>
</template>



<script>
export default {
}
</script>



<style lang="stylus" scoped>
header
	z-index 3
	position fixed
	left 0
	right 0
	top 0
	text-align center
	margin var(--vertical-rim) var(--horizontal-rim) 0
	font-family 'Federation'
	text-transform uppercase
	pointer-events none
	filter blur(10px)
	opacity 0
	transform translateY(-25%)
	transition opacity .5s, filter .5s, transform .5s
	.logo-link
		position relative
		display inline-block

body.header-visible header
	pointer-events auto
	transform translateY(0%)
	filter blur(0px)
	opacity 1
</style>
<template>
</template>



<style lang="stylus" scoped>
</style>



<script>
import imagesLoaded from 'imagesloaded'
export default {
	beforeRouteEnter (to, from, next) {
		next(vm => {
			imagesLoaded(vm.$el, () => {
				if (!from.name) {
					// First load transition
				} else {
					// Enter transition
				}
			})
		})
	},
	beforeRouteLeave(to, from) {
		// Leave transition (return promise)
	},
}
</script>
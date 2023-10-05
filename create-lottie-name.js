var lottie, animations

// Return a promise that resolves to true once animation is loaded
async function animationLoaded(animation) {
	if(animation.isLoaded) {
		return true
	}

	return new Promise((resolve, reject) => {
		animation.addEventListener('DOMLoaded', () => {
			resolve(true)
		})
	})
}

// Return a promise that resolves to true once all animations are loaded
async function waitForAnimationsLoaded(animations) {
	await Promise.all(animations.map(animationLoaded))
}

async function initAnimations() {
	lottie = Webflow.require('lottie').lottie
	animations = lottie.getRegisteredAnimations()
	animations.forEach( item => {
		item.name = item.wrapper.getAttribute('data-w-id')
		// item.wrapper.removeAttribute('data-src')
	})
	await waitForAnimationsLoaded(animations)
}

var Webflow = Webflow || []

Webflow.push(() => {
	initAnimations()
		.then(() => {
			console.log('Initialized animations')
			console.log(animations)
			
			// Reset animations to 0
			lottie.goToAndStop(0, true)
			
			})
		})
		.catch((error) => {
			console.error(error)
		})
})



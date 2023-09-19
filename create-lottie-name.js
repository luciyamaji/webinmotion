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
				// hide splash screen
        // Reset animations to 0
        console.log(animations)
        lottie.goToAndStop(0, true)
        
        // Play preloader
        const preLoader = document.querySelector('[data-lottie-interaction="pre-loader"]').getAttribute("data-w-id")
        lottie.play(preLoader)
        setTimeout(function () {
        	lottie.goToAndStop(0, true, preLoader)
        }, 3000)
        
        // Get buttons with interactions
        var btn = document.querySelectorAll('[data-lottie-interaction="hover"]')

        btn.forEach(item => {
					// Get the name of the lottie
          var lottie_name = item.querySelector('[data-animation-type="lottie"]').getAttribute("data-w-id")
          // Hover functions
          item.addEventListener('mouseenter', function () {
            lottie.play(lottie_name)
          })
          item.addEventListener('mouseleave', function () {
            lottie.goToAndStop(0, true, lottie_name)
          })
        })
			})
			.catch((error) => {
				console.error(error)
			})
	})
  
  

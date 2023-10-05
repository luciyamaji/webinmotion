// Get buttons with interactions
var hoverBtn = document.querySelectorAll('[data-lottie-interaction="hover"]');

hoverBtn.forEach(item => {
  // Get the name of the lottie
  var lottie_name = item.querySelector('[data-animation-type="lottie"]').getAttribute("data-w-id");
  
  // Hover functions
  item.addEventListener('mouseenter', function () {
    lottie.play(lottie_name);
  });
  item.addEventListener('mouseleave', function () {
    lottie.goToAndStop(0, true, lottie_name);
  });
});

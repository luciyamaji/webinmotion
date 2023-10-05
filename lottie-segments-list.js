// Get all elements with the "button" class
const buttonElements = document.querySelectorAll('.segments-wrapper');

// Loop over each button element
buttonElements.forEach((buttonElement) => {
  // Get the text content of the <p> element inside the button
  const text = buttonElement.querySelector('.segment-textarea').textContent;

  // Split the text by comma
  const segments = text.split(',');

  // Clear the content of the button element
  buttonElement.innerHTML = '';

  // Create new div for each element
  segments.forEach((segment) => {
    const divElement = document.createElement('div');
    divElement.classList.add('segment-textarea');
    divElement.innerHTML = `${segment.trim()}`;
    divElement.setAttribute('fs-copyclip-element', 'click');
    divElement.setAttribute('fs-copyclip-message', 'Copied!');

    buttonElement.appendChild(divElement);
  });
});

var colorPicker = new iro.ColorPicker('#picker', {
  color: "#ffffff",
  width: 240,
  layout: [
  {
    component: iro.ui.Box,
    options: {
      borderColor: '#ffffff'
    }
  },
  {
    component: iro.ui.Slider,
    options: {
      sliderType: 'hue',
      borderColor: '#000000'
    }
  }
]
});


const editButton = document.querySelectorAll("#editButton");

editButton.forEach(item => {
  item.addEventListener("click", function(e) {
    // Get parent with button and edit popup
    var currentItem = e.currentTarget.parentNode.parentNode.parentNode;
//      console.log(currentItem);
    
    // Get current lottie and play
    var lottie_edit = currentItem.querySelector("#lottie-edit");
    var lottie_name = lottie_edit.getAttribute("data-w-id");
    var lottie_src = lottie_edit.getAttribute("data-src");
    lottie.play(lottie_name);
    
    // Get current picker
    var hexInput = currentItem.querySelector("#hexInput");
    var swatch = currentItem.querySelector("#colorSwatch");
    var paths = lottie_edit.querySelectorAll("path");
    
    // console.log(hexInput, swatch, lottie_edit, paths);

    colorPicker.on(['color:init', 'color:change'], function(color) {
      hexInput.value = color.hexString;
      swatch.style.backgroundColor = color.hexString;
      for (var i = 0; i < paths.length; i++) {
        paths[i].style.fill = color.hexString;
        paths[i].style.stroke = color.hexString;
      };
    });

    hexInput.addEventListener('change', function() {
      colorPicker.color.hexString = this.value;
      swatch.style.backgroundColor = this.value;
      for (var i = 0; i < paths.length; i++) {
        paths[i].style.fill = this.value;
        paths[i].style.stroke = this.hexString;
      };
    });
    
    // Get current download button
    var downloadEditedBtn = currentItem.querySelector("#downloadEdited");
    
    downloadEditedBtn.addEventListener('click', function () {
      // Get current lottie JSON
      fetch(lottie_src) 
          .then((res) => { 
          return res.json(); 
      }) 
      .then((data) => {
          var lottieColor = data.layers[0].ef[0].ef[0].v.k;
          lottieColor[0] = colorPicker.color.red / 255;
          lottieColor[1] = colorPicker.color.green / 255;
          lottieColor[2] = colorPicker.color.blue / 255;
          console.log(lottieColor);
          console.log(data);
    
          const str = 'data:text/json;charset=utf-8,' + JSON.stringify(data);
          const newData = encodeURI(str);

          const element = document.createElement("a");
          element.setAttribute('href', newData);
          element.setAttribute('download', 'data.json');
          element.click();
      });
    });
    
    // Get close button
    var closeButton = currentItem.querySelector("#editClose");
    closeButton.addEventListener('click', function() {
      lottie.goToAndStop(0, true, lottie_name);
    });
  });
});

function duplicatePreview(tab_items) {
  tab_items.forEach((item, index) => {
    let tab_index = item.getAttribute("data-w-tab");
    let item_video = item.querySelector("video");
    
    let preview_tab = document.querySelector(`[role="tabpanel"][data-w-tab="${tab_index}"]`);      
    let preview_video = document.createElement("video");
    preview_video.src = item_video.src;
    preview_video.loop = true;
    preview_video.classList.add('video-preview');
    preview_video.muted = true;
    if (index === 0) {
      preview_video.play();
    };
    
    let preview_container = preview_tab.querySelector(".asset-preview");
    preview_container.appendChild(preview_video);
  
  });
};

window.onload = function () {
  const tab_main = document.querySelector("#main-tab");
  let tab_items = tab_main.querySelectorAll(".w-tab-link");
  
  duplicatePreview(tab_items);
  
  let tab_panel = tab_main.querySelector(".w-tab-content");
  let preview_video = tab_main.querySelectorAll(".video-preview");
  
  tab_items.forEach((item) => {
    let thumb_video = item.querySelector("video");
    item.addEventListener("mouseenter", function () {
      thumb_video.play();
    });
    item.addEventListener("mouseleave", function () {
      thumb_video.pause();
      thumb_video.currentTime = 0;
    });
    item.addEventListener("click", function () {
      preview_video.forEach((item) => {
        item.pause();
      });
      
      let tab_index = item.getAttribute("data-w-tab");
      let next_panel = tab_panel.querySelector(`[data-w-tab="${tab_index}"]`);
      let next_video = next_panel.querySelector("video");
      next_video.play();
    });
  });
  
};

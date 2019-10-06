const projectIcons = document.getElementById("projects");
$(window).on("load", function() {
  var bodyWidth = document.body.clientWidth * 0.75;
  var bodyHeight = document.body.clientHeight * 0.7;
  const centerX = document.body.clientWidth / 2;
  const centerY = document.body.clientHeight / 2;
  var pinnedImages = [];
  $(".random").each(function(idx, img) {
    moveImageRandomly(img, bodyWidth, bodyHeight, centerX, centerY);
    var tries = 0;
    while (pinnedImages.some(p => intersect(img, p))) {
      tries++;
      moveImageRandomly(img, bodyWidth, bodyHeight);
      if (tries > 20) {
        break;
      }
    }

    pinnedImages.push(img);
  });

});

var intersect = function(img1, img2) {
  var r1 = img1.getBoundingClientRect();
  var r2 = img2.getBoundingClientRect();
  var maxWidthOverlap = Math.min(r1.width, r2.width) / 5;
  var maxHeightOverlap = Math.min(r1.height, r2.height) / 5;
  return !(
    r2.left - r1.right >= maxWidthOverlap ||
    r2.right - r1.left <= maxWidthOverlap ||
    r2.top - r1.bottom >= maxHeightOverlap ||
    r2.bottom - r1.top <= maxHeightOverlap
  );
};

var moveImageRandomly = function(img, maxWidth, maxHeight, centerX, centerY) {
  $(img).css("left", centerX + Math.floor(random() * (maxWidth - img.width)));
  $(img).css("top", centerY + Math.floor(random() * (maxHeight + img.height)));
};

function random () {
  return Math.random() - 0.5;
}

const draggables = new Draggable.default(document.querySelectorAll("img"), {
  draggable: ".random",
  sensors: [Draggable.TouchSensor]
});

let startX;
let startY;

let diffX;
let diffY;

draggables.on('drag:start', (event) => {
  projectIcons.appendChild(event.source);
  startX = event.sensorEvent.clientX;
  startY = event.sensorEvent.clientY;
})

draggables.on('drag:move', event => {
  diffX = startX - event.sensorEvent.clientX;
  diffY = startY - event.sensorEvent.clientY;

})
draggables.on('drag:stop', (event) => {
 event.originalSource.style.left = parseInt(event.originalSource.style.left,10) - diffX;
 event.originalSource.style.top = parseInt(event.originalSource.style.top,10) - diffY;
})
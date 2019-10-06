$(window).on("load", function() {
  var bodyWidth = document.body.clientWidth;
  var bodyHeight = document.body.clientHeight * 1.5;
  var pinnedImages = [];
  console.log(`The body width is ${bodyWidth}`);
  $(".random").each(function(idx, img) {
    moveImageRandomly(img, bodyWidth, bodyHeight);
    var tries = 0;
    while (pinnedImages.some(p => intersect(img, p))) {
      console.log("Too much overlap detected. Attempting to re-pin.");
      tries++;
      moveImageRandomly(img, bodyWidth, bodyHeight);
      if (tries > 20) {
        console.log("Too many tries!");
        break;
      }
    }
    console.log(
      `image is pinned at ${img.getBoundingClientRect().x},${
        img.getBoundingClientRect().y
      }`
    );
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

var moveImageRandomly = function(img, maxWidth, maxHeight) {
  $(img).css("left", Math.floor(Math.random() * (maxWidth - img.width)));
  $(img).css("top", Math.floor(Math.random() * maxHeight));
};

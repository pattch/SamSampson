function main() {
  mainNavigation();
  addStars();
  animateDD();
}

function mainNavigation() {
  var navLinks = $('#nav li');
  navLinks.click(function() {
    var prevLink = $('#nav .active');
    var link = $(this);
    var index = link.index();
    var prevContent = $('#content .active');
    var content = $('#content div.screen').eq(index);
    var fadeTime = 400;

    // If you click on the currently active page, do nothing
    if(prevContent[0] === content[0])
      return;

    // Fade Out Previously Active Content while Fading in New Content
    content.fadeIn(400).addClass('active');
    prevContent.fadeOut(400).removeClass('active');
    // Make Navigation indicate which page is currently active
    link.addClass('active');
    prevLink.removeClass('active');
  });
}

function addStars() {
  var rating_stars = "<i class=";
  var ratings = $('.rating-container .rating');
  var stars_container = "<div class='stars'></div>"
  var full_star = "<i class='fa fa-star'></i>";
  var half_star = "<i class='fa fa-star-half-o'></i>";
  var empty_star = "<i class='fa fa-star-o'></i>";

  for(var i=0, j=ratings.length; i<j; i++) {
    var rating_el = ratings.eq(i);
    var rating = parseFloat(rating_el.attr('rating'));
    $(stars_container).appendTo(rating_el);
    var stars = rating_el.children().first();

    for(var m=0; m<5; m++) {
      if((rating - m) >= 1) {
        // Add a star
        $(full_star).appendTo(stars);
      } else if((rating - m) > 0) {
        // Add a half star if 0 < remainder < 1
        $(half_star).appendTo(stars);
      } else {
        // Add an empty Star
        $(empty_star).appendTo(stars);
      }
    }
  }
}

function animateDD() {
  var frames = $('.animator .doctord');
  var anim_time = 1000 / 4;
  frames.each(function() {
    $(this).hide();
  });

  toggleInfinite(frames, anim_time);
}

var toggleIndex = 0;
var toggleInc = 1;
function toggleInfinite(els, time) {
  els.eq(toggleIndex).toggle();
  var prevIndex = toggleIndex;
  toggleIndex += toggleInc;
  if(toggleIndex >= els.length || toggleIndex < 0) {
    toggleInc *= -1;
    toggleIndex += 2 * toggleInc;
  }
  setTimeout(function() {
    els.eq(prevIndex).toggle();
    toggleInfinite(els, time);
  }, time);
}

// docReady(main);
$(document).ready(main);

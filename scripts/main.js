function main() {
  mainNavigation();
  animateDD();
  addContent();
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
    content.addClass('active');
    prevContent.removeClass('active');
    // Make Navigation indicate which page is currently active
    link.addClass('active');
    prevLink.removeClass('active');
  });
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

function addContent() {
  var detail_age = $('ul.details .age');
  detail_age.text(getAge());
}

function getAge() {
  var bd = new Date('6/5/1992');
  var dt = new Date();
  var years = (dt.getFullYear() - bd.getFullYear());

  bd.setFullYear(dt.getFullYear())
  if(dt < bd) {
    years--;
  }

  return years;
}

// docReady(main);
$(document).ready(main);

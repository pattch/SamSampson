function main() {
  mainNavigation();
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

// docReady(main);
$(document).ready(main);

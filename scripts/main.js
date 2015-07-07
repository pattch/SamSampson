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

    // Fade Out Previously Active Content while Fading in New Content
    content.addClass('active').fadeIn(200);
    prevContent.removeClass('active').fadeOut(200);
    // Make Navigation indicate which page is currently active
    link.addClass('active');
    prevLink.removeClass('active');
  });
}

// docReady(main);
$(document).ready(main);

$(document).ready(function() {
  var html = '';
  $.get("./issues-content.csv", function(data) {
  // $.get("https://docs.google.com/spreadsheets/d/1oR8e73bZpJQNbPCJUSFivWm7APX7mSknnKTQg7DLSgA/pub?output=csv", function(data) {
    var issues = $.csv.toObjects(data);

    var renderTemplate = function(issues) {
      var ret = '';
      for (var i = 0; i < issues.length; i++) {
        if (issues[i].overline) {
          ret += '<div class="content-issue-container">';
          ret += '<h2 id="'+issues[i].href+'">'+issues[i].overline+'</h2>';
        } else if (issues[i].overline === '' && issues[i].link === '') {
          ret += '</div>';
        } else {
          ret += '<div class="issue-content-container">';
          ret += '<a class="issue-content-link" href="'+issues[i].link+'" target="_blank">';
          ret += '<div class="issue-content">';
          ret += '<h3>'+issues[i].title+'</h3>';
          ret += '<h5> <span class="issue-date">'+issues[i].date+'</span> '
          if (issues[i].source) {
            ret +='-- '+issues[i].source+' </h5>';
          }
          if (issues[i].blurb) {
            ret += '<h6 class="issue-blurb">'+issues[i].blurb+'</h6>';
          }
          ret += '</div>';
          ret += '</a>';
          ret += '</div>';
        }
      }
      return ret;
    };
    html += renderTemplate(issues);
    $('#content-template').html(html);
  });

  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top - 100
          }, 1000);
          return false;
        }
      }
    });
  });

  var stickyTop = function() {
    var stickyTop = $('#scroll-nav').offset().top;
    $(window).on( 'scroll', function(){
        if ($(window).scrollTop() >= stickyTop) {
            $('#scroll-nav').addClass('fixed');
        } else {
            $('#scroll-nav').removeClass('fixed');
        }
    });
  };

  var navResize = function() {
    var navCount = $('.nav-item').length;
    var navWidth = '';
    if ($(window).width() > 1305) {
      navWidth = ( (100 / navCount) - .2);
      $('.page-nav-list > a').css('width', navWidth+'%');
    } else if ($(window).width() <= 800) {
      navWidth = ( (100 / navCount) - .3 );
      $('.page-nav-list > a').css('width', navWidth+'%');
    } else if ($(window).width() <= 992) {
      navWidth = ( (100 / navCount) - .28 );
      $('.page-nav-list > a').css('width', navWidth+'%');
    } else if ($(window).width() <= 1305) {
      navWidth = ( (100 / navCount) - .24 );
      $('.page-nav-list > a').css('width', navWidth+'%');
    }
  }
  // document ready run StickeyTop
  stickyTop();
  navResize();
  // On window resize, run StickeyTop
  $(window).resize(function() {
    stickyTop();
    navResize();
  });

});

// module.exports = true;

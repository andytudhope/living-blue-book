(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  $(document).ready(function ($) {
  
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
    mobileMenu(w);
    mobileFooterMenu(w);
  
    $(window).on('resize', function (event) {
      w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      mobileMenu(w);
      mobileFooterMenu(w);
    });
  
    $('.about-mission .inner .inline-links a').on('click', function () {
      var id = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(id).offset().top + 5
      }, 500);
      return false;
    });
  
    function mobileMenu(w) {
      if (w < 1199) {
        $('header nav, header .btns').appendTo('.mobile-nav');
      } else {
        $('.mobile-nav nav, .mobile-nav .btns').insertBefore('.mobile-nav-trigger');
      }
    }
  
    function mobileFooterMenu(w) {
      if (w < 768) {
        $('footer .navigation h5 a').attr('aria-expanded', 'false').addClass('collapsed');
        $('footer .collapse').removeClass('show');
      } else {
        $('footer .navigation h5 a').attr('aria-expanded', 'true').removeClass('collapsed');
        $('footer .collapse').addClass('show');
      }
    }
  
    $('.mobile-nav-trigger-close, .mobile-nav-trigger, .backdrop').on('click', function (event) {
      event.preventDefault();
      $('body').toggleClass('nav-active');
    });
  
    try {
      highlight();
    } catch (err) {
      setTimeout(function () {
        highlight();
      }, 2500);
    }
  
    function highlight() {
      $('.editor-content pre code').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    }
  
    $('.sidebar').stick_in_parent({
      offset_top: 30
    });
  
    $('.sidebar-mobile-trigger, .mobile-sidebar-trigger-close').on('click', function (event) {
      event.preventDefault();
      $('body').toggleClass('sidebar-active');
    });
  
    if ($('.quick-nav').length) {
      var quickNavOffset = $('.quick-nav').offset().top;
      $(window).on('resize', function () {
        quickNavOffset = $('.quick-nav').offset().top;
      });
      $(window).on('scroll', function () {
        var y = $(window).scrollTop();
        if (y > quickNavOffset) {
          $('.quick-nav, .quick-nav-sub').addClass('fixed');
        } else {
          $('.quick-nav, .quick-nav-sub').removeClass('fixed');
        }
      });
      $('.quick-nav-sub ul li a').on('click', function (event) {
        event.preventDefault();
        var id = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(id).offset().top - 100
        }, 300);
      });
    }
  
    if ($('.right-sub-navigation').length) {
      $('.editor-content h1, .editor-content h2, .editor-content h3').each(function (index, element) {
        var id = $(this).attr('id');
        var title = $(this).text();
        $('.right-sub-navigation ul').append('<li class="li-' + $(this)[0].nodeName.toLowerCase() + '"><a href="#' + id + '">' + title + '</a></li>');
      });
      $('.right-sub-navigation').stick_in_parent({
        offset_top: 30
      });
      $('.right-sub-navigation a').on('click', function () {
        var id = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(id).offset().top - 50
        }, 500);
        return false;
      });
    }

    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;

    var RADIUS = 70;

    var RADIUS_SCALE = 1;
    var RADIUS_SCALE_MIN = 1;
    var RADIUS_SCALE_MAX = 1.5;

    var QUANTITY = 25;

    var canvas;
    var context;
    var particles;

    var mouseX = SCREEN_WIDTH * 0.5;
    var mouseY = SCREEN_HEIGHT * 0.5;
    var mouseIsDown = false;

    function init() {

      canvas = document.getElementById( 'world' );
      
      if (canvas && canvas.getContext) {
        context = canvas.getContext('2d');
        
        // Register event listeners
        window.addEventListener('mousemove', documentMouseMoveHandler, false);
        window.addEventListener('mousedown', documentMouseDownHandler, false);
        window.addEventListener('mouseup', documentMouseUpHandler, false);
        document.addEventListener('touchstart', documentTouchStartHandler, false);
        document.addEventListener('touchmove', documentTouchMoveHandler, false);
        window.addEventListener('resize', windowResizeHandler, false);
        
        createParticles();
        
        windowResizeHandler();
        
        setInterval( loop, 1000 / 60 );
      }
    }

    function createParticles() {
      particles = [];
      
      for (var i = 0; i < QUANTITY; i++) {
        var particle = {
          size: 1,
          position: { x: mouseX, y: mouseY },
          offset: { x: 0, y: 0 },
          shift: { x: mouseX, y: mouseY },
          speed: 0.01+Math.random()*0.04,
          targetSize: 1,
          fillColor: '#' + (Math.random() * 0x009900 + 0x3A12EA | 0).toString(16),
          orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
        };
        
        particles.push( particle );
      }
    }

    function documentMouseMoveHandler(event) {
      mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
      mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
    }

    function documentMouseDownHandler(event) {
      mouseIsDown = true;
    }

    function documentMouseUpHandler(event) {
      mouseIsDown = false;
    }

    function documentTouchStartHandler(event) {
      if(event.touches.length == 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;;
        mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
      }
    }

    function documentTouchMoveHandler(event) {
      if(event.touches.length == 1) {
        event.preventDefault();

        mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;;
        mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
      }
    }

    function windowResizeHandler() {
      SCREEN_WIDTH = window.innerWidth;
      SCREEN_HEIGHT = window.innerHeight;
      
      canvas.width = SCREEN_WIDTH;
      canvas.height = SCREEN_HEIGHT;
    }

    function loop() {
      
      if( mouseIsDown ) {
        RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.02);
      }
      else {
        RADIUS_SCALE -= ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.02);
      }
      
      RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );
      
      context.fillStyle = 'rgba(255,255,255,0.05)';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      
      for (i = 0, len = particles.length; i < len; i++) {
        var particle = particles[i];
        
        var lp = { x: particle.position.x, y: particle.position.y };
        
        // Rotation
        particle.offset.x += particle.speed;
        particle.offset.y += particle.speed;
        
        // Follow mouse with some lag
        particle.shift.x += ( mouseX - particle.shift.x) * (particle.speed);
        particle.shift.y += ( mouseY - particle.shift.y) * (particle.speed);
        
        // Apply position
        particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit*RADIUS_SCALE);
        particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit*RADIUS_SCALE);
        
        // Limit to screen bounds
        particle.position.x = Math.max( Math.min( particle.position.x, SCREEN_WIDTH ), 0 );
        particle.position.y = Math.max( Math.min( particle.position.y, SCREEN_HEIGHT ), 0 );
        
        particle.size += ( particle.targetSize - particle.size ) * 0.05;
        
        if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
          particle.targetSize = 1 + Math.random() * 7;
        }
        
        context.beginPath();
        context.fillStyle = particle.fillColor;
        context.strokeStyle = particle.fillColor;
        context.lineWidth = particle.size;
        context.moveTo(lp.x, lp.y);
        context.lineTo(particle.position.x, particle.position.y);
        context.stroke();
        context.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
        context.fill();
      }
    }

    window.onload = init;
  });
  
  },{}]},{},[1])
  //# sourceMappingURL=main.js.map
  
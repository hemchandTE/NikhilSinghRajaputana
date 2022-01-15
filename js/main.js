(function($) {
    "use strict";
    $(window).on('load', function() {
        var pre_loader = $('#preloader')
        pre_loader.fadeOut('slow', function() {
            $(this).remove();
        });
    });
    var veno_box = $('.venobox');
    veno_box.venobox();
    $('.search-option').hide();
    $(".main-search").on('click', function() {
        $('.search-option').animate({
            height: 'toggle',
        });
    });
    var windows = $(window);
    var sticky = $('#sticker');
    windows.on('scroll', function() {
        var scroll = windows.scrollTop();
        if (scroll < 300) {
            sticky.removeClass('stick');
        } else {
            sticky.addClass('stick');
        }
    });
    var mean_menu = $('nav#dropdown');
    mean_menu.meanmenu();
    $.scrollUp({
        scrollText: '<i class="icon icon-arrow-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    var count = $('.counter');
    count.counterUp({
        delay: 40,
        time: 3000
    });
    var panel_test = $('.panel-heading a');
    panel_test.on('click', function() {
        panel_test.removeClass('active');
        $(this).addClass('active');
    });
    $('.video-play').magnificPopup({
        type: 'iframe'
    });
    var intro_carousel = $('.intro-carousel');
    intro_carousel.owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        dots: false,
        navText: ["<i class='icon icon-chevron-left'></i>", "<i class='icon icon-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    var project_carousel = $('.project-carousel');
    project_carousel.owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        dots: false,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });
    $(window).on("load", function() {
        var $container = $('.project-content');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.project-menu li a').on("click", function() {
            $('.project-menu li a.active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    });
    var review = $('.testimonial-carousel');
    review.owlCarousel({
        loop: true,
        nav: false,
        margin: 30,
        dots: false,
        autoplay: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    var brand_item = $('.brand-carousel');
    brand_item.owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        dots: false,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 4
            },
            1000: {
                items: 6
            }
        }
    });
    $("#contactForm").on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#msg_subject").val();
        var message = $("#message").val();
        $.ajax({
            type: "POST",
            url: "assets/contact.php",
            data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
            success: function(text) {
                if (text === "success") {
                    formSuccess();
                } else {
                    formError();
                    submitMSG(false, text);
                }
            }
        });
    }

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
})(jQuery);
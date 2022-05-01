$(function () {
    $('#menu').mmenu();
    $('.nav li').hover(function () {
        $('ul:first', this).stop().fadeIn();
    }, function () {
        $('ul', this).hide();
    });
    $('#searchformmobile').click(function () {
        $('.box-search-mobile').stop().slideToggle();
        return false;
    });
    $('#search-pc').click(function () {
        $('.search-pc').slideToggle();
    });
    // tab danh mục đầu tư
    $('.tab-bar .tab-title:first-child').addClass('tab-active');
        $('.tab-content').hide();
        $('.tab-content:first').show();

// Click function
        $('.tab-bar .tab-title').click(function(){
        $('.tab-bar .tab-title').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('.tab-content').hide();
        
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
        });
// end tab danh mục đầu tư

    $('.icon-cart').click(function () {
        window.location = '/addcart/';
    });
    $('.selectcat').click(function () {
        $('.categorypage').stop().slideToggle();
    });
    $('.btn-show-search-mobile').click(function () {
        $('.box-search-mobile-1').stop().slideToggle();
        return false;
    })
    // $('.item-tab-detail-product').click(function () {
    //     $('.item-tab-detail-product').removeClass('active');
    //     $(this).addClass('active');
    //     $('.content-tab-pro').hide();
    //     $('#' + $(this).attr('data-tab')).stop().fadeIn();
    // });
    // $('.item-tab-product').click(function () {
    //     $('.item-tab-product').removeClass('active-tab');
    //     $(this).addClass('active-tab');
    //     $('.content-tab-pro').hide();
    //     $('#' + $(this).attr('data-tab')).stop().slideDown();
    // });
    var divi = 0;
    $('.content-detail table').each(function () {
        var me = $(this);
        divi++;
        $('<div id ="div-scroll-' + divi + '" class="div-scroll" />').insertBefore(me);
        $("#div-scroll-" + divi).html(me);
    });
    $(".menu-click-down").click(function () {
        $(".nav").stop().slideToggle(0);
    });
    $("#button-btt").click(function () {
        $("html, body").animate({scrollTop: 0}, "slow");
        return false;
    });


    $(window).scroll(function (event) {
        if ($(this).scrollTop() > 500) {
            $("#button-btt").fadeIn();
        } else {
            $("#button-btt").fadeOut();
        }
    });


    var menubar = $('.header').position();
    $(window).scroll(function (event) {
        if ($(this).scrollTop() > (menubar.top + 200)) {
            $('.header').addClass("header-fixed");
        } else {
			$('.header').removeClass("header-fixed");
        }
    });		
	
    

    /*Disable full page*/
    /*
    $(".content-detail, .cat-content").on("contextmenu", function (e) {
        return false;
    });

    $('body').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
    */

});
$.fn.digits = function () {
    return this.each(function () {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
    });
};
$.fn.dinhdangso = function () {
    return this.each(function () {
        $(this).html($(this).html().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
    });
};
(function ($) {
    $.fn.extend({
        checkNull: function () {
            var obj = this;
            var ok = true;
            $('.notNull', obj).each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('error');
                    ok = false;
                }
            });
            return ok;
        },
        frmSubmit: function () {
            var obj = this;
            obj.submit(function () {
                var ok = $(this).checkNull();
                if (ok == false) {
                    alert(obj.attr('data-alert'));
                    obj.find(".modal-box, .modal-overlay").fadeOut(500, function () {
                        $(".modal-overlay").remove();
                    });


                } else {
                    obj.ajaxSubmit({
                        beforeSubmit: function (a, f, o) {
                            obj.fadeTo('fast', 0.3);
                            o.dataType = 'html';
                        },
                        success: function (data) {
                            obj.fadeTo('fast', 1);
                            if (data == 1) {
                                obj.find(".msgbox").removeClass("form-error");

                                obj[0].reset();
                                obj.find(".msgbox").html(obj.attr('data-success'));
                                obj.find(".msgbox").addClass("form-success");
                                obj.find(".captcha_message").fadeOut();
								
								window.location.href = obj.attr('data-redirect');

                            } else if (data == -1) {
                                obj.find(".msgbox").addClass("form-error");
                                obj.find(".msgbox").html(obj.attr('data-captcha'));
                            } else {

                                obj.find(".msgbox").addClass("form-error");
                                obj.find(".msgbox").html(data);
                            }
                            $('.imgCaptcha').attr("src", "/lib/imagesercurity.php");
                        }
                    });
                }
                return false;
            });
        }
    });
    $(document).ready(function () {
        $('#regform').frmSubmit();
		$('#regform2').frmSubmit();
		
        $('#contactform').frmSubmit();
		$('#dailyform').frmSubmit();
		
		$('#news_regform').frmSubmit();
		$('#pop_regform').frmSubmit();
		
		
    });
})(jQuery);





(function ( $ ) {
 
    $.fn.LongPageNavigation = function( options ) {
 
        var settings = $.extend({
			longPageNavigationPosition:"" ,
        }, options );
 
 
	if(settings.longPageNavigationPosition=="")
	{
		 $(this).before('<div class="longPageNavigationDiv"><ul></ul></div>');
	}
	else
	{
		 $('.'+settings.longPageNavigationPosition).append('<div class="longPageNavigationDiv"><ul></ul></div>');
		
	}	
    
	var count = 0;
	
     $(this).children('h2, h3').each(function(index){
		count++;
		var getMenuName = $(this).text();
		$(this).attr('id','LongNavigation-'+index);

		if( $(this).is("h3") )
			
			var li     = '<li class="toc-heading3"><a href="#LongNavigation-'+index+'">'+ getMenuName +'</a></li>'; 			
			
		else
			
			var li     = '<li class="toc-heading2"><a href="#LongNavigation-'+index+'">'+ getMenuName +'</a></li>'; 

		/*
		if( $(this).is("h3") ){                                     
			prevH2List = $("<ul></ul>");                
			prevH2Item = $(li);                                     
			prevH2Item.append(prevH2List);                          

			$('.longPageNavigationDiv ul').append(prevH2Item);				
		} else {                                                    
			
			$('.longPageNavigationDiv ul').append(li);
		}       		   
		*/

		$('.longPageNavigationDiv ul').append(li);
		 
	 });
	 
	 if(count == 0) $('.longPageNavigationDiv').hide();
       
// Smooth Navigation	   
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 165
		}, 500);
	});
// Smooth Navigation END	        
    };
 
}( jQuery ));

const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");

modalTriggerButtons.forEach(elem => {
  elem.addEventListener("click", event => toggleModal(event.currentTarget.getAttribute("data-modal-target")));
});
modalCloseButtons.forEach(elem => {
  elem.addEventListener("click", event => toggleModal(event.currentTarget.closest(".modal").id));
});
modals.forEach(elem => {
  elem.addEventListener("click", event => {
    if(event.currentTarget === event.target) toggleModal(event.currentTarget.id);
  });
});

// Maybe also close with "Esc"...
document.addEventListener("keydown", event => {
  if(event.keyCode === 27 && document.querySelector(".modal.modal-show")) {
    toggleModal(document.querySelector(".modal.modal-show").id);
  }
});

function toggleModal(modalId) {
  const modal = document.getElementById(modalId);

  if(getComputedStyle(modal).display==="flex") { // alternatively: if(modal.classList.contains("modal-show"))
    modal.classList.add("modal-hide");
    setTimeout(() => {
      document.body.style.overflow = "initial"; // Optional: in order to enable/disable page scrolling while modal is hidden/shown - in this case: "initial" <=> "visible"
      modal.classList.remove("modal-show", "modal-hide");
      modal.style.display = "none";      
    }, 200);
  }
  else {
    document.body.style.overflow = "hidden"; // Optional: in order to enable/disable page scrolling while modal is hidden/shown
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }
}

        
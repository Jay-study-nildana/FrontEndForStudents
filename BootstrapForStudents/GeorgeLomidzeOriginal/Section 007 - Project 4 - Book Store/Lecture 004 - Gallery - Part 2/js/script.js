$(document).ready(function() {
    lightbox.option({
        'wrapAround': true
      });

      $(window).scroll(function() {
        let position = $(this).scrollTop();
        
        if(position >= 350) {
            $('.gallery').addClass('change');
        } else {
            $('.gallery').removeClass('change');
        }

      });
});


































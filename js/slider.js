$(function () {

$.fn.slide = function(option){

    var options = {

        container: '',

        item: '',

        trigger: '',

        prev: '.prev',

        nex: '.next',

        auto: false,

        duration: 8000
      },

      opts = $.extend(options, option),

      $container = $(opts.container),

      $item = $container.find(opts.item),

      $trigger = $container.find(opts.trigger),

      $prev = $container.parent().find(opts.prev),

      $next = $container.parent().find(opts.nex),

      page = 0,

      lastThis;

    var autos;



    // $(document).on('click', opts.trigger, function(e){

    //   e.preventDefault();

    //   if(page !== $(this).index()){

    //     page = $(this).index();

    //     triggerEvent(page);

    //   }

    // });

    var wh = $("body").height(),
        hh = $(".header").height();


    if(!$('.peitao').length){
        if(wh > 800){
          $item.height("800px");
          $container.height("800px");
      }else{
          $item.height("550px");
          $container.height("550px");
      }
    }

    
    // $item.height(wh-hh);
    // $container.height(wh-hh);

    triggerEvent(page);

    if(opts.auto){

      setTimeout(autoSlide, 5000)
      // autoSlide();
      // $prev.hide();
      // $next.hide();

    }

    $(document).on('mouseover', '.slide-box .next, slide-box .prev', function (e) {
        clearInterval(autos);
    }).on('mouseout', '.slide-box .next, slide-box .prev', function (e) {
        autoSlide();
    })

    var flag;

    $(document).on('click', opts.prev, function (e) {
        e.preventDefault();
        flag&&slidePrev();
        flag=false;
    });

    $(document).on('click', opts.nex, function (e) {
        e.preventDefault();
        flag&&slideNext();
        flag=false;

    });



    function triggerEvent(page){

      $trigger.eq(page).addClass('current');

      $item
        .clearQueue()
        .stop()
        .eq(page)
        .fadeIn( 1000, function(){
          $(this).find('h3').animate({
            opacity: 1,
            top: 0
          }, 1000, "swing", function () {

          });

          $(this).find('p').animate({
              opacity: 1,
              top: "50px"
            }, 2000, "swing", function () {
                flag=true;
            });

        });

      lastThis && lastThis.fadeOut( 500, function(){

          $(this).removeClass('current');
          $(this).find('h3,p').removeAttr("style");

        });



      lastThis = $item.eq(page);
    }


    function autoSlide(){

      autos = setInterval(function(){

        if(page < $trigger.length-1){

          page ++;

          triggerEvent(page);

        }else{

          page = 0;

          triggerEvent(page);

        }
      }, opts.duration);
    }

    function slideNext () {
      if(page == $item.length-1){
          page = 0;
        }else{
          page ++;
        }
        triggerEvent(page);
    }

    function slidePrev () {console.log(page)

        if(page == 0){
          page = $item.length-1;
        }else{
          page --;
        }console.log(page)
        triggerEvent(page);
    }

}



});

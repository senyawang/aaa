$(function () {

$.fn.slide = function(option){

    var options = {

        container: '',

        item: '',

        trigger: '',

        prev: '.prev',

        nex: '.next',

        auto: false,

        duration: 10000
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



    if(opts.auto){

      triggerEvent(page)
      // autoSlide();
      // $prev.hide();
      // $next.hide();

    }

    var flag = true;

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

      clearInterval(autos);
      console.info('a--' + autos)

      // $trigger.eq(page).css('display',"block");

      $item
        .eq(page)
        .stop()
        .animate({
            opacity: 1
        }, 1000, function(){

          $(this).find('h3').animate({
            opacity: 1,
            top: 0
          }, 500, "swing", function () {

          });

          $(this).find('p').animate({
              opacity: 1,
              top: "50px"
            }, 1000, "swing", function () {
                flag=true;

                autoSlide();

            });

        });

      lastThis && lastThis.stop().animate({
            opacity: 0
        }, function(){

          // $(this).css('display', "none");
          $(this).find('h3,p').removeAttr("style");

        });

      lastThis = $item.eq(page);
    }


    function autoSlide(){

      autos = setInterval(function(){

        if(page < $trigger.length-1){

          page ++;

        }else{

          page = 0;

        }

        console.info('auto')

        triggerEvent(page);

      }, opts.duration);
      console.info('b---' + autos)
    }

    function slideNext () {
      if(page == $item.length-1){
          page = 0;
        }else{
          page ++;
        }
        triggerEvent(page);
    }

    function slidePrev () {

        if(page == 0){
          page = $item.length-1;
        }else{
          page --;
        }
        triggerEvent(page);
    }

}



});
$(function(){
  $(".side ul a").hover(function(){
    $(this).stop().animate({"width":"124px"},200).css({"opacity":"1","filter":"Alpha(opacity=100)","background":"#ae1c1c"})
  },function(){
    $(this).stop().animate({"width":"54px"},200).css({"opacity":"0.8","filter":"Alpha(opacity=80)","background":"#000"})
  });
});

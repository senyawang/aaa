
	function instanceCarousel(option){

        var options = {
            container: '.connected-carousels',
            stage: '.carousel-stage',
            navigation: '.carousel-navigation',
            prevStage: '.prev-stage',
            nextStage: '.next-stage',
            nextNavigation: '.next-navigation',
            prevNavigation: '.prev-navigation',
            autostart: false
        }

        var opts = $.extend(options, option);

        var connector = function(itemNavigation) {
            return itemNavigation.parents(opts.container).find(opts.stage).jcarousel('items').eq(itemNavigation.index());
        };


        var carouselNavigation = $(opts.navigation).jcarousel();

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.each(function(){

            $(this).jcarousel('items').each(function() {
                var item = $(this);

                // Setup the carousels. Adjust the options for both carousels here.
                var carouselStage      = item.parents(opts.container).find(opts.stage).jcarousel().jcarouselAutoscroll({
                    interval: 3000,
                    target: '+=1',
                    autostart: false
                });


                // This is where we actually connect to items.
                var target = connector(item, carouselStage);

                item
                    .on('jcarouselcontrol:active', function() {
                        item.parents(opts.container).find(opts.navigation).jcarousel('scrollIntoView', this);
                        item.addClass('active');
                    })
                    .on('jcarouselcontrol:inactive', function() {
                        item.removeClass('active');
                    })
                    .jcarouselControl({
                        target: target,
                        carousel: carouselStage
                    });
            });

        });


         // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });


        // Setup controls for the navigation carousel
        $(opts.prevNavigation)
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $(opts.nextNavigation)
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

    }


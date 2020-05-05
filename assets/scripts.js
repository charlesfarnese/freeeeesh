$( document ).ready(function() {
    // get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $(".basket_link-count").text(basketCount);

    // if basket count is 0, dont show checkout button
    if (basketCount === 0) {
      $('#checkout_button').css('display', 'none');
    }


if ($(window).width() > 660) {
    $('.restaurant_logo').css({'position': 'relative', 'top': 'auto'});
    $('.menu').css({'position': 'sticky', 'top': '110px'});
}


if ($(window).width() <= 660) {
    $('.menu').css({'position': 'relative', 'top': 'auto'});
    $('.restaurant_logo').css({'position': 'sticky', 'top': '92px'});
}

if ($(window).width() > 1190) {

    var nextDeliveryContainer = $('<div id="next_delivery-container"></div>');
    var nextDeliveryText = $('<div id="next_delivery-text"></div>');
    var nextDeliveryDate = $('<div id="next_delivery-date">18th of April</div>');
    var nextDelivery = $('<div id="next_delivery">next<br>delivery</div>');

    $('#first_col-container').prepend(nextDeliveryContainer);
    $('#next_delivery-container').append(nextDeliveryText);
    $('#next_delivery-text').append(nextDeliveryDate);
    $('#next_delivery-text').append(nextDelivery);


    // curve next delivery text
    new CircleType(document.getElementById('next_delivery-date')).radius(60);

} 

if ($(window).width() <= 660) {
    var nextDeliveryContainerMobile = $('<div id="next_delivery-container-mobile"></div>');
    var nextDeliveryTextMobile = $('<div id="next_delivery-text-mobile"></div>');
    var nextDeliveryDateMobile = $('<div id="next_delivery-date-mobile">18th of April</div>');
    var nextDeliveryMobile = $('<div id="next_delivery-mobile">next<br>delivery</div>');

    $('#initial_content-mobile').prepend(nextDeliveryContainerMobile);
    $('#next_delivery-container-mobile').append(nextDeliveryTextMobile);
    $('#next_delivery-text-mobile').append(nextDeliveryDateMobile);
    $('#next_delivery-text-mobile').append(nextDeliveryMobile);

    new CircleType(document.getElementById('next_delivery-date-mobile')).radius(60);
}

// Internet explorer fixes 
if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
{
  $("#next_delivery-container").css('display', 'none');
  $("#next_delivery-container-mobile").css('display', 'none');
}

});

//insert and remove next delivery text depending on screen size (on resize)
$( window ).resize(function() {
if ($(window).width() > 1190) {

    if ($('#next_delivery-container').length === 0) {
        var nextDeliveryContainer = $('<div id="next_delivery-container"></div>');
        var nextDeliveryText = $('<div id="next_delivery-text"></div>');
        var nextDeliveryDate = $('<div id="next_delivery-date">18th of April</div>');
        var nextDelivery = $('<div id="next_delivery">next<br>delivery</div>');

        $('#first_col-container').prepend(nextDeliveryContainer);
        $('#next_delivery-container').append(nextDeliveryText);
        $('#next_delivery-text').append(nextDeliveryDate);
        $('#next_delivery-text').append(nextDelivery);


        // curve next delivery text
        new CircleType(document.getElementById('next_delivery-date')).radius(60);
    }

} else if ( $(window).width() > 660 && $(window).width() <= 1190){
    $('#next_delivery-container').remove();
    $('#next_delivery-container-mobile').remove();

} else {

    if ($('#next_delivery-container-mobile').length === 0) {
        var nextDeliveryContainerMobile = $('<div id="next_delivery-container-mobile"></div>');
        var nextDeliveryTextMobile = $('<div id="next_delivery-text-mobile"></div>');
        var nextDeliveryDateMobile = $('<div id="next_delivery-date-mobile">18th of April</div>');
        var nextDeliveryMobile = $('<div id="next_delivery-mobile">next<br>delivery</div>');

        $('#initial_content-mobile').prepend(nextDeliveryContainerMobile);
        $('#next_delivery-container-mobile').append(nextDeliveryTextMobile);
        $('#next_delivery-text-mobile').append(nextDeliveryDateMobile);
        $('#next_delivery-text-mobile').append(nextDeliveryMobile);

        new CircleType(document.getElementById('next_delivery-date-mobile')).radius(60);
    }
}
});

// hide the basket on scroll event
$(document).ready(function(){
    document.addEventListener('scroll', function(event) {
        var basket = document.getElementById("basket");

            if ($("#basket").css("display") === "block") {
                $("#basket").css("display", "none");
                if ($(window).width() > 660) {
                    $('#basket_link').fadeIn(1000).css("display","block");
                }
            }

    });
});

// basket fade in on link click
$(document).ready(function(){
    $('#basket_link').click(function() {
        console.log($(window).width());
            $('#basket_link').css("display","none");
            $('#basket_link-inner').fadeIn(1000).css("display","block");
            $('#basket').fadeIn(1000).css("display","block");

    });
});

// basket fade out on inner link click
$(document).ready(function(){
    $('#basket_link-inner').click(function() {
          $('#basket_link-inner').css("display","none");
          $('#basket').css("display","none");
          if ($(window).width() > 660) {
            $('#basket_link').fadeIn(1000).css("display","block");
        }
    });
});

//mobile basket open on mobile link click
$(document).ready(function(){
    $('#basket_link_mobile').click(function() {
            $('#left-col').css("visibility","visible");
            $('#basket_link-inner').fadeIn(1000).css("display","block");
            $('#basket').fadeIn(1000).css("display","block");
    });
});

// smooth scroll to box menu on clicking 'boxes ->'
$("#box_scroll-container").click(function() {
    $('html, body').animate({
        scrollTop: $("#box_scroll-target").offset().top
    }, 1000);
});

// on clecking logos in intro section, scroll to their menu
$('.suppliers_line img').click(function() {

    var imageFileAddr = $(this).attr('src');
    console.log(imageFileAddr);
    var imageFile = imageFileAddr.split('assets/images/')[1];
    var restaurant = imageFile.split('.png')[0];

    console.log(restaurant);



    $('html, body').animate({
        scrollTop: $('#' + restaurant + '_menu').offset().top
    }, 1000);


});



// ------------ UPDATING CART ----------------

// ADD TO BASKET (+)
$(".plus_container").click( function () {

    if ($("#basket").css("display") === "none") {
                if ($(window).width() > 660) {
                    $("#basket").css("display", "block");
                    $('#basket_link').fadeIn(1000).css("display","none");
                }
            }

	// get product
    var product = $(this).parent().data("product");
    console.log("product: " + product);

    // get price
    var price = $(this).prev().text();
    console.log("price: " + price);

    // get restaurant
    var restaurant = $(this).parent().data("restaurant");
    console.log("restaurant: " + restaurant);

    // get current product count
    //  will get from cart api

    var newBasketGroup = '<div class="basket_group" data-restaurant="' + restaurant + '"><div class="basket_group-restaurant">' + restaurant + '</div><div class="basket_group-itemline"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + product + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div></div>';

    var newItemLine = '<div class="basket_group-itemline"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + product + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div>'

    //get basket groups
    var basketGroups = $(".basket_group");


    // Check if restaurant in has group already
    var restaurantInBasket = false;

    $(basketGroups).each(function(index, element){
    	console.log("restaurant loop: " + $(this).data("restaurant"));

    	if ($(this).data("restaurant") === restaurant) {
    		restaurantInBasket = true;
    	}
    });
    console.log(restaurantInBasket);



    // add new group or line depending if restaurant has group
    if (restaurantInBasket == true) {

    	// get group and append
    	$('.basket_group[data-restaurant="' + restaurant + '"').eq(0).append(newItemLine);

    } else {
    	//append to basket
    	$('#basket_groups').append(newBasketGroup);

    }

    //update/create itemcount div
    // new restaurant group list
    var restaurantItemList = $('.basket_group[data-restaurant="' + restaurant + '"').find(".basket_group-itemline-title");

    //filter list for this product
    var restaurantItemListFiltered = $(restaurantItemList).filter( function () {
            return $(this).text() == product;
    });

    console.log(restaurantItemList.length);
    console.log(restaurantItemListFiltered.length);

    // if lenght is greater than 0, show count div and list linght
    if (restaurantItemListFiltered.length >= 1) {

        // check if count div exists, if so update count, else prepend count div
        var countDiv = $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".number_in-basket");

        if (countDiv.length == 1) {

            $(countDiv).text(restaurantItemListFiltered.length);

        } else {

            var countDivNew = '<div class="itemtype_in-basket"><span class="number_in-basket">' + restaurantItemListFiltered.length + '</span> x</div>';
            console.log(countDivNew);

            $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".itemtype_headline").prepend(countDivNew);

        }

    }


   	// get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $(".basket_link-count").text(basketCount);

    // if basket count is 0, dont show checkout button
    if (basketCount === 0) {
      $('#checkout_button').css('display', 'none');
    } else {
      $('#checkout_button').css('display', 'block');
    }


    // update basket total price
    var itemLinesPrices = $("#basket").find(".basket_group-itemline-cost-number");

    var total = 0;
    $(itemLinesPrices).each(function () {
        total += parseInt($(this).text(), 10);
    });

    console.log(total);
    $("#basket_total-number").text(total);


  }
);

// REMOVE FROM BASKET (MINUS)
$(".minus_container").click( function () {

    if ($("#basket").css("display") === "none") {
                if ($(window).width() > 660) {
                    $("#basket").css("display", "block");
                    $('#basket_link').fadeIn(1000).css("display","none");
                }
            }

	// get product
    var product = $(this).parent().data("product");
    console.log("product: " + product);

    // get price
    var price = $(this).next().text();
    console.log("price: " + price);

    // get restaurant
    var restaurant = $(this).parent().data("restaurant");
    console.log("restaurant: " + restaurant);

    //get basket groups
    var basketGroups = $(".basket_group");

    // check if restaurant has basket group
    var restaurantInBasket = false;

    $(basketGroups).each(function(index, element){
    	console.log("restaurant loop: " + $(this).data("restaurant"));

    	if ($(this).data("restaurant") === restaurant) {
    		restaurantInBasket = true;
    	}
    });
    console.log(restaurantInBasket);


    // add new group or line depending if restaurant has group
    if (restaurantInBasket == true) {

    	var restaurantGroup = $('.basket_group[data-restaurant="' + restaurant + '"').eq(0)

    	// Get all itemlines for restaurant
    	var itemLines = $(restaurantGroup).find(".basket_group-itemline-title");



    	// filter for product in question and remove
    	$(itemLines).each(function(index, element){
    		console.log($(this).text());


	    	if ($(this).text() == product) {

	    		//if last in restaurant group, remove whole group, else just line
	    		// if was last item for restaurant group, delete whole group
	    		if ($(itemLines).length == 1) {
	    			$(restaurantGroup).remove();
	    			return false;
	    		}

	    		$(this).parent().remove();
	    		return false;
	    	}
    	});

    }

    //update/create itemcount div
    // new restaurant group list
    var restaurantItemList = $('.basket_group[data-restaurant="' + restaurant + '"').find(".basket_group-itemline-title");

    //filter list for this product
    var restaurantItemListFiltered = $(restaurantItemList).filter( function () {
            return $(this).text() == product;
    });

    console.log(restaurantItemList.length);
    console.log(restaurantItemListFiltered.length);

    // if lenght is greater than 0, show count div and list linght
    if (restaurantItemListFiltered.length >= 1) {

        // check if count div exists, if so update count, else prepend count div
        var countDiv = $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".number_in-basket");

        if (countDiv.length == 1) {

            $(countDiv).text(restaurantItemListFiltered.length);

        }

    } else {

        // check if count div exists, if so update count, else prepend count div
        var countDiv = $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".itemtype_in-basket");

        $(countDiv).remove();


    }


    // update basket total price
    var itemLinesPrices = $("#basket").find(".basket_group-itemline-cost-number");

    var total = 0;
    $(itemLinesPrices).each(function () {
        total += parseInt($(this).text(), 10);
    });

    console.log(total);
    $("#basket_total-number").text(total);

   	// get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $(".basket_link-count").text(basketCount);

    // if basket count is 0, dont show checkout button
    if (basketCount === 0) {
      $('#checkout_button').css('display', 'none');
    } else {
      $('#checkout_button').css('display', 'block');
    }

});

// REMOVE FROM BASKET (X)
$("body").on( "click", ".basket_group-itemline-clear", function() {

    if ($("#basket").css("display") === "none") {
                if ($(window).width() > 660) {
                    $("#basket").css("display", "block");
                    $('#basket_link').fadeIn(1000).css("display","none");
                }
            }

    console.log("clicked!");

    // Get restaurant group
    var restaurantGroup = $(this).parents('.basket_group').first();
    console.log(restaurantGroup);

    var restaurant = $(this).parent().parent().data("restaurant");
    var product = $(this).siblings(".basket_group-itemline-title").first().text();

    // Get all itemlines for restaurant
    var itemLines = $(restaurantGroup).find(".basket_group-itemline-title");

    //this itemline
    var itemLine = $(this).parent()
    console.log(itemLine);

    if ($(itemLines).length == 1) {
        $(restaurantGroup).remove();

    } else if ($(itemLines).length > 1) {
        $(itemLine).remove();
    }




    //update/create itemcount div
    // new restaurant group list
    var restaurantItemList = $('.basket_group[data-restaurant="' + restaurant + '"').find(".basket_group-itemline-title");

    //filter list for this product
    var restaurantItemListFiltered = $(restaurantItemList).filter( function () {
            return $(this).text() == product;
    });

    console.log(restaurantItemList.length);
    console.log(restaurantItemListFiltered.length);

    // if lenght is greater than 0, show count div and list linght
    if (restaurantItemListFiltered.length >= 1) {

        // check if count div exists, if so update count, else prepend count div
        var countDiv = $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".number_in-basket");

        if (countDiv.length == 1) {

            $(countDiv).text(restaurantItemListFiltered.length);

        }

    } else {

        // check if count div exists, if so update count, else prepend count div
        var countDiv = $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".itemtype_in-basket");

        $(countDiv).remove();


    }


    // update basket total price
    var itemLinesPrices = $("#basket").find(".basket_group-itemline-cost-number");

    var total = 0;
    $(itemLinesPrices).each(function () {
        total += parseInt($(this).text(), 10);
    });

    console.log(total);
    $("#basket_total-number").text(total);

    // get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $(".basket_link-count").text(basketCount);

    // if basket count is 0, dont show checkout button
    if (basketCount === 0) {
      $('#checkout_button').css('display', 'none');
    } else {
      $('#checkout_button').css('display', 'block');
    }


});


// plus/minus visibility
$('.itemgroup').on('mouseenter', function() {

    $(this).find(".minus_container").css("visibility", "visible");
    $(this).find(".plus_container").css("visibility", "visible");
    console.log("hit");
       // do something

}).on('mouseleave', function() {
    $(this).find(".minus_container").css("visibility", "hidden");
    $(this).find(".plus_container").css("visibility", "hidden");
});

// ADD TO BASKET (title)
$(".itemtype_title").click( function () {

    if ($("#basket").css("display") === "none") {
                if ($(window).width() > 660) {
                    $("#basket").css("display", "block");
                    $('#basket_link').fadeIn(1000).css("display","none");
                }
            }

    // get product
    var product = $(this).siblings(".price_line").first().data("product");

    // get price
    var price = $(this).siblings(".price_line").first().find(".price").first().text();

    // get restaurant
    var restaurant = $(this).siblings(".price_line").first().data("restaurant");

    // get current product count
    //  will get from cart api

    var newBasketGroup = '<div class="basket_group" data-restaurant="' + restaurant + '"><div class="basket_group-restaurant">' + restaurant + '</div><div class="basket_group-itemline"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + product + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div></div>';

    var newItemLine = '<div class="basket_group-itemline"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + product + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div>'

    //get basket groups
    var basketGroups = $(".basket_group");


    // Check if restaurant in has group already
    var restaurantInBasket = false;

    $(basketGroups).each(function(index, element){

        if ($(this).data("restaurant") === restaurant) {
            restaurantInBasket = true;
        }
    });
    console.log(restaurantInBasket);



    // add new group or line depending if restaurant has group
    if (restaurantInBasket == true) {

        // get group and append item
        $('.basket_group[data-restaurant="' + restaurant + '"').eq(0).append(newItemLine);


    } else {
        //append to basket
        $('#basket_groups').append(newBasketGroup);

    }

    //update/create itemcount div
    // new restaurant group list
    var restaurantItemList = $('.basket_group[data-restaurant="' + restaurant + '"').find(".basket_group-itemline-title");

    //filter list for this product
    var restaurantItemListFiltered = $(restaurantItemList).filter( function () {
            return $(this).text() == product;
    });

    console.log(restaurantItemList.length);
    console.log(restaurantItemListFiltered.length);

    // if lenght is greater than 0, show count div and list linght
    if (restaurantItemListFiltered.length >= 1) {

        // check if count div exists, if so update count, else prepend count div
        var countDiv = $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".number_in-basket");

        if (countDiv.length == 1) {

            $(countDiv).text(restaurantItemListFiltered.length);

        } else {

            var countDivNew = '<div class="itemtype_in-basket"><span class="number_in-basket">' + restaurantItemListFiltered.length + '</span> x</div>';
            console.log(countDivNew);

            $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".itemtype_headline").prepend(countDivNew);

        }

    }



    // get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $(".basket_link-count").text(basketCount);

    // if basket count is 0, dont show checkout button
    if (basketCount === 0) {
      $('#checkout_button').css('display', 'none');
    } else {
      $('#checkout_button').css('display', 'block');
    }


    // update basket total price
    var itemLinesPrices = $("#basket").find(".basket_group-itemline-cost-number");

    var total = 0;
    $(itemLinesPrices).each(function () {
        total += parseInt($(this).text(), 10);
    });

    $("#basket_total-number").text(total);


  }
);

// Add to basket via itemlist
$(".itemlist").click( function () {

    if ($("#basket").css("display") === "none") {
                if ($(window).width() > 660) {
                    $("#basket").css("display", "block");
                    $('#basket_link').fadeIn(1000).css("display","none");
                }
            }

    // get product
    var product = $(this).parent().data("product");

    // get price
    var price = $(this).siblings(".itemtype_headline").find(".price").first().text();

    // get restaurant
    var restaurant = $(this).parent().data("restaurant");

    // get current product count
    //  will get from cart api

    var newBasketGroup = '<div class="basket_group" data-restaurant="' + restaurant + '"><div class="basket_group-restaurant">' + restaurant + '</div><div class="basket_group-itemline"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + product + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div></div>';

    var newItemLine = '<div class="basket_group-itemline"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + product + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div>'

    //get basket groups
    var basketGroups = $(".basket_group");


    // Check if restaurant in has group already
    var restaurantInBasket = false;

    $(basketGroups).each(function(index, element){

        if ($(this).data("restaurant") === restaurant) {
            restaurantInBasket = true;
        }
    });
    console.log(restaurantInBasket);



    // add new group or line depending if restaurant has group
    if (restaurantInBasket == true) {

        // get group and append item
        $('.basket_group[data-restaurant="' + restaurant + '"').eq(0).append(newItemLine);


    } else {
        //append to basket
        $('#basket_groups').append(newBasketGroup);

    }

    //update/create itemcount div
    // new restaurant group list
    var restaurantItemList = $('.basket_group[data-restaurant="' + restaurant + '"').find(".basket_group-itemline-title");

    //filter list for this product
    var restaurantItemListFiltered = $(restaurantItemList).filter( function () {
            return $(this).text() == product;
    });

    console.log(restaurantItemList.length);
    console.log(restaurantItemListFiltered.length);

    // if lenght is greater than 0, show count div and list linght
    if (restaurantItemListFiltered.length >= 1) {

        // check if count div exists, if so update count, else prepend count div
        var countDiv = $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".number_in-basket");

        if (countDiv.length == 1) {

            $(countDiv).text(restaurantItemListFiltered.length);

        } else {

            var countDivNew = '<div class="itemtype_in-basket"><span class="number_in-basket">' + restaurantItemListFiltered.length + '</span> x</div>';
            console.log(countDivNew);

            $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".itemtype_headline").prepend(countDivNew);

        }

    }



    // get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $(".basket_link-count").text(basketCount);

    // if basket count is 0, dont show checkout button
    if (basketCount === 0) {
      $('#checkout_button').css('display', 'none');
    } else {
      $('#checkout_button').css('display', 'block');
    }


    // update basket total price
    var itemLinesPrices = $("#basket").find(".basket_group-itemline-cost-number");

    var total = 0;
    $(itemLinesPrices).each(function () {
        total += parseInt($(this).text(), 10);
    });

    $("#basket_total-number").text(total);


  }
);

$( window ).resize(function() {
    if ($(window).width() > 660) {
        $('.restaurant_logo').css({'position': 'relative', 'top': 'auto'});
        $('.menu').css({'position': 'sticky', 'top': '110px'});
    }


    if ($(window).width() <= 660) {
        $('.menu').css({'position': 'relative', 'top': 'auto'});
        $('.restaurant_logo').css({'position': 'sticky', 'top': '92px'});
    }
});




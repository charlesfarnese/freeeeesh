$( document ).ready(function() {
    // get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $("#basket_link_inner-count").text(basketCount);
    $("#basket_link-count").text(basketCount);
});

// curve next delivery text
new CircleType(document.getElementById('next_delivery-date'))
  .radius(70);

// basket fade in
$(document).ready(function(){
    $('#basket_link').click(function() {
        console.log($(window).width());
        if ($(window).width() >= 1280) {
            $('#basket_link').css("display","none");
            $('#basket_link-inner').fadeIn(1000).css("display","block");
            $('#basket').fadeIn(1000).css("display","block");
        }
    });
});

// basket fade out
$(document).ready(function(){
    $('#basket_link-inner').click(function() {
        console.log($(window).width());
          $('#basket_link-inner').css("display","none");
          $('#basket').css("display","none");
          $('#basket_link').fadeIn(1000).css("display","block");
    });
});

// box scroll
$("#box_scroll-container").click(function() {
    $('html, body').animate({
        scrollTop: $("#box_scroll-target").offset().top
    }, 1000);
});



// UPDATE CART ON CLICK

//ADD TO BASKET (TITLE)
$(".itemtype_title").click( function () {



});

// ADD TO BASKET (+)
$(".plus_container").click( function () {
	
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

            $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".itemtype_title").prepend(countDivNew);

        }

    }


   	// get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $("#basket_link_inner-count").text(basketCount);
    $("#basket_link-count").text(basketCount);


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
    $("#basket_link_inner-count").text(basketCount);
    $("#basket_link-count").text(basketCount);

});

// REMOVE FROM BASKET (X)
$("body").on( "click", ".basket_group-itemline-clear", function() {

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
    $("#basket_link_inner-count").text(basketCount);
    $("#basket_link-count").text(basketCount);


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

            $('.itemgroup[data-restaurant="' + restaurant + '"][data-product="' + product + '"]').find(".itemtype_title").prepend(countDivNew);

        }

    }



    // get basket count from number of itemlines
    var basketCount = $('.basket_group-itemline').length;
    $("#basket_link_inner-count").text(basketCount);
    $("#basket_link-count").text(basketCount);


    // update basket total price
    var itemLinesPrices = $("#basket").find(".basket_group-itemline-cost-number");

    var total = 0;
    $(itemLinesPrices).each(function () {
        total += parseInt($(this).text(), 10);
    });

    $("#basket_total-number").text(total);

    
  }
);













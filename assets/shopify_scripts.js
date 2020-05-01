var productIdGlobal
var collectionIdGlobal

//UPDATE BASKET COUNT AND ITEM COUNTS ON PAGE LOAD 
$( document ).ready(function() {

    // Get basket from shopify and fill
    jQuery.get(
        '/cart.js',
         function fillCartData( data ) {

            console.log(data);

            // Get itemcount for basket links
            var basketCount = data.item_count
            $(".basket_link-count").text(basketCount);

            // Get line items for basket
            var itemLines = data.items

            // get basket total
            $("#basket_total-number").text(data.total_price / 100);

            $.each( itemLines, function( key, line ) {
              
                //get quantity of each product and build itemlines in the basket
                var title = line.title;
                var quantity = line.quantity;
                var price = line.price / 100;
                var productName = line.product_title;
                var restaurantName = line.vendor;
                var productId = line.variant_id;
                var collectionId = line.properties.collectionId;

                //Build basket group
                var newBasketGroup = '<div class="basket_group" data-restaurant="' + restaurantName + '" data-restaurant-id="' + collectionId + '"><div class="basket_group-restaurant">' + restaurantName + '</div><div class="basket_group-itemline" data-product="' + productName + '" data-product-id="' + productId + '"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + productName + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div></div>';

                var newItemLine = '<div class="basket_group-itemline" data-product="' + productName + '" data-product-id="' + productId + '"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + productName + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div>'


                // add the number of itemlines to front end basket depending on quantity and if basket group exists
                var i;
                for (i = 0; i < quantity; i++) {

                    //get basket group
                    var basketGroup = $('.basket_group[data-restaurant-id="' + collectionId + '"');

                    // add new group or line depending if restaurant has group
                    if (basketGroup[0]) {

                        // get group and append
                        $(basketGroup).append(newItemLine);

                    } else {
                        //append to basket
                        $('#basket_groups').append(newBasketGroup);

                    }
                 
                }

                //Build count divs
                var countDivNew = '<div class="itemtype_in-basket"><span class="number_in-basket">' + quantity + '</span> x</div>';

                console.log(countDivNew);

                $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".itemtype_headline").prepend(countDivNew);



            });
        }, 
        'json'
    );
});

//Get Cart Quantity
// function getCartQuantity(productId) {
//     //add item to cart
//     jQuery.get('/cart.js', function( data ) {

//             console.log(data);
//             console.log(productId);
//             // Get line items for basket
//             var itemLines = data.items

//             $.each( itemLines, function( key, line ) {

//                 if (parseInt(productId) === line.variant_id) {
//                     console.log('match!');
//                     console.log(line.quantity);
//                     var quantity = line.quantity - 1;
//                     removeFromShopifyCart(productId, quantity);
//                 }

//             });

//             },
//             'json');
// }

// SHOPIFY AJAX CART UPDATE (ADD)
function addToShopifyCart(productId, collectionId) {

    console.log("ajax add to cart begins");
    // var data = { "items": [{"quantity": 1, "id": productId}]};
    // console.log(data);

    //add item to cart
    jQuery.post('/cart/add.js',
            {items:[{quantity: 1, 
            id: parseInt(productId), properties: {'collectionId': parseInt(collectionId)} } ]},
            function( data ) {

                console.log(data);

                // Get basket from shopify and fill
                jQuery.get(
                    '/cart.js',
                     function fillCartData( data ) {

                        console.log(data);

                        // Get itemcount for basket links
                        var basketCount = data.item_count
                        $(".basket_link-count").text(basketCount);

                        // Get line items for basket
                        var itemLines = data.items

                        // get basket total
                        $("#basket_total-number").text(data.total_price / 100);

                        $.each( itemLines, function( key, line ) {

                          
                            //get quantity of each product and build itemlines in the basket
                            var title = line.title;
                            var quantity = line.quantity;
                            var price = line.price / 100;
                            var productName = line.product_title;
                            var restaurantName = line.vendor;
                            var productId = line.variant_id;
                            var collectionId = line.properties.collectionId;

                            //if this is product to removes line, subtract 1 from quantity

                            //Build basket group
                            var newBasketGroup = '<div class="basket_group" data-restaurant="' + restaurantName + '" data-restaurant-id="' + collectionId + '"><div class="basket_group-restaurant">' + restaurantName + '</div></div>';

                            var newItemLine = '<div class="basket_group-itemline" data-product="' + productName + '" data-product-id="' + productId + '"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + productName + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div>'

                            //get basket group
                            var basketGroup = $('.basket_group[data-restaurant-id="' + collectionId + '"');

                            console.log("basketgroup list length");
                            console.log(basketGroup.length);


                            // if exists empty it out to iterate new data
                            if (basketGroup.length !== 0) {
                                console.log("basketgroup exists!!! removing current item lines");
                                $(basketGroup).find('.basket_group-itemline[data-product-id="' + productId + '"').remove();

                                var i;
                                for (i = 0; i < quantity; i++) {

                                    $(basketGroup).append(newItemLine);

                                }

                            } else {
                                // otherwise create empty basket group
                                $('#basket_groups').append(newBasketGroup);

                                var i;
                                for (i = 0; i < quantity; i++) {

                                    $('.basket_group[data-restaurant-id="' + collectionId + '"').append(newItemLine);

                                }
                            }

                            //build count divs
                            // check if count div exists, if so update count, else prepend count div
                            var countDiv = $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".number_in-basket");

                            if (countDiv.length == 1) {

                                $(countDiv).text(quantity);

                            } else {

                            var countDivNew = '<div class="itemtype_in-basket"><span class="number_in-basket">' + quantity + '</span> x</div>';
                            console.log(countDivNew);

                            $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".itemtype_headline").prepend(countDivNew);

                            }



                        });
                    }, 
                    'json'
                );


            }, 

            'json');

    
}

function removeFromShopifyCart(productId, collectionId, quantity) {

    // Get basket from shopify and fill
    jQuery.post(
        '/cart/change.js',
        { quantity: quantity, id: parseInt(productId) },
         function fillCartData( data ) {

            console.log(data);
            console.log(productId);

            var itemIsInCart = false; 
            var restaurantIsInCart = false;

            // Get itemcount for basket links
            var basketCount = data.item_count;
            $(".basket_link-count").text(basketCount);

            // Get line items for basket
            var itemLines = data.items

            // set basket total
            $("#basket_total-number").text(data.total_price / 100);


            // if cart not empty
            if (itemLines.length !== 0) {   

                // if the item is in the cart, fill
                $.each( itemLines, function( key, line ) {

                    var variantId = line.variant_id;
                    var collectionId = line.properties.collectionId;

                    console.log("collectionId " + collectionId)
                    console.log("variantId " + variantId)

                    if (collectionIdGlobal === collectionId) {
                        console.log("restaurant is in cart!");
                        restaurantIsInCart = true;
                    }



                    if (productIdGlobal === variantId) {

                        console.log('lets goooooo');

                        itemIsInCart = true;

                        //get quantity of each product and build itemlines in the basket
                        var title = line.title;
                        var quantity = line.quantity;
                        var price = line.price / 100;
                        var productName = line.product_title;
                        var restaurantName = line.vendor;
                        var productId = line.variant_id;
                        var collectionId = line.properties.collectionId;

                        //Build basket group
                        var newBasketGroup = '<div class="basket_group" data-restaurant="' + restaurantName + '" data-restaurant-id="' + collectionId + '"><div class="basket_group-restaurant">' + restaurantName + '</div></div>';

                        var newItemLine = '<div class="basket_group-itemline" data-product="' + productName + '" data-product-id="' + productId + '"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + productName + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div>'

                        //get basket group
                        var basketGroup = $('.basket_group[data-restaurant-id="' + collectionId + '"');

                        console.log("basketgroup list length");
                        console.log(basketGroup.length);

                        // if exists empty it out to iterate new data
                        if (basketGroup.length !== 0) {
                            console.log("basketgroup exists!!! removing current item lines");
                            $(basketGroup).find('.basket_group-itemline[data-product-id="' + productId + '"').remove();

                            var i;
                            for (i = 0; i < quantity; i++) {

                                $(basketGroup).append(newItemLine);

                            }

                        } else {
                            // otherwise create empty basket group
                            $('#basket_groups').append(newBasketGroup);

                            var i;
                            for (i = 0; i < quantity; i++) {

                                $('.basket_group[data-restaurant-id="' + collectionId + '"').append(newItemLine);

                            }
                        }

                        //build count divs
                        // check if count div exists, if so update count, else prepend count div
                        var countDiv = $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".number_in-basket");

                        if (countDiv.length == 1) {

                            $(countDiv).text(quantity);

                        } else {

                        var countDivNew = '<div class="itemtype_in-basket"><span class="number_in-basket">' + quantity + '</span> x</div>';
                        console.log(countDivNew);

                        $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".itemtype_headline").prepend(countDivNew);

                        }

                    }

                        
                });  

            }


            console.log(itemIsInCart);
            if (itemIsInCart === false)  {

                    //remove item count
                    $('.itemgroup[data-product-id="' + productId + '"').find('.itemtype_in-basket').remove();
                    $('.basket_group[data-restaurant-id="' + collectionId + '"').find('.basket_group-itemline[data-product-id="' + productId + '"').remove();



            }

            console.log(restaurantIsInCart);
            if (restaurantIsInCart === false)  {

                    //remove item count
                    $('.basket_group[data-restaurant-id="' + collectionId + '"').remove();


            }          

        }, 
        'json'
    );
}

// // UPDATE/CREATE/DELETE INLINE ITEMCOUNT
// function updateMenuItemCount(productId, collectionId, action) {

//     console.log("update menu itemcount start")
//     console.log("product id: " + productId)
//     console.log("collection id: " + collectionId)
//     console.log("action: " + action)

//     //get list of products from basket
//     var restaurantItemList = $('.basket_group[data-restaurant-id="' + collectionId + '"').find('.basket_group-itemline[data-product-id="' + productId + '"');

//     console.log(restaurantItemList.length);

//     if (action === "add") {
//         // if length is greater than 0, show item count div
//         if (restaurantItemList.length >= 1) {

//             // check if count div exists, if so update count, else prepend count div
//             var countDiv = $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".number_in-basket");

//             if (countDiv.length == 1) {

//                 $(countDiv).text(restaurantItemList.length);

//             } else {

//                 var countDivNew = '<div class="itemtype_in-basket"><span class="number_in-basket">' + restaurantItemList.length + '</span> x</div>';
//                 console.log(countDivNew);

//                 $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".itemtype_headline").prepend(countDivNew);

//             }

//         }
//     } else if (action === "remove") {

//         console.log('passed remove if');

//         // if lenght is greater than 0, show count div and list linght
//         if (restaurantItemList.length >= 1) {

//             console.log('restaurantitemlist >=1');
//             // check if count div exists, if so update count, else prepend count div
//             var countDiv = $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".number_in-basket");

//             console.log('count div length: ' + countDiv.length);

//             if (countDiv.length == 1) {
//                 console.log('countdiv=1');

//                 $(countDiv).text(restaurantItemList.length);

//             } 

//         } else {

//             console.log('countdiv != 1');
//             // check if count div exists, if so update count, else prepend count div
//             var countDiv = $('.itemgroup[data-restaurant-id="' + collectionId + '"][data-product-id="' + productId + '"]').find(".itemtype_in-basket");

//             $(countDiv).remove();


//         }

//     }  

// }

// ADD REMOVE ITEMLINES AND BASKET GROUPS
// function updateBasket(productId, collectionId, price, action) {

//     console.log("update basket start")
//     console.log("product id: " + productId)
//     console.log("collection id: " + collectionId)
//     console.log("price: " + price)
//     console.log("action: " + action)


//     // get restaurant/product names
//     var restaurantName = $('.menu[data-restaurant-id="' + collectionId + '"').first().data('restaurant')
//     var productName = $('.menu[data-restaurant-id="' + collectionId + '"').find('.itemgroup[data-product-id="' + productId + '"').first().data('product')

//     // create variables for new basket group and new itemline
//     var newBasketGroup = '<div class="basket_group" data-restaurant="' + restaurantName + '" data-restaurant-id="' + collectionId + '"><div class="basket_group-restaurant">' + restaurantName + '</div><div class="basket_group-itemline" data-product="' + productName + '" data-product-id="' + productId + '"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + productName + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div></div>';
//     var newItemLine = '<div class="basket_group-itemline" data-product="' + productName + '" data-product-id="' + productId + '"><div class="basket_group-itemline-clear">x</div><div class="basket_group-itemline-title">' + productName + '</div><div class="basket_group-itemline-dots">.............................................................................................................................................................</div><div class="basket_group-itemline-cost">£<span class="basket_group-itemline-cost-number">' + price + '</span></div></div>'

//     //get basket groups
//     var basketGroup = $('.basket_group[data-restaurant-id="' + collectionId + '"');

//     // if adding to basket, do this
//     if (action === "add") {
//         // add new group or line depending if restaurant has group
//         if (basketGroup[0]) {

//             // get group and append
//             $(basketGroup).append(newItemLine);

//         } else {
//             //append to basket
//             $('#basket_groups').append(newBasketGroup);

//         }
//     } else if (action === 'remove') {

//         console.log('passed remove if');

//         if (basketGroup[0]) {

//             console.log('passed basketgroup[0] if');

//             // Get all itemlines for restaurant
//             var itemLines = $(basketGroup).find('.basket_group-itemline');

//             console.log(itemLines.length);

//             // If last itemline remove
//             if ($(itemLines).length == 1) {

//                 $(basketGroup).remove();

//             } else {

//                 $('.basket_group-itemline[data-product-id="' + productId + '"').last().remove()
//             }
            
//         }

//     }

// }


// add to basket (+)
$(".plus_container").click( function () {
    
    // get product
    var productId = $(this).parent().data("product-id");
    console.log("product id: " + productId);

    // get restaurant/collection id
    var collectionId = $(this).parent().data("restaurant-id");
    console.log("restaurant id: " + collectionId);

    addToShopifyCart(productId, collectionId);
    
  }
);

// add to basket (title)
$(".itemtype_title").click( function () {
    
    // get product
    var productId = $(this).siblings(".price_line").first().data("product-id");

    // get restaurant
    var collectionId = $(this).siblings(".price_line").first().data("restaurant-id");

    addToShopifyCart(productId, collectionId);
    
  }
);

// add to basket (itemlist)
$(".itemlist").click( function () {
    
    // get product
    var productId = $(this).parent().data("product-id");

    // get restaurant
    var collectionId = $(this).parent().data("restaurant-id");

    addToShopifyCart(productId, collectionId);
    
  }
);



//remove from basket (minus)
$(".minus_container").click( function () {
    // get product
    var productId = $(this).parent().data("product-id");
    productIdGlobal = productId;
    console.log("productIdGlobal: " + productIdGlobal);
    var collectionId = $(this).parent().data('restaurant-id');
    collectionIdGlobal = parseInt(collectionId,10);
    console.log("collectionIdGlobal: " + collectionIdGlobal);
    var inBasket = $('.itemgroup[data-product-id="' + productId + '"').find('.number_in-basket').first().text()

    if (inBasket) {

        newInBasket = parseInt(inBasket) - 1;

        removeFromShopifyCart(productId, collectionId, newInBasket)

    }


});

// remove from basket (x)
$("body").on( "click", ".basket_group-itemline-clear", function() {

    var productId = $(this).parent().data('product-id');
    productIdGlobal = productId;
    console.log("productIdGlobal: " + productIdGlobal);
    var collectionId = $(this).parent().parent().data('restaurant-id');
    collectionIdGlobal = parseInt(collectionId,10);
    console.log("collectionIdGlobal: " + collectionIdGlobal);
    var inBasket = $('.itemgroup[data-product-id="' + productId + '"').find('.number_in-basket').first().text()
    if (inBasket) {

        newInBasket = parseInt(inBasket) - 1;

        removeFromShopifyCart(productId, collectionId, newInBasket);

    }

});


// JS STYLING CONTROL

//Sticky tits
stickybits('#panel_head_sticky', {stickyBitStickyOffset: 0}, {scrollEl: 'box_scroll-target'});
stickybits('#first_col-container', {stickyBitStickyOffset: 40}, {scrollEl: 'left-col'});
stickybits('.menu', {stickyBitStickyOffset: 110}, {scrollEl: 'split-columns'});

// curve next delivery text
new CircleType(document.getElementById('next_delivery-date'))
  .radius(60);

  new CircleType(document.getElementById('next_delivery-date-mobile'))
  .radius(60);


// hide basket on scroll (mobile)
$(document).ready(function(){
    document.addEventListener('scroll', function(event) {
        var basket = document.getElementById("basket");

            if ($("#basket").css("display") === "block" && $("#basket").css("position") === "fixed") {
                $("#basket").css("display", "none");
                if ($(window).width() > 660) {
                    $('#basket_link').fadeIn(1000).css("display","block");
                }
            }

    });
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

// basket fade in
$(document).ready(function(){
    $('#basket_link').click(function() {
        console.log($(window).width());
            $('#basket_link').css("display","none");
            $('#basket_link-inner').fadeIn(1000).css("display","block");
            $('#basket').fadeIn(1000).css("display","block");

    });
});

// basket fade out
$(document).ready(function(){
    $('#basket_link-inner').click(function() {
          $('#basket_link-inner').css("display","none");
          $('#basket').css("display","none");
          if ($(window).width() > 660) {
            $('#basket_link').fadeIn(1000).css("display","block");
        }
    });
});

//mobile basket open 
$(document).ready(function(){
    $('#basket_link_mobile').click(function() {
            $('#left-col').css("visibility","visible");
            $('#basket_link-inner').fadeIn(1000).css("display","block");
            $('#basket').fadeIn(1000).css("display","block");
    });
});

// box scroll
$("#box_scroll-container").click(function() {
    $('html, body').animate({
        scrollTop: $("#box_scroll-target").offset().top
    }, 1000);
});



// document.addEventListener('click', function(event) {
//         var basket = document.getElementById("basket");
//         var basketLink = document.getElementById("basket_link");
//         var clearItem = document.getElementsByClassName("basket_group-itemline-clear")
//         var clickInBasket = basket.contains(event.target);
//         var clickInBasketLink = basketLink.contains(event.target);
//         var clickClearItem = clearItem.contains(event.target);

//             if (!clickInBasket && !clickInBasketLink && !clickClearItem && $("#basket").css("display") === "block" && $("#basket").css("position") === "fixed") {
//                 $("#basket").css("display", "none");
//                 $('#basket_link').fadeIn(1000).css("display","block");
//             }

//     });












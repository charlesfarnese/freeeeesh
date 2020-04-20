// When picture panel section reaches top of screen, 
// scroll corresponding menu pane into view

// Get list of picture panes
var  pictures = document.getElementsByClassName("pictures");
$window = $(window);
var pictures_column = document.getElementById("pictures-column");
var menu_container = $('#menu-column')

// Function to bring menu pane in to view
function menuScroll(menu_number) {
  // Do something with the scroll position

}

function checkPosition(item) {
	var distance = $(item).offset().top;
	var section_id = $(item).attr('id');
	var section_number = section_id.slice(8);


	if ($window.scrollTop() == distance ) {
        // Your div has reached the top
        menu_id = ''.concat('#menu',section_number);
        // var panel = document.getElementById(menu_id);
        var top = $(menu_id).position().top,
        currentScroll = menu_container.scrollTop();

        menu_container.animate({scrollTop: currentScroll + top}, 1000);

    }

}

// Add event listener for scrooling
pictures_column.addEventListener('scroll', function() {

	for (var i = 0; i < pictures.length; i++) {
    	checkPosition(pictures[i]); //second console output
	}
  
});

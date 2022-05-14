/*!
 * CustomTooltips
 * A very simple and lightweight tooltips system created with vanilla JavaScript
 *
 * @version v1.0
 * @author oscarcweb <rehr_roste@aleeas.com>
 * @github https://github.com/oscarcweb/CustomTooltips
 * @license MIT
 */
(function() {

function getWidth() {
	return Math.max(
	document.body.scrollWidth,
	document.documentElement.scrollWidth,
	document.body.offsetWidth,
	document.documentElement.offsetWidth,
	document.documentElement.clientWidth
	);
}

function getHeight() {
	return Math.max(
	document.body.scrollHeight,
	document.documentElement.scrollHeight,
	document.body.offsetHeight,
	document.documentElement.offsetHeight,
	document.documentElement.clientHeight
	);
}

let page_width = getWidth();

function tooltipPosition( action=0 ) {

	var xoffset = 5,
		yoffset = 15,
		no_more = 0;
	document.onmousemove = function (e) {

		if ( action || no_more ) return;

		var width = e.clientX + xoffset + window.scrollX,
			height = e.clientY + yoffset + window.scrollY;

		/** Fix width tooltip */
		var tooltip = document.getElementById("tooltip-js");

		if ( ( width + tooltip.offsetWidth ) > getWidth() ) {
			width = width - tooltip.offsetWidth;
			pop.classList.add("arrow-left");
		}
		else {
			pop.classList.remove("arrow-left");
		}

		if ( ( height + tooltip.offsetHeight ) > getHeight() ) {
			height = height - tooltip.offsetHeight;
		}

		/*console.log( `height: ${height+tooltip.offsetHeight} - ${getHeight()} - tooltip: ${tooltip.offsetHeight} - scrollY: ${window.scrollY}` )*/

		pop.style.top = height + "px";
		pop.style.left = width + "px";

		no_more = 0;

	};
}


/** Is the tooltip-js in the page? */
!document.getElementById("tooltip-js") ? document.body.insertAdjacentHTML("beforeend", '<div id="tooltip-js"></div>') : null;

let pop = document.getElementById("tooltip-js");

document.querySelectorAll( "[data-tooltip]" ).forEach( el => {

	let text = el.getAttribute("data-tooltip");

	/** On hover tooltip */
	el.addEventListener("mouseover", function (event) {

		tooltipPosition();
		pop.innerHTML = text;
		pop.style.display = "block";

	})

	/** On leave tooltip */
	el.addEventListener("mouseleave", function (event) {

		tooltipPosition(1);
		pop.style.display = "none";

	})

});

})()
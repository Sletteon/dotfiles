var Timer = function (interval) {
	var updateInterval = interval;
	var handlers = [];
	var timeOut = null;
	var pub = {};
	var i;
	
	function updateHandlers() {
		for (i = 0; i < handlers.length; i += 1) {
			handlers[i]();
		}
		timeOut = setTimeout(updateHandlers, interval);
	}
	
	pub.subscribe = function (handler) {
		handlers.push(handler);
	};
	
	pub.unsubscribe = function (handler) {
		handlers.pop(handler);
	};
		
	pub.destroy = function () {
		if (timeOut) {
			clearTimeout(timeOut);
		}
	};
	
	updateHandlers();

	return pub;
};
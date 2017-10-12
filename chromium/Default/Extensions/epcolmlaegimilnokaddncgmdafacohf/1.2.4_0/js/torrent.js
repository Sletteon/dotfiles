function Torrent(id, data) {
	this.id = id;
	this.name = data.name;
	this.progress = data.progress;
	this.state = data.state;
	this.size = data.total_size;
	this.position = data.queue;
	this.speedDownload = data.download_payload_rate;
	this.speedUpload = data.upload_payload_rate;
	this.eta = data.eta;
	this.autoManaged = data.is_auto_managed;
	this.ratio = data.ratio;
	this.num_seeds = data.num_seeds;
	this.total_seeds = data.total_seeds;
	this.num_peers = data.num_peers;
	this.total_peers = data.total_peers;
	this.seeds_peers_ratio = data.seeds_peers_ratio;
	this.is_finished = data.is_finished;
	this.is_seed = data.is_seed;
	this.active_time = data.active_time;
	this.seeding_time = data.seeding_time;
	this.time_added = data.time_added;
	this.tracker_host = data.tracker_host;
	this.tracker_status = data.tracker_status;
	this.label = data.label;
}

Torrent.prototype.calcSize = function (size) {
	var bytes = size / 1024.0;
	if (bytes < 1024) {
		return bytes.toFixed(1) + ' KiB';
	}

	bytes = bytes / 1024;
	if (bytes < 1024) {
		return bytes.toFixed(1) + ' MiB';
	}

	return (bytes / 1024).toFixed(1) + ' GiB';
};

Torrent.prototype.getHumanSize = function () {
	return this.calcSize(this.size);
};
Torrent.prototype.getHumanDownloadedSize = function() {
	return this.calcSize(this.size * this.progress / 100)
}
Torrent.prototype.getRatio = function() {
	return this.ratio.toFixed(2);
}

Torrent.prototype.getPosition = function () {
	if (this.position < 0) {
		return '';
	}
	return this.position + 1;
};

Torrent.prototype.getPercent = function () {
	return (Math.round(this.progress * Math.pow(10, 2)) / Math.pow(10, 2)) + '%';
};

Torrent.prototype.getDownload = function () {
	return this.calcSize(this.speedDownload) + '/s';
};

Torrent.prototype.getUpload = function () {
	return this.calcSize(this.speedUpload) + '/s';
};

Torrent.prototype.getSpeeds = function () {
	return "↓" + this.getDownload() + " - ↑" + this.getUpload();
};

Torrent.prototype.getEta = function () {
	var secs = 0, mins = 0, hours = 0, days = 0
		, time = this.eta;

	if (time === 0) {
		return '&infin;';
	}

	time = time.toFixed(0);
	if (time < 60) {
		return time + 's';
	}

	time = time / 60;
	if (time < 60) {
		mins = Math.floor(time);
		secs = Math.round(60 * (time - mins));

		if (secs > 0) {
			return mins + 'm' + ' ' + secs + 's';
		}
		return mins + 'm';
	}

	time = time / 60;
	if (time < 24) {
		hours = Math.floor(time);
		mins = Math.round(60 * (time - hours));

		if (mins > 0) {
			return hours + 'h' + ' ' + mins + 'm';
		}
		return hours + 'h';
	}

	time = time / 24;
	days = Math.floor(time);
	hours = Math.round(24 * (time - days));
	if (hours > 0) {
		return days + 'd' + ' ' + hours + 'h';
	}
	return days + 'd';
};

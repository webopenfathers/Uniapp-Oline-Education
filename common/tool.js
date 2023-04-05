export default {
	// kb转GB和MB
	bytesToSize(bytes) {
		if (bytes === 0) return '0 KB';
		var k = 1000, // or 1024
			sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	},

}
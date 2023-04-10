export default {
	// kb转GB和MB
	bytesToSize(bytes) {
		if (bytes === 0) return '0 KB';
		var k = 1000, // or 1024
			sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			i = Math.floor(Math.log(bytes) / Math.log(k));
		return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	},

	// 秒转时分秒
	formatSeconds(endTime) {
		let secondTime = parseInt(endTime)
		let min = 0
		let h = 0
		let result = ''
		if (secondTime > 60) {
			min = parseInt(secondTime / 60)
			secondTime = parseInt(secondTime % 60)
			if (min > 60) {
				h = parseInt(min / 60)
				min = parseInt(min % 60)
			}
		}
		result =
			`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
		return result
	},

}
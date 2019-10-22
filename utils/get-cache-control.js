const path = require('path')

module.exports = (localFile, source) => {
	let CacheControl
	if (
		path.basename(localFile) === 'service-worker.js'
		|| localFile.indexOf(path.join(source, 'workbox-') !== -1)
	) {
		// never cache the service workers
		CacheControl = 'no-cache'
	} else {
		switch (path.extname(localFile)) {
			case '.html':
			case '.json':
				// cache for 2 minutes
				CacheControl = 'max-age=120, public, no-transform'
				break
			default:
				// cache "forever"
				CacheControl = 'max-age=604800, public, no-transform'
		}
	}
	console.log(`Uploading -> ${localFile}`)
	return CacheControl
}

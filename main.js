const getClient = require('./utils/get-client.js')
const getCacheControl = require('./utils/get-cache-control.js')

module.exports = (key, secret, src, dist, bucket, region, sync) => {
	const client = getClient(key, secret, region)
	const uploader = client.uploadDir({
		localDir      : src,
		deleteRemoved : sync,
		s3Params      : {
			Bucket : bucket,
			Prefix : dist
		},
		getS3Params : (localFile, stat, callback) => {
			const CacheControl = getCacheControl(localFile, src)
			callback(null, { CacheControl })
		}
	})
	uploader.on('error', (err) => console.log('error', err))
	uploader.on('end', () => console.log('Finished.'))
}

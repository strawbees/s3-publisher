const s3 = require('@monolambda/s3')

module.exports = (key, secret, region) =>
	s3.createClient({
		maxAsync                 : 20,
		s3RetryCount             : 3,
		s3RetryDelay             : 1000,
		multipartUploadThreshold : 2097152999,
		multipartUploadSize      : 1572864000,
		s3Options                : {
			accessKeyId     : key,
			secretAccessKey : secret,
			region
			// any other options are passed to new AWS.S3()
			// See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
		}
	})

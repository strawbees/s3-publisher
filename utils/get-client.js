const s3 = require('@monolambda/s3');

module.exports = (key, secret) => {
	return s3.createClient({
		maxAsync: 20,
		s3RetryCount: 3,
		s3RetryDelay: 1000,
		multipartUploadThreshold: 20971520,
		multipartUploadSize: 15728640,
		s3Options: {
			accessKeyId: key,
			secretAccessKey: secret,
			// any other options are passed to new AWS.S3()
			// See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
		}
	})
}

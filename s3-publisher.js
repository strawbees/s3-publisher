#!/usr/bin/env node
require('dotenv').config()
const s3 = require('@monolambda/s3')
const program = require('commander')
const pkg = require('./package.json')
const getClient = require('./utils/get-client.js')
const getCacheControl = require('./utils/get-cache-control.js')

program
	.option('-b, --bucket <bucket>', 'S3 Bucket name. Required `BUCKET` in your environment variables.')
	.option('-s, --source <path>', 'Local folder path. Required.')
	.option('-d, --destination <path>', 'Path on S3 Bucket (Prefix).')
	.option('--sync', 'Sync local folder with bucket. This will remove files on the S3 Bucket that are not on `--source`.')
	.description(`Command line tool for publishing to Amazon S3.`)
	.version(pkg.version, '-v, --version')

program.parse(process.argv)

const SOURCE = program.source
const DESTINATION = program.destination
const BUCKET = process.env.S3_BUCKET ? process.env.S3_BUCKET : program.bucket
const SYNC = program.sync || false
const ACCESS_KEY = process.env.S3_KEY
const SECRET = process.env.S3_SECRET

if (!BUCKET) {
	console.log('You must specify `--bucket`.\n')
	program.help()
	return
}
if (!SOURCE) {
	console.log('You must specify `--source`.\n')
	program.help()
	return
}

const client = getClient(ACCESS_KEY, SECRET)
const uploader = client.uploadDir({
	localDir: SOURCE,
	deleteRemoved: SYNC,
	s3Params: {
		Bucket: BUCKET,
		Prefix: DESTINATION
	},
	getS3Params: (localFile, stat, callback) => {
		let CacheControl = getCacheControl(localFile, SOURCE)
		callback(null, { CacheControl })
	}
})
uploader.on('error', (err) => console.log('error', err))
uploader.on('end', () => console.log('Finished.'))

#!/usr/bin/env node
require('dotenv').config()
const program = require('commander')
const pkg = require('./package.json')
const main = require('./main.js')

program
	.option('-b, --bucket <bucket>', 'S3 Bucket name, overwrites environment variable `S3_BUCKET`.')
	.option('-r, --region <region>', 'S3 Bucket region, overwrites environment variable `S3_REGION`.')
	.option('-s, --source <path>', 'Local folder path. Required.')
	.option('-d, --destination <path>', 'Path on S3 Bucket (Prefix).')
	.option('--sync', 'Sync local folder with bucket. This will remove files on the S3 Bucket that are not on `--source`.')
	.description('Command line tool for publishing to Amazon S3.')
	.version(pkg.version, '-v, --version')

program.parse(process.argv)

const ACCESS_KEY = process.env.S3_KEY
const SECRET = process.env.S3_SECRET
const SOURCE = program.source
const DESTINATION = program.destination
const BUCKET = program.bucket || process.env.S3_BUCKET
const REGION = program.region || process.env.S3_REGION
const SYNC = program.sync || false


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

main(ACCESS_KEY, SECRET, SOURCE, DESTINATION, BUCKET, REGION, SYNC)

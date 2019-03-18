#!/usr/bin/env node
const program = require('commander')
const pkg = require('./package.json')

program
	.description(`Command line tool for publishing to Amazon S3.`)
	.version(pkg.version, '-v, --version')

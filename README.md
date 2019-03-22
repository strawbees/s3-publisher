# Strawbees S3 Publisher

Command line tool for publishing files to Amazon S3 Buckets. It's a thin API layer on top of [@monolambda/s3](https://www.npmjs.com/package/@monolambda/s3) npm package.

## Installing

```
npm install --save @strawbees/s3-publisher
```

## Usage

### Environment variables

Make sure `S3_KEY` and `S3_SECRET` (AWS credentials) are set amongst your environment variables. You can provide a environment config file `.env`.

Optionally you can set `S3_BUCKET` and `S3_REGION` and this will override the option `--bucket` and `--region` if given.

An example of `.env` file would be:

```
S3_KEY="123"
S3_SECRET="iwatchpeppapig"
S3_BUCKET="my-bucket-on-s3"
S3_REGION="us-west-1"
```

### Client API

```
Usage: s3-publisher [options]

Command line tool for publishing to Amazon S3.

Options:
  -b, --bucket <bucket>     S3 Bucket name. Required `BUCKET` in your environment variables.
  -s, --source <path>       Local folder path. Required.
  -d, --destination <path>  Path on S3 Bucket (Prefix).
  -r, --region <region>     S3 Bucket region.
  --sync                    Sync local folder with bucket. This will remove files on the S3 Bucket that are not on `--source`.
  -v, --version             output the version number
  -h, --help                output usage information
```

## Example

Assuming your project has `s3-publisher` installed, it should be available to `npm` as a "binary". That means you can call it from `package.json` scripts:

```json
{
	"scripts": {
		"build": "build --output ./dist",
		"publish": "s3-publisher -b bucket-name -s ./dist --sync",
		"ci": "npm run build && npm run publish"
	}
}
```

If you don't want to commit the name of your bucket, set `S3_BUCKET` environment variable with the name of your bucket and just skip the `--bucket` option. The same applies to the `--region` option and the `S3_REGION` environment variable.

# MUSIC STREAM SERVER WITH CLIENT IN REACT

## TODO

1. ~~Stream server accessing local files + basic client.~~
2. ~~Retrieve playlist from server using Redux~~
2. ~~Accessing Remote host.~~
3. Broadcasting what are you listening.
4. Stream server seeking positions.
5. Radio mode.

## CONFIGURATION
The configuration file `config.json` can be found in the root directory, there you can decide to load the songs
from `local` or `S3`.

### Local
If you load from local, the songs must be in the `audios` folder.

### S3
To load songs from an S3 bucket you must set the following environment variables:
```
 $ export AWS_ACCESS_KEY_ID="Your AWS access key"
 $ export AWS_SECRET_ACCESS_KEY="Your AWS secret access key"
 $ export STREAM_BUCKET="your-bucket-name"
```

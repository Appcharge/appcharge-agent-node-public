# NodeJS Mock publisher webhooks template
### How to run manually (node & npm required)
KEY='[KEY GOES HERE]' FACEBOOK_APP_SECRET='[FACEBOOK APP SECRET GOES HERE]' APPLE_SECRET_API='[APPLE SECRET API GOES HERE]' npm start

### How to build docker image
docker build -t appcharge/server .

### How to run the container locally
docker run --rm -it -e KEY='[KEY GOES HERE]' -e FACEBOOK_APP_SECRET='[FACEBOOK APP SECRET GOES HERE]' -e APPLE_SECRET_API='[APPLE SECRET API GOES HERE]'-p8080:8080 appcharge/server

### Where to get the key
Go to the admin panel, open the integration tab, if you are using signature authentication - copy the key from the primary key field, if you are using encryption, take the key from the primary key field and the IV from the secondary key field.

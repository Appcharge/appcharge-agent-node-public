# NodeJS Mock publisher webhooks template

The agent is covering documentation of Appcharge services described on [Getting started page](https://developers.appcharge.com/reference/getting-started-with-appcharge-api)

### How to run

> Requirement Node.js min v18
> set up required environments

```sh
# either export them
export PORT="APPLICATION_PORT"
export SIGN_KEY="YOUR_SIGN_KEY"
export KEY="YOUR_KEY"
export FACEBOOK_APP_SECRET="YOUR_FACEBOOK_APP_SECRET"
export APPLE_SECRET_API="YOUR_APPLE_SECRET_API"
export REPORTING_API_URL="YOUR_REPORTING_API_URL"
export PUBLISHER_TOKEN="YOUR_PUBLISHER_TOKEN"

# or set them up in the .env file. Find example in .env.example
```

to run execute

```sh
npm start
```

### Work with Docker

#### How to build docker image

```sh
docker build -t appcharge-server .
```

#### Run the container locally

```sh
docker run --rm -it \
  -e SIGN_KEY="YOUR_SIGN_KEY" \
  # Here goes other environments you want to set up
  -p 8080:8080 \
  appcharge-server
```

### Where to get the key and sign_key

Open your appcharge dashboard. Go to the setting -> admin -> integration tab. If you are using signature authentication - copy the key from the primary key field, if you are using encryption, take the key from the primary key field and the IV from the secondary key field.

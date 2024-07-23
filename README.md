## Lanchonete

### Building and running your application

When you're ready, start your application by running:
```shell
docker compose up --build
```

Your application will be available at http://localhost:3000.

### Deploying your application to the cloud

First, build your image, e.g.:
```shell
docker build -t lanchonete .
```

If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
```shell
docker build --platform=linux/amd64 -t lanchonete .
```

Then, push it to your registry, e.g. `docker push myregistry.com/lanchonete`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### Docker Compose

To build and run your application with Docker Compose, use the following command:

```shell
docker compose up --build
```

This command will build and start all the services defined in your docker-compose.yml file.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

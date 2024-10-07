## Fastfood-46

### Setting up Node Version

To ensure you are using the correct Node.js version specified in the `.nvmrc` file, run the following command:

```shell
nvm use
```

If you don't have nvm (Node Version Manager) installed, follow the instructions here to install it.

For more details about nvm, you can visit their [GitHub repository](https://github.com/nvm-sh/nvm#installing-and-updating).

### Environment Variables
This project requires certain environment variables to be set.
You can find a template for these variables in the .env.example file.
To create your own .env file, run the following command:

```shell
cp .env.example .env
```

Then, edit the .env file to include the appropriate values for your setup.

### Building and running your application

When you're ready, start your application by running:

```shell
docker compose up --build
```

Your application will be accessible at http://localhost:3000, and the Swagger
documentation can be found at http://localhost:3000/documentation.

### Deploying your application to the cloud

First, build your image, e.g.:

```shell
docker build -t fastfood46 .
```

If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:

```shell
docker build --platform=linux/amd64 -t fastfood46 .
```

Then, push it to your registry, e.g. `docker push myregistry.com/fastfood46`.

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


### Execute stress test:

To execute the stress test, please, execute the command below:

```bash
bash ./stress.sh 0.0001
```

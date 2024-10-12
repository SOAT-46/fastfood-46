## Fastfood-46

## Documentation

For a complete understanding of the functionalities and how to interact with the API, use Postman.

### Importing the collection:

1. **Open Postman.**
2. **Import:** Click "Import" and select the collection file.
3. **Locate:** Look for `Fastfood-46.postman_collection.json` in the `docs/postman` folder.
4. **Explore:** The collection will be available for you to test the endpoints.

**By using Postman, you can:**

* **Test requests:** Send HTTP requests to different endpoints and view the responses.
* **Manage environments:** Configure different environments (e.g., development, production) for your tests.
* **Create collections:** Organize your requests into thematic collections.
* **Share:** Share your collections with other developers.

**With Postman, exploring and testing your API becomes more efficient and intuitive.**

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
docker build -t fastfood-46-server .
```

If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:

```shell
docker build --platform=linux/amd64 -t fastfood-46-server .
```

Then, push it to your registry, e.g. `docker push myregistry.com/fastfood-46-server`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### Docker Compose

To build and run your application with Docker Compose, use the following command:

```shell
docker compose up --build
```

This command will build and start all the services defined in your docker-compose.yml file.

### Deploying your application to the Kubernetes

To deploy the application to your Kubernetes cluster, follow these steps:

Navigate to the `k8s/shared` directory and run the following command to set up shared resources:

```bash
make deploy
```

Navigate to the `k8s/database` directory and run the following command to deploy the database services:
```bash
make deploy
```

Finally, go to the `k8s/backend` directory and run the following command to deploy the backend application:
```bash
make deploy
```

By following these steps, your application and its components will be deployed to your Kubernetes environment efficiently.

### Execute stress test:

To execute the stress test, please, execute the command below:

```bash
bash ./stress.sh 0.0001
```

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

This README is not up to date. Please see turbo-src README.

# Usage

### Build namespace service

```
docker build -t namespace-service:latest .
```

### Pull postgres image.

```
docker pull postgres:13.7-bullseye

```

### Launch containers.

```
docker-compose up --build
```

### Run tests

Enter bash or shell session in service container (see `docker ps` for name).

```
docker exec -it <service container> bash
```

Run tests.

```
./test-server/run-tests.sh
```


### Remove containers when done:

```
docker-compose down
```

# Functions and their return values if request is successful

### createUser

```
201
```

### getContributorID

```
a string with the contributor id (ethereum address)
```

### getContributorName

```
a string with the contributor's name (github login)
```

### getContributorSignature

```
a string with the contributor's signature (ethereum key)
```

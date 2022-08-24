# Usage

### Build image and containers in detatched mode from root directory

```
docker-compose up --build -d
```

### If not building, may need to pull node image:

```
docker pull node:16.15-bullseye
```

### Enter bash or shell session in container namespace_library_1

```
docker exec -it namespace-db_library_1 bash
```

### Connect to the database, start the Graphql server, ports 5432 and 4000

```
npm start
```

### New terminal window, same command: docker exec...

### Run tests

```
./test-server/run-tests.sh
```

### N.B.:

Enter npm start again to clear database if running tests a second time.

### Exit Shell or Bash session

```
exit
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

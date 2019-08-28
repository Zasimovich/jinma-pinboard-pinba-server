pinboard Wiki - https://github.com/intaro/pinboard/wiki

# Docker Jinba-Pinba-Board (JPB) stack

This stack contains: Pinba image, Jinba image and Pinboard image.

# Setup

1. Install [Docker](http://docker.io).
2. Install [Docker-compose](http://docs.docker.com/compose/install/).
3. Clone this repository.
4. Correct MYSQL_ROOT_PASSWORD in the files: "docker-compose.yml" and "config/pinboard/parameters.yml"
5. Add to your "hosts" file "127.0.0.1 monitor.local"

# Usage

Start the JPB stack using *docker-compose*:

```bash
$ docker-compose up -d
```

For access to Pinba-server use 30002 port in you php-extension

Now you can open http://monitor.local/pinboard/
Jinba request you can send to http://monitor.local/jinba/

By default, the stack exposes the following ports:
- 30002: Pinba Server
- 3307: Pinba MySQL
- 80: Nginx

Pinboard allows to enable or disable authentication for users. If authentication turned off users can visit any pages in Pinboard. If authentication turned on users must pass authentication by entering username and password throw [HTTP Basic authentication](http://en.wikipedia.org/wiki/Basic_access_authentication). 

Section `secure` in file `config/parameters.yml` contains parameters of authentication and authorization. For details see section Security in [Configuration](Configuration).

## Adding new user

There is command which helps you to configure user access. It adds settings to `users` section. 

    ./console add-user username password [hosts]

`username` - username of user

In `password` need to define user password, the encrypted algorithm is sha512 with 5000 iterations and encode to base64 the password hash.

`[hosts]` - optional parameter. You can specify any valid regular expression which will controll access to hosts information. If you need to use the `\` in expression, it must be escaped, for example: `.*back\\slash`

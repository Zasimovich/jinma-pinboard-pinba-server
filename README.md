# Docker Jinba-Pinba-Board (JPB) stack

This stack contains: Pinba image, Jinba image and Pinboard image.

# Requirements

## Setup

1. Install [Docker](http://docker.io).
2. Install [Docker-compose](http://docs.docker.com/compose/install/).
3. Clone this repository.
4. Add to your "hosts" file "127.0.0.1 monitor.local"

# Usage

Start the JPB stack using *docker-compose*:

```bash
$ docker-compose up -d
```

For access to Pinba-server use 30002 port in you php-extansion

Now you can open http://monitor.local/pinboard/
Jinba request you can send to http://monitor.local/jinba/

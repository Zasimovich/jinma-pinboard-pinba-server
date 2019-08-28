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


## Security

In section "Security" you can define settings for user authentication and authorization.

    secure:
        enable: true
        users:
            username1:
                password: my_sha512_password
            username2:
                password: my_sha512_password
                hosts: 'mysite\.com$'

Parameter `enable` switch on/off the authentication and the authorization on site.

In section `users` define who has the access to the site.

In `password` need to define user password, the encrypted algorithm is sha512 with 5000 iterations and encode to base64 the password hash.

In `hosts` define a regular expression which controls the access to hosts information. By default, the user has the access to all hosts.

Use special console command for user adding. Details in [Security](Security).


Section `secure` in file `config/parameters.yml` contains parameters of authentication and authorization. For details see section Security in [Configuration](Configuration).

## Adding new user

There is command which helps you to configure user access. It adds settings to `users` section. 

    ./console add-user username password [hosts]

`username` - username of user

In `password` need to define user password, the encrypted algorithm is sha512 with 5000 iterations and encode to base64 the password hash.

`[hosts]` - optional parameter. You can specify any valid regular expression which will controll access to hosts information. If you need to use the `\` in expression, it must be escaped, for example: `.*back\\slash`

## Email notifications

Pinboard can send e-mail messages for:
* pages with HTTP status code 5xx
* detection of a drawdown of indicators
```yml
notification:
    enable: true
    ignore:
        - (foo|otp)\.example\.com$
        - second-example\.ru$
    sender: noreply@example.com
    global_email: my_email@example.com
    border:
        req_time:
            global: 1.5
            somesite.com: 2
    list:
        -
            hosts: example\.com$
            email:
                - admin@example.com
                - elseemail@example.com
        -
            hosts: forum\.example\.com$
            email: moderator@example.com
```

If section `notification` is not specified, notification will not be sent.

Parameter `enable` switch on and off notification sending.

In section `ignore` you can specify a list of sites which are ignored when sending a notifications. If a site matches any specified regular expression, notification will not be sent.

Parameter `sender` - this email address will be used as the sender of notifications.

Parameter `global_email` defines email for all messages. If the parameter is not specified, will use only emails listed below.

In section `list` you can list the correspondence between the sites and email. If the error occurs at a site that equal to regexp expression `hosts`, notification will be sent to `email`. You can define multiple emails for one site.

Parameter `border` defines settings for detecting of the drawdown of indicators. Now Intaro Pinboard monitors 2 indicators: max time of the 90% and 95% fastest requests. Settings for this indicators defines in section `req_time`. Subsection `global` defines the general border value for all sites. For any site you can define personal settings by adding corresponding parameter. If one of indicator exceeds border value Intaro Pinboard will send notification message. If indicator back to stable state Intaro Pinboard will send second notification message.

## Sending transport

By default all email sended throw `mail()` function. You can define sending throw SMTP server.

    smtp:
        server: localhost
        port: 25
        username: username@example.com
        password: my_password
        encryption: null
        auth_mode: null

In section `smtp` you can define parameters of your smtp server - server adress, port, username, password, encryption type (null, ssl, tls), authentication mode.

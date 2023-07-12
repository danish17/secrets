<p align="center">
  <a href="http://secrets.iamdani.sh/" target="blank"><img src="https://danishshakeel.me/wp-content/uploads/2023/07/Group-6.png" width="200" alt="Secrets Logo" /></a>
</p>
<center>

# Secrets API

 A simple API to create n-times viewable secrets.</p>
  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/724892df13e34f62bc989fc40ea9c216)](https://app.codacy.com/gh/danish17/secrets/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

</center>

## Description
Secrets is an API that allows you to create <b>n-time viewable secrets</b>. You can use it to share passwords and other sensitive information which should only be seen by <b>specific people</b> for a <b>specified time</b> and for a <b>specified number of times</b>.

It is built with Nest.js and TypeScript and you can host it on your own server. Secrets uses a MySQL to store the secrets.

You can try it out here - https://secrets.iamdani.sh.
## Encryption
Secrets encrypts all the messages before storing them in the database. The encryption algorithm used is [AES-192-CBC](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard). The passphrase serves as a key and a random 16-byte buffer is used as the initialization vector (IV).

The passphrase is stored as a [SHA-1 hash salted with random 16 bytes](https://docs.oracle.com/cd/E52734_01/oud/OUDCR/salted-sha1-password-storage-scheme.html#:~:text=The%20Salted%20SHA1%20Password%20Storage,SHA%2D1%20message%20digest%20algorithm). Salt and IV are also stored in the database for decryption purposes.

## API Endpoints
### Viewing All Secrets

#### Endpoint

```http
GET /secret/all
```

<hr>

### Viewing a Secret

#### Endpoint

```http
GET /secret/view/[secret_uri]
```

#### Parameters

`<secret_uri>` Unique slug for the secret (upon generating it)

#### Example Request

```http
GET /secret/view/ZRK9Q9n
```

<hr>

### Creating a Secret

#### Endpoint

```http
POST /secret/create
```

#### Schema

```json
{
  "validFor": int, // secret validity in hours
  "viewsAllowed": int, // number of times a secret can be viewed/decrypted
  "passphrase": string, // secret passphrase to decrypt the message
  "secret": string, // message to be encrypted
}
```

#### Example Request

```json
{
  "validFor": 24,
  "viewsAllowed": 1,
  "passphrase": "super_secret",
  "secret": "Hello world!"
}
```

<hr>

### Shredding a Secret

#### Endpoint

```http
GET /secret/shred/<secret_id>
```

#### Parameters

`<secret_id>` Secret ID


## Stay in touch

- Author - [Danish Shakeel](https://iamdani.sh)
- Website - https://iamdani.sh | https://danishshakeel.me

## License

Secrets API is [Apache-2.0 licensed](LICENSE).

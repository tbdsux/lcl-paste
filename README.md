# lcl-paste

Simple Paste [Bin] Manager App

![App Screenshot](./screenshot.png)

## Development

If you want to just run the frontend, run (use `yarn build` if you want to build):

    $ yarn dev

In running both the frontend and the backend api, use the vercel cli.

    $ vercel dev

## Environment Variables

```
# A long secret value used to encrypt the session cookie
AUTH0_SECRET=

# The base url of your application
AUTH0_BASE_URL=

# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL=

# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=

# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=

# FaunaDB Secret
FAUNADB_SECRET_KEY=

# FaunaDB LCL-PASTE Public Key (generate another one beside `FaunaDB Secret` one)
FAUNADB_LCLPASTE_PUBLIC_KEY=
```

### Stack

- NextJS
- Tailwind
- FaunaDB
- Auth0 (NextJS SDK)

### Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FTheBoringDude%2Flcl-paste.git&env=AUTH0_SECRET,AUTH0_BASE_URL,AUTH0_ISSUER_BASE_URL,AUTH0_CLIENT_ID,AUTH0_CLIENT_SECRET,FAUNADB_SECRET_KEY,FAUNADB_LCLPASTE_PUBLIC_KEY&envDescription=Keys%20needed%20by%20the%20application.)

##

### &copy; TheBoringDude | 2021

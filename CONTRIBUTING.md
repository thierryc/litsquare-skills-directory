# Contributing

Use public issues for product feedback and focused pull requests for directory,
schema, documentation, or site changes. Security reports follow `SECURITY.md`.

Catalog contributions are small declarative JSON files. They must identify the
original publisher and immutable HTTPS source, include a license and SHA-256
digest, and must not contain secrets or mirrored private content. A listing means
the metadata passed automated and maintainer review; it is not a safety guarantee.

Before opening a pull request:

```sh
npm ci
npm test
git diff --exit-code site/public/catalog site/public/schemas
```

By contributing under `catalog/`, you agree to its CC0-1.0 dedication. Other
repository-authored contributions are submitted under MIT.

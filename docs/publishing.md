# Publishing a Skill or Kit

Publishers keep ownership of their artifacts. Prefer an immutable HTTPS release
or the publisher's `/.well-known/agent-skills/index.json` entry; the LitSquare
catalog records provenance rather than implying LitSquare authorship.

A catalog pull request must provide a normalized unique ID, publisher domain,
artifact URL, SHA-256 digest, license, version claim when applicable, and a concise
human description. Automated checks validate schema, HTTPS, identifiers, digest
syntax, unique records, and generated indexes. Maintainer review remains required.

Never submit credentials, private repository URLs, personal home paths, or an
artifact whose license does not permit the proposed listing or distribution.

# `.skillkit` format v1

A `.skillkit` is a ZIP-compatible LitSquare collection package. It is not an
execution graph and does not alter Agent Skills `SKILL.md` files.

```text
example.skillkit
├── skills.json
├── skills.lock
├── README.md
├── assets/
└── skills/
    └── example-skill/
        └── SKILL.md
```

`skills.json` declares identity, SemVer package version, metadata, and relative
member paths. `skills.lock` maps every member path to an exact SHA-256 canonical
content digest with optional source and revision claims. M2 accepts only empty
dependency maps and embedded extracted Skills; nested `.skill` archives are
invalid.

The normative schemas are `schemas/skillkit-v1.schema.json` and
`schemas/skillkit-lock-v1.schema.json`. Renaming a ZIP to `.skillkit` is not a
conversion; implementations must inspect magic bytes and structure.

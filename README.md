# LitSquare Skills Directory

Public home, open schemas, and catalog source for LitSquare Skills.

The native macOS source remains private. This repository contains only the
public website, interoperability documentation, declarative catalog metadata,
feedback forms, and approved release artifacts.

## Status

The project is in development. The M0–M2 release focuses on a safe local library;
online catalog installation and updates arrive in M4.

## Local development

```sh
npm ci
npm test
npm run dev
```

Node.js 24 or later is required. Generated catalog indexes are committed and CI
fails when validation or generation does not reproduce them.

## Licensing

Repository-authored site code, documentation, tooling, and schemas are MIT
licensed. Declarative files under `catalog/` are dedicated under CC0-1.0.
Third-party Skill and Kit artifacts retain their publisher-declared licenses and
are not relicensed by a directory listing.

# ADR 0001: Publish blog metadata to the Atmosphere with stable record identities

Status: Accepted  
Date: 2026-10-19

## Context

The blog should have an AT Protocol (Atmosphere) presence while keeping full
articles on the website. Standard.site provides publication and document lexicons
that describe the blog and its posts. Document records can contain metadata and
a link without including the article body.

Publishing must be safe to repeat. Editing a title, changing tags, or renaming a
Markdown file should not create another record or change the existing record's
AT-URI. Publishing credentials should remain outside the website and repository.

## Decision

### Generate each record key once and preserve it

Use a timestamp identifier (TID) as the record key, as required by the publication
and document lexicons. Generate a fresh TID once when preparing a post for AT
Protocol publication, then store it in that post's Markdown frontmatter:

```yaml
published: true
atproto_rkey: 3my3dit427b22
```

A TID encodes a microsecond timestamp and a clock identifier in a 13-character
base32-sortable string. Use an AT Protocol TID generator, such as
`@atproto/common-web`'s `TID.nextStr()`, when assigning new keys. The initial batch
of remaining posts used this generator in a one-off operation. The publishing
script currently requires a saved key; it does not generate or modify keys.

Stability comes from saving and reusing the generated value, not from computing
it again from mutable metadata. Keep the key when editing or renaming a post,
and assign a new key when copying a post to create a different article. Keys must
be unique within the account's `site.standard.document` collection.

The TID's generation time is separate from the article's publication date.
Record keys and AT-URIs are public identifiers, not credentials.

### Publish metadata through a separate script

[`scripts/create-document.ts`](../../scripts/create-document.ts) reads one post
from `src/posts/<slug>.md`. It checks `published: true`, requires a title and date,
validates the saved TID's format, and constructs a `site.standard.document` record.

The record contains:

- `site`: the blog's publication AT-URI.
- `path`: `/blog/<slug>`, derived from the Markdown filename.
- `title` and `publishedAt`.
- `description` and `tags` when present.

It omits `content` and `textContent`. The PDS receives a metadata record pointing
to the article; the full article remains on the website.

Dates without times are interpreted as 9 a.m. in `America/New_York`, respecting
daylight saving time, and serialized in UTC. This is a convention for existing
date-only metadata, not a claim about the original time of publication. Tags use
lowercase hyphenated names, such as `game-dev`. The script trims, normalizes,
and deduplicates tags.

Preview is the default and requires no credentials or network access:

```sh
node scripts/create-document.ts whirlybirding-devlog-002
```

Publishing requires an explicit flag:

```sh
node --env-file=.env scripts/create-document.ts whirlybirding-devlog-002 --publish
```

The script authenticates using `ATPROTO_SERVICE`, `ATPROTO_IDENTIFIER`, and
`ATPROTO_APP_PASSWORD`. Credentials stay in the local, Git-ignored `.env` file.
It checks that the authenticated DID matches the publication owner, then calls
`com.atproto.repo.putRecord` with the saved key and logs out afterward.

For the same account, collection, and key, `putRecord` creates the record if absent
or replaces its contents if present. Repeating the command targets the same
AT-URI. Publishing is a manual operation, separate from the website build and
deployment; GitHub Pages does not need PDS credentials.

### Verify the relationship between website and records

The blog's `site.standard.publication` record is managed by
[`scripts/create-publication.ts`](../../scripts/create-publication.ts), which
also uses `putRecord` with a fixed saved key. Unlike the document script, this
script publishes immediately when run; it has no preview flag.

[`static/.well-known/site.standard.publication`](../../static/.well-known/site.standard.publication)
contains its AT-URI. The document script and blog page loader reuse that file to
identify the publication and its owner.

The shared blog page emits the following in the HTML `<head>` for a published
post with a valid `atproto_rkey`:

```html
<link rel="site.standard.document" href="at://<did>/site.standard.document/<rkey>" />
```

The page constructs this link from local metadata; it does not query the PDS to
check whether the record exists. Publishing the record and deploying the website
are both necessary to complete verification. Posts without a key get no link.

## Alternatives considered

- **Derive keys from metadata:** changing a title, date, or slug could change the
  record identity. Date-based schemes also need collision handling. Saving the
  key avoids coupling identity to editable content.
- **Store keys in a separate mapping file:** keeps protocol fields out of the
  Markdown, but requires maintaining the mapping when posts move or are renamed.
  Frontmatter keeps the identity attached to the post and available to rendering.
- **Create a new record on every run:** would produce duplicate records and
  changing verification targets. A saved key with `putRecord` supports updates.
- **Publish the full article body:** unnecessary for the current goal of
  discoverable metadata that directs readers to the website.

## Consequences and author workflow

1. Prepare a published Markdown post and assign a unique TID once.
2. Save the TID as `atproto_rkey` and commit it with the post.
3. Preview the record and inspect its metadata and destination URI.
4. Run the script with `--publish` to create or update the PDS record.
5. Deploy the site and check that the live article's verification link matches.

Preserve keys across edits. When a slug changes, republish the updated path using
the same key; website redirects for old URLs are a separate concern. Changes are
not synchronized automatically. Marking a post unpublished or deleting its file
does not remove an already published PDS record; removal needs a separate action.

## References

- [Standard.site document lexicon](https://standard.site/docs/lexicons/document)
- [Standard.site publication lexicon](https://standard.site/docs/lexicons/publication)
- [Standard.site verification](https://standard.site/docs/verification)
- [AT Protocol TID specification](https://atproto.com/specs/tid)

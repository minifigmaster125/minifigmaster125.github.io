# Publishing post records after deployment

The GitHub Actions workflow runs in this order:

1. Validate all published document records without credentials or network writes.
2. Build and deploy the site.
3. Sync published post metadata to the PDS using the deployed commit.

The sync uses existing frontmatter keys and `putRecord`, so it creates new records
and updates existing ones without creating duplicates. It sends metadata and links,
not article bodies. Drafts are skipped. It does not delete records for removed or
unpublished posts.

## One-time GitHub setup

In the repository, open **Settings → Secrets and variables → Actions** and add
these **repository secrets**, using the same values as your local `.env`:

| Secret | Value |
| --- | --- |
| `ATPROTO_SERVICE` | Your login service, such as `https://bsky.social` |
| `ATPROTO_IDENTIFIER` | Your account handle |
| `ATPROTO_APP_PASSWORD` | An app password for the account owning the publication |

The workflow exposes these only to the PDS publishing step. It does not upload
`.env` or put credentials into the generated site. No additional GitHub token
permissions are required for PDS access.

The hook setup and record keys must also be committed. Push to `main` to run the
workflow, or dispatch it manually for `main` from the Actions tab.

## Local commands

Preview and validate the whole batch:

```sh
node scripts/create-document.ts --all
```

Publish the whole batch manually:

```sh
node --env-file=.env scripts/create-document.ts --all --publish
```

The existing single-post commands still work.

## Failures and retries

A missing or duplicate key fails validation before the site build. This catches
commits that bypassed the local pre-commit hook. Assign and commit the missing keys
locally rather than generating new identities during CI.

If deployment fails, publishing does not run. If publishing fails, the site has
already deployed and remains live. Fix the cause and rerun the failed publishing
job. Records saved earlier in a partially completed batch are safe to write again
at their existing keys. Missing GitHub secrets cause an explicit configuration
error rather than silently skipping publication.

Runs are serialized so a normal new push waits for the current deployment and
sync to finish. Avoid manually rerunning a historical successful workflow after
newer content has deployed, since that would deliberately deploy or sync an older
revision.

The batch uses one login session and logs out when finished. Unchanged records
are currently written again; skipping unchanged records is a possible later
optimization.

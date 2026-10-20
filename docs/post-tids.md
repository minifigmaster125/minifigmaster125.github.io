# Automatic post TIDs

Use Node 24 and install dependencies with `pnpm install`. Enable the local hook
once per clone:

```sh
pnpm run hooks:install
```

Write a post with `published: true`, stage it, and commit normally. The hook
generates a missing `atproto_rkey`, adds it to the frontmatter, and stages that
change in the same commit. It does not publish to the PDS.

Existing keys remain unchanged. If you copy a post to create a different article,
remove the copied key before staging it. Duplicate or invalid keys stop the
commit with an error.

If a post needing a key has unstaged edits, fully stage that post or stash its
unstaged edits and retry. The hook checks all candidates before changing any.
Drafts and untracked posts are not assigned keys.

To run the same operation manually on staged posts:

```sh
node scripts/assign-post-tids.ts
```

To run the temporary-repository integration tests:

```sh
node --test scripts/assign-post-tids.test.mjs
```

The installer leaves existing non-pre-commit hooks in place. If you already have
a different pre-commit hook, it refuses to overwrite it; add the helper invocation
to that hook manually instead. After changing `.githooks/pre-commit`, update the
installed copy deliberately—the installer will not overwrite a differing copy.

Git hooks can be bypassed with `--no-verify`, so they are a convenience rather
than a guarantee that every commit has valid keys. The deployment workflow also
validates published records before building and syncs them after deployment.
See [PDS deployment setup](./pds-publishing.md) for the required GitHub secrets.

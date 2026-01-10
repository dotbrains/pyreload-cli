# Shared Assets

This directory contains assets shared across multiple parts of the project (docs, website, README).

## Files

- `og-image.svg` - Open Graph image used for social media previews

## Usage

The assets in this directory are automatically copied to their respective destinations during build:

- **Docs**: Copied to `docs/src/assets/` via `docs/serve.sh` and `.github/workflows/docs.yml`
- **Website**: Copied to `website/public/` via `npm run copy-assets` (runs before `dev` and `build`)
- **README**: Referenced via GitHub raw URL

## Modifying Assets

To update an asset:

1. Edit the file in this directory (`assets/`)
2. The changes will automatically propagate during the next build
3. For local development:
   - Docs: Run `./docs/serve.sh` (copies automatically)
   - Website: Run `npm run dev` in `website/` (copies automatically)

## Why Not Symlinks?

We use build-time copying instead of symlinks to ensure compatibility with all deployment platforms, including those that don't preserve symlinks during build processes.

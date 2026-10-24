# Baltes Container

The storefront is a Next.js 16 application using the App Router. Base44 remains the data, authentication, and local backend layer.

## Prerequisites

- Node.js 20.9 or newer
- npm
- A Base44 account with access to the linked app

Install the project dependencies:

```bash
npm install
```

The Base44 CLI is installed locally as a development dependency, so run it through `npx`.

## Full local development

Start the Base44 backend and Next.js frontend together:

```bash
npx base44 dev
```

Base44 injects the linked app ID and local backend URL into the frontend process. The usual local URLs are:

- Next.js: `http://localhost:3000`
- Base44 backend: `http://localhost:4400`

### Demo product catalog

With `npx base44 dev` running, load the bundled sample catalog into the local backend (no remote service is needed):

```bash
npm run seed:products
```

The 20 samples in `scripts/data/demo-products.mjs` populate every Product field and cover all eight product types, all five size options, all condition/grade and availability options, six featured products, and direct-purchase and quote-only examples. Each has a multi-image gallery and German, Czech, and Dutch content. SKUs start with `DEMO-`; prices, dimensions, stock and certification values are illustrative.

The seed is additive: it matches **either** slug or SKU, does not duplicate products and does not overwrite products you have edited locally. Run it again after restarting the local backend if the catalog is empty. It refuses non-local write targets.

To explicitly import the old hosted catalog instead, use `npm run seed:products -- --remote`. That optional mode requires network access to Base44.

The eight homepage category banners use real photos from the corrected **Project Contain Products** folder, optimized into `public/images/baltes/project/`. Category links still select matching shop filters. Seventeen sample products use these photos in 3–4-image galleries, including standard 40 ft High Cube and 20 ft office containers. Three demos retain their original illustrations because no exact photo match was found: 20 ft sanitary, 30 ft workshop, and 8 ft compact. Example colours, condition and stock data remain unchanged; a localized demo-photo caption explains possible differences. The refrigerated category uses a one-trip example, while the used refrigerated demo has its own used-container gallery.

Source filenames and gallery mappings are in `src/lib/suppliedPhotos.js`; the asset manifest is `public/images/baltes/project/sources.json`. Original files remain untouched. To re-import, run `node scripts/import-supplied-photos.mjs "I:/CT/Containers/Project Contain Products"`. To update the existing local catalog, preview with `node scripts/update-product-photos.mjs`, then add `--apply`. This only changes matching demo image fields, skips custom uploads or modified types/sizes, saves previous image values in ignored `photo-backups.local/`, and verifies other fields are unchanged. Re-running is safe. Previous-folder assets remain archived for rollback and are not used by the updated storefront. Original demo-illustration provenance remains in `scripts/data/catalog-image-prompts.json`.

Validate the fixtures and category coverage with `node --test scripts/demo-products.test.mjs`.

### Homepage hero photograph

The hero uses the supplied anthracite 20 ft container photograph (263 755-7), with its background removed using the built-in AI image editor. This is a photo-based cutout, not a newly designed container. The original gallery photograph remains unretouched. The reviewed extraction is `public/images/hero/project-container-cutout.png`; its prompt is `docs/hero-background-extraction.txt`. Both responsive WebP assets have real alpha transparency. Re-export them by supplying the cutout path as the second argument to the import script. Provenance is recorded in `public/images/hero/source.json`; photographer and license are not inferred. The size shortcuts beneath it open the matching shop filters.

The About and Conversion sections use supplied photos too. Delivery retains its licensed real reference photograph, with credits in `src/lib/photography.js`. Visible source notes and credits are at `/impressum#bildnachweise` in German, Czech and Dutch. Photos do not certify current stock or prove completed Baltes projects. Attribution for older unused stock files is retained in `STOCK_PHOTO_SOURCES`; keep those license details if reusing them.

## Frontend-only development

To run Next.js against a hosted Base44 backend, create `.env.local`:

```bash
NEXT_PUBLIC_BASE44_APP_ID=your_app_id
NEXT_PUBLIC_BASE44_APP_BASE_URL=https://your-app.base44.app
```

Then run:

```bash
npm run dev
```

`next.config.mjs` maps the Base44 values injected by `base44 dev` to `NEXT_PUBLIC_` variables and proxies `/api` to the configured backend. `BASE44_API_PROXY_TARGET` can override only the proxy destination when needed.

## Project commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run seed:products
```

## Project structure

- `src/app/`: Next.js layouts, pages, route groups, and providers
- `src/screens/`: existing page-level UI components used by App Router routes
- `src/components/`: shared UI and storefront sections
- `src/api/base44Client.js`: configured Base44 browser client
- `base44/`: Base44 entities and project configuration
- `next.config.mjs`: Next.js and Base44 proxy/environment configuration

## Deployment

This is now a server-capable Next.js application and produces `.next` output. Deploy the frontend to a Node.js-compatible Next.js host and configure the `NEXT_PUBLIC_BASE44_*` environment variables there. Base44 continues to host the app backend and resources.

Open the linked Base44 project with:

```bash
npx base44 dashboard open
```

Base44 documentation: [Using GitHub](https://docs.base44.com/Integrations/Using-GitHub) and [CLI reference](https://docs.base44.com/developers/references/cli/commands/introduction).

# Silas Sista Vila

En Halloween-PWA som driftsätts på GitHub Pages.

## Driftsättning

Sajten driftsätts automatiskt via [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
när något pushas till `main`. Workflow:en ersätter platshållaren `__GMAPS_KEY__` i
[index.html](index.html) med innehållet i repo-secret `GMAPS_KEY` innan filerna
publiceras till GitHub Pages.

### Nyckel-hantering (Google Maps JavaScript API)

- Den riktiga API-nyckeln **får aldrig checkas in**. Behåll alltid
  `__GMAPS_KEY__` som platshållare i `index.html` i `main`.
- Nyckeln lagras som GitHub-secret under
  `Settings → Secrets and variables → Actions → GMAPS_KEY`.
- Nyckeln måste vara begränsad i Google Cloud Console till:
  - **Application restriction**: HTTP referrers — `https://stevoxa.github.io/halloween/*`
    (samt ev. `http://localhost:*/*` för lokal utveckling).
  - **API restriction**: endast `Maps JavaScript API`.
- Pages-source i repo-settings ska vara `GitHub Actions` (inte "Deploy from a branch").

### Lokal utveckling

Eftersom kartan kräver en giltig nyckel kan du tillfälligt byta ut
`__GMAPS_KEY__` mot din egen nyckel i `index.html` när du kör lokalt — men
**committa aldrig** den ändringen. Lägg gärna nyckeln i en lokal, ignorerad
fil (t.ex. `local-config.js`) om du föredrar det.

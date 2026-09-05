# Mammography use across Santa Clara County census tracts

This static dashboard answers: **How does reported mammography use among women ages 50–74 vary across census tracts in Santa Clara County, California?**

It combines the CDC PLACES 2025 census-tract release (mammography measure based on 2022 BRFSS) with 2023 generalized census-tract boundaries from the U.S. Census Bureau.

## Run locally

Open this folder in VS Code, start **Live Server** from `index.html`, and use the resulting local HTTP address. A `file://` URL cannot load the local GeoJSON.

No build or package installation is required. MapLibre GL JS, D3, OpenFreeMap vector tiles, and web fonts load externally, so an internet connection is required.

## Data

- `data/week4/processed/santa_clara_places_mammography_2025.csv`: 408 CDC estimates.
- `data/week4/processed/santa_clara_tracts_2023.geojson`: 408 Census geometries.
- `data/week4/processed/santa_clara_mammography_tracts.geojson`: browser-ready joined data.

Rebuild the joined file with `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\build_week4_dashboard_data.ps1`.

## Official sources

- [CDC PLACES census-tract dataset](https://chronicdata.cdc.gov/w/yjkw-uj5s/tdwk-ruhb)
- [CDC prevention measure definitions](https://www.cdc.gov/places/measure-definitions/prevention.html)
- [Census TIGERweb Generalized ACS 2023 tract layer](https://tigerweb.geo.census.gov/arcgis/rest/services/Generalized_ACS2023/Tracts_Blocks/MapServer/4)
- [OpenFreeMap](https://openfreemap.org/)

PLACES values are modeled estimates based partly on self-reported survey responses, not direct tract-level counts. Confidence intervals convey uncertainty; comparisons are descriptive, not causal.

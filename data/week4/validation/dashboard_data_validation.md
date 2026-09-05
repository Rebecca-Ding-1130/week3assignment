# Week 4 dashboard data validation

Validated September 4, 2026.

## Included sources

- CDC PLACES mammography estimates: `processed/santa_clara_places_mammography_2025.csv`
- Census TIGERweb tract boundaries: `processed/santa_clara_tracts_2023.geojson`
- Joined dashboard data: `processed/santa_clara_mammography_tracts.geojson`

## Results

| Check | CDC | Boundaries | Joined data |
|---|---:|---:|---:|
| Santa Clara County census tracts | 408 | 408 | 408 |
| Missing GEOIDs | 0 | 0 | 0 |
| Duplicate GEOIDs | 0 | 0 | 0 |
| GEOIDs not 11 characters | 0 | 0 | 0 |
| GEOIDs without `06085` prefix | 0 | 0 | 0 |
| Missing mammography estimates | 0 | — | 0 |
| Missing geometries | — | 0 | 0 |

All 408 CDC GEOIDs matched exactly one Census boundary GEOID. There were no unmatched tracts in either direction.

Observed mammography estimates range from 65.7% to 82.8%. The unweighted median across the 408 tract estimates is 78.75% (displayed as 78.8%). These figures are calculated from the included CDC data and are not synthetic.

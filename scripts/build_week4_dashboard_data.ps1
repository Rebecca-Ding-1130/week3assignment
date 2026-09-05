$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$root = Split-Path -Parent $PSScriptRoot
$cdcPath = Join-Path $root 'data\week4\processed\santa_clara_places_mammography_2025.csv'
$geoPath = Join-Path $root 'data\week4\processed\santa_clara_tracts_2023.geojson'
$outputPath = Join-Path $root 'data\week4\processed\santa_clara_mammography_tracts.geojson'
$cdc = @(Import-Csv -LiteralPath $cdcPath)
$lookup = @{}
foreach ($row in $cdc) { $geoid=[string]$row.GEOID; if($lookup.ContainsKey($geoid)){throw "Duplicate CDC GEOID: $geoid"}; $lookup[$geoid]=$row }
$geo = Get-Content -LiteralPath $geoPath -Raw | ConvertFrom-Json
if ($geo.type -ne 'FeatureCollection') { throw 'Boundary input is not a FeatureCollection.' }
$joined=0
foreach ($feature in @($geo.features)) { $geoid=[string]$feature.properties.GEOID; if(-not $lookup.ContainsKey($geoid)){throw "Boundary GEOID has no CDC match: $geoid"}; $measure=$lookup[$geoid]; $feature.properties|Add-Member -NotePropertyName mammography_pct -NotePropertyValue ([double]$measure.MAMMOUSE_CrudePrev) -Force; $feature.properties|Add-Member -NotePropertyName mammography_ci -NotePropertyValue ([string]$measure.MAMMOUSE_Crude95CI) -Force; $joined++ }
if ($joined -ne $cdc.Count) { throw "Join count $joined does not equal CDC count $($cdc.Count)." }
$geo | ConvertTo-Json -Depth 100 -Compress | Set-Content -LiteralPath $outputPath -Encoding utf8
Write-Host "Created $outputPath with $joined joined tracts."

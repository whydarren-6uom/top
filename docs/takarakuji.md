# Takarakuji result checker

The checker is served at `/takarakuji`. Ticket values are checked in the browser against the static, validated snapshot at `public/takarakuji/results.json`; ticket numbers are not submitted to the application or the synchronization workflow.

## Data refresh

`.github/workflows/sync-takarakuji.yml` runs every day at 21:30 Japan time and can also be started manually from the Actions tab. It validates the Python checker and JavaScript checker against the included fixtures, then queries the public Mizuho results sources. It commits only a changed, validated snapshot.

If a source or rule cannot be validated, the workflow retains the previous snapshot. The UI reports the stored synchronization status and unknown or missing draws return `UNKNOWN`, rather than `LOSE`.

The sync implementation and its tests live in `tools/takarakuji`. Run them locally with:

```sh
cd tools/takarakuji
python3 -m unittest -v
python3 parity_check.py
python3 sync_data.py --output ../../public/takarakuji/results.json
```

The final command contacts public official sources and changes the snapshot only after validation.

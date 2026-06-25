#!/usr/bin/env python3
"""Download home catalog channel logos from mediaportal-uk-logos (Dark PNGs)."""

from __future__ import annotations

import urllib.parse
import urllib.request
from pathlib import Path

REPO = "https://raw.githubusercontent.com/Jasmeet181/mediaportal-uk-logos/master/TV/.Dark"
OUT = Path(__file__).resolve().parent.parent / "public" / "img" / "channel-logos"

FILES = {
    "bbc-one-hd.png": "BBC One HD.png",
    "bbc-two-hd.png": "BBC Two HD.png",
    "itv1-hd.png": "ITV1 HD.png",
    "channel-4-hd.png": "Channel 4 HD.png",
    "channel-5-hd.png": "Channel 5 HD.png",
    "sky-sports-premier-league-hd.png": "Sky Sports Premier League HD.png",
    "sky-sports-main-event-hd.png": "Sky Sports Main Event HD.png",
    "sky-atlantic-hd.png": "Sky Atlantic HD.png",
    "premier-sports-1-hd.png": "Premier Sports 1 HD.png",
    "viaplay-sports-1.png": "Viaplay Sports 1.png",
    "eurosport-1-hd.png": "Eurosport 1 HD.png",
    "bt-sport-1-hd.png": "BT Sport 1 HD.png",
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for local, remote in FILES.items():
        url = f"{REPO}/{urllib.parse.quote(remote)}"
        dest = OUT / local
        print(f"Downloading {local}...")
        urllib.request.urlretrieve(url, dest)
        print(f"  -> {dest.stat().st_size} bytes")

    print(f"Done: {len(FILES)} logos in {OUT}")


if __name__ == "__main__":
    main()

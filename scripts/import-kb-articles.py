#!/usr/bin/env python3
"""Import IPTVKB articles.sql into landing/front/data/kb-articles.ts"""

from __future__ import annotations

import json
import re
from pathlib import Path

SQL_PATH = Path("/Users/tz/Downloads/articles.sql")
OUT_PATH = Path(__file__).resolve().parent.parent / "front/data/kb-articles.ts"
IMAGE_BASE = "https://iptvkb.com/storage/article_images/"

EXCLUDED_ARTICLE_IDS = {4, 16, 29, 33, 43}

KB_CATEGORIES: list[dict[str, object]] = [
    {"id": "android", "label": "Android & Android TV", "order": 1},
    {"id": "smart-tv", "label": "Smart TV (Samsung/LG/Sony)", "order": 2},
    {"id": "apple-tv", "label": "Apple TV", "order": 3},
    {"id": "ios", "label": "iOS (iPhone / iPad)", "order": 4},
    {"id": "firestick", "label": "Firestick", "order": 5},
    {"id": "roku", "label": "Roku", "order": 6},
    {"id": "mag-box", "label": "MAG", "order": 7},
    {"id": "kodi", "label": "Kodi", "order": 8},
    {"id": "formuler", "label": "Formuler", "order": 9},
    {"id": "enigma2", "label": "Enigma 2", "order": 10},
    {"id": "consoles", "label": "Consoles (PS4 / Xbox)", "order": 11},
]

CATEGORY_BY_ID: dict[int, str] = {
    1: "mag-box",
    2: "android",
    3: "mag-box",
    5: "mag-box",
    6: "mag-box",
    7: "mag-box",
    8: "mag-box",
    9: "mag-box",
    10: "mag-box",
    11: "mag-box",
    12: "mag-box",
    13: "mag-box",
    14: "mag-box",
    15: "mag-box",
    17: "android",
    19: "ios",
    20: "ios",
    21: "ios",
    22: "smart-tv",
    23: "android",
    24: "firestick",
    25: "android",
    26: "roku",
    27: "roku",
    30: "kodi",
    31: "kodi",
    32: "kodi",
    34: "consoles",
    35: "consoles",
    36: "formuler",
    37: "formuler",
    38: "formuler",
    39: "smart-tv",
    40: "enigma2",
    41: "enigma2",
    42: "enigma2",
    44: "mag-box",
}

def parse_row_line(line: str) -> list[str]:
    line = line.rstrip()
    if line.endswith("),"):
        line = line[:-2]
    elif line.endswith(");"):
        line = line[:-2]
    elif line.endswith(")"):
        line = line[:-1]
    if line.startswith("("):
        line = line[1:]

    fields: list[str] = []
    current: list[str] = []
    in_str = False
    escape = False

    for ch in line:
        if in_str:
            if escape:
                current.append(ch)
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == "'":
                in_str = False
            else:
                current.append(ch)
        elif ch == "'":
            in_str = True
        elif ch == ",":
            fields.append("".join(current).strip())
            current = []
        else:
            current.append(ch)

    fields.append("".join(current).strip())
    return fields


def unescape_sql(value: str | None) -> str | None:
    if value is None or value == "NULL":
        return None
    return (
        value.replace("\\'", "'")
        .replace('\\"', '"')
        .replace("\\n", "\n")
        .replace("\\r", "\r")
        .replace("\\t", "\t")
        .replace("\\\\", "\\")
    )


def slugify(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug[:120] or "article"


def sanitize_html(html: str) -> str:
    html = re.sub(
        r"<\s*(script|style|iframe|object|embed)[^>]*>.*?</\s*\1\s*>",
        "",
        html,
        flags=re.I | re.S,
    )
    html = re.sub(r"<\s*(script|style|iframe|object|embed)[^>]*/?>", "", html, flags=re.I)
    html = re.sub(r'\s+on[a-z]+\s*=\s*"[^"]*"', "", html, flags=re.I)
    html = re.sub(r"\s+on[a-z]+\s*=\s*'[^']*'", "", html, flags=re.I)
    html = re.sub(
        r'href\s*=\s*["\']javascript:[^"\']*["\']',
        'href="#"',
        html,
        flags=re.I,
    )
    return html


def rewrite_images(html: str) -> str:
    html = re.sub(
        r'src=(["\'])storage/article_images/',
        rf"src=\1{IMAGE_BASE}",
        html,
        flags=re.I,
    )
    return html


def rewrite_cross_links(html: str, id_to_slug: dict[int, str]) -> str:
    href_re = re.compile(
        r'href=(["\'])(https?://(?:www\.)?iptvkb\.com/hc/articles/\d+/\d+/(\d+)/[^"\']+)\1',
        re.I,
    )

    def repl(match: re.Match[str]) -> str:
        quote = match.group(1)
        url = match.group(2)
        article_id = int(match.group(3))
        target_slug = id_to_slug.get(article_id)
        if target_slug:
            return f'href={quote}/help/{target_slug}{quote}'
        return (
            f"href={quote}{url}{quote} target=\"_blank\" rel=\"noopener noreferrer\""
        )

    return href_re.sub(repl, html)


def categorize(article_id: int, title: str, body: str) -> str:
    if article_id in CATEGORY_BY_ID:
        return CATEGORY_BY_ID[article_id]

    text = f"{title} {re.sub('<[^>]+>', ' ', body)}".lower()
    rules: list[tuple[str, list[str]]] = [
        ("mag-box", ["mag box", "mag device", "mag portal", " infomir"]),
        ("formuler", ["formuler"]),
        ("enigma2", ["enigma"]),
        ("kodi", ["kodi"]),
        ("consoles", ["xbox", "ps4", "playstation", "plex on ps4"]),
        ("firestick", ["firestick", "fire stick", "fire tv", "amazon fire"]),
        ("roku", ["roku"]),
        ("ios", ["iphone", "ipad", "ios", "supa legacy", "gse"]),
        ("apple-tv", ["apple tv"]),
        ("android", ["android", "nvidia shield", "tivimate", "smarters"]),
        ("smart-tv", ["smart tv", "samsung", "sony", "siptv", "smart stb"]),
    ]
    for category, keys in rules:
        if any(key in text for key in keys):
            return category
    return "android"


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def main() -> None:
    content = SQL_PATH.read_text(encoding="utf-8")
    row_lines = [line for line in content.splitlines() if line.startswith("(")]

    raw_articles: list[dict[str, object]] = []
    for line in row_lines:
        fields = parse_row_line(line)
        if len(fields) < 13:
            continue

        article_id = int(fields[0])
        draft = int(fields[4])
        visibility = unescape_sql(fields[5])
        if draft != 0 or visibility != "public" or article_id in EXCLUDED_ARTICLE_IDS:
            continue

        title = unescape_sql(fields[1]) or ""
        body = unescape_sql(fields[2]) or ""
        slug = unescape_sql(fields[3])
        description = unescape_sql(fields[7])
        views = int(fields[6]) if fields[6] not in ("NULL", None) else 0
        updated_at = unescape_sql(fields[12]) or ""

        raw_articles.append(
            {
                "id": article_id,
                "title": title,
                "body": body,
                "slug": slug or slugify(title),
                "description": description,
                "views": views,
                "updatedAt": updated_at,
            }
        )

    slug_counts: dict[str, int] = {}
    for article in raw_articles:
        base_slug = str(article["slug"])
        count = slug_counts.get(base_slug, 0)
        if count:
            article["slug"] = f"{base_slug}-{article['id']}"
        slug_counts[base_slug] = count + 1

    id_to_slug = {int(a["id"]): str(a["slug"]) for a in raw_articles}

    articles: list[dict[str, object]] = []
    category_map: dict[str, list[str]] = {cat["id"]: [] for cat in KB_CATEGORIES}

    for article in raw_articles:
        article_id = int(article["id"])
        body = rewrite_images(str(article["body"]))
        body = rewrite_cross_links(body, id_to_slug)
        body = sanitize_html(body)
        category = categorize(article_id, str(article["title"]), body)

        entry = {
            "id": article_id,
            "slug": article["slug"],
            "title": article["title"],
            "description": article["description"],
            "body": body,
            "views": article["views"],
            "updatedAt": article["updatedAt"],
            "category": category,
        }
        articles.append(entry)
        category_map[category].append(str(entry["slug"]))

    articles.sort(key=lambda item: (item["category"], item["title"]))

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = [
        "// Generated by scripts/import-kb-articles.py — do not edit manually.",
        "",
        "export type KbCategoryId =",
        "  | "
        + "\n  | ".join(f'"{cat["id"]}"' for cat in KB_CATEGORIES)
        + ";",
        "",
        "export type KbCategory = {",
        "  id: KbCategoryId;",
        "  label: string;",
        "  order: number;",
        "};",
        "",
        "export type KbArticle = {",
        "  id: number;",
        "  slug: string;",
        "  title: string;",
        "  description: string | null;",
        "  body: string;",
        "  views: number;",
        "  updatedAt: string;",
        "  category: KbCategoryId;",
        "};",
        "",
        "export const KB_CATEGORIES: KbCategory[] = "
        + json.dumps(KB_CATEGORIES, ensure_ascii=False, indent=2)
        + ";",
        "",
        "/** Primary category assignment for each published article slug. */",
        "export const KB_CATEGORY_MAP: Record<KbCategoryId, string[]> = "
        + json.dumps(category_map, ensure_ascii=False, indent=2)
        + ";",
        "",
        "export const KB_ARTICLES: KbArticle[] = [",
    ]

    for article in articles:
        lines.append("  {")
        lines.append(f"    id: {article['id']},")
        lines.append(f"    slug: {ts_string(article['slug'])},")
        lines.append(f"    title: {ts_string(article['title'])},")
        lines.append(
            f"    description: {('null' if article['description'] is None else ts_string(article['description']))},"
        )
        lines.append(f"    body: {ts_string(article['body'])},")
        lines.append(f"    views: {article['views']},")
        lines.append(f"    updatedAt: {ts_string(article['updatedAt'])},")
        lines.append(f"    category: {ts_string(article['category'])},")
        lines.append("  },")

    lines.extend(
        [
            "];",
            "",
            "export const KB_ARTICLES_BY_SLUG: Record<string, KbArticle> = Object.fromEntries(",
            "  KB_ARTICLES.map((article) => [article.slug, article]),",
            ");",
            "",
        ]
    )

    OUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(articles)} articles to {OUT_PATH}")
    for cat in KB_CATEGORIES:
        cat_id = str(cat["id"])
        print(f"  {cat['label']}: {len(category_map[cat_id])}")


if __name__ == "__main__":
    main()

# Certificates

The certificate images shown on the site live here and are linked from `src/data/portfolio.ts`
(`certifications` list, plus the ICCCSS card under Top Moments).

| File | Certificate |
| ---- | ----------- |
| `nptel-elite.jpg` | NPTEL — Privacy and Security in Online Social Media (Elite) |
| `nasscom-ai-ml.jpg` | NASSCOM FutureSkills Prime — Certificate Program in AI & ML |
| `microsoft-power-bi.jpg` | Microsoft Certified: Power BI Data Analyst Associate |
| `board-infinity-data-science.jpg` | Board Infinity — Data Science for Beginners |
| `scaler-aws.jpg` | Scaler Topics — AWS Free Course |
| `icccss-2025.jpg` | ICCCSS’25 — paper presentation |

To add another, drop the image in this folder and add `{ issuer, name, link: '/certificates/<file>' }`
to `certifications`. A certification with an empty `link` stays non-clickable.

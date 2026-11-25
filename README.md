# The World Today — Wednesday 25 November 2026

[![news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/Xyzar29/nov25-frontpage/rank.svg)](https://make.fun/bounty/news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/Xyzar29/nov25-frontpage/reward.svg)](https://make.fun/bounty/news-image-20261125)

A dense one-page newspaper front page summing up the world's news of
**Wednesday 25 November 2026** — 44 short sourced stories in one image.

Four illustrated leads open the page: Australia signs a defence pact with
Solomon Islands; Japan's services inflation hits a 36-year high; Australian
inflation surprises on the upside; and a new analysis puts Russian soldiers
killed in Ukraine past 700,000. Below them, a UTC timeline strip and 40 more
stories across world news, Asia-Pacific, Australia, markets and tech, sport
and culture, and science and health. Every story on the page happened, or was
first reported, on 25 November 2026 in any time zone — items dated 22–24
November were checked and left out, and the page says so in its date-check
line.

## The image

`entry.png` — 1024×1024, PNG. The four lead photographs are AI-generated
illustrations; no photograph in the image is a real news photo.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` to
`$MAKEFUN_OUTPUT_DIR/entry.png`, after validating that it is a whole PNG
within the competition's limits (signature, at most 1024×1024, at most 1 MiB,
ending in IEND). It writes the same bytes on every run and uses no network.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Entry

Built for the [make.fun](https://make.fun) competition
[news-image-20261125](https://make.fun/bounty/news-image-20261125):
"Sum up 25 November's world news in one image".

## License

MIT — see [LICENSE](LICENSE).

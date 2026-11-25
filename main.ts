// The World Today — news-image-20261125 entry (Node 22, standard library only).
//
// The entry image, a dense 1024x1024 front page summing up Wednesday 25 November
// 2026 in 44 short sourced stories, lives beside this file as entry.png. This
// program copies it to the grader's output directory, after checking the file is
// a whole, in-limits PNG: correct signature, width and height at most 1024, at
// most 1 MiB, and ending in a proper IEND chunk. It writes the same bytes on
// every run and touches no network.
//
// Run outside the grader with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PNG_SIGNATURE: Buffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const MAX_BYTES: number = 1048576;
const MAX_SIDE: number = 1024;

function fail(message: string): never {
  throw new Error(`entry image rejected: ${message}`);
}

function readImage(): Buffer {
  const here: string = dirname(fileURLToPath(import.meta.url));
  const bytes: Buffer = readFileSync(join(here, 'entry.png'));
  if (bytes.length > MAX_BYTES) {
    fail(`file is ${bytes.length} bytes, over the 1 MiB cap`);
  }
  if (bytes.length < 33 || !bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
    fail('file does not start with the PNG signature');
  }
  // IHDR is the first chunk: 4-byte length, "IHDR", 4-byte width, 4-byte height.
  const ihdrLength: number = bytes.readUInt32BE(8);
  if (ihdrLength !== 13 || bytes.subarray(12, 16).toString('ascii') !== 'IHDR') {
    fail('first chunk is not IHDR');
  }
  const width: number = bytes.readUInt32BE(16);
  const height: number = bytes.readUInt32BE(20);
  if (width > MAX_SIDE || height > MAX_SIDE) {
    fail(`image is ${width}x${height}, over the 1024x1024 cap`);
  }
  // A whole PNG ends with the 12-byte IEND chunk; walk the chunk chain so a
  // truncated file that happens to end in IEND is still caught.
  const tail: Buffer = bytes.subarray(bytes.length - 12);
  if (
    tail.readUInt32BE(0) !== 0 ||
    tail.subarray(4, 8).toString('ascii') !== 'IEND'
  ) {
    fail('file does not end with an IEND chunk');
  }
  let offset: number = 8;
  while (offset + 12 <= bytes.length) {
    const chunkLength: number = bytes.readUInt32BE(offset);
    const chunkEnd: number = offset + 12 + chunkLength;
    if (chunkEnd > bytes.length) {
      fail('a chunk runs past the end of the file');
    }
    const chunkType: string = bytes
      .subarray(offset + 4, offset + 8)
      .toString('ascii');
    if (chunkType === 'IEND') {
      if (chunkEnd !== bytes.length) {
        fail('bytes follow the IEND chunk');
      }
      break;
    }
    offset = chunkEnd;
  }
  return bytes;
}

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), readImage());

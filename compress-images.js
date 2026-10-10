// Optional asset utility. The portfolio and deployment do not call this script.
const fs = require('node:fs/promises');
const path = require('node:path');

if (!process.env.TINIFY_API_KEY) {
  console.error('Set private TINIFY_API_KEY before running this optional asset utility.');
  process.exit(1);
}

const tinify = require('tinify');
tinify.key = process.env.TINIFY_API_KEY;
const images = [
  'Hotel.jpg',
  'Spare.jpg',
  'Traffic.jpg',
  'DPA.jpg',
  'GS.jpg',
  'Deep_learning_AI.png',
  'profile_pic.jpeg',
];
const publicDir = path.join(__dirname, 'public');
// Keep the originals intact. Review optimized copies before replacing any asset.
const outputDir = path.join(__dirname, 'test-results', 'optimized-images');

(async () => {
  await fs.mkdir(outputDir, { recursive: true });
  let compressed = 0;
  let failed = 0;
  for (const image of images) {
    const input = path.join(publicDir, image);
    try {
      await fs.access(input);
    } catch {
      console.warn(`Skipped missing asset: ${image}`);
      continue;
    }
    try {
      await tinify.fromFile(input).toFile(path.join(outputDir, image));
      console.log(`Wrote optimized copy: ${image}`);
      compressed++;
    } catch (error) {
      // Do not print SDK error messages, requests or credentials.
      const reason =
        error instanceof tinify.AccountError
          ? 'Check the private API key and account quota.'
          : error instanceof tinify.ClientError
            ? 'Check the source image format.'
            : 'Check connectivity or try again later.';
      console.error(`Could not optimize ${image}. ${reason}`);
      failed++;
    }
  }
  console.log(`Finished: ${compressed} optimized copies; ${failed} failures. Originals unchanged.`);
  if (failed) process.exitCode = 1;
})().catch(() => {
  console.error('Could not prepare the output folder. Check local file permissions.');
  process.exitCode = 1;
});

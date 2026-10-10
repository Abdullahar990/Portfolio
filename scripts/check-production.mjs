import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const patterns =
  /data-mtl-registry|__MTL_PREVIEW_RUNTIME__|@mtl-client|__mtl\/|motion-studio\/dist\/runtime|localhost:5200/;
const matches = [];
async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await scan(path);
    else if (/\.(js|html|css)$/.test(path) && patterns.test(await readFile(path, 'utf8')))
      matches.push(path);
  }
}
await scan('.next/static');
await scan('.next/server');
if (matches.length) {
  console.error('Studio instrumentation found in production:', matches);
  process.exitCode = 1;
} else
  console.log(
    'PASS: no Studio panel, runtime markers or companion URLs in production JS, CSS or HTML.',
  );

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { createInterface } from 'node:readline';
import { resolve } from 'node:path';

const name = process.argv[2] ?? 'playwright';
const configs = {
  playwright: [
    'node_modules/@playwright/mcp/cli.js',
    '--browser',
    'chrome',
    '--isolated',
    '--headless',
  ],
  chrome_devtools: [
    'node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js',
    '--headless',
    '--isolated',
    '--no-usage-statistics',
    '--no-performance-crux',
  ],
};
const urls = {
  context7: 'https://mcp.context7.com/mcp',
  figma: 'https://mcp.figma.com/mcp',
  github: 'https://api.githubcopilot.com/mcp/',
};
const config = configs[name];
const client = new Client({ name: 'portfolio-verification', version: '1.0.0' });
const transport = config
  ? new StdioClientTransport({
      command: process.execPath,
      args: [
        ...(name === 'chrome_devtools' ? ['--no-experimental-webstorage'] : []),
        resolve(config[0]),
        ...config.slice(1),
      ],
      stderr: 'inherit',
    })
  : new StreamableHTTPClientTransport(new URL(urls[name]));

try {
  await client.connect(transport);
  const { tools } = await client.listTools();
  console.log(
    JSON.stringify({
      server: name,
      connected: true,
      tools: tools.map(({ name, inputSchema }) => ({ name, inputSchema })),
    }),
  );
  const lines = createInterface({ input: process.stdin });
  for await (const line of lines) {
    if (line === 'exit') break;
    try {
      const result = await client.callTool(JSON.parse(line), undefined, { timeout: 120000 });
      console.log(JSON.stringify(result));
    } catch (error) {
      console.log(JSON.stringify({ error: error.message }));
    }
  }
} catch (error) {
  console.error(JSON.stringify({ server: name, connected: false, error: error.message }));
  process.exitCode = 1;
} finally {
  await client.close();
}

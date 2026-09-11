import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import type { Plugin } from 'vite'
import type { ServerResponse } from 'http'

function multiDeviceSyncPlugin(): Plugin {
  const clients = new Set<ServerResponse>();
  let cachedState: any = null;

  return {
    name: 'multi-device-sync',
    configureServer(server) {
      server.middlewares.use('/api/sync/stream', (req, res) => {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        });
        res.write('retry: 3000\n\n');
        clients.add(res);

        if (cachedState) {
          res.write(`data: ${JSON.stringify({ type: 'INIT_STATE', payload: cachedState, timestamp: Date.now() })}\n\n`);
        }

        req.on('close', () => {
          clients.delete(res);
        });
      });

      server.middlewares.use('/api/sync/publish', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.type === 'FULL_SNAPSHOT') {
                cachedState = data.payload;
              }
              const eventPayload = `data: ${JSON.stringify({ ...data, timestamp: Date.now() })}\n\n`;
              for (const client of clients) {
                try {
                  client.write(eventPayload);
                } catch {
                  clients.delete(client);
                }
              }
              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              });
              res.end(JSON.stringify({ ok: true, subscribers: clients.size }));
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err?.message || 'Invalid JSON' }));
            }
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    multiDeviceSyncPlugin(),
  ],
  server: {
    host: true,
    port: 5174,
    allowedHosts: true,
  },
})

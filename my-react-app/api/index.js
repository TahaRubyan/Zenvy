import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  try {
    // Read the compiled index.html template from dist
    const templatePath = path.resolve(__dirname, '../dist/index.html');
    let template = fs.readFileSync(templatePath, 'utf8');

    // Import the server-rendered React app from server-build
    const entryServerPath = path.resolve(__dirname, '../server-build/entry-server.js');
    const entryServerURL = pathToFileURL(entryServerPath).href;
    const { render } = await import(entryServerURL);

    // Render the React app to string
    const appHtml = render();

    // Replace the placeholder comment with the rendered HTML
    const html = template.replace('<!--app-html-->', appHtml);

    // Send the rendered HTML to the client
    res.setHeader('Content-Type', 'text/html');
    res.status(200).end(html);
  } catch (error) {
    console.error('SSR Execution Error:', error);
    res.status(500).end(`Internal Server Error during SSR: ${error.message}`);
  }
}

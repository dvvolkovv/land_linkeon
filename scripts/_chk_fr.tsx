import { renderToStaticMarkup } from 'react-dom/server';
import * as ru from '../src/content/legal/ru';
import * as fr from '../src/content/legal/fr';
import * as en from '../src/content/legal/en';
import fs from 'node:fs';

const types = ['offer', 'privacy', 'pdn'] as const;
const out: Record<string, any> = {};
for (const [name, pack] of Object.entries({ ru, fr, en })) {
  out[name] = {};
  for (const t of types) {
    const html = renderToStaticMarkup(pack.renderLegal(t as any) as any);
    out[name][t] = html;
  }
  out[name].titles = pack.titles;
}
fs.writeFileSync('/private/tmp/claude-501/-Users-dmitry-Downloads-spirits-front/9eb37bb6-6805-4332-838e-8bc2a80a5b75/scratchpad/render.json', JSON.stringify(out, null, 2));
console.log('ok');

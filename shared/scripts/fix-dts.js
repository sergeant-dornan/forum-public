import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const walk = (d) => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (p.endsWith('.d.ts')) {
      const src = fs.readFileSync(p, 'utf8')
      const fixed = src.replace(/\bz\.z\./g, 'z.')
      if (src !== fixed) fs.writeFileSync(p, fixed)
    }
  }
}
walk(dist)
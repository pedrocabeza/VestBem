import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdtempSync, readFileSync, unlinkSync, rmdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const directory = mkdtempSync(join(tmpdir(), 'vestbem-api-test-'))
const base = 'http://127.0.0.1:33991'
let server
async function start() {
  server = spawn(process.execPath, ['src/server.js'], { env: { ...process.env, PORT: '33991', VESTBEM_DATA_DIR: directory }, stdio: ['ignore', 'pipe', 'pipe'] })
  await Promise.race([once(server.stdout, 'data'), once(server, 'exit').then(()=>{throw Error('A API não iniciou')})])
}
async function stop() { const ended = once(server, 'exit'); server.kill(); await ended }
async function register(email) { return fetch(`${base}/api/interesses`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email}) }) }
try {
  await start()
  const campaigns = await (await fetch(`${base}/api/campanhas`)).json()
  assert.equal(campaigns.length, 3)
  assert.ok(campaigns.every(item=>item.current<=item.goal && item.category))
  const donate = quantity => fetch(`${base}/api/doacoes`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:'Teste',item:'Roupas',quantity,point:'Instituto Recomeçar'}) })
  assert.equal((await (await donate(5)).json()).donation.points, 50)
  assert.equal((await (await donate(3)).json()).donation.points, 30)
  for (const invalid of [0,-1,1.5,'1 sacola',10001]) assert.equal((await donate(invalid)).status,400)
  assert.equal((await register('invalido')).status,400)
  assert.equal((await register('TESTE@example.com')).status,201)
  assert.equal((await register('teste@example.com')).status,201)
  const file = join(directory,'interesses.json')
  assert.equal(JSON.parse(readFileSync(file,'utf8')).length,1)
  await stop(); await start()
  assert.equal((await register('teste@example.com')).status,201)
  assert.equal(JSON.parse(readFileSync(file,'utf8')).length,1)
  console.log('OK: campanhas, pontuação por item, quantidades inválidas, e-mails e persistência após reinício.')
} finally {
  if(server && server.exitCode===null) await stop()
  try { unlinkSync(join(directory,'interesses.json')) } catch(error) { if(error.code!=='ENOENT')throw error }
  rmdirSync(directory)
}

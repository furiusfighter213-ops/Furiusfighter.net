// script.js - dynamic loader for packs & mods
document.getElementById('year').textContent = new Date().getFullYear();

// Helper: safe link (encode spaces)
function safePath(p){ return encodeURI(p); }

// Render one pack card
function makePackCard(p){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${p.image || 'assets/images/packs/sample-texture.png'}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p>${p.description || ''}</p>
    <div class="row">
      <div style="color:var(--muted);font-size:12px">${p.version ? 'v'+p.version : ''}</div>
      <a class="download-btn" href="${safePath(p.download)}" download>Download</a>
    </div>
  `;
  return div;
}

// Render mod card
function makeModCard(m){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${m.image || 'assets/images/packs/sample-texture.png'}" alt="${m.name}">
    <h4>${m.name}</h4>
    <p>${m.description || ''}</p>
    <div class="row">
      <div style="color:var(--muted);font-size:12px">${m.version ? 'v'+m.version : ''}</div>
      <a class="download-btn" href="${safePath(m.download)}" download>Download</a>
    </div>
  `;
  return div;
}

// Load JSON and fill grids
async function loadAll(){
  try{
    const [tpRes, modsRes] = await Promise.all([
      fetch('data/texturepacks.json'),
      fetch('data/mods.json')
    ]);
    const tps = await tpRes.json();
    const mods = await modsRes.json();

    const pg = document.getElementById('packs-grid');
    const mg = document.getElementById('mods-grid');
    pg.innerHTML = ''; mg.innerHTML = '';

    if(Array.isArray(tps) && tps.length){
      tps.forEach(p => pg.appendChild(makePackCard(p)));
    } else {
      pg.innerHTML = `<div class="card"><h4>No texture packs yet</h4><p>Put .zip files into /packs/texture-packs and add entries to data/texturepacks.json</p></div>`;
    }

    if(Array.isArray(mods) && mods.length){
      mods.forEach(m => mg.appendChild(makeModCard(m)));
    } else {
      mg.innerHTML = `<div class="card"><h4>No mods yet</h4><p>Put .jar files into /packs/mods and add entries to data/mods.json</p></div>`;
    }
  } catch(err){
    console.error(err);
    document.getElementById('packs-grid').innerHTML = `<div class="card"><h4>Error loading data</h4><p>Check data/*.json or run via local server.</p></div>`;
    document.getElementById('mods-grid').innerHTML = `<div class="card"><h4>Error loading data</h4><p>Check data/*.json or run via local server.</p></div>`;
  }
}

loadAll();

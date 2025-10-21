async function loadData() {
    const packsResponse = await fetch('data/texturepacks.json');
    const modsResponse = await fetch('data/mods.json');

    const packs = await packsResponse.json();
    const mods = await modsResponse.json();

    const packsContainer = document.getElementById('packs-container');
    const modsContainer = document.getElementById('mods-container');

    packs.forEach(pack => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${pack.image}" alt="${pack.name}">
            <h3>${pack.name}</h3>
            <button class="download-btn" onclick="window.location.href='${pack.download}'">Download</button>
        `;
        packsContainer.appendChild(card);
    });

    mods.forEach(mod => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${mod.image}" alt="${mod.name}">
            <h3>${mod.name}</h3>
            <button class="download-btn" onclick="window.location.href='${mod.download}'">Download</button>
        `;
        modsContainer.appendChild(card);
    });
}

loadData();

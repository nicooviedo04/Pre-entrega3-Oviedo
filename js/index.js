const shopContent = document.getElementById('shopContent');

personajes.forEach((personaje) => {
    const content = document.createElement('div');
    content.innerHTML = `
        <img src="${personaje.img}">
        <h2>${personaje.name}</h2>
        <p>${personaje.price}</p>
    `;

    shopContent.appendChild(content);
});

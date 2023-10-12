const shopContent = document.getElementById('shopContent');

personajes.forEach((personaje) => {
    const content = document.createElement('div');
    content.className = "card";
    content.innerHTML = `
        <img src="${personaje.img}">
        <h2>${personaje.characterName}</h2>
        <p class= "price">$ ${personaje.price}</p>
    `;

    shopContent.appendChild(content);

    const buybutton = document.createElement("button")
    buybutton.innerText = "Comprar"

    content.append(buybutton)
});

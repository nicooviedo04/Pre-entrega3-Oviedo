const shopContent = document.getElementById('shopContent')
const cart = []

personajes.forEach((personaje) => {
    const content = document.createElement('div')
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

    buybutton.addEventListener("click",()=>{

        const repeat = cart.some((repeatpersonaje)=> repeatpersonaje.id === personaje.id)

        if(repeat){
            cart.map((pers)=>{
                if (pers.id === personaje.id ){
                    pers.quanty++
            }})
            
        }else{
            cart.push({
                
                id: personaje.id,
                characterName: personaje.characterName,
                price: personaje.price,
                quanty: personaje.quanty,
                img: personaje.img,
                
            })
        }
        displayCartCounter()
    })
})

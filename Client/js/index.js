const shopContent = document.getElementById('shopContent')
const cart = []
const animatedElement = document.querySelector('.aboutus-sn');
const animatedElement2 = document.querySelector('.aboutus-nm');
const animatedElement3 = document.querySelector('.animated-productos');

function checkScroll() {
    const elementTop = animatedElement.getBoundingClientRect().top;
    const element2Top = animatedElement2.getBoundingClientRect().top;
    const element3Top = animatedElement3.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (elementTop < screenHeight * 0.75 && element2Top < screenHeight * 0.75 && element3Top < screenHeight * 0.75)  {
        animatedElement.classList.add('active');
        animatedElement2.classList.add('active');
        animatedElement3.classList.add('active');
        window.removeEventListener('scroll', checkScroll);
    }

}

window.addEventListener('scroll', checkScroll);


// Compra personajes
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
                    // pers.quanty++ 
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

$(".option").click(function () {
    $(".option").removeClass("active");
    $(this).addClass("active");
});



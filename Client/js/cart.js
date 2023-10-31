const modalContainer = document.getElementById('modal-container')
const modalOverlay = document.getElementById('modal-overlay')

const cartBtn = document.getElementById('cart-btn')
const cartCounter =document.getElementById('cart-counter')



const displayCart = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display="block";
    modalOverlay.style.display="block";
    //MHeader
    const modalHeader = document.createElement('div')

    const modalClose = document.createElement('div')
    modalClose.innerText = "✖"
    modalClose.className = "modal-close"
    modalHeader.append(modalClose)

    modalClose.addEventListener("click", () => {
        modalContainer.style.display="none";
        modalOverlay.style.display="none";
    })

    const modalTitle = document.createElement('div')
    modalTitle.innerText= 'Warriors of Destiny'
    modalTitle.className= "modal-title"
    modalHeader.append(modalTitle)
    modalContainer.append(modalHeader)

    //MBody
    if(cart.length > 0){

    cart.forEach((personaje)=>{
        const modalBody = document.createElement('div')
        modalBody.className ="modal-body"
        modalBody.innerHTML = 
        `<div class="personaje">
            <img class="personaje-img" src=" ${personaje.img}" />
            <div class="personaje-info">
                <h4> ${personaje.characterName}</h4>
            </div>
        <div class="quantity">
        <span class="quantity-btn-decrease">➖</span>
        <span class="quantity-input"> ${personaje.quanty}</span>
        <span class="quantity-btn-increase">➕</span>
        </div>
        <div class="price"> ${personaje.price * personaje.quanty} $</div>
        <div class="delete-personaje">❌</div>
        </div>`
        
        modalContainer.append(modalBody)
        displayCartCounter()
        // boton de restar
        const decrease = modalBody.querySelector(".quantity-btn-decrease")
        decrease.addEventListener ('click', () =>{
            if (personaje.quanty !== 1){
            personaje.quanty--
            displayCart()
            displayCartCounter()
        }})

        // boton de sumar
        // const increase = modalBody.querySelector(".quantity-btn-increase")
        // increase.addEventListener ('click', () =>{
        //     personaje.quanty++
        //     displayCart()
        //     displayCartCounter()
        // })

        // boton de eliminar del carrito
        const deletePersonajeBtn = modalBody.querySelector('.delete-personaje');
        deletePersonajeBtn.addEventListener('click', ()=>{
            deletePersonaje(personaje.id)
            displayCartCounter()
            })
    })
    
    //Mfooter
    const total = cart.reduce((acc,elem)=> acc + elem.price * elem.quanty, 0)
    const modalFooter = document.createElement('div')
    modalFooter.className = "modal-footer"
    modalFooter.innerHTML = ` <div class = "total-price">Total: ${total}$</div>
    <button class = "btn-primary" id="checkout-btn"> Pagar </button>
    <div id = "button-checkout"></div>`
    modalContainer.append(modalFooter)

    //MERCADO PAGO
    const mercadopago = new MercadoPago("APP_USR-1457888d-4b7e-4d2c-a609-7098e96210fa", {
        locale: "es-AR", 
    })

    const checkoutButton = modalFooter.querySelector("#checkout-btn")

    checkoutButton.addEventListener("click", function(){
        checkoutButton.remove()

        const orderData = {
            quantity: 1,
            description: "Compra de personaje",
            price: total,
        }

        fetch("http://localhost:8080/create_preference", {
            method:"POST", 
            headers:{
                'Content-Type': 'application/json'
            }, 
            body : JSON.stringify (orderData),
        })
        .then(function (response){
            return response.json();
        })
        .then(function(preference){
            createCheckoutButton(preference.id)
        })
        .catch(function(){
            Swal.fire('Usa el npm start en la carpeta del servidor :) ')
        })
    })

    function createCheckoutButton(preferenceId){
        const bricksBuilder = mercadopago.bricks()

        const renderComponent = async (bricksBuilder) =>{


            await bricksBuilder.create(
                "wallet",
                "button-checkout",
                {
                    initialization:{
                        preferenceId: preferenceId,
                    },
                    callbacks: {
                        onError: (error) => console.error(error),
                        onReady: ()=>{},
                    },
                }
            )
        }
        window.checkoutButton = renderComponent(bricksBuilder)
    }


}else{
    const modalText = document.createElement ('h2')
    modalText.className = "modal-body"
    modalText.textContent= 'No hay ningun producto en el carrito'
    modalContainer.append(modalText)


}
}
cartBtn.addEventListener("click", displayCart) 
const deletePersonaje =(id) =>{
    const foundId = cart.findIndex((element)=> element.id === id)
    console.log(foundId)
    cart.splice(foundId ,1 )
    displayCart()
    displayCartCounter()
}

const displayCartCounter=()=>{
    const cartLength = cart.reduce((acc,elem)=> acc + elem.quanty, 0)
    if(cartLength > 0 ){
        cartCounter.style.display = "block";
        cartCounter.innerText= `${cartLength}`
    }else{
        cartCounter.style.display = "none";
    }
    
    
}
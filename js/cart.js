const modalContainer = document.getElementById('modal-container')
const modalOverlay = document.getElementById('modal-overlay')
const cartBtn = document.getElementById('cart-btn')

const displayCart = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display="block";
    modalOverlay.style.display="block";
    //Header
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

    //Body
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
        <span class="quantity-btn-decrease">-</span>
        <span class="quantity-input"> ${personaje.quanty}</span>
        <span class="quantity-btn-increase">+</span>
        </div>
        <div class="price"> ${personaje.price * personaje.quanty} $</div>
        <div class="delete-personaje">❌</div>
        </div>`

        modalContainer.append(modalBody)
    })

    
}


cartBtn.addEventListener("click", displayCart) 
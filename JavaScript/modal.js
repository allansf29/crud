// const modalBtnOpen = document.querySelector("#button-cadastrar");
// const modalBtnClose = document.querySelector("#modal-close")
// const modalBtnCancel = document.querySelector("#modal-cancel")
// const modalBtn = document.querySelector("#modal")

// modalBtnOpen.addEventListener('click', function() {
//     modalBtn.classList.add('active');
// })

// modalBtnClose.addEventListener('click', function() {
//     modalBtn.classList.remove('active');
// })

// modalBtnCancel.addEventListener('click', function() {
//    modalBtn.classList.remove('active')
// })

const openModal = () => document.querySelector("#modal")
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.querySelector("#modal").classList.remove('active') 
}
    
       

// EVENTOS

document.querySelector("#cadastrarCliente")
    .addEventListener('click', openModal)

document.querySelector('#modal-close')
    .addEventListener('click', closeModal)

document.querySelector('#modal-cancel')
    .addEventListener('click', closeModal)
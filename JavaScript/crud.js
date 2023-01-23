const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setlocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))

// DELETE
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setlocalStorage(dbClient)
}

// UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setlocalStorage(dbClient)
}

// READ
const readClient = () => getLocalStorage()

// CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setlocalStorage(dbClient)
}

const isValidFields = () => {
    return document.querySelector('#form').reportValidity()
}

// INTERAÇÃO COM O USUARIO

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.querySelector('#nome').value,
            email: document.querySelector('#email').value,
            celular: document.querySelector("#celular").value,
            cidade: document.querySelector("#cidade").value
        }

        const index = document.getElementById('nome').dataset.index
        if(index == 'new') {
            createClient(client)
            
            updateTable()
            closeModal()
        }else{
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
      <button type="button" class="button green fa-solid fa-pencil" id="edit-${index}"></button>
      <button type="button" class="button red fa-sharp fa-solid fa-trash" id="delete-${index}"></button>
    </td>
    `

    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.querySelector('#nome').value = client.nome
    document.querySelector('#email').value = client.email
    document.querySelector('#celular').value = client.celular
    document.querySelector('#cidade').value = client.cidade
    document.querySelector('#nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button'){

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        }else{
            const client = readClient()[index]
            const response = confirm (`Deseja realmente excluir o cliente ${client.nome}`)
            if(response) {
                deleteClient(index)
                updateTable()
            }

        }
    }
}

updateTable()


// EVENTOS
document.querySelector('#modal-save')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
.addEventListener('click', editDelete)

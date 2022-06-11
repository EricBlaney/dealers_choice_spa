const axios = require('axios');
const secretsList = document.querySelector('#secrets-list');
const secretForm = document.querySelector('form');
const input = document.querySelector('input');
const state = {};

secretForm.addEventListener('submit', async(ev) => {
    ev.preventDefault();
    const body = input.value;
    try{
        await axios.post('/api/secrets', {
            body
        });
        getSecrets();
        input.value='';
    }
    catch(ex){
        console.log(ex.response.data);
    }
})

secretsList.addEventListener('click', async(ev) => {
    if (ev.target.tagName === 'BUTTON') {
        const id = ev.target.getAttribute('secret-id');
        await axios.delete(`/api/secrets/${id}`);
        getSecrets();
    }
})

const renderSecrets = () => {
    const html = state.secrets.map( secret => {
        return `<li>
            ${secret.body}
            <button secret-id='${secret.id}'>lies!</button>
        </li>`;
    }).join("");
    secretsList.innerHTML = html;
}

const getSecrets = async() => {
    const response = await axios.get('/api/secrets');
    const data = response.data;
    state.secrets = data;
    renderSecrets();
};

getSecrets();
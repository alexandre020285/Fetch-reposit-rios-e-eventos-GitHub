import { getUser } from './services/user.js';
import { getEvents } from './services/events.js';
import { getRepos } from './services/repositories.js';

import { user } from './services/objects/users.js';
import { screen } from './services/objects/screen.js';


document.getElementById('btn-search').addEventListener('click', () => {
    let userName = document.getElementById('input-search').value;

    if (validateEmptyInput(userName)) return;
        getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        let userName = document.getElementById('input-search').value;

        if (validateEmptyInput(userName)) return;
        getUserData(userName);        
    }
});

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub!');
        return true;
    };
};

async function getUserData(userName) {

    const userResponse = await getUser(userName);

    if (userResponse.message === 'Not Found') {
        screen.renderNotFound();
        return;
    };


    const repositoriesResponse = await getRepos(userName);
    const eventsResponse = await getEvents(userName);

    


    user.setInfo(userResponse);
    user.setRepositories(await getRepos(userName));
    user.setEvents(await getEvents(userName));

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
}

// getUserData('devemdobro');
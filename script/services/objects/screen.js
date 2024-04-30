const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `  <div class ="profile-info">
                                            <div class="profile-info-image">
                                                <img src="${user.avatarUrl}" alt="imagem do perfil"/>
                                            </div>
                                            <div class="profile-info-text">
                                                <h1>${user.name ?? 'não possui nome cadastrado😥'}</h1>
                                                <p>Login: ${user.login}</p>
                                                <p>📖Biografia: ${user.bio ?? 'não possui bio cadastrada😥'}</p>
                                                <p>👣Seguidores: ${user.followers} </p>
                                                <p>👥 Seguindo: ${user.following}</p>
                                                <p>🏗️ Repositórios: ${user.repos}</p>
                                            </div>
                                        </div>`


        let repositoriesItems = '';
        user.repositories.forEach(repo => {
            repositoriesItems += `  <ul class="repo-list">
                                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                        <li class="repo-info">
                                            <p href="${repo.forks_url}">🍴 ${repo.forks}</p>
                                            <p href="${repo.stargazers_url}">⭐ ${repo.stargazers_count}</p>
                                            <p href="${repo.watchers_url}">👀 ${repo.watchers}</p>
                                            <p href="${repo.language}">👨‍💻 ${repo.language ?? '❓'}</p>
                                        </li>
                                </ul>`;
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += ` <div class="repositories">
                                                <h2>Repositórios</h2>
                                                <ul class="repositories-section">${repositoriesItems}</ul>
                                            </div>`
        } else {
            this.userProfile.innerHTML += ` <div class="repositories">
                                                <h2>Repositórios</h2>
                                                <p>Usuário sem repositório!👨‍💻</p>
                                            </div>`
        };

        let eventsItems = '';
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                eventsItems += `<li>
                                    <a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}
                                    </a>
                                    <span> --&nbsp ${event.payload.commits[0].message}</span>
                                </li>`
            } else {
                eventsItems += `<li>
                                    <a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}
                                    </a>
                                    <span> --&nbsp Criado um ${event.payload.ref_type}</span>
                                </li>`
            };
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += ` <div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItems}</ul>
                                            </div>`
        }
        else {
            this.userProfile.innerHTML += ` <div class="events">
                                                <h2>Eventos</h2>
                                                <p>Nenhum evento encontrado!</p>
                                            </div>`
        };
    },

    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado!</h3>'
    },
};

export { screen };
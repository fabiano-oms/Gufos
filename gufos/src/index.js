import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Assets/pages/Home/App';
import * as serviceWorker from './serviceWorker';
//importar o router para poder usar as rotas
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
//importa o caminho da página a ser acessada
import Categorias from './Assets/pages/Categorias/Categorias';
import Login from './Assets/pages/Login/Login';
import Eventos from './Assets/pages/Eventos/Eventos';
import NotFound from './Assets/pages/NotFound/NotFound';

//importa o css padrão
import './Assets/css/flexbox.css';
import './Assets/css/reset.css';
import './Assets/css/style.css';

import './Assets/css/cabecalho.css';
import './Assets/css/rodape.css';
import './Assets/css/login.css';



//importamos da documentação do MDB
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { usuarioAutenticado, parseJwt } from './Services/auth';

const PermissaoAdmin = ({ component : Component }) => (
    <Route render={props =>
        usuarioAutenticado() && parseJwt().Role === "1" ?
        (
            <Component {...props}/>
        ) : (
            <Redirect to={{ pathname: "/Login" }}/>
        )
    }
    />
)

const PermissaoAluno = ({ component : Component }) => (
    <Route render={props =>
        usuarioAutenticado() && parseJwt().Role === "2" ?
        (
            <Component {...props}/>
        ) : (
            <Redirect to={{ pathname: "/Login" }}/>
        )
    }
    />
)

//realizar a criação das rotas
//path endereça uma página
//direto no component para endereçar um erro (pq é como se não fosse encontrada uma rota)
//cria uma propriedade para Categorias, utilizando em categorias.js
const Rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}
                    // <App
                    //     titulo_pagina="Home - Gufos"
                    // />}
                />
                <PermissaoAluno path="/Eventos" component={Eventos}
                    // <Eventos
                    //     titulo_pagina="Eventos - Gufos"
                    // />}
                />
                <PermissaoAdmin path="/Categorias" component={Categorias}
                    // <Categorias
                    //     titulo_pagina="Categorias - Gufos"
                    // />}
                />
                <Route path="/Login" component={Login}
                    // <Login
                    //     titulo_pagina="Login - Gufos"
                    //     url="/Login"
                    // />}
                />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(Rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

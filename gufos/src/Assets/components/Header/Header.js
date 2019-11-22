import React, { Component } from 'react';
import icon_login from '../../img/icon-login.png';
import { withRouter } from 'react-router-dom'
import { usuarioAutenticado, parseJwt } from '../../../Services/auth';


class Header extends Component {
    logout = () => {
        //Remove o token do localStorage
        localStorage.removeItem("usuario-gufos");

        //Redireciona para o endereço '/'
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <a href="/"><img src={icon_login} alt="Logo do Gufos" /></a>

                        <nav className="cabecalhoPrincipal-nav">
                            <a href="/">Home</a>

                            {usuarioAutenticado() && parseJwt().Role === "1" ?
                                (
                                    //Condição se o usuário for ADMINISTRADOR
                                    <React.Fragment>
                                        <a href="Categorias">Categorias</a>
                                        <a className="cabecalhoPrincipal-nav-login" href="/" onClick={this.logout}>Sair</a>
                                    </React.Fragment>
                                ) : (
                                    usuarioAutenticado() && parseJwt().Role === "2" ?
                                        (
                                            //Se o usuário for ALUNO
                                            <React.Fragment>
                                                <a href="Eventos">Eventos</a>
                                                <a className="cabecalhoPrincipal-nav-login" href="/" onClick={this.logout}>Sair</a> 
                                            </React.Fragment>
                                        ) : (
                                            //Se o usuário não estiver LOGADO
                                            <React.Fragment>
                                                <a className="cabecalhoPrincipal-nav-login" href="Login">Login</a>
                                            </React.Fragment>
                                        )
                                )}
                        </nav>
                    </div>
                </header>
            </div>
        );
    }
}
export default withRouter(Header);
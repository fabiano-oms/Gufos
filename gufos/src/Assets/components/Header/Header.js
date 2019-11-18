import React from 'react';
import icon_login from '../../img/icon-login.png';


function Header(){
    return (
        <div>
            <header class="cabecalhoPrincipal">
                <div class="container">
                    <a href="/"><img src={icon_login} alt="Logo do Gufos"/></a>

                    <nav class="cabecalhoPrincipal-nav">
                        <a href="/">Home</a>
                        <a href="Eventos">Eventos</a>
                        <a href="Categorias">Categorias</a>
                        <a class="cabecalhoPrincipal-nav-login" href="Login">Login</a>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;
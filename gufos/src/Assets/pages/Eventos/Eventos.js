//importa uma biblioteca de códigos para classes
import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header';

class Eventos extends Component {

    constructor() {
        super();
        this.state = {
            listaEventos: [],
            listaCategorias: [],
            tituloEventoInput: "",
            dataEventoInput: "",
            acessoLivreInput: "",
            tituloCategoriaInput: "",
        }
        this.cadastrarEvento = this.cadastrarEvento.bind(this);
    }

    UNSAFE_componentWillMount() {
        //props guarda as informações
        console.log("Carregando");
        document.title = this.props.titulo_pagina;
    }
    componentDidMount() {
        console.log("Carregado");
        console.log(this.state.listaEventos);
        this.listarEventos();
        this.listagemCategorias();
    }
    componentDidUpdate() {
        console.log("Atualizando");
    }
    componentWillUnmount() {
        console.log("Saindo");
    }

    //----------------------------------------------------------------------------------

    listagemCategorias = () => {
        fetch("http://localhost:5000/api/Categoria")
            .then(response => response.json())
            .then(data => this.setState({ listaCategorias: data }))
    }

    atualizaEstado = (input) => {
        let nomePropriedade = input.target.name;
        this.setState({
            [input.target.name]: input.target.value
        },
            () => console.log("Novo valor: ", this.state[nomePropriedade])
        );
    }

    //------------------------- ÍNICIO DOS MÉTODOS --------------------------------------
    
    // GET - Eventos
    listarEventos = () => {
        fetch("http://localhost:5000/api/Evento")
            .then(response => response.json())
            .then(data => this.setState({ listaEventos: data }))
    }

    // POST
    cadastrarEvento(cadastro) {
        cadastro.preventDefault();

        console.log("Cadastrando");
        console.log(this.state.tituloEventoInput);

        fetch("http://localhost:5000/api/Evento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tituloEvento: this.state.tituloEventoInput,
                dataEvento: this.state.dataEventoInput,
                // Alternário = se for 0 é falso, se não for 0 é verdadeiro
                acessoLivre: (this.state.acessoLivreInput === "0") ? false : true,
                idCategoria: this.state.tituloCategoriaInput
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listarEventos();
                this.setState(() => ({ listaEventos: this.state.listaEventos }))
            })
            // .then(response => {
            //     console.log(response);
            //     this.listagemCategorias();
            //     this.setState(() => ({ listaCategorias: this.state.listaCategorias }))
            // })
            .catch(error => console.log(error))
    }


    //-------------------------- FIM DOS MÉTODOS ------------------------------------------


    //são estados que precisam ser renderizados a cada mudança
    render() {
        //retorno é sempre em parênteses "()"
        // <Footer/> chamamos a componente footer para a pagina        
        return (
            <div>
                <Header />
                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Categoria</th>

                                        {/* Comentado até criar o cadastro de Endereço */}
                                        {/* <th>Localização</th> */}

                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">
                                    {
                                        this.state.listaEventos.map(function (evento) {
                                            return (
                                                <tr key={evento.idEvento}>
                                                    <td>{evento.idEvento}</td>
                                                    <td>{evento.tituloEvento}</td>
                                                    <td>{evento.dataEvento}</td>
                                                    {/* [(objeto)? 'Verdade': 'Falso'] utilizado para poder exibir variável booleana, já alterando de true/false para um valor string*/}
                                                    <td>{(evento.acessoLivre) ? 'Sim' : 'Não'}</td>
                                                    {/* tabela.idEstrangeiroNavigation.QualquerObjeto */}
                                                    <td>{evento.idCategoriaNavigation.tituloCategoria}</td>

                                                    {/* Comentado até criar o cadastro de Endereço */}
                                                    {/* <td>{evento.idLocalizacaoNavigation.endereco}</td> */}
                                                    <td>
                                                        <button onClick={e => this.alterarEvento(evento)}>Alterar</button>
                                                        <button onClick={e => this.deletarEvento(evento.idEvento)}>Excluir</button>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>

                            <form onSubmit={this.cadastrarEvento}>
                                <div className="container">

                                    {/* Título */}
                                    <input
                                        type="text"
                                        id="evento__titulo"
                                        placeholder="título do evento"

                                        value={this.state.tituloEventoInput}
                                        name="tituloEventoInput"
                                        onChange={this.atualizaEstado}
                                    />

                                    {/* Data */}
                                    <input
                                        type="text"
                                        id="evento__data"
                                        placeholder="yyyy-MM-ddThh:mm:ss"

                                        value={this.state.dataEventoInput}
                                        name="dataEventoInput"
                                        onChange={this.atualizaEstado}
                                    />

                                    {/* Acesso Livre */}
                                    <select
                                        id="option__acessolivre"
                                        value={this.state.acessoLivreInput}
                                        name="acessoLivreInput"
                                        onChange={this.atualizaEstado}
                                    >
                                        <option value="1">Livre</option>
                                        <option value="0">Restrito</option>
                                    </select>

                                    {/* Categoria do Evento */}
                                    <select
                                        id="option__tipoevento"
                                        value={this.state.tituloCategoriaInput}
                                        name="tituloCategoriaInput"
                                        onChange={this.atualizaEstado}
                                    >
                                        {
                                            this.state.listaCategorias.map(function (categoria) {
                                                return (
                                                    <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.tituloCategoria}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <button
                                    className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                                >
                                    Cadastrar
                                </button>
                            </form>

                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Eventos;
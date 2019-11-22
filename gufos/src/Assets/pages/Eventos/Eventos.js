//importa uma biblioteca de códigos para classes
import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';
import api from '../../../Services/api';


class Eventos extends Component {

    constructor() {
        super();
        this.state = {
            listaEventos: [],
            listaCategorias: [],
            listaLocalizacao: [],

            tituloEventoInput: "",
            dataEventoInput: "",
            acessoLivreInput: "",
            tituloCategoriaInput: "",
            enderecoInput: "",

            modal: false,
            editarModal: {
                idEventoInput: "",
                tituloEventoInput: "",
                dataEventoInput: "",
                acessoLivreInput: "",
                idCategoriaInput: "",
                idLocalizacaoInput: "",
            }
        }
        // this.cadastrarEvento = this.cadastrarEvento.bind(this);
    }

    //Abrir e Fechar o Modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    UNSAFE_componentWillMount() {
        //props guarda as informações
        console.log("Carregando");
        document.title = this.props.titulo_pagina;
    }
    componentDidMount() {
        console.log("Carregado");
        console.log(this.state.listaEventos);
        this.listagemEventos();
        this.listagemCategorias();
        this.listagemLocalizacao();
    }
    componentDidUpdate() {
        console.log("Atualizando");
    }
    componentWillUnmount() {
        console.log("Saindo");
    }

    //----------------------------------------------------------------------------------

    // GET - Categorias
    listagemCategorias = () => {
        fetch("http://localhost:5000/api/Categoria")
            .then(response => response.json())
            .then(data => this.setState({ listaCategorias: data }))
    }

    // AGUARDANDO A CRIAÇÃO DA PAGINA DE LOCALIZACAO
    // GET - Localização
    listagemLocalizacao = () => {
        fetch("http://localhost:5000/api/Localizacao")
            .then(response => response.json())
            .then(data => this.setState({ listaLocalizacao: data }))
    }

    atualizaEstado = (input) => {
        let nomePropriedade = input.target.name;
        this.setState({
            [input.target.name]: input.target.value
        },
            () => console.log("Novo valor: ", this.state[nomePropriedade])
        );
    }

    //Abre quando clica em alterar
    alterarEvento = (evento) => {
        console.log(evento);

        this.setState({
            editarModal: {
                idEventoInput: evento.idEvento,
                tituloEventoInput: evento.tituloEvento,
                dataEventoInput: evento.dataEvento,
                acessoLivreInput: evento.acessoLivre,
                idCategoriaInput: evento.idCategoria,
                idLocalizacaoInput: evento.idLocalizacao,
            }
        })
        // 23 - abrir modal
        this.toggle();
    }
    atualizaEstadoModal = (input) => {
        this.setState({
            editarModal: {
                ...this.state.editarModal,
                [input.target.name]: input.target.value
            }
        })
    }

    //------------------------- ÍNICIO DOS MÉTODOS DE EVENTOS --------------------------------------

    // GET - Eventos
    listagemEventos = () => {
        api.get("/Evento")
            .then(data =>
                this.setState({ listaEventos: data })
            )
            .catch(error => {
                console.log(error);
            })
    }
    // POST
    cadastrarEvento = (cadastro) => {
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
                idCategoria: this.state.tituloCategoriaInput,
                idLocalizacao: this.state.enderecoInput
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listagemEventos();
                this.setState(() => ({ listaEventos: this.state.listaEventos }))
            })
            // .then(response => {
            //     console.log(response);
            //     this.listagemCategorias();
            //     this.setState(() => ({ listaCategorias: this.state.listaCategorias }))
            // })
            .catch(error => console.log(error))
    }

    // DELETE
    deletarEvento = (id) => {
        console.log("Excluindo");

        // this.setState({ erroMsg: "" })

        fetch("http://localhost:5000/api/Evento/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.listagemEventos();
                // deve ser comentada para evitar chamar a lista com o valor que foi deletado
                // this.setState(() => ({ lista: this.state.lista }))
            })
            // 45
            .catch(error => {
                console.log(error)
                // this.setState({
                //     erroMsg: "Não é possível excluir esta categoria, verifique se não há eventos que a utilizem"
                // })
            })
    }

    // PUT
    salvarAltEvento = (event) => {
        // Previne que a página seja recarregada, a fim de não perder informações ja preenchidas
        event.preventDefault();

        let eventoAlterado = {
            idEvento: this.state.editarModal.idEventoInput,
            tituloEvento: (this.state.editarModal.tituloEventoInput),
            dataEvento: this.state.editarModal.dataEventoInput,
            acessoLivre: (this.state.editarModal.acessoLivreInput === "0") ? false : true,
            idCategoria: this.state.editarModal.idCategoriaInput,
            idLocalizacao: this.state.editarModal.idLocalizacaoInput,
        }

        // Rodar a aplicação na porta 5000 e em http
        // 34 - foi modificado de "+ id" para "+ this.state.editarModal.idCategoria"
        fetch("http://localhost:5000/api/Evento/" + this.state.editarModal.idEventoInput, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventoAlterado)
        })
            .then(response => response.json())
            .catch(error => console.log(error))

        // Atraso na requisição, "carregamento muito rápido pode quebrar o código" pois são assíncronos, e este código não pode carregar primeiro
        setTimeout(() => {
            this.listagemEventos();
        }, 1000)

        // fechar o modal
        this.toggle();
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
                                        <th>Localização</th>

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
                                                    <td>{(evento.acessoLivre) ? 'Livre' : 'Restrito'}</td>
                                                    {/* tabela.idEstrangeiroNavigation.QualquerObjeto */}
                                                    <td>{evento.idCategoria ? evento.idCategoriaNavigation.tituloCategoria : "Categoria não especificada"} </td>
                                                    {/* Comentado até criar o cadastro de Endereço */}
                                                    <td>{evento.idLocalizacao ? evento.idLocalizacaoNavigation.endereco : "Localização não especificada"}</td>
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
                                        type="date"
                                        id="evento__data"
                                        placeholder="DD-MM-AAAA hh:mm"

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
                                        {/* <option disabled Value="Selecione uma Categoria...">Selecione uma Categoria...</option> */}
                                        {
                                            this.state.listaCategorias.map(function (categoria) {
                                                return (
                                                    <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.tituloCategoria}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    {/* Endereço do Evento */}
                                    {/* (modificar css pra localizacao / copiar uma pag categorias e  fazer localizacao) */}
                                    <select
                                        id="option__tipoevento"
                                        value={this.state.enderecoInput}
                                        name="enderecoInput"
                                        onChange={this.atualizaEstado}
                                    >
                                        {
                                            this.state.listaLocalizacao.map(function (localizacao) {
                                                return (
                                                    <option key={localizacao.idLocalizacao} value={localizacao.idLocalizacao}>{localizacao.endereco}</option>
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

                            {/* INICIO DO MODAL */}
                            <MDBContainer>
                                <form onSubmit={this.salvarAltEvento}>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        {/* 26 - Modificações para mostrar o input que será modificado*/}
                                        <MDBModalHeader toggle={this.toggle}>Editar - {this.state.editarModal.tituloEventoInput}</MDBModalHeader>

                                        <MDBModalBody>

                                            {/* TITULO MODAL*/}
                                            <MDBInput
                                                label="Evento"
                                                value={this.state.editarModal.tituloEventoInput}
                                                name="tituloEventoInput"
                                                onChange={this.atualizaEstadoModal}
                                            />

                                            {/* DATA MODAL*/}
                                            <MDBInput
                                                label="Data"
                                                type="date"
                                                value={this.state.editarModal.dataEventoInput}
                                                name="dataEventoInput"
                                                onChange={this.atualizaEstadoModal}
                                            />

                                            {/* ACESSO LIVRE MODAL*/}
                                            <select
                                                label="Acesso Livre"
                                                value={this.state.editarModal.acessoLivreInput}
                                                name="acessoLivreInput"
                                                onChange={this.atualizaEstadoModal}
                                            >
                                                <option value="1">Livre</option>
                                                <option value="0">Restrito</option>
                                            </select>

                                            {/* CATEGORIA MODAL*/}
                                            <select
                                                label="Categoria"
                                                value={this.state.editarModal.tituloCategoriaInput}
                                                name="tituloCategoriaInput"
                                                onChange={this.atualizaEstadoModal}
                                            >
                                                {
                                                    this.state.listaCategorias.map(function (categoria) {
                                                        return (
                                                            <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.tituloCategoria}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                            {/* ENDEREÇO MODAL*/}
                                            <select
                                                label="Localização"
                                                value={this.state.editarModal.enderecoInput}
                                                name="enderecoInput"
                                                onChange={this.atualizaEstadoModal}
                                            >
                                                {
                                                    this.state.listaLocalizacao.map(function (localizacao) {
                                                        return (
                                                            <option key={localizacao.idLocalizacao} value={localizacao.idLocalizacao}>{localizacao.endereco}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </MDBModalBody>


                                        <MDBModalFooter>
                                            {/* 27 */}
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fechar</MDBBtn>
                                            {/* 28 - Inclúimos o "type = submit" no botão para enviar o formulário */}
                                            <MDBBtn color="primary" type="submit">Salvar</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </form>
                            </MDBContainer>

                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        )
    }
}
export default Eventos;
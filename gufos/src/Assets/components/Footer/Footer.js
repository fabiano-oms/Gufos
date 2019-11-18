//chama o componente
import React, {Component} from 'react';

//é estático
//Modificações
//Herda o componente
//necessita de um render() para retornar
//não esquecer da div agrupando tudo no retorno
class Footer extends Component{
  render(){
    return (
      <div>
      <footer>Escola {this.props.escola} de Informática</footer>
      </div>
    );
  }
}

export default Footer;
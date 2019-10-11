/*create database Gufos;
use Gufos;*/

create table tipo_usuario(
	Id_Tipo_Usuario int identity primary key,
	Tipo_Usuario varchar(255) unique not null,
);

create table usuario(
	Id_Usuario int identity primary key,
	Usuario varchar(255) not null,
	Email varchar(255) unique not null,
	Senha varchar(255) not null,
	Id_Tipo_Usuario int foreign key references tipo_usuario(Id_Tipo_Usuario)
);

create table localizacao(
	Id_Localizacao int identity primary key,
	Endereco varchar(255) not null,
	CNPJ char(14) unique not null,
	Razao_Social varchar(255) not null
);

create table categoria(
	Id_Categoria int identity primary key,
	Titulo_Categoria varchar(255) not null,
);

create table evento(
	Id_Evento int identity primary key,
	Titulo_Evento varchar(255) not null,
	Data_Evento datetime not null,
	Acesso_Livre bit default(1) not null,
	Id_Categoria int foreign key references categoria(Id_Categoria),
	Id_Localizacao int foreign key references localizacao(Id_Localizacao)
);

create table presenca(
	Id_Presenca int identity primary key,
	Status_Pesenca varchar(255) not null,
	Id_Usuario int foreign key references usuario(Id_Usuario),
	Id_Evento int foreign key references evento(Id_Evento)
);
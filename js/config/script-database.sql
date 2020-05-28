CREATE DATABASE "el-taller";

-- ROLES
CREATE TABLE public.roles (
	id serial NOT NULL,
	nombre varchar(100) NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (id)
);

INSERT INTO public.roles (nombre) VALUES  ('Mécanico'),('Administrador');

-- TIPOS DE DOCUMENTOS
CREATE TABLE public.tipos_documentos (
	id serial NOT NULL,
	nombre varchar(100) NOT NULL,
	CONSTRAINT tipos_documentos_pk PRIMARY KEY (id)
);

INSERT INTO public.tipos_documentos (nombre) VALUES ('CC'),('CE'),('NIT'),('Pasaporte');

-- USUARIOS
CREATE TABLE public.usuarios (
	tipo_documento varchar(10) NOT NULL,
	documento varchar(20) NOT NULL,
	nombre varchar(100) NOT NULL,
	apellidos varchar(100) NOT NULL,
	celular varchar(11) NOT NULL,
	correo varchar(100) NOT NULL,
	rol integer NOT NULL,
	clave varchar(100) NOT NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (documento)
);

-- MOTOS
CREATE TABLE public.motos (
	placa varchar(6) NOT NULL,
	estado varchar(100) NOT NULL,
	clase varchar(100) NOT NULL,
	marca varchar(100) NOT NULL,
	modelo varchar(4) NOT NULL,
	color varchar(100) NOT NULL,
	cilindraje varchar(4) NOT NULL,
	id_propietario varchar(20) NOT NULL,
	nro_soat varchar(100) NOT NULL,
	vencimiento_soat date NOT NULL,
	nro_tecnomecanica varchar(100) NOT NULL,
	vencimiento_tecnomecanica date NOT NULL,
	CONSTRAINT motos_pk PRIMARY KEY (placa)
);

--MANTENIMIENTOS
CREATE TABLE public.mantenimientos (
	id_mecanico varchar(20) NOT NULL,
	placa varchar(6) NOT NULL,
	fecha date NOT NULL,
	trabajos_realizados text NULL,
	horas_invertidas integer NULL,
	CONSTRAINT mantenimientos_pk PRIMARY KEY (id_mecanico,placa,fecha)
);
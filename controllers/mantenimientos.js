/**
 * CONTROLADOR DE MANTENIMIENTOS
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

/**
 * Validar la información del mecanico
 * @param {*} MANTENIMIENTOS Json de mantenimientos
 */
let validarMantenimientos = (mecanico) => {
  if (!mecanico) {
    throw {
      ok: false,
      mensaje: "La información del mecanico es obligatoria.",
    };
  }
  if (!manteniminetos.id_mecanico) {
    throw { ok: false, mensaje: "La identificacion del mecanico es requerida." };
  }
  if (!manteniminetos.placa) {
    throw {
      ok: false,
      mensaje: "La placa es obligatoria.",
    };
  }
};

/**
 * Guardar en base de datos de mantenimientos
 * @param {*} mantenimientos
 */
let guardarMantenimiento = async (mantenimientos) => {
  let _servicio = new ServicioPg();
  let sql = `INSERT INTO public.mantenimientos(
    id_mecanico, placa, fecha, trabajos_realizados,horas_invertidas)
    VALUES ($1, $2, $3, $4, $5);`;

  let valores = [manteniminetos.id_mecanico, manteniminetos.placa,
     manteniminetos.fecha, manteniminetos.trabajos_realizados,
    manteniminetos.horas_invertidas];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};


let consultarMantenimiento = async ({ id_mecanico, id_usuario }) => {
  let _servicio = new ServicioPg();
  let sql = `select usuario.*, motos.*, mantenimientos.placa from mantenimientos 
  inner join motos ON motos.placa = mantenimientos.placa_motos
  INNER join usuarios ON usuarios.documento = mantenimientos.id_mecanico	WHERE id_vivienda=$1`;
  let valores = [id_usuario];
  if (id_usuario) {
    sql += "AND id_persona=$2";
    valores.push(id_usuario);
  }
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let modificarMantenimientos = async (mantenimientos, { id_motos, id_usuario }) => {
  if (manteniminetos.id_motos != id_motos) {
    throw {
      ok: false,
      mensaje: "El código de la moto no correspende al enviado.",
    };
  }
  let _servicio = new ServicioPg();
  let sql = `UPDATE public.mantenimientos
	SET rol=$1
	WHERE id_motos=$2 AND id_usuario=$3`;
  let valores = [manteniminetos.trabajos_realizados, manteniminetos.id_motos, habitante.id_persona];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let eliminarMantenimientos = async ({ id_motos, id_usuario }) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM mantenimientos WHERE  id_motos=$1 AND id_usuario=$2`;
  let valores = [id_motos, id_usuario];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let eliminarMantenimientos = async (id_motos) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM mantenimientos WHERE  id_motos=$1 `;
  let valores = [id_motos];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

module.exports = {
  validarMantenimientos,
  guardarMantenimiento,
  consultarMantenimiento,
  eliminarMantenimientos,
  eliminarMantenimientos,
  consultarMantenimiento,
  modificarMantenimientos,
};

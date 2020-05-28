/**
 * CONTROLADOR DE MOTOS
 *
 */

//Importar servicio de postgres
const ServicioPg = require("../services/postgres");

/**
 * Validar la información de motos
 * @param {*} motos Json de motos
 */
let validarMotos = (motos) => {
  if (!motos) {
    throw {
      ok: false,
      mensaje: "La información de las motos es obligatoria.",
    };
  }
  if (!motos.placa) {
    throw { ok: false, mensaje: "La placa de la moto es obligatorio." };
  }
  if (!motos.estado) {
    throw {
      ok: false,
      mensaje: "El estado de la moto es obligatorio.",
    };
  }
};

/**
 * Guardar en base de datos las motos
 * @param {*} motos
 */
let guardarMotos = async (motos) => {
  let _servicio = new ServicioPg();
  let sql = `   INSERT INTO public.motos(
     placa, estado, clase, marca, modelo,color,cilindraje,id_propietario,
     nro_soat,vencimeinto_soat,nro_tecnomecanica,vencimiento_tecnomecanica)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10,$11,$12);`;

  let valores = [
    usuario.placa,
    usuario.estado,
    usuario.marca,
    usuario.modelo,
    usuario.color,
    usuario.cilindraje,
    usuario.id_propietario,
    usuario.nro_soat,
    usuario.vencimiento_soat,
    usuario.nro_tecnomecanica,
    usuario.vencimiento_tecnomecanica,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

/**
 * Consultar usuarios
 * @param {*} motos
 */

let consultarMotos = async (placa) => {
  let _servicio = new ServicioPg();
  let sql = `SELECT * FROM motos WHERE id=$1`;
  let respuesta = await _servicio.ejecutarSql(sql, [id]);
  return respuesta;
};

let modificarMotos = async (motos, placa) => {
  if (motos.placa != placa) {
    throw {
      ok: false,
      mensaje: "La placa de la moto no correspende al enviado.",
    };
  }
  let _servicio = new ServicioPg();
  let sql = `UPDATE public.motos
  SET  placa=$1, estado=$2, clase=$3, marca=$4, modelo=$5, color=$6, 
  cilindraje=$7, id_propietario=$8, nro_soat=$9, vencimiento_soat=$10,
  nro_tecnomecanica=$11, vencimiento_tecnomecanica=$12
  WHERE id_propietario=$8`;
  let valores = [
    usuario.placa,
    usuario.estado,
    usuario.marca,
    usuario.modelo,
    usuario.color,
    usuario.cilindraje,
    usuario.id_propietario,
    usuario.nro_soat,
    usuario.vencimiento_soat,
    usuario.nro_tecnomecanica,
    usuario.vencimiento_tecnomecanica,
  ];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

let eliminarMotos = async (placa) => {
  let _servicio = new ServicioPg();
  let sql = `DELETE FROM motos WHERE placa=$1`;
  let valores = [placa];
  let respuesta = await _servicio.ejecutarSql(sql, valores);
  return respuesta;
};

module.exports = {
  validarMotos,
  guardarMotos,
  consultarMotos,
  eliminarMotos,
  modificarMotos,
};

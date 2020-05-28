/**
 * Controlador taller de motos
 */

//importar el servicion de postgres
const servicioPg = require('../services/postgres')

/**
 * Validando la informacion del usuario
 * @param {*} usuario pagina en forma de JSON
 */
let validarUsuario = (usuario) => {
    if (!usuario) {
        throw {
            ok: false, mensaje: "La info del usuario es obligatoria"
        }
    }

    if (!usuario.nombre) {
        throw {
            ok: false, mensaje: "El nombre es obligatorio"
        }
    }

    if (!usuario.apellidos) {
        throw {
            ok: false, mensaje: "los apellidos son obligatorios"
        }
    }

    if (!usuario.celular) {
        throw {
            ok: false, mensaje: "El celular es obligatoria"
        }
    }


    if (!usuario.correo) {
        throw {
            ok: false, mensaje: "el correo es obligatoria"
        }
    }

 
    if (!usuario.rol) {
        throw {
            ok: false, mensaje: "El rol es obligatoria"
        }
    }

    if (!autor.clave) {
        throw {
            ok: false, mensaje: "La clave es obligatoria"
        }
    }
}

//TERMINAR el query

/**
 * Guardando el autor en la base de datos
 * @param {*} usuario datos del autor en en forma de JSON
 */
let guardarUsuario = async (usuario)=> {
    try {
        let _servicio = new servicioPg()
        let sql = `INSERT INTO public.usuarios(
        documento,nombre, apellidos, celular, correo,  rol, clave)
        VALUES (
            '${usuario.documento}',
            '${usuario.nombre}',
            '${usuario.apellidos}'
            '${usuario.celular}',
            '${usuario.correo}',
            '${usuario.rol}'
            '${usuario.clave}',
            );`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }
}

//Consultando la info de los usuarios
let consultarUsuario = async () => {
    try {
        let _servicio = new servicioPg()
        let sql = `SELECT * from public.usuarios`;
        let respuesta = await _servicio.ejecutarSql(sql);
        return respuesta;
    } catch (error) {
        throw{ok: false };
    }

}

let modificarUsuario = async (usuario, id) => {
    if (usuario.documento != id) {
      throw {
        ok: false,
        mensaje: "El documento de la persona no correspende al enviado.",
      };
    }
}
let eliminarUsuario = async (id) => {
    let _servicio = new ServicioPg();
    let sql = `DELETE FROM usuario WHERE documento=$1`;
    let valores = [id];
    let respuesta = await _servicio.ejecutarSql(sql, valores);
    return respuesta;
  };

//exportando metodos en forma de JSON
module.exports = { validarUsuario, guardarUsuario, consultarUsuario,
    modificarUsuario,eliminarUsuario};
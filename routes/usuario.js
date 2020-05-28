const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/usuario");

/**
 * Obtener todas los usuarios
 */
router.get("/usuarios", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarUsuario(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({ ok: true, info: registros, mensaje: "Usuarios consultados" });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar un usuario
 */
router.get("/usuario/:id", (req, res) => {
  let id = req.params.id;
  _controlador
    .consultarUsuario(id)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Usuario consultado." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda un usuario
 */
router.post("/usuario", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_usuario = req.body;

    // Valida la información, si hay un error se envia al catch
    _controlador.validarUsuario(info_usuario);

    // Guardar el usuario en base de datos
    _controlador
      .guardarUsuario(info_usuario)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Usuario guardada", info: info_usuario });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

router.post("/usuario/imagenes", (req, res) => {
  try {
    let archivo = req.files.archivo;
    console.log(archivo);
    archivo.mv("archivos/" + archivo.name).then((res) => {
      console.log("archivo guardado");
    });
    res.send({ ok: true, mensaje: "Persona ha subido una imagen." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, mensaje: "Error al subir una imagen" });
  }
});

/**
 * Modificar un usuario
 */
router.put("/usuario/:id", (req, res) => {
  // Capturar el parámetro de la ruta
  let id = req.params.id;

  let usuario = req.body;
  _controlador
    .modificarUsuario(usuario, id)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "Usuario modificada", info: usuario });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Eliminar un usuario
 */
router.delete("/usuario/:id", (req, res) => {
  let id = req.params.id;
  _controlador
    .eliminarUsuario(id)
    .then((respuestaDB) => {
      res.send({ ok: true, info: {}, mensaje: "usuario eliminada" });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;

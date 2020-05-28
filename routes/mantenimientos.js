const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/mantenimientos");

/**
 * Obtener todas los mantenimientos
 */
router.get("/mantenimientos", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarMantenimiento(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({
        ok: true,
        info: registros,
        mensaje: "Mantenimientos consultados",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar el mantenimiento por usuario
 */
router.get("/mantenimientos/:placa_motos/:id_usuario?", (req, res) => {
  let placa_motos = req.params.placa_motos;
  let id_usuario = req.params.id_usuario;
  _controlador
    .consultarMantenimiento({ placa_motos, id_usuario })
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "mantenimiento consultado." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda un mantenimiento
 */
//TODO: Validar la integridad de datos
router.post("/mantenimientos", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_mantenimientos = req.body;

    // Valida la información, si hay un error se envia al catch
    _controlador.validarMantenimientos(info_mantenimientos);

    // Guardar el mantenimiento en base de datos
    _controlador
      .guardarMantenimiento(info_mantenimientos)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Mantenimiento guardado",
          info: info_mantenimientos,
        });
      })
      .catch((error) => {
        res.send(error);
      });

    // Responder
  } catch (error) {
    res.send(error);
  }
});

/**
 * Modificar un mantenimiento
 */
router.put("/mantenimientos/:placa_motos/:id_usuario", (req, res) => {
  // Capturar el parámetro de la ruta
  let placa_motos = req.params.placa_motos;
  let id_usuario = req.params.id_usuario;

  let Mantenimiento = req.body;
  _controlador
    .modificarMantenimientos(Mantenimiento, { placa_motos, id_usuario })
    .then((respuestaDB) => {
      res.send({
        ok: true,
        mensaje: "Mantenimiento modificado",
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Eliminar un mantenimiento
 */
router.delete("/mantenimientos/:placa_motos/:id_usuario?", (req, res) => {
  let placa_motos = req.params.placa_motos;
  let id_usuario = req.params.id_usuario;

  if (id_usuario) {
    _controlador
      .eliminarMantenimientos({ placa_motos, id_usuario })
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "Mantenimiento eliminado" });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    _controlador
      .eliminarMantenimientos(placa_motos)
      .then((respuestaDB) => {
        res.send({ ok: true, info: {}, mensaje: "Mantenimiento eliminado" });
      })
      .catch((error) => {
        res.send(error);
      });
  }
});

module.exports = router;

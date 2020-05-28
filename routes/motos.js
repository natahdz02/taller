const express = require("express");
const router = express.Router();

const _controlador = require("../controllers/motos");

/**
 * Obtener todas las motos
 */
router.get("/motos", (req, res) => {
  let filtros = req.query;
  _controlador
    .consultarMotos(filtros)
    .then((respuestaDB) => {
      let registros = respuestaDB;
      res.send({ ok: true, info: registros, mensaje: "Motos consultadas" });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Consultar una moto por placa
 */
router.get("/motos/:placa", (req, res) => {
  let placa = req.params.placa;
  _controlador
    .consultarMotos(placa)
    .then((respuestaDB) => {
      let registros = respuestaDB.rows;
      let mensaje =
        registros.length > 0 ? "Moto consultada." : "Sin registro.";
      res.send({ ok: true, info: registros, mensaje });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guarda una moto
 */
router.post("/motos", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let info_motos = req.body;

    // Valida la información, si hay un error se envia al catch
    _controlador.validarMotos(info_motos);

    // Guardar las motos en base de datos
    _controlador
      .guardarMotos(info_motos)
      .then((respuestaDB) => {
        res.send({
          ok: true,
          mensaje: "Motos guardada",
          info: info_motos,
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
 * Modificar una moto
 */
router.put("/motos/:placa", (req, res) => {
  // Capturar el parámetro de la ruta
  let placa = req.params.placa;

  let motos = req.body;
  _controlador
    .modificarMotos(motos, placa)
    .then((respuestaDB) => {
      res.send({ ok: true, mensaje: "Motos modificada", info: motos });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Eliminar una moto
 */
router.delete("/motos/:placa", (req, res) => {
  let placa = req.params.placa;
  _controlador
    .eliminarMotos(placa)
    .then((respuestaDB) => {
      res.send({ ok: true, info: {}, mensaje: "Moto eliminada" });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;

import HttpErrors from "http-errors";
import seatModel from "../models/seatModel.js";
import userModel from "../models/userModel.js";
import seatValidation from "../validations/seatValidation.js";
import { registerValidation } from "../validations/userValidation.js";

export const createSeats = async (req, res) => {
  try {
    let payloadall = [];
    for (let i = 1; i < 41; i++) {
      let payload = {
        seatNo: i,
        status: 0,
        userid: null,
      };
      payloadall.push(payload);
    }

    const { error, value } = seatValidation.validate(req.body);

    if (!error && value) {
      await seatModel.bulkCreate(payloadall, { value: true }).then((resp) => {
        res.status(201).json({
          status: 201,
          msg: "Created Successfully",
          data: resp,
        });
      });
    } else {
      throw HttpErrors.Conflict(error.details[0].message);
    }
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const updateSingleSeat = async (req, res, next) => {
  try {
    const { error, value } = registerValidation.validate(req.body);

    if (!error && value) {
      await userModel
        .create(value)
        .then(async (results) => {
          await seatModel
            .update(
              { userid: results.id, seatNo: value.seatNo, status: 1 },
              {
                where: {
                  seatNo: value.seatNo,
                },
              }
            )
            .then((resp) => {
              res.status(201).json({
                status: 201,
                msg: "Updated Successfully",
                data: resp,
              });
            })
            .catch((error) => {
              res.status(417).json({
                status: 417,
                msg: error.message,
              });
              next();
            });
        })
        .catch((error) => {
          res.status(417).json({
            status: 417,
            msg: error.message,
          });
          next();
        });
    } else {
      throw HttpErrors.Conflict(error.details[0].message);
    }
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
  }
};

export const getSeats = async (req, res, next) => {
  try {
    if (!req.query.type) {
      await seatModel.findAll({}).then((results) => {
        res.status(200).json({
          status: 200,
          data: results,
          msg: "Operation successful",
        });
      });
    } else {
      await seatModel
        .findAll({ where: { status: Number(req.query.type) } })
        .then((results) => {
          res.status(200).json({
            status: 200,
            data: results,
            msg: "Operation successful",
          });
        });
    }
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
    next();
  }
};

export const getSeatInfo = async (req, res, next) => {
  try {
    await seatModel
      .findOne({
        where: {
          seatNo: Number(req.query.seatNo),
        },
      })
      .then(async (resp) => {
        if (resp.status === 1) {
          await userModel
            .findOne({
              where: {
                id: resp.userid,
              },
            })
            .then((results) => {
              res.status(200).json({
                status: 200,
                data: results,
                msg: "Operation successful",
              });
            })
            .catch((error) => {
              res.status(417).json({
                msg: error.message,
              });
              next();
            });
        } else {
          res.status(200).json({
            status: 200,
            data: resp,
            msg: "Operation successful",
          });
        }
      });
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
    next();
  }
};

export const OpenAllTickets = async (req, res, next) => {
  try {
    await userModel.destroy({
      //  where: {},
      truncate: true,
    });
    await seatModel
      .destroy({
        //   where: {},
        truncate: true,
      })
      .then((respo) => {
        res.status(200).json({
          status: 200,
          data: respo,
          msg: "Operation successful",
        });
      });
  } catch (error) {
    res.status(417).json({
      msg: error.message,
    });
    next();
  }
};

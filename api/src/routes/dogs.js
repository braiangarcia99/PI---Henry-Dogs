const { Router } = require('express');
const { getAllDogs } = require('../utils/index.js');
const { Dog, Temperament } = require('../db');

const router = Router();


router.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    const info = await getAllDogs(); // traemos lo necesario y ejecutamos la funcion que nos trae los perros

    if (!name) {
      res.status(200).send(info); // preguntamos si nos pasan name, en caso de que no, mandamos todo
    }
    else {
      const filtrado = info.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase())); // En caso de que pasen name hacemos un filtrado por las dudas para pasar todo a minúscula.

      filtrado.length ? res.status(200).send(filtrado) : res.status(400).send('Dog not found'); // retornamos exito o no dependiendo de si es un perro válido
    }


  } catch (error) {
    res.send('Dog not found', error); // En caso de que rompa la ruta
  }
});

// -------------------------------------------------------------------------------------------------------------------

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let info = await getAllDogs();
    if (id) {
      let dogs = info.find((dog) => dog.id == id); // GOD
      dogs
        ? res.status(200).send(dogs)
        : res.status(404).send("Couldn't find breed");
    }
  } catch (error) {
    console.log("ERROR EN RUTA GET A /dog POR ID", error);
  }
});

// ---------------------------------------------------------------------------------------------------------------------------

router.post('/', async (req, res) => {

  const { name, minHeight, maxHeight, minWeight, maxWeight, life_span, image, createdDB, temperament, temperaments } = req.body

  let height = minHeight + " - " + maxHeight
  let weight = minWeight + " - " + maxWeight

  let dogCreated = await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
    createdDB
  })

  let temperamentDb = await Temperament.findAll({

    where: {
      name: temperament ? temperament : temperaments
    }
  })

  dogCreated.addTemperament(temperamentDb)
  res.status(200).send(dogCreated);
});

module.exports = router;
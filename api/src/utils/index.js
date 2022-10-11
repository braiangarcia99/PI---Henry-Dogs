const axios = require('axios');
const { Dog, Temperament } = require('../db.js');

const getApiInfo = async () => {
    try {
        const api = await axios.get("https://api.thedogapi.com/v1/breeds");
        const apiInfo = await api.data.map((el) => {
            return {
                id: el.id,
                name: el.name,
                image: el.image.url,
                life_span: el.life_span,
                weight: el.weight.metric,
                height: el.height.metric,
                temperament: el.temperament
            };
        });
        return apiInfo;
    } catch (error) {
        console.log('Error en getApiInfo', error);
    }
};

// ---------------------------------------------------------------------------


const getDbInfo = async () => {
    try {
        return await Dog.findAll({ // me traigo la info de mi DB sobre mi model
            include: {
                model: Temperament, // que incluya los temps para que se relacione cuando creamos
                attributes: ["name"], // que atributo quiero incluir del model Temperament? el name
                through: {
                    attributes: [],
                },
            },
        });
    } catch (error) {
        console.log('error en getDbInfo', error);
    }
};
// -------------------------------------------------------

const getAllDogs = async () => {
    try {
        const r1 = await getApiInfo();
        const r2 = await getDbInfo();
        const allInfo = r1.concat(r2);
        return allInfo;

    } catch (error) {
        console.log('Error en getAllDogs', error);
    }
}

// -------------------------------------------


const getTemperamentInfo = async () => {
    try {
        const api = await axios.get('https://api.thedogapi.com/v1/breeds');

        let temperaments = await api.data.map((temp) => {
            if (temp.temperament) return temp.temperament;
        })
            .join()
            .split(",");

        let temps = [];

        temperaments.map((el) => {
            if (!temps.includes(el.trim()) && el) {
                temps.push(el.trim());
            }
        })

        temps.map(async (el) => {
            await Temperament.findOrCreate({
                where: { name: el },
            });
        });
    } catch (error) {
        console.log("No se tiene respuesta a su solicitud", error);
    }

};

module.exports = { getApiInfo, getDbInfo, getAllDogs, getTemperamentInfo };
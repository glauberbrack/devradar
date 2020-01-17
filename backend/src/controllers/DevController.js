const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const {github_username, techs, latitute, longitude} = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitute],
            };

            const techsArray = parseStringAsArray(techs);
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
            //Filtrar Conexões que estão no máximo a 10km de distância e que o novo dev tenha um das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }
    
        return response.json(dev);
    },

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
    
        if (data.techs) {
          data.techs = parseStringAsArray(data.techs);
        }
    
        const dev = await Dev.findByIdAndUpdate(id, data, { new: true });
    
        return res.json(dev);
      },
    
      async destroy(req, res) {
        const { id } = req.params;
    
        await Dev.findByIdAndDelete(id);
    
        return res.json({ message: "user removed" });
      }
    };
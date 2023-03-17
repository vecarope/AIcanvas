const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { Configuration,  OpenAIApi } = require('openai');
const bodyParser = require('body-parser');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

app.post('/image', async (req, res) => {
  try{
  const { prompt } = req.body; 

  const response = await openai.createImage({
    prompt : prompt,
    n: 1, 
    size:'512x512'
  }); 

  res.json({url: response.data.data[0].url});
  } catch(error){
    console.error(error); 
    res.status(500).json({ error:'Error al procesar la solicitud'})
  }
});

const port = 8080; 
app.listen(port,() => {
  console.log(`Server listening on port ${port}`); 
}); 

const axios = require('axios');
const FormData = require('form-data')  

exports.genImage = async (req, res) => {
  try {
    const { style, prompt } = req.body;
    const selectedStyle = style || "text2img"; 

    const form = new FormData();
    form.append('text', prompt);
    form.append('grid_size', '1');

    const response = await axios.post(
      `https://api.deepai.org/api/${selectedStyle}`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'api-key': process.env.AI_KEY,
        },
      }
    );

    const generatedImageUrl = response.data.output_url;

    res.json({ imageUrl: generatedImageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



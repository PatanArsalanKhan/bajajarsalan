const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use(cors());


app.post('/bfhl', (req, res) => {
  const { data, file_b64, email, roll_number } = req.body;


  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));


  const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
  const highestLowercase = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];


  let file_valid = false;
  let file_mime_type = '';
  let file_size_kb = 0;
  if (file_b64) {
    const buffer = Buffer.from(file_b64, 'base64');
    file_size_kb = buffer.length / 1024;
    file_mime_type = 'image/png';
    file_valid = true;
  }


  res.status(200).json({
    is_success: true,
    user_id: 'Patan_Arsalan_Khan_27032003',
    email:'arsalan5131731@gmail.com',
    roll_number:'RA2111031010014',
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
    file_valid,
    file_mime_type,
    file_size_kb:file_size_kb.toString()
  });
});


app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

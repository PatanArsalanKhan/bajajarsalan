import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const res = await axios.post('http://localhost:8080/bfhl', {
        data: parsedData.data,
        file_b64: parsedData.file_b64 || null,
      });
      setResponse(res.data);
    } catch (error) {
      alert('Invalid JSON4!');
      console.error(error);
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = selectedOptions.map(option => {
      if (response[option.value]) {
        return <p key={option.value}><strong>{option.label}:</strong> {JSON.stringify(response[option.value])}</p>;
      }
      return null;
    });

    return (
      <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {filteredResponse}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', padding: '40px', maxWidth: '700px', margin: 'auto' }}>
      <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block', fontSize: '18px', color: '#333' }}>Enter JSON Data:</label>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder='Paste your JSON data here...'
        rows='5'
        cols='50'
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#f7f7f7',
          outline: 'none',
          resize: 'none'
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          padding: '12px 30px',
          cursor: 'pointer',
          borderRadius: '8px',
          fontSize: '16px',
          marginBottom: '20px',
          width: '100%',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        Process Data
      </button>

      <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block', fontSize: '18px', color: '#333' }}>Filter Response:</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleFilterChange}
        classNamePrefix="custom-select"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '8px',
            padding: '5px',
            fontSize: '16px',
            borderColor: '#ccc',
            boxShadow: 'none',
            '&:hover': { borderColor: '#999' },
          }),
          multiValue: (styles) => ({
            ...styles,
            backgroundColor: '#4CAF50',
            color: '#fff',
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: '#fff',
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: '#fff',
            ':hover': { backgroundColor: '#388e3c', color: '#fff' },
          }),
        }}
      />

      {renderResponse()}
    </div>
  );
};

export default App;

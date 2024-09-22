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
      alert('Invalid JSON!');
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
      <div style={{ marginTop: '20px', backgroundColor: '#f5f7fa', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)' }}>
        {filteredResponse}
      </div>
    );
  };

  return (
    <div style={{
      fontFamily: 'Roboto, sans-serif',
      padding: '40px',
      maxWidth: '700px',
      margin: 'auto',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block', fontSize: '20px', color: '#333', textAlign: 'center' }}>Enter JSON Data:</label>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder='Paste JSON data here...'
        rows='5'
        cols='50'
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '10px',
          border: '1px solid #ddd',
          backgroundColor: '#f9fafc',
          outline: 'none',
          resize: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
        }}
      />

      <div style={{ textAlign: 'right', marginBottom: '20px', width: '100%' }}>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#0056b3',
            color: '#fff',
            border: 'none',
            padding: '12px 30px',
            cursor: 'pointer',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginRight: '0',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Process Data
        </button>
      </div>

      <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block', fontSize: '20px', color: '#333', textAlign: 'center' }}>Filter Response:</label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleFilterChange}
        classNamePrefix="custom-select"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '10px',
            padding: '5px',
            fontSize: '16px',
            borderColor: '#ddd',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
            '&:hover': { borderColor: '#999' },
          }),
          multiValue: (styles) => ({
            ...styles,
            backgroundColor: '#0056b3',
            color: '#fff',
            borderRadius: '5px',
            padding: '3px 6px',
          }),
          multiValueLabel: (styles) => ({
            ...styles,
            color: '#fff',
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: '#fff',
            ':hover': { backgroundColor: '#004085', color: '#fff' },
          }),
        }}
      />

      {renderResponse()}
    </div>
  );
};

export default App;

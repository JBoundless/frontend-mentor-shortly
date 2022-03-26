import React, { useState } from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core';
import shrtcode from '../api/shrtcode';
import './Search.css';

const HTTP_URL_VALIDATOR_REGEX =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
  const [link, setLink] = useState('');
  const [short, setShort] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateURL = (string) => {
    return string.match(HTTP_URL_VALIDATOR_REGEX);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateURL(link)) {
      getLink();
      setLink('');
      setIsLoading(!isLoading);
    } else {
      setShort('Please input a valid URL.');
    }
  };

  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'hsl(0, 0%, 75%)',
        }}
      >
        <TextField
          style={{ marginBottom: '20px' }}
          label="Shorten a link here..."
          helperText="Please enter a URL"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {!isLoading && (
          <Button
            style={{
              marginBottom: '20px',
              backgroundColor: 'hsl(180, 66%, 49%)',
              color: 'white',
            }}
            onClick={(e) => handleSubmit(e)}
            variant="contained"
          >
            Shorten it
          </Button>
        )}

        {isLoading && <LinearProgress />}
      </form>

      {short && (
        <div className="short-url">
          Short Link:{' '}
          <a href={short} style={{ color: 'hsl(180, 66%, 49%)' }}>
            {short}
          </a>
        </div>
      )}
    </>
  );
};

export default Search;

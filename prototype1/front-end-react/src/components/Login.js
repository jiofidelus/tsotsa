/** @format */

import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import { login } from '../helpers/classeHelper';

const LoginForm = (props) => {
  const [pseudo, setPseudo] = useState(false);
  const [password, setPassword] = useState(false);

  const loginMutation = useMutation(
    (pseudo, password) => login(pseudo, password),
    {
      onSuccess: (response) => {
        localStorage.setItem('pseudo', response.data.user.pseudo);
        localStorage.setItem('name', response.data.user.name);
        localStorage.setItem('surname', response.data.user.surname);
      },
    }
  );

  const handleValidSubmit = (event, values) => {
    setPseudo(values.pseudo);
    setPassword(values.password);
    loginMutation.mutate({ pseudo, password });
  };

  const handleInvalidSubmit = (event, errors, values) => {
    setPseudo(values.pseudo);
    setPassword(values.password);
  };

  return (
    <AvForm
      onValidSubmit={handleValidSubmit}
      onInvalidSubmit={handleInvalidSubmit}
    >
      <AvField
        name='pseudo'
        label='pseudo'
        type='text'
        validate={{
          required: true,
        }}
      />
      <AvField
        name='password'
        label='Mot de passe'
        type='password'
        validate={{
          required: {
            value: true,
            errorMessage: 'Please enter your password',
          },
          pattern: {
            value: '^[A-Za-z0-9]+$',
            errorMessage:
              'Your password must be composed only with letter and numbers',
          },
          minLength: {
            value: 6,
            errorMessage: 'Your password must be between 6 and 16 characters',
          },
          maxLength: {
            value: 16,
            errorMessage: 'Your password must be between 6 and 16 characters',
          },
        }}
      />
      {loginMutation.isLoading && <Spinner />}
      <Button id='submit'>Connexion</Button>

      <div style={{ marginTop: '10px' }}>
        Voulez-vous creer un compte ?
        <Link to='/connexion/compte'>
          <span> Cliquer ici pour creer un compte</span>
        </Link>
      </div>
    </AvForm>
  );
};

export default LoginForm;

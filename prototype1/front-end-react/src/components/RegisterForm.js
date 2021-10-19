/** @format */

import { AvField, AvForm } from 'availity-reactstrap-validation';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pseudo: false };
  }

  handleValidSubmit = (event, values) => {
    this.setState({ pseudo: values.pseudo });
    this.setState({ pseudo: values.pseudo });
    this.setState({ pseudo: values.pseudo });
    this.setState({ pseudo: values.pseudo });
    console.log(`Login Successful`);
  };

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ pseudo: values.pseudo, error: true });
    console.log(`Login failed`);
  };

  render() {
    return (
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
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
          name='name'
          label='name'
          type='text'
          validate={{
            required: true,
          }}
        />
        <AvField
          name='surname'
          label='surname'
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
        <Button id='submit'>Creer un compte</Button>
        <div style={{ marginTop: '10px' }}>
          Avez vous un compte ?
          <Link to='/connexion'>
            <span> Cliquer ici pour se connecter</span>
          </Link>
        </div>
      </AvForm>
    );
  }
}

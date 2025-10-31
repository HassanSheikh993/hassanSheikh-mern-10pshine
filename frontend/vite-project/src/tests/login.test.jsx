import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../components/auth/login';

test('renders login form', () => {
  render(
    <BrowserRouter>
      <Login />
      
    </BrowserRouter>
  );
  

  expect(screen.getByText('NOTE APP')).toBeInTheDocument();
  

  expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
  
 
  expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  
 
  expect(screen.getByText('Create A New Account')).toBeInTheDocument();
});
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../components/auth/register';

test('renders register form', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );


  expect(screen.getByText('NOTE APP')).toBeInTheDocument();


  expect(screen.getByPlaceholderText('Enter Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();

 
  expect(screen.getByText('Already Have An Account?')).toBeInTheDocument();
});

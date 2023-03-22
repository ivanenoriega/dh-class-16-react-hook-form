import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
    it('should render', () => {
        const { container } = render(<RegistrationForm />);
        expect(screen.getByText(/log in form/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByRole('textbox', {
            name: /email/i
        })).toHaveValue('');
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(container.querySelector('#password')).toHaveValue('');
        expect(screen.getByLabelText('Keep me logged in')).toBeInTheDocument();
        expect(screen.getByRole('checkbox', {
            name: /keep me logged in/i
        })).not.toBeChecked();
        expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
    });
    it('should show error message when email is not provided', async () => {
        render(<RegistrationForm />);
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '12345678' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        });
    });
    it('should show error message when password is not provided', async () => {
        render(<RegistrationForm />);
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });
    it('should show error message when password is less than 8 characters', async () => {
        render(<RegistrationForm />);
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.change(emailInput, { target: { value: 'test@test' } });
        fireEvent.change(passwordInput, { target: { value: '1234567' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/password needs at least 8 characters/i)).toBeInTheDocument();
        });
    });
    it('should show success message when form is submitted', async () => {
        render(<RegistrationForm />);
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const submitButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: '12345678' } });
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(screen.getByRole('heading', {
                name: /thank you for registering!/i
            })).toBeInTheDocument();
            expect(screen.getByText(/email: test@test\.com/i)).toBeInTheDocument();
            expect(screen.getByText(/password: 12345678/i)).toBeInTheDocument();
            expect(screen.getByText(/keep me logged in: false/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Show Form' })).toBeInTheDocument();
        });
    });
});
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.css';
import SuccessMessage from './SuccessMessage/SuccessMessage';

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [success, setSuccess] = useState(false);
    const [fields, setFields] = useState({
        email: '',
        password: '',
        keep_login: false
    });
    const onSubmit = (data: any) => {
        setFields({
            email: data.email,
            password: data.password,
            keep_login: data.keep_login
        });
        setSuccess(true);
    };

    const showEmailRequiredErrorMessage = errors['email'] && errors['email'].type === 'required';
    const showPasswordRequiredErrorMessage = errors['password'] && errors['password'].type === 'required';
    const showPasswordMinLengthErrorMessage = errors['password'] && errors['password'].type === 'minLength';

    return (
        <div>
            {success
                ? (<SuccessMessage {...fields} showForm={() => { setSuccess(false) }} />)
                : (<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={styles.title}>Log In Form</h2>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input type="email" id="email" {...register('email', { required: true })} />
                        {showEmailRequiredErrorMessage && <span className={styles.error}>Email is required</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input type="password" id="password" {...register('password', { required: true, minLength: 8 })} />
                        {showPasswordRequiredErrorMessage && <span className={styles.error}>Password is required</span>}
                        {showPasswordMinLengthErrorMessage && <span className={styles.error}>Password needs at least 8 characters</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="keep_login">Keep me logged in</label>
                        <input className={styles.checkbox} type="checkbox" id="keep_login" {...register('keep_login')} />
                    </div>
                    <button type="submit">Log In</button>
                </form>
                )}
        </div>
    );
};

export default RegistrationForm;

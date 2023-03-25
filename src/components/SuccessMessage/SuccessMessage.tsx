import { FC } from "react";

type Props = {
    email: string;
    password: string;
    keep_login: boolean;
    showForm: () => void;
}

const SuccessMessage: FC<Props> = ({ email, password, keep_login, showForm }) => {
    return (
        <>
            <h2>Thank you for registering!</h2>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
            <p>Keep me logged in: {keep_login ? 'true' : 'false'}</p>
            <button onClick={showForm}>Show Form</button>
        </>
    )
};

export default SuccessMessage;
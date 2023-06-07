import { FormEvent, useRef } from 'react';
import classes from './profile-form.module.css';
import { PasswordDataType } from './user-profile';

type ProfileFormProps = {
    onChangePassword: (passwordData: PasswordDataType) => void;
};

const ProfileForm = ({ onChangePassword }: ProfileFormProps) => {
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const oldPasswordRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!oldPasswordRef.current || !newPasswordRef.current) {
            return;
        }
        const enteredOldPassword = oldPasswordRef.current.value;

        const enteredNewPassword = newPasswordRef.current.value;
        onChangePassword({
            oldPassword: enteredOldPassword,
            newPassword: enteredNewPassword,
        });
    };

    return (
        <form
            className={classes.form}
            onSubmit={(event) => {
                submitHandler(event);
            }}
        >
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" ref={newPasswordRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor="old-password">Old Password</label>
                <input type="password" id="old-password" ref={oldPasswordRef} />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;

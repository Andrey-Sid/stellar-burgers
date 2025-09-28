import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store/store';
import { selectIsLoading } from '../../services/slices/profile/profile';
import { Preloader } from '@ui';
import loginSlice, { login } from '../../services/slices/login/login';

export const Login: FC = () => {
  const isLoading = useSelector(selectIsLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isError = useSelector(loginSlice.selectors.selectIsError);

  const handleSubmit = (e: SyntheticEvent) => {
    let loginData = {
      email: email,
      password: password
    };
    dispatch(login(loginData));
    e.preventDefault();
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <LoginUI
      errorText={isError ? 'Неверный логин или пароль' : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

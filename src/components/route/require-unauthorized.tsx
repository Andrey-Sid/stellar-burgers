import React, { FC } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store/store';
import {
  selectIsLoading,
  selectUser
} from '../../services/slices/profile/profile';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const RequireUnauthorized: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (user) {
    if (location.state?.from) {
      return <Navigate replace to={location.state.from} />;
    }
    return <Navigate replace to='/profile' />;
  }

  return children;
};

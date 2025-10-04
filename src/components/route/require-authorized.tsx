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

export const RequireAuthorized: FC<ProtectedRouteProps> = ({
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

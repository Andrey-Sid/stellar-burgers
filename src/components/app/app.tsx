import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store/store';
import { getUser } from '../../services/slices/profile/profile';
import { RequireAuthorized } from '../route';
import { fetchIngredients } from '../../services/slices/ingredients/ingredients';
import { OrderDetailsModal } from '../modal/order-details-modal';
import { OrderDetails } from '../../pages/order-details';
import { IngredientDetailsPage } from '../../pages/ingredient-details-page';
import { RequireUnauthorized } from '../route/require-unauthorized';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <RequireUnauthorized>
              <Login />
            </RequireUnauthorized>
          }
        />
        <Route
          path='/register'
          element={
            <RequireUnauthorized>
              <Register />
            </RequireUnauthorized>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <RequireUnauthorized>
              <ForgotPassword />
            </RequireUnauthorized>
          }
        />
        <Route
          path='/reset-password'
          element={
            <RequireUnauthorized>
              <ResetPassword />
            </RequireUnauthorized>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuthorized>
              <Profile />
            </RequireAuthorized>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <RequireAuthorized>
              <ProfileOrders />
            </RequireAuthorized>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <RequireAuthorized>
              <OrderDetails />
            </RequireAuthorized>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
        <Route path='/feed/:number' element={<OrderDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => window.history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/feed/:number' element={<OrderDetailsModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <RequireAuthorized>
                <OrderDetailsModal />
              </RequireAuthorized>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  clearConstructor,
  selectConstructorItems
} from '../../services/slices/burger-constructor/burger-constructor';
import {
  clearPlacedOrderData,
  placeOrder,
  selectOrderRequest,
  selectPlacedOrderData
} from '../../services/slices/order/order';
import { selectUser } from '../../services/slices/profile/profile';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectPlacedOrderData);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ].flat();

    dispatch(placeOrder(ingredientsIds));
  };

  useEffect(() => {
    if (orderModalData) {
      dispatch(clearConstructor());
    }
  }, [orderModalData]);

  const closeOrderModal = () => {
    dispatch(clearPlacedOrderData());
  };

  const price = useMemo(() => {
    let bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    let ingredientsPrice = constructorItems.ingredients.reduce(
      (total: number, item: TConstructorIngredient) => total + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

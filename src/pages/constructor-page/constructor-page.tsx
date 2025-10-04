import styles from './constructor-page.module.css';

import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';
import { selectIngredients } from '../../services/slices/ingredients/ingredients';
import { useSelector } from '../../services/store/store';

export const ConstructorPage: FC = () => {
  const ingredients = useSelector(selectIngredients);

  return (
    <>
      {ingredients ? (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      ) : (
        <Preloader />
      )}
    </>
  );
};

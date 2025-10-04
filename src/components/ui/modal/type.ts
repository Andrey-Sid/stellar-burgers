import { ReactNode } from 'react';

export type TModalUIProps = {
  title: string;
  titleClass?: string;
  onClose: () => void;
  children?: ReactNode;
};

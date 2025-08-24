import {useContext} from 'react';
import {StoreContext} from '../../../index.tsx';

export const useStore = () => useContext(StoreContext);

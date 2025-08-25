import {useContext} from 'react';
import {StoreContext} from '../../pages/App.tsx';

export const useStore = () => useContext(StoreContext);

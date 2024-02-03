import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { beersActions } from './../redux/beersSlice';

const actions = {
  ...beersActions
};

export const useAppActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

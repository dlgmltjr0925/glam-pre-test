import { QueryFunctionContext } from 'react-query';
import axios from 'axios';

export async function fetchGetIntroduction() {
  try {
    const res = await axios.get('/introduction');
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchGetIntroductionAdditional({
  queryKey,
}: QueryFunctionContext) {
  const page = queryKey[1] === 1 ? '' : `/${queryKey[1]}`;
  try {
    const url = '/introduction/additional' + page;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPostIntroductionCustom() {
  try {
    const res = await axios.get('/introduction/custom');
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchGetProfile() {
  try {
    const res = await axios.get('/profile');
    return res.data;
  } catch (error) {
    throw error;
  }
}

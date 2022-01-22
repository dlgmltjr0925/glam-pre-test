import axios from 'axios';

export async function fetchGetIntroduction() {
  try {
    const res = await axios.get('/introduction');
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchGetIntroductionAdditional(page: number = 1) {
  try {
    const _page = page > 1 ? `/${page}` : '';
    const url = `/introduction/additional${_page}`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPostIntroductionCustom() {
  try {
    const res = await axios.post('/introduction/custom');
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

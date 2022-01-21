import axios from 'axios';

export async function fetchGetIntroduction() {
  try {
    const res = await axios.get('/introduction');
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchGetIntroductionAdditional() {
  try {
    const res = await axios.get('/introduction/additional');
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

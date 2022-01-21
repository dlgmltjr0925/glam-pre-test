/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useRef, useState } from 'react';

import { SelectDialogRef } from '../components/SelectDialog';

export interface Profile {
  birthday: string | null;
  bodyType: string | null;
  company: string | null;
  education: string | null;
  gender: string | null;
  height: number;
  id: number;
  introduction: string | null;
  job: string | null;
  location: string | null;
  name: string | null;
  pictures: string[];
  school: string | null;
}

export default function useEditProfile() {
  const profileRef = useRef<Profile>({
    birthday: '1990-01-01',
    bodyType: 'body_type_00',
    company: '큐피스트',
    education: null,
    gender: 'F',
    height: 170,
    id: 0,
    introduction: '소개글이 지워지면 힌트가 나타나야 합니다',
    job: '개발자',
    location: '서울특별시 강남구',
    name: '개발자 A',
    pictures: ['/profile/01.png', '/profile/02.png'],
    school: null,
  });
  const selectDialogRef = useRef<SelectDialogRef>(null);

  const [profile, setProfile] = useState<Profile>({
    birthday: '1990-01-01',
    bodyType: 'body_type_00',
    company: '큐피스트',
    education: null,
    gender: 'F',
    height: 170,
    id: 0,
    introduction: '소개글이 지워지면 힌트가 나타나야 합니다',
    job: '개발자',
    location: '서울특별시 강남구',
    name: '개발자 A',
    pictures: ['/profile/01.png', '/profile/02.png'],
    school: null,
  });

  const [meta, setMeta] = useState({
    bodyTypes: [
      { key: 'body_type_00', name: '마른' },
      { key: 'body_type_01', name: '보통' },
      { key: 'body_type_02', name: '근육' },
      { key: 'body_type_03', name: '통통' },
    ],
    educations: [
      { key: 'education_00', name: '고등학교' },
      { key: 'education_01', name: '전문대' },
      { key: 'education_02', name: '대학교' },
      { key: 'education_03', name: '석사' },
      { key: 'education_04', name: '박사' },
      { key: 'education_05', name: '기타' },
    ],
    genders: [
      {
        key: 'M',
        name: '남성',
      },
      {
        key: 'F',
        name: '여성',
      },
    ],
    heightRange: {
      max: 220,
      min: 120,
    },
  });

  const handleChangeText = useCallback((key: keyof Profile) => {
    return (text: string) => {
      setProfile({ ...profileRef.current, [key]: text });
    };
  }, []);

  const handlePressHeight = useCallback(() => {
    const profile = profileRef.current;
    const { max, min } = meta.heightRange;
    selectDialogRef.current?.open({
      title: '키',
      items: Array.from({ length: max - min + 1 }, (_, i) => ({
        key: `${i + min}`,
        name: `${i + min}cm`,
      })),
      onPress: item => {
        setProfile({ ...profile, height: parseInt(item.key, 10) });
      },
      selectedItemKey: profile.height ? `${profile.height}` : null,
    });
  }, [meta]);

  const handlePressBodyType = useCallback(() => {
    const profile = profileRef.current;
    selectDialogRef.current?.open({
      title: '체형',
      items: meta.bodyTypes,
      onPress: item => {
        setProfile({ ...profile, bodyType: item.key });
      },
      selectedItemKey: profile.bodyType || null,
    });
  }, [meta]);

  const handlePressEducation = useCallback(() => {
    const profile = profileRef.current;
    selectDialogRef.current?.open({
      title: '학력',
      items: meta.educations,
      onPress: item => {
        setProfile({ ...profile, education: item.key });
      },
      selectedItemKey: profile.education || null,
    });
  }, [meta]);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  return {
    selectDialogRef,
    profile,
    meta,
    handleChangeText,
    handlePressHeight,
    handlePressBodyType,
    handlePressEducation,
  };
}

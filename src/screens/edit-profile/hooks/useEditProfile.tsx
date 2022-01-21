/* eslint-disable @typescript-eslint/no-shadow */
import { useCallback, useEffect, useRef, useState } from 'react';

import { SelectDialogRef } from '../components/SelectDialog';
import { fetchGetProfile } from '../../../data/api';
import { useQuery } from 'react-query';

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

interface MetaItem {
  key: string;
  name: string;
}
export interface Meta {
  bodyTypes: MetaItem[];
  educations: MetaItem[];
  genders: MetaItem[];
  heightRange: { max: number; min: number };
}

const initialProfile: Profile = {
  birthday: null,
  bodyType: null,
  company: null,
  education: null,
  gender: null,
  height: 0,
  id: 0,
  introduction: null,
  job: null,
  location: null,
  name: null,
  pictures: [],
  school: null,
};

const initialMeta: Meta = {
  bodyTypes: [],
  educations: [],
  genders: [],
  heightRange: { min: 0, max: 0 },
};

export default function useEditProfile() {
  const result = useQuery('FetchGetProfile', fetchGetProfile, {
    suspense: true,
  });

  const profileRef = useRef<Profile>(initialProfile);
  const selectDialogRef = useRef<SelectDialogRef>(null);

  const [profile, setProfile] = useState<Profile>(initialProfile);

  const [meta, setMeta] = useState(initialMeta);

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

  useEffect(() => {
    if (result.status === 'success') {
      const { data, meta } = result.data;
      const {
        body_types: bodyTypes,
        height_range: heightRange,
        ...otherMeta
      } = meta;
      setMeta({ ...otherMeta, bodyTypes, heightRange });
      const { body_type: bodyType, ...profile } = data;
      setProfile({ ...profile, bodyType });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.status]);

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

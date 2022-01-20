import React, { useMemo, useRef, useState } from 'react';
import SelectDialog, { SelectDialogRef } from './components/SelectDialog';

import { Color } from '../../constants/Color';
import Pictures from './components/Pictures';
import ProfileIntroduction from './components/ProfileIntroduction';
import ProfileItem from './components/ProfileItem';
import StackView from '../../components/navigation/stack-navigator/StackView';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export default function EditProfileScreen() {
  const selectDialogRef = useRef<SelectDialogRef>(null);

  const [profile, setProfile] = useState({
    birthday: '1990-01-01',
    body_type: 'body_type_00',
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
    body_types: [
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
    height_range: {
      max: 220,
      min: 120,
    },
  });

  const gender = useMemo(() => {
    return profile.gender === 'F' ? '여성' : '남성';
  }, [profile.gender]);

  const height = useMemo(() => {
    return `${profile.height}cm`;
  }, [profile.height]);

  const bodyType = useMemo(() => {
    switch (profile.body_type) {
      case 'body_type_00':
        return '마른';
      case 'body_type_01':
        return '보통';
      case 'body_type_02':
        return '근육';
      default:
        return '통통';
    }
  }, [profile.body_type]);

  return (
    <>
      <StackView title="프로필 수정">
        <Container keyboardShouldPersistTaps="never">
          <Pictures pictures={profile.pictures} />
          <GuideWrapper>
            <GuideText>
              다양한 매력을 보여줄 수 있는 사진을 올려주세요{' '}
            </GuideText>
            <GuideMoreText>더 알아보기</GuideMoreText>
          </GuideWrapper>
          <ProfileItem
            label="닉네임"
            value={profile.name}
            isLock
            editable={false}
          />
          <ProfileItem
            label="성별"
            value={gender}
            editable={false}
            editType="select"
          />
          <ProfileItem label="생일" value={profile.birthday} editable={false} />
          <ProfileItem label="위치" value={profile.location} editable={false} />
          <Separator />
          <ProfileIntroduction value={profile.introduction} />
          <Separator />
          <ProfileItem
            label="키"
            value={height}
            editType="select"
            onPress={() => {
              selectDialogRef.current?.open({
                title: '키',
                items: Array.from(
                  { length: meta.height_range.max - meta.height_range.min + 1 },
                  (_, i) => ({
                    key: `${i + meta.height_range.min}`,
                    name: `${i + meta.height_range.min}cm`,
                  }),
                ),
                onPress: item => {
                  setProfile({
                    ...profile,
                    height: parseInt(item.key, 10),
                  });
                },
                selectedItemKey: profile.height
                  ? `${profile.height}`
                  : undefined,
              });
            }}
          />
          <ProfileItem label="체형" value={bodyType} editType="select" />
          <Separator />
          <ProfileItem label="직장" value={profile.company} />
          <ProfileItem label="직업" value={profile.job} />
          <ProfileItem
            label="학력"
            value={profile.education}
            editType="select"
          />
          <ProfileItem label="학교" value={profile.school} />
        </Container>
      </StackView>
      <SelectDialog ref={selectDialogRef} />
    </>
  );
}

const Container = styled.ScrollView`
  flex: 1;
`;

const GuideWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${Color.Gray1};
  margin-bottom: 8px;
`;

const GuideText = styled.Text`
  font-size: 12px;
  color: ${Color.Gray4};
`;

const GuideMoreText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.DarkGray1};
`;

const Separator = styled.View`
  margin: 8px 0;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: ${Color.Gray1};
`;

import React, { useMemo } from 'react';

import { Color } from '../../../constants/Color';
import Pictures from './Pictures';
import ProfileIntroduction from './ProfileIntroduction';
import ProfileItem from './ProfileItem';
import SelectDialog from './SelectDialog';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import useEditProfile from '../hooks/useEditProfile';

export default function EditProfileDetail() {
  const { selectDialogRef, meta, profile, ...handlers } = useEditProfile();

  const gender = useMemo(() => {
    return meta.genders.find(({ key }) => key === profile.gender)?.name || null;
  }, [meta.genders, profile.gender]);

  const height = useMemo(() => {
    return `${profile.height}cm`;
  }, [profile.height]);

  const bodyType = useMemo(() => {
    return (
      meta.bodyTypes.find(({ key }) => key === profile.bodyType)?.name || null
    );
  }, [meta.bodyTypes, profile.bodyType]);

  const education = useMemo(() => {
    return (
      meta.educations.find(({ key }) => key === profile.education)?.name || null
    );
  }, [meta.educations, profile.education]);

  return (
    <>
      <Container>
        <Pictures pictures={profile.pictures} />
        <GuideWrapper>
          <GuideText>다양한 매력을 보여줄 수 있는 사진을 올려주세요 </GuideText>
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
        <ProfileIntroduction
          value={profile.introduction}
          onChangeText={handlers.handleChangeText('introduction')}
        />
        <Separator />
        <ProfileItem
          label="키"
          value={height}
          editType="select"
          onPress={handlers.handlePressHeight}
        />
        <ProfileItem
          label="체형"
          value={bodyType}
          editType="select"
          onPress={handlers.handlePressBodyType}
        />
        <Separator />
        <ProfileItem
          label="직장"
          value={profile.company}
          onChangeText={handlers.handleChangeText('company')}
        />
        <ProfileItem
          label="직업"
          value={profile.job}
          onChangeText={handlers.handleChangeText('job')}
        />
        <ProfileItem
          label="학력"
          value={education}
          editType="select"
          onPress={handlers.handlePressEducation}
        />
        <ProfileItem
          label="학교"
          value={profile.school}
          onChangeText={handlers.handleChangeText('school')}
        />
      </Container>
      <SelectDialog ref={selectDialogRef} />
    </>
  );
}

const Container = styled.View`
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

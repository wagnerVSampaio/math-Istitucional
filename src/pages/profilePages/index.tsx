import React from 'react';
import ProfileContainer from '@/components/profile/profile-servant-recruiter';
import { useRouter } from 'next/router';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <ProfileContainer id={Number(id)}/>
    </div>
  );
};

export default ProfilePage;
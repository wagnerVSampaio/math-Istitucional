import ViewProfile from '@/components/view-profile';
import React, { useState, useEffect } from 'react';

type ViewProfilePageProps = {
  id: number; // Tipo ajustado para `number`
};

function ViewProfilePage({ id }: ViewProfilePageProps) {
  const [profileLinkView, setProfileLinkView] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Garante que este código só será executado no client-side
      setProfileLinkView(`${window.location.origin}/profile/${id}`);
    }
  }, [id]);

  return (
    <div>
      {profileLinkView ? (
        <ViewProfile id={id} profileLinkView={profileLinkView} />
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}

export default ViewProfilePage;

import React from 'react';
import { useRouter } from 'next/router';
import Professionals from '@/components/professionals';

const ProfessionalsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Professionals highlightedId={id ? Number(id) : null} />
  );
};

export default ProfessionalsPage;

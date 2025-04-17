import React from 'react';
import { useRouter } from 'next/router';
import AdmApproval from '@/components/adm/adm-approval';

const AdmPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdmApproval highlightedId={id ? Number(id) : null} />
  );
};

export default AdmPage;

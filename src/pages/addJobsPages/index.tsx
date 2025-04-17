import AddJobs from '@/components/recruiter/add-jobs';
import React from 'react';

function AddJobsPages() {
  // Suponha que você tenha o valor de usersId vindo de algum lugar
  const usersId = 1; // Ou obtenha esse valor dinamicamente

  return (
    <>
      <AddJobs usersId={usersId} />
    </>
  );
}

export default AddJobsPages;

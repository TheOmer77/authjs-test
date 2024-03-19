import { CardHeader, CardTitle } from '@/components/ui/Card';
import { NewVerificationForm } from '@/components/auth/NewVerificationForm';

const NewVerificationPage = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Confirming your verification</CardTitle>
      </CardHeader>
      <NewVerificationForm />
    </>
  );
};

export default NewVerificationPage;

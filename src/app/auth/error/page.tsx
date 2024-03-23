import { CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const AuthErrorPage = () => (
  <>
    <CardHeader>
      <CardTitle>Couldn&apos;t sign you in</CardTitle>
      <CardDescription>
        Something went wrong while trying to sign you in.
      </CardDescription>
    </CardHeader>
  </>
);

export default AuthErrorPage;

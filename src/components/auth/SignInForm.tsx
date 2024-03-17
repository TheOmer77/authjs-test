import { CardContent, CardFooter } from '@/components/ui/Card';
import { SocialButtons } from './SocialButtons';
import { FooterLink } from './FooterLink';

export const SignInForm = () => {
  return (
    <>
      <CardContent>
        <SocialButtons />
      </CardContent>
      <CardFooter>
        <FooterLink
          beforeText="Don't have an account? "
          text='Sign up'
          href='/auth/sign-up'
        />
      </CardFooter>
    </>
  );
};

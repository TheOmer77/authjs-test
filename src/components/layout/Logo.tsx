import { LockClosedIcon } from '@radix-ui/react-icons';

export const Logo = () => (
  <h1
    className='flex select-none flex-row items-center text-6xl
font-extrabold tracking-tight text-white drop-shadow-md'
  >
    <LockClosedIcon className='size-48' />
    <div className='flex flex-col items-start'>
      <span>The</span>
      <span>Auth</span>
      <span>Thing</span>
    </div>
  </h1>
);

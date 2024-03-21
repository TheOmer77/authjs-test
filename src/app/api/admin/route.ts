import { getCurrentUser } from '@/lib/auth';

export const GET = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== 'ADMIN')
    return new Response(
      JSON.stringify({
        success: false,
        error: "You're not allowed to access this.",
      }),
      { status: 403 }
    );

  return new Response(JSON.stringify({ success: true }));
};

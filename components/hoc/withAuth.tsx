// components/hoc/withAuth.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookies';

interface WithAuthProps {
  allowedRoles: string[];
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) => {
  const ComponentWithAuth = (props: Omit<P, keyof WithAuthProps>) => {
    const router = useRouter();

    useEffect(() => {
      const role = getCookie('role'); // Get user role from cookie
      if (!allowedRoles.includes(role || '')) {
        router.replace('/unauthorized'); // Redirect to login if not allowed
      }
    }, [router]);

    // Render wrapped component with remaining props
    return <WrappedComponent {...(props as P)} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
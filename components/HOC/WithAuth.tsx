// withAuth.tsx

import { app } from '@/utils/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const auth = getAuth(app);
    const Auth = (props: P) => {
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = auth.currentUser?.uid; // your authentication logic here
            if (!isLoggedIn) {
                router.push('/auth');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return Auth;
};

export default withAuth;

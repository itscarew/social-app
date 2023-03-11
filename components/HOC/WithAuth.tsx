// withAuth.tsx

import { RootState } from '@/store';
import { app } from '@/utils/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {

    const auth = getAuth(app);
    const Auth = (props: P) => {
        const authUser = useSelector((state: RootState) => state.user.authUser)
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = authUser?.uid; // your authentication logic here
            if (!isLoggedIn) {
                router.push('/auth');
            }
        }, [authUser?.uid]);

        return <WrappedComponent {...props} />;
    };

    return Auth;
};

export default withAuth;

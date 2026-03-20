import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                localStorage.setItem('token', token);
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/');
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
            <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Completing sign in...</p>
            </div>
        </div>
    );
}

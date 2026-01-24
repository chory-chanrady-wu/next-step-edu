'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');

        if (!token || !user) {
            setIsAuthenticated(false)
            router.replace('/admin/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router, pathname]);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }
    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
}

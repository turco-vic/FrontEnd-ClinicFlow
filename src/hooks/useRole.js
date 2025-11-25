'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRole() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && user) {
            const role = user.publicMetadata?.role;
            if (!role) {
                router.push('/selecionar-papel');
            }
        }
    }, [isLoaded, user, router]);

    const role = user?.publicMetadata?.role;

    return {
        user,
        isLoaded,
        role,
        isPaciente: role === 'paciente',
        isMedico: role === 'medico',
        isSecretaria: role === 'secretaria',
    };
}

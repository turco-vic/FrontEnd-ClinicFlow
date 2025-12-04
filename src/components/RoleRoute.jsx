"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleRoute({ children, allowedRoles }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = () => {
      try {
        const stored = sessionStorage.getItem("user");

        if (!stored) {
          router.push("/login");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(stored);

        if (!userData || !userData.user || !userData.user.role) {
          router.push("/login");
          setLoading(false);
          return;
        }

        if (!allowedRoles || !Array.isArray(allowedRoles)) {
          console.error("allowedRoles deve ser um array");
          router.push("/forbidden");
          setLoading(false);
          return;
        }


        if (!allowedRoles.includes(userData.user.role)) {
          router.push("/forbidden");
          setLoading(false);
          return;
        }

        setAuthorized(true);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao verificar permissões:", error);
        router.push("/login");
        setLoading(false);
      }
    };

    checkRole();
  }, [router, allowedRoles]);

  if (loading) return <div>Verificando permissões...</div>;
  if (!authorized) return null;

  return <>{children}</>;
}

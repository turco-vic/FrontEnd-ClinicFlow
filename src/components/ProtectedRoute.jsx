"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = sessionStorage.getItem("user");

        if (!storedUser) {
          router.replace("/login");
          setLoading(false);
          return;
        }

        // Verifica se o JSON é válido
        const userData = JSON.parse(storedUser);
        
        if (!userData || !userData.user) {
          router.replace("/login");
          setLoading(false);
          return;
        }

        setAuthorized(true);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.replace("/login");
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <div>Carregando...</div>;
  if (!authorized) return null;

  return <>{children}</>;
}

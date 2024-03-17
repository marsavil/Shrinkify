'use client'
import { fetchLink } from "@/lib/actions/link.actions";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  console.log(params.id)
  useEffect(() => {
    async function redirectUrl() {
      const url = await fetchLink(params.id);
      if (url === null) {
        router.push('/');
      } else {
        // Verificar si la URL comienza con http:// o https://
        const prefixedUrl = url.startsWith('http://www.') || url.startsWith('https://www.') || url.startsWith('https://')  ? url : `https://www.${url}`;
        router.push(prefixedUrl);
      }
    }
    if (router) {
      redirectUrl();
    }
  }, [params.id, router]);
  return null;
}

// 'use server'
// import { fetchLink } from "@/lib/actions/link.actions"
// import { redirect } from 'next/navigation';
// import { NextResponse } from "next/server";


// export default async function Page ({ params }: { params :{ id:string}}){
//   console.log (params)
//   try {
//     const url = await fetchLink(params.id)
//   console.log
//   if (url === null) {
//     redirect('/');
//   } else {
//     // Verificar si la URL tiene el protocolo HTTP o HTTPS
//     if (!url.startsWith('http://') && !url.startsWith('https://')) {
//       // Si no tiene ninguno de los dos, agregar el protocolo HTTPS
//       const absoluteUrl = `https://www.${url}`;
//       console.log(absoluteUrl);
//       NextResponse.redirect(absoluteUrl, 302);
//     } else {
//       // Si ya tiene el protocolo, usar la URL tal como está
//       NextResponse.redirect(url, 302);
//     }
//   }
//   } catch (error:any) {
//     console.log(error.message)
//     throw new Error(`Failed to fetch link: ${error.message}`)
//   }
  


//   return (
//     <div>
//       <h1>Short Id redirect</h1>
//     </div>
//   )
// }
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
        const prefixedUrl = url.startsWith('http://www.') || url.startsWith('https://www.')  ? url : `https://www.${url}`;
        router.push(prefixedUrl);
      }
    }
    if (router) {
      redirectUrl();
    }
  }, [params.id, router]);
  return null;
  // return (
  //   <div>
  //     <h1>Short Id redirect</h1>
  //   </div>
  // );
}

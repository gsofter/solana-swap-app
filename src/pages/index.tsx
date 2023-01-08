import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import LoadingCircle from '@/components/LoadingCircle'

export default function HomePage() {
  const router = useRouter()
  useEffect(() => {
    router.push('/swap')
  })

  return (
    <div>
      <LoadingCircle />
    </div>
  )
}

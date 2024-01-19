'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function MyPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  //zoom is 4 to see map at once

  return (
    <div>
      <Map classname='h-[600px]' zoom={2} multiMarker />
    </div>
  );
}

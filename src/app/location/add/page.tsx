'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useMapStore } from '@/store';
import { useRouter } from 'next/navigation';

const schema = z.object({
  title: z.string().min(3),
  locationType: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function AddLocation() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => <p className='h-[300px]'>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  const { push } = useRouter();
  const selectedPosition = useMapStore((state) => state.selectedPosition);
  const addMarker = useMapStore((state) => state.addMarker);
  const markers = useMapStore((state) => state.markers);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      title: 'Home',
      locationType: 'business',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // Promise is for making a realistic API call because I don't have any API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if ('lat' in selectedPosition) {
        addMarker({
          title: data.title,
          lat: selectedPosition.lat,
          lng: selectedPosition.lng,
          locationType: data.locationType,
          id: markers ? Number(markers.length + 1) : 1,
        });
      }
      push('/');
    } catch (error) {
      setError('root', {
        message: 'this location is shared before',
      });
    }
  };

  return (
    <div className='max-w-[500px] m-auto mt-5'>
      <h1 className='text-center mb-5 font-bold'>Share your new location</h1>
      <form className='form gap-5' onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} type='text' placeholder='location name' />
        {errors.title && (
          <div className='text-red-500'>{errors.title.message}</div>
        )}
        <select
          {...register('locationType', { required: true })}
          className='border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value='' disabled>
            Select an option
          </option>
          <option value='business'>Business</option>
          <option value='business2'>Business 2</option>
        </select>
        <div>
          <Map classname='h-[300px] w-full' zoom={15} />
        </div>
        <button disabled={isSubmitting} type='submit'>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
        {errors.root && (
          <div className='text-red-500'>{errors.root.message}</div>
        )}
      </form>
    </div>
  );
}

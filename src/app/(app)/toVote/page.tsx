'use client'
import { CardVote } from '@/components/myComp/cardVote'
import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
      <div className='flex items-center justify-around'>
        <Link href={'/voter/actor'}>
          <h1 className='text-5xl font-extrabold'>Best Actor of the Month</h1>
        </Link>
        <CardVote img="https://tfiglobalnews.com/wp-content/uploads/2022/08/Wahaj_Ali_profile_picture_instagram.jpg" name='To vote Actor' cap='Who do you think is Best at this month' />
      </div>
      <div className='flex items-center justify-around'>
        <CardVote img="https://www.imdb.com/name/nm3391649/mediaviewer/rm3310890497/?ref_=nm_ov_ph" name='To vote Director' cap='Who do you think is Best at this month' />
        <Link href={'/voter/director'}>
          <h1 className='text-5xl font-extrabold'>Best Director of the Month</h1>
        </Link>
      </div>
      <div className='flex items-center justify-around'>
        <CardVote img="https://propakistani.pk/lens/wp-content/uploads/2023/11/yumna-zaidi-1.jpg" name='To vote Female' cap='Who do you think is Best at this month' />
        <Link href={'/voter/actress'}>
          <h1 className='text-5xl font-extrabold'>Best Actress of the Month</h1>
        </Link>
      </div>
      <div className='flex items-center justify-around'>
        <CardVote img="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" name='To vote Female' cap='Who do you think is Best at this month' />
        <Link href={'/voter/writer'}>
          <h1 className='text-5xl font-extrabold'>Best Writer of the Month</h1>
        </Link>
      </div>
    </div>
  )
}

export default page
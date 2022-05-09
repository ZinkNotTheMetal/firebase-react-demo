import { onValue, ref } from 'firebase/database';
import React, { FC, useEffect, useState } from 'react'
import Bird from '../models/Bird.model';
import { useRealtimeDatabase } from '../services/firebase.service';

const Sightings : FC = () => {
  const db = useRealtimeDatabase();
  const [sightingCount, setSightingCount] = useState<number>()

  // Reading Data:
  //   To read data at a path and listen for changes
  //? https://firebase.google.com/docs/database/web/read-and-write
  useEffect(() => {
    const redShoulderRef = ref(db, 'birds/1')
    const unsubscribe = onValue(redShoulderRef, (snapShot) => {
      const data: Bird = snapShot.val()
      setSightingCount(data.sightingCount)
    })

    return unsubscribe
  }, [])

  return (
    <div>
      <span>Red Shoulder Sightings: </span>
      { sightingCount }

    </div>
  )
}

export default Sightings

import { onValue, ref } from 'firebase/database';
import React, { FC, useEffect, useState } from 'react'
import Bird from '../models/Bird.model';
import { getFirestoreDatabase } from '../services/firebase.service';

const Sightings : FC = () => {
  const db = getFirestoreDatabase();
  const [redShoulderHawk, setRedShoulderHawk] = useState<number>()

  // Reading Data:
  //   To read data at a path and listen for changes
  //? https://firebase.google.com/docs/database/web/read-and-write
  useEffect(() => {
    const redShoulderRef = ref(db, 'birds/1')
    const unsubscribe = onValue(redShoulderRef, (snapShot) => {
      const data: Bird = snapShot.val()
      setRedShoulderHawk(data.sightingCount)
    })

    return unsubscribe
  }, [])

  return (
    <div>

      { redShoulderHawk }

    </div>
  )
}

export default Sightings

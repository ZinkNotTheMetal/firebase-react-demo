import React, { FC, useEffect } from 'react'
import { ref, set } from 'firebase/database'
import Bird from '../models/Bird.model'
import { getFirestoreDatabase } from '../services/firebase.service'

const Add : FC = () => {
  const db = getFirestoreDatabase();

  // Writing Data:
  //? https://firebase.google.com/docs/database/web/read-and-write
  const createNew = () => {
  
    const redShoulderHawk: Bird = {
      sex: 'Male',
      sightingCount: 1,
      species: 'Buteo lineatus',
      commonName: 'Red-Shoulder Hawk',
      weight: 650,
    }

    set(ref(db, 'birds/' + 1), redShoulderHawk)

  }

  return (
    <button
      type="button"
      onClick={createNew}
    >
      Add
    </button>
  )
}

export default Add
import { FC, useEffect, useState } from 'react'
import { onValue, ref, remove, set, update } from 'firebase/database';
import Bird from '../models/Bird.model';
import { getFirestoreDatabase } from '../services/firebase.service';

const List : FC = () => {
  const db = getFirestoreDatabase();
  const [birds, setBirds] = useState<Bird[]>([])

  // Reading Data:
  //   To read data at a path and listen for changes
  //? https://firebase.google.com/docs/database/web/read-and-write
  useEffect(() => {
    const birdsRef = ref(db, 'birds/')
    const unsubscribe = onValue(birdsRef, (snapShot) => {

      // Two options: 1) Can get key and val separately and bind
      snapShot.forEach((data) => {

        console.log(data.key)
        console.log(data.val())
      })

      // Can get the object as one and put the key in the object too
      const data: Bird[] = snapShot.val()
      if (data !== null) {
        Object.values(data).map((bird) => {
          setBirds((previous) => [...previous, bird])
        })
      }
    })

    return unsubscribe
  }, [])

  // Updating specific fields:
  //? https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields
  const addSighting = () => {
    const updates = {}
  }

  const removeBird = (id: string) => {
    // Remove works - need to figure out key
    remove(ref(db, 'birds/' + id))
  }
  
  return (
    <div>
      <span>List of Birds</span>

      <div>

        { birds.map((bird) => (
          <div key={bird.id}>
            <div>{bird.commonName}</div>
            <div>{bird.species}</div>
            <div>{bird?.sightingCount}</div>
            <div>{bird?.weight}</div>
            <button onClick={addSighting}>Add Sighting!</button>
            <button onClick={() => removeBird('1')}>Remove Bird</button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default List

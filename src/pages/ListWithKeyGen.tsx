import { FC, useEffect, useState } from 'react'
import { onValue, ref as dbRef, remove, set, update, increment } from 'firebase/database';
import { deleteObject, listAll, ref as sRef } from 'firebase/storage'
import Bird from '../models/Bird.model';
import { useRealtimeDatabase, useStorage } from '../services/firebase.service';

const List : FC = () => {
  const db = useRealtimeDatabase();
  const storage = useStorage();
  const [birds, setBirds] = useState<Bird[]>([])

  // Reading Data:
  //   To read data at a path and listen for changes
  //? https://firebase.google.com/docs/database/web/read-and-write
  useEffect(() => {
    const birdsRef = dbRef(db, 'birds/')
    const unsubscribe = onValue(birdsRef, (snapShot) => {
      const allBirds: Bird[] = Object.keys(snapShot.val()).map((key) => ({
        id: key,
        ...snapShot.val()[key],
      }))

      console.log('allbirds', allBirds)

      setBirds(allBirds)
    })

    return unsubscribe
  }, [])

  // Updating specific fields:
  //? https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields
  const addSighting = (id: string) => {
    console.log('add sighting id:', id)
    update(dbRef(db, `birds/${id}`), {
      sightingCount: increment(1)
    })
  }

  const removeBird = (id: string) => {
    // Remove works - need to figure out key
    remove(dbRef(db, 'birds/' + id))
      .then(() => {
        setBirds((previous) => (previous.filter((f) => f.id !== id)))

        // delete all images of birds
        const picturesRef = sRef(storage, `images/${id}`)
        listAll(picturesRef)
          .then((response) => {
            response.items.forEach((item) => {
              console.log(item.fullPath)
              deleteObject(item)
            })
          })
      })
  }
  
  return (
    <div>
      <span>List of Birds</span>

      <div>

      { birds.map((bird) => (
          <div key={bird.id}>
            <div>{bird.id}</div>
            <div>{bird.commonName}</div>
            <div>{bird.species}</div>
            <div>{bird.sex}</div>
            <div>{bird.sightingCount}</div>
            <div>{bird?.weight}</div>
            <button onClick={() => addSighting(bird.id!)}>Add Sighting!</button>
            <button onClick={() => removeBird(bird.id!)}>Remove Bird</button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default List

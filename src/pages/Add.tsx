import { FC, useState } from 'react'
import { push, ref, set } from 'firebase/database'
import Bird from '../models/Bird.model'
import { getFirestoreDatabase } from '../services/firebase.service'

const Add : FC = () => {
  const db = getFirestoreDatabase();
  const [birdToAdd, setBirdToAdd] = useState<Bird>({} as Bird)

  // Writing Data:
  //? https://firebase.google.com/docs/database/web/read-and-write
  const createNew = () => {

    // Add new bird to collection (note: will add a new ID as well)
    const birdRef = ref(db, 'birds')
    const newBirdRef = push(birdRef)
    
    console.log(birdToAdd)
    set(newBirdRef, birdToAdd)

    //?: Adding a single bird (id doesn't matter)
  
  
    //?: Adding single object to database (id matters)
    // const redShoulderHawk: Bird = {
    //   sex: 'Male',
    //   sightingCount: 1,
    //   species: 'Buteo lineatus',
    //   commonName: 'Red-Shoulder Hawk',
    //   weight: 650,
    // }

    // set(ref(db, 'birds/' + 1), redShoulderHawk)

  }

  return (
    <form onSubmit={(e) => createNew()}>
      <div>
        <label>
          <span>Species</span>
          <input
            type="text"
            value={birdToAdd.species}
            onChange={(e) => setBirdToAdd((previous) => ({
              ...previous,
              species: e.target.value
            }))}
          />
        </label>
      </div>
      
      <div>
        <label>
          <span>Common Name</span>
          <input
            type="text"
            value={birdToAdd.commonName}
            onChange={(e) => setBirdToAdd((previous) => ({
              ...previous,
              commonName: e.target.value
            }))}
          />
        </label>
      </div>
      
      <div>
        <button type="submit">
          Add new Bird!
        </button>
      </div>
    </form>
  )
}

export default Add
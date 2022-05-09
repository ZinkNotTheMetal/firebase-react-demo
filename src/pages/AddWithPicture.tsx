import { ChangeEvent, useState } from 'react'
import { push, ref as dbRef } from 'firebase/database'
import { uploadBytes, ref } from 'firebase/storage';
import { getFirestoreDatabase, useFirebaseStorage } from '../services/firebase.service';

const AddWithPicture = () => {
  // Add a bird to db with picture (picture in storage)
  const db = getFirestoreDatabase()
  const storage = useFirebaseStorage()
  const birdRef = dbRef(db, 'birds/')
  const [picture, setPicture] = useState<File>()

  const addNewBirdWithPicture = async () => {
    if (picture === undefined) return;
    let key: string = ''

    push(birdRef, {
      name: 'Bob',
      species: 'human',
      sightingCount: 1,
      sex: 'Male'
      })
      .then((newBirdAdded) => {
        console.log('added db key:', newBirdAdded.key)
        key = newBirdAdded.key!
        const imageStorageRef = ref(storage, `images/${key}/${picture.name}`)

        uploadBytes(imageStorageRef, picture, {
          contentType: 'image/jpeg',
        })
      })

    console.log('picture successfully added!')
  }

  const bindInputToState = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const picture = e.target.files[0]

    setPicture(picture)
  }

  return (
    <div>
      <h1>Add with Picture</h1>

      <input type="file" onChange={(e) => bindInputToState(e)}/>
      <button type="button" onClick={addNewBirdWithPicture}>Add with Picture!</button>
    </div>
  )
}

export default AddWithPicture
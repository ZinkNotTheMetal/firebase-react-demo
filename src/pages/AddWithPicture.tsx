import { ChangeEvent, useState } from 'react'
import { runTransaction } from 'firebase/firestore'
import { uploadBytes, ref } from 'firebase/storage';
import { getFirestoreDatabase, useFirebaseStorage } from '../services/firebase.service';

const AddWithPicture = () => {
  // Add a bird to db with picture (picture in storage)
  const db = getFirestoreDatabase()
  const storage = useFirebaseStorage()
  const [picture, setPicture] = useState<File>()

  const addNewBirdWithPicture = async () => {
    if (picture === undefined) return;

    const imageStorageRef = ref(storage, `images/${picture.name}`)
    console.log('picture!')
    uploadBytes(imageStorageRef, picture, {
      contentType: 'image/jpeg',
    })
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
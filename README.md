# (Google) Firebase React Demo (React TypeScript with Vite)

Introduction into reading and writing data into a firebase database using React.

## Installation

1. Create vite application

   ```bash
   yarn create vite firebase-react-demo --template react-ts
   ```

2. Create firebase application

    1. Login to [Firebase](https://firebase.google.com)

    2. Create new application (calling it firebase-react-demo)

    3. Add a Web Connection to Firebase (calling it react-web)

        * Did not enable web hosting for this project

    4. Enable Realtime Database (for reading and writing to json store)

    5. Enable Storage (for adding files)

3. Install Firebase into application

    ```bash
    yarn add firebase
    ```

4. Configuring the webapp

    1. Setup firebase.service.ts

    2. Add .env file with all variables

5. Choosing [database provider](https://firebase.google.com/docs/firestore/rtdb-vs-firestore)

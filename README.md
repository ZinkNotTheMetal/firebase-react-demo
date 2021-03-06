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

6. Disabling reading / writing

    [Storage Security Rules](https://firebase.google.com/docs/storage/security)

   ```javascript
   rules_version = '2';
    service firebase.storage {
        match /b/{bucket}/o {
            match /{allPaths=**} {
            allow read, write: if
                request.time < timestamp.date(2022, 6, 8);
            }
        }
    }
   ```

   [Database Security Rules](https://firebase.google.com/docs/database/security/)

   ```javascript
   {
      "rules": {
        ".read": true,  // 2022-6-7
        ".write": true,  // 2022-6-7
      }
    }
   ```

7. Running the emulator

* [Introduction to the Emulator](https://firebase.google.com/docs/emulator-suite)

* [Setting up the Emulator](https://firebase.google.com/docs/emulator-suite/connect_and_prototype)

* [Ports and more Information](https://firebase.google.com/docs/emulator-suite/install_and_configure)

* Before installing the Emulator Suite you will need:
    1. Node.js version 8.0 or higher

    2. Java version 1.8 or higher

       ```bash
       choco install oraclejdk
       ```

    ```bash
    npm i -g firebase-tools
    ```

    After installation, run the initialize (will setup everything you need to run the emulators)

    ```bash
    firebase init
    ```

    ```bash
    firebase init emulators
    ```

    Running the emulators

    ```bash
    firebase emulators:start
    ```


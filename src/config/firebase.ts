import { FirebaseApp, initializeApp } from "firebase/app";

class ConfigFirebase {
    firebaseConfig: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };

    app: FirebaseApp;

    constructor() {
        this.firebaseConfig = {
            apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
            authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
            projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
            storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
            messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
            appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
            measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
        };
        this.app = initializeApp(this.firebaseConfig);
    }
}

const configFirebase = new ConfigFirebase();
export default configFirebase;

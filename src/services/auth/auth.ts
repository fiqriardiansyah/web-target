import { FirebaseApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import configFirebase from "../../config/firebase";
import BaseService from "../base-service";

class AuthService extends BaseService {
    signIn = "/giias/cashier/sign-in";

    checkAuth = "/giias/cashier/check-auth";

    auth: Auth;

    config: FirebaseApp;

    constructor(config: FirebaseApp) {
        super();
        this.config = config;
        this.auth = getAuth(this.config);
    }

    _signInToFirebase(data: SignInParam) {
        return this.ProxyRequestNoAxios<string>(async () => {
            const user = await signInWithEmailAndPassword(this.auth, data.email, data.password);
            if (!user) throw new Error("User not defined");

            const idToken = await this.auth.currentUser?.getIdToken();
            if (!idToken) throw new Error("Cannot get id token");
            return idToken;
        });
    }

    _signInToServer<T extends AuthResponse>(data: IdTokenEmail) {
        return this.ProxyRequest<T>(async ({ post }) => {
            const req = await post({
                url: this.signIn,
                data,
            });
            return req;
        });
    }

    _checkAuthToServer<T extends CheckAuthResponse>(data: IdTokenEmail) {
        return this.ProxyRequest<T>(async ({ post }) => {
            const req = await post({
                url: this.checkAuth,
                data,
            });
            return req;
        });
    }

    CheckAuth<T extends CheckAuthResponse>(data: SignInParam) {
        return this.ProxyRequest<T>(async () => {
            const idToken = await this._signInToFirebase(data);
            const authData = await this._checkAuthToServer<T>({ email: data.email, idToken });
            return authData;
        });
    }

    SignIn<T extends AuthResponse>(data: SignInParam) {
        return this.ProxyRequest<T>(async () => {
            const idToken = await this._signInToFirebase(data);
            const authData = await this._signInToServer<T>({ email: data.email, idToken });
            return authData;
        });
    }
}

const authService = new AuthService(configFirebase.app);
export default authService;

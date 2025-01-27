import {UserInterface} from "./user.interface.tsx";

export interface UseUserInterface {
    error: string | null;
    login: () => Promise<UserInterface | null>;
}
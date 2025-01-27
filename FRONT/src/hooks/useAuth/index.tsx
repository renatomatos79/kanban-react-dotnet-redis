import { useState} from "react";
import axios, {AxiosError} from "axios";
import {UseUserInterface} from "../../types/interfaces/user-hook.interface.tsx";
import {UserInterface} from "../../types/interfaces/user.interface.tsx";
import {DEFAULT_REQUEST_HEADER} from "../../constants/access.constants.tsx";
import {AppSettings} from "../../configs";

export const useAuth = (): UseUserInterface => {
    const appSettings = new AppSettings();
    const [error, setError] = useState<string | null>(null);

    const handleError = (error: Error) => {
        setError(error.message || "An error occurred");
    };

    const validateRequest = () => {
        const result = appSettings.validate()
        if (result.length > 0) {
            setError(result.join(','));
            return false
        }
        return true
    }

    // Add a new task (POST)
    const login = async (): Promise<UserInterface | null> => {
        setError(null);
        try {
            if (!validateRequest()) return null;
            // credentials load from settings file
            const payload = {
                login: appSettings.credentials.username,
                senha: appSettings.credentials.password
            }
            // gets auth token
            const response = await axios.post<UserInterface>(`${appSettings.baseURL}/login`, payload, {
                headers: {
                    ...DEFAULT_REQUEST_HEADER
                }
            });
            return response.data
        } catch (error) {
            handleError(error as AxiosError);
        }
        return null
    }

    return { error, login };
};
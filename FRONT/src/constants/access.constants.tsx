export const ERROR_VARS_NOT_DEFINED = "Some ENV variables are not defined! Check README.md for more details"

export const DEFAULT_REQUEST_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const DEFAULT_REQUEST_HEADER_WITH_TOKEN = (token: string) => {
    return {
        ...DEFAULT_REQUEST_HEADER,
        'Authorization': `Bearer ${token}`,
    }
}



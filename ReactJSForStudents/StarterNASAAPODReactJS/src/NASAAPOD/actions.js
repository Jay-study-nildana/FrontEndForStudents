export const LOAD_APOD_IN_PROGRESS = 'LOAD_APOD_IN_PROGRESS';
export const loadApodInProgress = () => ({
    type: LOAD_APOD_IN_PROGRESS,
});

export const LOAD_APOD_SUCCESS = 'LOAD_APOD_SUCCESS';
export const loadApodSuccess = apod => ({
    type: LOAD_APOD_SUCCESS,
    payload: { apod },
});

export const LOAD_APOD_FAILURE = 'LOAD_APOD_FAILURE';
export const loadApodFailure = () => ({
    type: LOAD_APOD_FAILURE,
});
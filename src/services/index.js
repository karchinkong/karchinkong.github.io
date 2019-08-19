import request from './request';
import { API_queryIssues, API_queryOpenSources } from './api';

export const queryIssues = payload => {
    return request.get(API_queryIssues, payload);
};

export const queryOpenSources = () => {
    return request.get(API_queryOpenSources);
};
import request from './request';
import { API_queryIssues } from './api';

export const queryIssues = payload => {
    return request.get(API_queryIssues, payload);
};
import request from './request';
import { API_queryIssues, API_queryOpenSources, API_queryIssueDetailById } from './api';

export const queryIssues = payload => {
    return request.get(API_queryIssues, payload);
};

export const queryIssueDetailById = payload => {
    return request.get(`${API_queryIssueDetailById}/${payload.id}`);
};

export const queryIssueCommentById = payload => {
    return request.get(`${API_queryIssueDetailById}/${payload.id}/comments`);
};

export const queryOpenSources = () => {
    return request.get(API_queryOpenSources);
};
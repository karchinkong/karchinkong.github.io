import { GITHUB_AUTHOR, WARE_HOUSE } from '../constances/common';

export const API_queryIssues = `/repos/${GITHUB_AUTHOR}/BlogSystem/issues`;

export const API_queryOpenSources = `/users/${GITHUB_AUTHOR}/repos`;

export const API_queryIssueDetailById = `/repos/${GITHUB_AUTHOR}/${WARE_HOUSE}/issues`;
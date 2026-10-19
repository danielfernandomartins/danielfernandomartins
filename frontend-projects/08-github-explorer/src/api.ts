import axios from 'axios';
import type { GitHubUser } from './types';

const github = axios.create({ baseURL: 'https://api.github.com', timeout: 8000 });

export function buildUserPath(username: string): string {
  return `/users/${encodeURIComponent(username.trim())}`;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const { data } = await github.get<GitHubUser>(buildUserPath(username));
  return data;
}

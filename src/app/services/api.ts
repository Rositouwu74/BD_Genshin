import { Character, Artifact, Build, Domain, User, ArtifactStats, AscensionMaterial } from '@/app/types';

export const api = {
  // Characters
  async getCharacters(): Promise<Character[]> {
    const response = await fetch('/api/characters');
    return response.json();
  },

  async getCharacterById(id: number): Promise<Character> {
    const response = await fetch(`/api/characters/${id}`);
    return response.json();
  },

  // Artifacts
  async getArtifacts(): Promise<Artifact[]> {
    const response = await fetch('/api/artifacts');
    return response.json();
  },

  // Builds
  async getBuilds(): Promise<Build[]> {
    const response = await fetch('/api/builds');
    return response.json();
  },

  async getBuildByCharacter(characterId: number): Promise<Build[]> {
    const response = await fetch(`/api/builds?characterId=${characterId}`);
    return response.json();
  },

  // Domains
  async getDomains(): Promise<Domain[]> {
    const response = await fetch('/api/domains');
    return response.json();
  },

  // User
  async getUserProfile(uid: number): Promise<User> {
    const response = await fetch(`/api/users/${uid}`);
    return response.json();
  },

  async updateUserProfile(uid: number, data: Partial<User>): Promise<User> {
    const response = await fetch(`/api/users/${uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // ArtifactStats
  async getArtifactStats(buildId: number): Promise<ArtifactStats[]> {
    const response = await fetch(`/api/artifact-stats?buildId=${buildId}`);
    return response.json();
  },

  // Ascension Materials
  async getAscensionMaterials(): Promise<AscensionMaterial[]> {
    const response = await fetch('/api/ascension-materials');
    return response.json();
  }
};
import React from 'react';

export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  imageUrl?: string; // For user uploads or bot responses if we add that later
  isLoading?: boolean;
}

export interface CoconutCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  prompt: string;
  description: string;
}

export enum AppRoute {
  HOME = 'home',
  CHAT = 'chat',
  DIAGNOSIS = 'diagnosis',
  LIBRARY = 'library',
  SCHEDULE = 'schedule',
  FORUM = 'forum'
}

export interface RegionInfo {
  id: string;
  name: string;
  description: string;
}

export interface PestInfo {
  id: string;
  name: string;
  scientificName?: string;
  symptoms: string;
  prevention: string;
  treatment: string;
  imageUrl?: string;
}

export interface FarmingProcessInfo {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown supported
  icon: React.ReactNode;
}

export interface CoconutVariety {
  id: string;
  name: string;
  group: 'Dừa uống nước' | 'Dừa công nghiệp' | 'Dừa đặc sản';
  description: string;
  characteristics: string; // Morphological characteristics
  yield: string; // Yield info
  advisory: string; // Recommendation for planting
  imageUrl?: string;
}

export interface TreeStage {
  id: string;
  name: string;
  description: string; // e.g., "1-3 years old"
}

export interface CareTask {
  type: 'fertilize' | 'water' | 'pest' | 'care';
  title: string;
  description: string;
}

export interface MonthlyCareGuide {
  month: number;
  season: string; // "Mùa khô" or "Mùa mưa"
  tasks: CareTask[];
}

export interface WeatherData {
  temp: number;
  humidity: number;
  precipitation: number; // mm
  weatherCode: number;
  description: string;
  isDay: boolean;
  loading: boolean;
  error?: string;
}

export interface ForumPost {
  id: string;
  author: string;
  role: 'Nông dân' | 'Chuyên gia' | 'Thương lái' | 'Admin';
  avatar?: string;
  title: string;
  content: string;
  category: 'kithuat' | 'thitruong' | 'saubenh' | 'muaban';
  likes: number;
  comments: number;
  timestamp: string;
  images?: string[];
  isPinned?: boolean;
}
export {
  type GenerationStatus,
  type GenerationRecord,
  type ProcessingType,
  type Project
} from "@/data/mock";

export interface UploadFileMeta {
  name: string;
  size: number;
  type: string;
  url?: string;
}

export interface GenerationParams {
  style: string;
  format: string;
  quality: string;
  count: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export type SettingsSection = "profile" | "notifications" | "interface" | "security";

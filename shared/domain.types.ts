export interface Category {
  categoryId: number;
  iconId: Icon["iconId"];
  title: string;
  description: string;
}

export interface Icon {
  iconId: number;
  src: string;
  alt: string;
}

export interface Message {
  messageId: number;
  topicId: Topic["topicId"];
  userId: User["userId"];
  textContent: string;
  createdAt: Date;
}

export interface TopicRole {
  topicRoleId: number;
  userId: User["userId"];
  topicId: Topic["topicId"];
  role: "admin" | "banned";
  expiresAt: Date | null;
}

export interface Topic {
  topicId: number;
  categoryId: Category["categoryId"];
  userId: User["userId"];
  title: string;
  createdAt: Date;
  statusChangedAt: Date | null;
  description: string;
  status: "open" | "closed" | "hidden";
  searchVector: string;
}

export interface UserSession {
  sessionId: string;
  userId: User["userId"];
  expiresAt: Date;
  ipAddress: string;
}

export interface User {
  userId: number;
  iconId: Icon["iconId"];
  username: string;
  phone: string;
  email: string;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
  passwordHash: string;
}
export interface Category {
  categoryId: string;
  iconId: Icon["iconId"];
  title: string;
  description: string;
}

export interface Icon {
  iconId: string;
  src: string;
  alt: string;
}

export interface Message {
  messageId: string;
  topicId: Topic["topicId"];
  userId: User["userId"];
  textContent: string;
  createdAt: Date;
}

export interface TopicRole {
  topicRoleId: string;
  userId: User["userId"];
  topicId: Topic["topicId"];
  role: "admin" | "banned";
  expiresAt: Date | null;
}

export interface Topic {
  topicId: string;
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
  userId: string;
  iconId: Icon["iconId"];
  username: string;
  phone: string;
  email: string;
  createdAt: Date;
  lastLogin: string;
  isActive: boolean;
  passwordHash: string;
}
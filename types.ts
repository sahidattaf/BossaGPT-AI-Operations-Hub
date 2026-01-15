
import { ComponentType } from 'react';

export interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconBgColor: string;
  promptFormat: string;
  exampleOutput: string;
  activationPathways: { name: string; type: 'Notion' | 'YouTube' | 'Chatbot' | 'Dashboard' | 'GitHub' | 'Internal' }[];
  externalLink?: string;
  notionLink?: string;
  riskLevel?: 'Low' | 'Medium' | 'High';
  // Added 'In Build' to the status union type
  status?: 'Active' | 'Testing' | 'Draft' | 'In Build';
  systemInstruction?: string;
}
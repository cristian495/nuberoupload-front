export interface CredentialField {
  key: string;
  label: string;
  type: 'text' | 'password' | 'select' | 'textarea';
  placeholder?: string;
  required: boolean;
  description?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
}

export interface ProviderTemplate {
  _id: string;
  name: string;
  code: string;
  icon: string;
  supportedExtensions: string[];
  description?: string;
  fields: CredentialField[];
}

export interface StorageProvider {
  _id: string;
  name: string;
  code: string;
  icon: string;
  templateId: string;
  description?: string;
  config: Record<string, any>;
  configLastChars: Record<string, any>;
  encryptedConfig?: Record<string, any>;
  userId: string;
  createdAt: string;
  updatedAt: string;
  lastConnectionCheck?: string;
  isConnectionHealthy?: boolean;
  connectionError?: string;
}

export interface CreateProviderFromTemplateData {
  templateId: string;
  name: string;
  description?: string;
  config: Record<string, any>;
}

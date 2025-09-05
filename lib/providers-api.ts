import { ProviderTemplate, StorageProvider, CreateProviderFromTemplateData } from '@/types/StorageProvider'
import { apiClient } from './api-client'

// Usar el cliente base compartido
const providersApi = apiClient

export const providersService = {
  // Obtener templates de proveedores disponibles
  async getProviderTemplates(): Promise<ProviderTemplate[]> {
    const response = await providersApi.get('/provider-templates')
    return response.data
  },

  // Obtener códigos de proveedores disponibles
  async getAvailableProviderCodes(): Promise<{ codes: string[] }> {
    const response = await providersApi.get('/provider-templates/available-codes')
    return response.data
  },

  // Obtener template específico por ID
  async getProviderTemplate(id: string): Promise<ProviderTemplate> {
    const response = await providersApi.get(`/provider-templates/${id}`)
    return response.data
  },

  // Obtener proveedores del usuario
  async getStorageProviders(): Promise<StorageProvider[]> {
    const response = await providersApi.get('/storage-providers')
    return response.data
  },

  // Crear proveedor desde template
  async createProviderFromTemplate(data: CreateProviderFromTemplateData): Promise<StorageProvider> {
    const response = await providersApi.post('/storage-providers/from-template', data)
    return response.data
  },

  // Probar conexión de proveedor
  async testProviderConnection(providerId: string): Promise<{ isHealthy: boolean; error?: string }> {
    const response = await providersApi.post(`/storage-providers/${providerId}/test-connection`)
    return response.data
  },

  // Eliminar proveedor
  async deleteProvider(providerId: string): Promise<{ success: boolean; message: string }> {
    const response = await providersApi.delete(`/storage-providers/${providerId}`)
    return response.data
  },
}
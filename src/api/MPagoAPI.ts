import api from "../lib/axios";


export const createPreference = async (ticket: {
    items: {
      title: string;
      unit_price: number;
      quantity: number;
    }[];
    total: number;
    userId: number;
  }) => {
    try {
      const url = '/mercado-pago/create-preference'
      const response = await api.post(url, ticket)
      return response.data.init_point.preference_id
    } catch (error) {
      console.error('Error al crear la preferencia:', error)
      throw error
    }
  }
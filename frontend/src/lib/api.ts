const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000'
  : 'https://guibugui.cn';

export interface ValuationRequest {
  company_name: string;
  years: number;
  growth_rate: number;
  discount_rate: number;
}

export type ValuationResult = {
  company_name: string;
  net_profit: number;
  market_cap: number;
  future_value: number;
  present_value: number;
  valuation_level: number;
  years: number;
  growth_rate: number;
  discount_rate: number;
  valuation_status: '高估' | '低估';
  valuation_ratio: number;
};

export async function calculateValuation(data: ValuationRequest): Promise<ValuationResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calculate-valuation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API error details:', error);
    throw error;
  }
}

export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    mode: 'cors',
    credentials: 'omit',
    headers: {
      'Accept': 'application/json',
    }
  });
  
  if (!response.ok) {
    throw new Error('Health check failed');
  }
  
  return response.json();
}
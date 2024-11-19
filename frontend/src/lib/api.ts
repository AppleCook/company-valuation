const API_BASE_URL = 'https://guibugui.cn';

export interface ValuationRequest {
  company_name: string;
  years: number;
  growth_rate: number;
  discount_rate: number;
}

export interface ValuationResult {
  company_name: string;
  net_profit: number;
  market_cap: number;
  future_value: number;
  present_value: number;
  valuation_level: number;
  years: number;
  growth_rate: number;
  discount_rate: number;
}

export async function calculateValuation(data: ValuationRequest): Promise<ValuationResult> {
  try {
    console.log('Sending request:', data);
    const response = await fetch(`${API_BASE_URL}/api/calculate-valuation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit', // 明确不发送凭证
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.detail || '计算估值时发生错误');
      } catch {
        throw new Error(errorText || '计算估值时发生错误');
      }
    }

    const result = await response.json();
    console.log('Received response:', result);
    return result;
  } catch (error) {
    console.error('API error:', error);
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
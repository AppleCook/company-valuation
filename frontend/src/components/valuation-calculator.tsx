'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { calculateValuation, type ValuationResult } from '@/lib/api';
import { SelectWrapper } from './select-wrapper';
import { stockList } from '@/components/company';

interface FormData {
  companyName: string;
  years: string;
  growthRate: string;
  discountRate: string;
}

const initialFormData: FormData = {
  companyName: '',
  years: '10',
  growthRate: '15',
  discountRate: '3'
};

// 假设这是你的 A 股上市公司名称字典
const companyNames = stockList;

const ValuationCalculator = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 仅在客户端执行的逻辑
    console.log('Component mounted on client');
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 添加 GA 事件跟踪
    // @ts-expect-error - window.gtag 在运行时由 GA 脚本添加
    window.gtag?.('event', 'calculate_valuation', {
      company_name: formData.companyName,
      years: formData.years,
      growth_rate: formData.growthRate,
      discount_rate: formData.discountRate
    });

    // 验证输入值
    if (!formData.companyName.trim()) {
      setError('请输入公司名称');
      return;
    }

    const years = parseInt(formData.years);
    const growthRate = parseFloat(formData.growthRate);
    const discountRate = parseFloat(formData.discountRate);

    if (isNaN(years) || years <= 0) {
      setError('请输入有效的预测年数');
      return;
    }

    if (isNaN(growthRate)) {
      setError('请输入有效的增长率');
      return;
    }

    if (isNaN(discountRate)) {
      setError('请输入有效的折现率');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const calculationResult = await calculateValuation({
        company_name: formData.companyName,
        years,
        growth_rate: growthRate,
        discount_rate: discountRate
      });

      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算估值时发生错误');
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const formatNumber = useCallback((number: number) => {
    if (number >= 10000) {
      return `${(number / 100000000).toFixed(2)}亿`;
    }
    return `${number.toFixed(2)}亿`;
  }, []);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const value = e.target.value;
    if (field === 'companyName' || value === '' || (/^\d*\.?\d*$/.test(value) && !isNaN(Number(value)))) {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCompanyNameChange = useCallback((selectedOption: any) => {
    setFormData(prev => ({
      ...prev,
      companyName: selectedOption ? selectedOption.value : ''
    }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>公司估值计算器</CardTitle>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            action="javascript:void(0)"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">公司名称</label>
              <SelectWrapper
                options={companyNames}
                onChange={handleCompanyNameChange}
                placeholder="请输入公司名称"
                isClearable
                value={companyNames.find(option => option.value === formData.companyName) || null}
                classNamePrefix="company-select"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">存续时长</label>
                <Input
                  type="text"
                  value={formData.years}
                  onChange={(e) => handleInputChange(e, 'years')}
                  placeholder="10"
                  required
                  min="1"
                  pattern="\d*"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">增长率(%)</label>
                <Input
                  type="text"
                  value={formData.growthRate}
                  onChange={(e) => handleInputChange(e, 'growthRate')}
                  placeholder="15"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">折现率(%)</label>
                <Input
                  type="text"
                  value={formData.discountRate}
                  onChange={(e) => handleInputChange(e, 'discountRate')}
                  placeholder="3"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
              onClick={() => console.log('Button clicked')}
            >
              {loading ? '计算中...' : '计算估值'}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">估值结果</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">当前净利润</div>
                  <div className="text-lg font-semibold">{formatNumber(result.net_profit)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">当前市值</div>
                  <div className="text-lg font-semibold">{formatNumber(result.market_cap)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">{result.years}年后估值</div>
                  <div className="text-lg font-semibold">{formatNumber(result.future_value)}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">折现后总值</div>
                  <div className="text-lg font-semibold">{formatNumber(result.present_value)}</div>
                </div>
              </div>
              
              <Alert className={result.valuation_status === '高估' ? 'bg-red-50' : 'bg-green-50'}>
                <AlertTitle>
                  估值分析: {result.valuation_status} 
                  ({(result.valuation_ratio * 100).toFixed(2)}%)
                </AlertTitle>
                <AlertDescription>
                  {result.valuation_status === '高估'
                    ? `当前股价高估${(result.valuation_ratio * 100).toFixed(2)}%，建议谨慎投资。`
                    : `当前股价低估${(result.valuation_ratio * 100).toFixed(2)}%，可能存在投资机会。`
                  }
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 w-full text-center text-sm text-gray-500 bg-white py-2">
        备案号：陕ICP备2024054006号
      </div>
    </div>
  );
};

export default ValuationCalculator;
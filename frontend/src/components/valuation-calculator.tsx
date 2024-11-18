'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { calculateValuation, type ValuationResult } from '@/lib/api';

const ValuationCalculator = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    years: '10',        // 改为字符串类型
    growthRate: '15',   // 改为字符串类型
    discountRate: '3'   // 改为字符串类型
  });
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit');
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await calculateValuation({
        company_name: formData.companyName,
        years: parseInt(formData.years),
        growth_rate: parseFloat(formData.growthRate),
        discount_rate: parseFloat(formData.discountRate)
      });
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算估值时发生错误');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (number: number) => {
    // alert(number)
    if (number >= 10000) {
      return `${(number / 100000000).toFixed(2)}亿`;
    } else {
      return `${number.toFixed(2)}亿`;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'companyName' | 'years' | 'growthRate' | 'discountRate'
  ) => {
    const value = e.target.value;
    
    // 数字输入验证
    if (field !== 'companyName') {
      if (value === '' || !isNaN(Number(value))) {
        setFormData(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>公司估值计算器</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">公司名称</label>
            <Input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange(e, 'companyName')}
              placeholder="请输入公司名称（如：贵州茅台）"
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">预测年数</label>
              <Input
                type="text"
                value={formData.years}
                onChange={(e) => handleInputChange(e, 'years')}
                placeholder="10"
                required
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

          <Button type="submit" className="w-full" disabled={loading}>
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
            
            <Alert className={result.valuation_level < 1 ? 'bg-red-50' : 'bg-green-50'}>
              <AlertTitle>估值水平: {result.valuation_level.toFixed(2)}</AlertTitle>
              <AlertDescription>
                {result.valuation_level < 1 
                  ? '当前股价可能偏高，建议谨慎投资。' 
                  : '当前股价可能存在上涨空间。'}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ValuationCalculator;
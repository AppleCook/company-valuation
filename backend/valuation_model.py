import akshare as ak
from typing import Tuple, Optional, Dict, Any

class ValuationModel:
    """
    公司估值模型
    主要职责：
    1. 获取实时市值数据
    2. 计算未来估值
    3. 计算折现价值
    4. 计算无风险投资收益对比
    """

    def __init__(self, financial_processor):
        self.financial_processor = financial_processor

    def get_market_cap(self, stock_code: str) -> Tuple[Optional[float], Optional[str]]:
        try:
            stock_info = ak.stock_zh_a_spot_em()
            stock_info = stock_info[stock_info['代码'] == stock_code]
            
            if not stock_info.empty:
                market_cap = float(stock_info.iloc[0]['总市值'])
                print(f"当前市值: {market_cap/100000000:.2f}亿元")
                return market_cap, None
            return None, "未找到股票市值数据"
        except Exception as e:
            return None, f"获取市值数据时出错: {e}"

    def calculate_risk_free_return(self, initial_amount: float, years: int, risk_free_rate: float) -> float:
        """
        计算无风险收益
        Args:
            initial_amount: 初始金额（元）
            years: 投资年数
            risk_free_rate: 无风险利率(%)
        Returns:
            float: 最终金额（元）
        """
        rate_decimal = risk_free_rate / 100
        final_amount = initial_amount * pow(1 + rate_decimal, years)
        return final_amount

    def calculate_valuation(self, company_name: str, years: int, growth_rate: float, discount_rate: float) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
        try:
            # 获取基础数据
            financial_result, error = self.financial_processor.get_complete_analysis(company_name)
            if error:
                return None, error

            stock_code = self.financial_processor.get_stock_code(company_name)
            if not stock_code:
                return None, "未找到公司股票代码"

            market_cap, error = self.get_market_cap(stock_code)
            if error:
                return None, error

            # 获取当年预测利润
            current_profit = financial_result['yearly_profit']
            growth_rate_decimal = growth_rate / 100
            discount_rate_decimal = discount_rate / 100

            print("\n估值计算参数:")
            print("-" * 50)
            print(f"公司名称: {company_name}")
            print(f"当年预测利润: {current_profit/100000000:.2f}亿元")
            print(f"当前市值: {market_cap/100000000:.2f}亿元")
            print(f"增长率: {growth_rate}%")
            print(f"折现率: {discount_rate}%")
            print(f"预测年数: {years}年")

            # 计算未来利润
            future_profit = current_profit * pow(1 + growth_rate_decimal, years)
            print(f"\n{years}年后年度利润: {future_profit/100000000:.2f}亿元")

            # 计算折现值
            present_value = future_profit / pow(1 + discount_rate_decimal, years)
            print(f"折现后价值: {present_value/100000000:.2f}亿元")

            # 计算同等金额无风险投资收益
            risk_free_rate = discount_rate  # 使用相同的折现率作为无风险利率
            risk_free_return = self.calculate_risk_free_return(market_cap, years, risk_free_rate)
            
            print("\n投资对比:")
            print("-" * 50)
            print(f"当前投资金额: {market_cap/100000000:.2f}亿元")
            print(f"无风险投资{years}年后金额: {risk_free_return/100000000:.2f}亿元")
            print(f"同期公司预期利润: {future_profit/100000000:.2f}亿元")

            # 计算估值水平
            valuation_level = market_cap / present_value 

            print("\n估值分析结果:")
            print("-" * 50)
            print(f"估值水平: {valuation_level:.2f}")
            print(f"投资建议: {'低估' if valuation_level > 1 else '高估'}")

            return {
                'company_name': company_name,
                'net_profit': float(current_profit),
                'market_cap': float(market_cap),
                'future_value': float(future_profit),
                'present_value': float(present_value),
                'risk_free_return': float(risk_free_return),
                'valuation_level': float(valuation_level),
                'years': years,
                'growth_rate': growth_rate,
                'discount_rate': discount_rate
            }, None

        except Exception as e:
            import traceback
            print("错误详情:", traceback.format_exc())
            return None, f"计算估值时出错: {e}"
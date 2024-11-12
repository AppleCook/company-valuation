import akshare as ak
from datetime import datetime
import pandas as pd
from typing import Tuple, Optional, Dict, Any

class FinancialDataProcessor:
    """
    财务数据处理器
    主要职责：
    1. 获取股票基础信息
    2. 提取财务报表数据
    3. 计算当年预测利润
    """

    def __init__(self):
        """初始化处理器"""
        self.current_year = datetime.now().year
        self.current_quarter = (datetime.now().month - 1) // 3 + 1

    def get_stock_code(self, company_name: str) -> Optional[str]:
        """
        根据公司名称获取股票代码
        Args:
            company_name: 公司名称
        Returns:
            str or None: 股票代码，如果未找到则返回None
        """
        try:
            stock_info = ak.stock_info_a_code_name()
            print("\n股票代码查询:")
            print("-" * 50)
            matched = stock_info[stock_info['name'].str.contains(company_name)]
            if not matched.empty:
                code = matched.iloc[0]['code']
                print(f"找到股票: {company_name}, 代码: {code}")
                return code
            print(f"未找到股票: {company_name}")
            return None
        except Exception as e:
            print(f"获取股票代码时出错: {e}")
            return None

    def get_financial_data(self, company_name: str) -> Tuple[Optional[pd.DataFrame], Optional[str]]:
        """
        获取公司的财务数据（利润表）
        Args:
            company_name: 公司名称
        Returns:
            Tuple[DataFrame or None, str or None]: (财务数据, 错误信息)
        """
        try:
            stock_code = self.get_stock_code(company_name)
            if not stock_code:
                return None, "未找到公司"

            print(f"\n获取 {company_name}（{stock_code}）的财务数据...")
            financial_data = ak.stock_financial_report_sina(stock_code, symbol="利润表")
            
            if '报告日' in financial_data.columns:
                financial_data = financial_data.sort_values(by=['报告日'], ascending=False)
            
            return financial_data, None
        except Exception as e:
            return None, f"获取财务数据时出错: {e}"

    def calculate_yearly_profit(self, financial_data: pd.DataFrame) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
        """
        根据最新财报数据计算全年预测利润
        规则：前三季度数据 × 4/3
        
        Args:
            financial_data: 财务数据DataFrame
        Returns:
            Tuple[Dict or None, str or None]: (计算结果字典, 错误信息)
        """
        if financial_data is None or financial_data.empty:
            return None, "没有可用的财务数据"

        try:
            latest_data = financial_data.iloc[0]
            report_date = pd.to_datetime(latest_data['报告日'])
            current_quarter = (report_date.month - 1) // 3 + 1
            
            print("\n计算年度利润:")
            print("-" * 50)
            print(f"最新报告日期: {report_date}")
            print(f"当前季度: {current_quarter}")
            
            profit_col = '归属于母公司所有者的净利润'
            if profit_col not in financial_data.columns:
                profit_col = [col for col in financial_data.columns if '净利润' in col][0]
            
            # 获取累计净利润并转换为亿元
            cumulative_profit = float(latest_data[profit_col]) / 100000000
            print(f"当前累计净利润: {cumulative_profit:.2f}亿元")

            # 计算预测年度利润
            if current_quarter == 3:  # 第三季度报告
                yearly_profit = cumulative_profit * 4/3
                print(f"全年预测利润: {yearly_profit:.2f}亿元")
            else:
                yearly_profit = cumulative_profit
                print(f"全年利润: {yearly_profit:.2f}亿元")

            return {
                'yearly_profit': yearly_profit * 100000000,  # 转回元为单位
                'current_quarter': current_quarter,
            }, None

        except Exception as e:
            import traceback
            print("错误详情:", traceback.format_exc())
            return None, f"计算年度利润时出错: {e}"

    def get_complete_analysis(self, company_name: str) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
        """
        获取完整的财务分析结果
        Args:
            company_name: 公司名称
        Returns:
            Tuple[Dict or None, str or None]: (分析结果字典, 错误信息)
        """
        financial_data, error = self.get_financial_data(company_name)
        if error:
            return None, error

        return self.calculate_yearly_profit(financial_data)
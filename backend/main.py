from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from financial_processor import FinancialDataProcessor
from valuation_model import ValuationModel

app = FastAPI(title="Company Valuation API")
# 更新 CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "https://guibugui.cn",
        "https://www.guibugui.cn",
        "http://47.109.207.199",
        "https://47.109.207.199"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
    expose_headers=["Content-Type"]
)

class ValuationRequest(BaseModel):
    company_name: str
    years: int
    growth_rate: float
    discount_rate: float

financial_processor = FinancialDataProcessor()
valuation_model = ValuationModel(financial_processor)

@app.post("/api/calculate-valuation")
async def calculate_valuation(request: ValuationRequest):
    try:
        print(f"Received request: {request}")
        result, error = valuation_model.calculate_valuation(
            request.company_name,
            request.years,
            request.growth_rate,
            request.discount_rate
        )
        
        if error:
            print(f"Error in calculation: {error}")
            raise HTTPException(status_code=400, detail=error)
        
        print(f"Calculation result: {result}")
        return result  # 直接返回结果，FastAPI 会自动处理 CORS
    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    import logging
    # 配置参数
    CERT_PATH = "/etc/letsencrypt/live/guibugui.cn/fullchain.pem"  # SSL 证书路径
    KEY_PATH = "/etc/letsencrypt/live/guibugui.cn/privkey.pem"     # 私钥路径
    ALLOWED_HOSTS = ["guibugui.cn", "localhost", "127.0.0.1"]
    ALLOWED_ORIGINS = [
        "https://guibugui.cn",
        "https://www.guibugui.cn",
        "http://localhost:3000",
        "http://localhost:3000"
    ]
    
    # 配置日志
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("uvicorn")
    
    # 启动服务器
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000,
        log_level="debug"
    )
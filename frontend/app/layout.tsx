import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const isProduction = process.env.NODE_ENV === 'production'

export const metadata: Metadata = {
  title: "好公司也要好价格 - 公司估值计算器",
  description: "专业的公司估值工具，帮助投资者快速评估企业价值，让投资决策更有依据。支持贵州茅台、宁德时代、比亚迪、美的集团等A股上市公司估值分析，覆盖消费、科技、医药、金融等各大行业龙头企业",
  keywords: `
    公司估值,企业价值评估,DCF估值,估值计算器,投资决策,
    
    白酒消费:贵州茅台,五粮液,泸州老窖,洋河股份,山西汾酒,古井贡酒,今世缘,口子窖,
    
    新能源:宁德时代,比亚迪,隆基绿能,阳光电源,亿纬锂能,天合光能,晶澳科技,福莱特,
    
    金融证券:招商银行,中国平安,兴业银行,东方财富,中信证券,海通证券,华泰证券,国泰君安,
    
    医药生物:恒瑞医药,药明康德,迈瑞医疗,云南白药,爱尔眼科,通策医疗,复星医药,长春高新,
    
    家电科技:美的集团,格力电器,海康威视,立讯精密,闻泰科技,京东方A,TCL科技,长江电力,
    
    消费零售:中国中免,永辉超市,苏宁易购,青岛啤酒,伊利股份,海天味业,三只松鼠,良品铺子,
    
    工业制造:三一重工,中国中车,潍柴动力,株冶集团,中联重科,徐工机械,杭叉集团,
    
    地产建筑:万科A,保利发展,中国建筑,中国电建,中国中铁,金地集团,华夏幸福,
    
    军工航天:中国电科,中航沈飞,中航西飞,中国卫星,航发动力,中直股份,
    
    新材料:巨化股份,万华化学,龙蟒佰利,盐湖股份,华峰化学,鞍钢股份,
    
    农林牧渔:牧原股份,新希望,温氏股份,正邦科技,傲农生物,天康生物,
    
    半导体:韦尔股份,北方华创,中微公司,晶晨股份,兆易创新,卓胜微,
    
    通信设备:中兴通讯,烽火通信,光迅科技,剑桥科技,共进股份,
    
    基础化工:万华化学,恒力石化,荣盛石化,延长化建,华鲁恒升
  `.replace(/\s+/g, ''),  // 移除所有空白字符
  authors: [{ name: "二流混子" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "好公司也要好价格 - 公司估值计算器",
    description: "专业的公司估值工具，帮助投资者快速评估企业价值",
    type: "website",
    locale: "zh_CN",
    url: "https://guibugui.cn",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "好公司也要好价格 - 公司估值计算器",
  "description": "专业的公司估值工具，帮助投资者快速评估企业价值",
  "url": "https://guibugui.cn",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY"
  },
  "author": {
    "@type": "Person",
    "name": "二流混子"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <head>
        {isProduction && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=G-Q942NY6SH9`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-Q942NY6SH9');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

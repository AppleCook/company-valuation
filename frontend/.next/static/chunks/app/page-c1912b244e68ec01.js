(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{8144:(e,s,t)=>{Promise.resolve().then(t.bind(t,2837))},2837:(e,s,t)=>{"use strict";t.d(s,{default:()=>v});var a=t(5155),r=t(2115),l=t(3463),i=t(9795);function n(){for(var e=arguments.length,s=Array(e),t=0;t<e;t++)s[t]=arguments[t];return(0,i.QP)((0,l.$)(s))}let d=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:n("rounded-lg border bg-card text-card-foreground shadow-sm",t),...r})});d.displayName="Card";let o=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:n("flex flex-col space-y-1.5 p-6",t),...r})});o.displayName="CardHeader";let c=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("h3",{ref:s,className:n("text-2xl font-semibold leading-none tracking-tight",t),...r})});c.displayName="CardTitle";let m=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:n("p-6 pt-0",t),...r})});m.displayName="CardContent";let u=r.forwardRef((e,s)=>{let{className:t,type:r,...l}=e;return(0,a.jsx)("input",{type:r,className:n("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",t),ref:s,...l})});u.displayName="Input";let x=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("button",{ref:s,className:n("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",t),...r})});x.displayName="Button";let f=r.forwardRef((e,s)=>{let{className:t,variant:r="default",...l}=e;return(0,a.jsx)("div",{ref:s,role:"alert",className:n("relative w-full rounded-lg border p-4",{"bg-background text-foreground":"default"===r,"border-destructive bg-destructive/15 text-destructive":"destructive"===r},t),...l})});f.displayName="Alert";let g=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("h5",{ref:s,className:n("mb-1 font-medium leading-none tracking-tight",t),...r})});g.displayName="AlertTitle";let p=r.forwardRef((e,s)=>{let{className:t,...r}=e;return(0,a.jsx)("div",{ref:s,className:n("text-sm [&_p]:leading-relaxed",t),...r})});async function h(e){try{console.log("Sending request:",e);let s=await fetch("".concat("//guibugui.cn","/api/calculate-valuation"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},mode:"cors",credentials:"omit",body:JSON.stringify(e)});if(console.log("Response status:",s.status),!s.ok){let e=await s.text();console.error("Error response:",e);try{let s=JSON.parse(e);throw Error(s.detail||"计算估值时发生错误")}catch(s){throw Error(e||"计算估值时发生错误")}}let t=await s.json();return console.log("Received response:",t),t}catch(e){throw console.error("API error:",e),e}}p.displayName="AlertDescription";let v=()=>{let[e,s]=(0,r.useState)({companyName:"",years:"10",growthRate:"15",discountRate:"3"}),[t,l]=(0,r.useState)(null),[i,n]=(0,r.useState)(!1),[v,y]=(0,r.useState)(null),N=async s=>{s.preventDefault(),n(!0),y(null);try{let s=await h({company_name:e.companyName,years:parseInt(e.years),growth_rate:parseFloat(e.growthRate),discount_rate:parseFloat(e.discountRate)});l(s)}catch(e){y(e instanceof Error?e.message:"计算估值时发生错误")}finally{n(!1)}},b=e=>e>=1e4?"".concat((e/1e8).toFixed(2),"亿"):"".concat(e.toFixed(2),"亿"),j=(e,t)=>{let a=e.target.value;"companyName"!==t?""!==a&&isNaN(Number(a))||s(e=>({...e,[t]:a})):s(e=>({...e,[t]:a}))};return(0,a.jsxs)(d,{className:"w-full max-w-2xl mx-auto",children:[(0,a.jsx)(o,{children:(0,a.jsx)(c,{children:"公司估值计算器"})}),(0,a.jsxs)(m,{children:[(0,a.jsxs)("form",{onSubmit:N,className:"space-y-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("label",{className:"text-sm font-medium",children:"公司名称"}),(0,a.jsx)(u,{type:"text",value:e.companyName,onChange:e=>j(e,"companyName"),placeholder:"请输入公司名称（如：贵州茅台）",required:!0})]}),(0,a.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("label",{className:"text-sm font-medium",children:"预测年数"}),(0,a.jsx)(u,{type:"text",value:e.years,onChange:e=>j(e,"years"),placeholder:"10",required:!0})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("label",{className:"text-sm font-medium",children:"增长率(%)"}),(0,a.jsx)(u,{type:"text",value:e.growthRate,onChange:e=>j(e,"growthRate"),placeholder:"15",required:!0})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("label",{className:"text-sm font-medium",children:"折现率(%)"}),(0,a.jsx)(u,{type:"text",value:e.discountRate,onChange:e=>j(e,"discountRate"),placeholder:"3",required:!0})]})]}),(0,a.jsx)(x,{type:"submit",className:"w-full",disabled:i,children:i?"计算中...":"计算估值"})]}),v&&(0,a.jsxs)(f,{variant:"destructive",className:"mt-4",children:[(0,a.jsx)(g,{children:"错误"}),(0,a.jsx)(p,{children:v})]}),t&&(0,a.jsxs)("div",{className:"mt-6 space-y-4",children:[(0,a.jsx)("h3",{className:"text-lg font-semibold",children:"估值结果"}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,a.jsxs)("div",{className:"p-4 bg-gray-50 rounded-lg",children:[(0,a.jsx)("div",{className:"text-sm text-gray-600",children:"当前净利润"}),(0,a.jsx)("div",{className:"text-lg font-semibold",children:b(t.net_profit)})]}),(0,a.jsxs)("div",{className:"p-4 bg-gray-50 rounded-lg",children:[(0,a.jsx)("div",{className:"text-sm text-gray-600",children:"当前市值"}),(0,a.jsx)("div",{className:"text-lg font-semibold",children:b(t.market_cap)})]}),(0,a.jsxs)("div",{className:"p-4 bg-gray-50 rounded-lg",children:[(0,a.jsxs)("div",{className:"text-sm text-gray-600",children:[t.years,"年后估值"]}),(0,a.jsx)("div",{className:"text-lg font-semibold",children:b(t.future_value)})]}),(0,a.jsxs)("div",{className:"p-4 bg-gray-50 rounded-lg",children:[(0,a.jsx)("div",{className:"text-sm text-gray-600",children:"折现后总值"}),(0,a.jsx)("div",{className:"text-lg font-semibold",children:b(t.present_value)})]})]}),(0,a.jsxs)(f,{className:t.valuation_level<1?"bg-red-50":"bg-green-50",children:[(0,a.jsxs)(g,{children:["估值水平: ",t.valuation_level.toFixed(2)]}),(0,a.jsx)(p,{children:t.valuation_level<1?"当前股价可能偏高，建议谨慎投资。":"当前股价可能存在上涨空间。"})]})]})]})]})}}},e=>{var s=s=>e(e.s=s);e.O(0,[181,441,517,358],()=>s(8144)),_N_E=e.O()}]);
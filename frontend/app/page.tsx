import ValuationCalculator from '@/components/valuation-calculator'

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">好公司也要好价格</h1>
      <ValuationCalculator />
    </main>
  )
}
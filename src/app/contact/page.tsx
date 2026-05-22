import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: '联系我们 | 德诺商务 - ITIN代办咨询',
  description: '免费咨询ITIN代办服务，填写信息收集表或直接联系我们。微信、Telegram、Email多种联系方式。',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-700 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">联系我们</h1>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            填写信息收集表开始办理，或直接联系我们免费咨询
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form - takes 2 columns */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📝 信息收集表</h2>
              <ContactForm />
            </div>

            {/* Contact info sidebar */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">💬 直接联系</h2>
              
              <a href="https://t.me/denuo_service" target="_blank" rel="noopener" className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <span className="text-2xl">📱</span>
                <div>
                  <div className="font-semibold group-hover:text-primary-500 transition-colors">Telegram</div>
                  <div className="text-sm text-muted">@denuo_service</div>
                </div>
              </a>

              <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-semibold">微信</div>
                  <div className="text-sm text-muted">扫码添加或搜索</div>
                  <div className="text-primary-500 font-medium text-sm">待添加</div>
                </div>
              </div>

              <a href="mailto:contact@denuo.site" className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-semibold group-hover:text-primary-500 transition-colors">Email</div>
                  <div className="text-sm text-muted">contact@denuo.site</div>
                </div>
              </a>

              <a href="https://x.com/denuo_service" target="_blank" rel="noopener" className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <span className="text-2xl">🐦</span>
                <div>
                  <div className="font-semibold group-hover:text-primary-500 transition-colors">X (Twitter)</div>
                  <div className="text-sm text-muted">@denuo_service</div>
                </div>
              </a>

              <div className="bg-accent-50 rounded-xl p-4 border border-accent-200 mt-6">
                <h3 className="font-semibold mb-2">⏰ 服务时间</h3>
                <p className="text-sm text-muted">
                  周一至周日 9:00 - 21:00
                  <br />
                  <span className="text-xs">（北京时间）</span>
                </p>
                <p className="text-sm text-muted mt-2">
                  通常24小时内回复
                  <br />
                  紧急问题请通过 Telegram 联系
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

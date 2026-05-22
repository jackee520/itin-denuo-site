import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '德诺商务服务 | ITIN代办 · 美国税号 · 专业中文服务',
  description: '专业ITIN个人纳税识别号代办服务，为华人提供美国税号申请、税务咨询、推荐奖励等一站式服务。快速、安全、值得信赖。',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-500 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              <span className="text-sm text-primary-100">专业 · 快速 · 可信赖</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              美国ITIN税号
              <br />
              <span className="text-accent-400">一站式代办服务</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-200 mb-8 leading-relaxed max-w-2xl mx-auto">
              无需赴美，全程中文服务。专业团队为您办理美国个人纳税识别号（ITIN），
              助您合规处理美国税务、开设银行账户、申请信用卡。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact/"
                className="w-full sm:w-auto px-8 py-3.5 bg-accent-400 text-white font-semibold rounded-xl hover:bg-accent-500 transition-all hover:shadow-lg hover:shadow-accent-400/25"
              >
                免费咨询 →
              </Link>
              <Link
                href="/itin/"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                了解ITIN服务
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary-500">100%</div>
              <div className="text-sm text-muted mt-1">成功率</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary-500">4-8周</div>
              <div className="text-sm text-muted mt-1">办理周期</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary-500">全程</div>
              <div className="text-sm text-muted mt-1">中文服务</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-primary-500">安全</div>
              <div className="text-sm text-muted mt-1">信息加密</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">我们的服务</h2>
            <p className="text-muted max-w-2xl mx-auto">专注于为华人提供专业、可靠的美国税务服务</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* ITIN Service */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🇺🇸</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">ITIN代办</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                专业办理美国个人纳税识别号（ITIN），无需赴美，全程中文指导，4-8周完成。
              </p>
              <Link href="/itin/" className="text-primary-500 font-medium text-sm hover:text-primary-600 transition-colors">
                了解更多 →
              </Link>
            </div>

            {/* Referral */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">邀请奖励</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                推荐朋友办理ITIN，成功后双方均可获得现金奖励。分享越多，奖励越多。
              </p>
              <Link href="/referral/" className="text-accent-500 font-medium text-sm hover:text-accent-600 transition-colors">
                查看奖励规则 →
              </Link>
            </div>

            {/* Expandable */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">更多服务</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                美国银行开户指导、信用卡申请咨询、税务规划建议等增值服务持续上线中。
              </p>
              <Link href="/contact/" className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors">
                咨询详情 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
            <p className="text-muted max-w-2xl mx-auto">专业、高效、透明，让您的ITIN办理无忧</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: '专业团队', desc: '多年美国税务服务经验，熟悉IRS流程和要求' },
              { icon: '⚡', title: '快速办理', desc: '4-8周完成申请，比自行办理节省大量时间' },
              { icon: '💬', title: '中文服务', desc: '全程中文沟通，无需担心语言障碍' },
              { icon: '🔒', title: '安全可靠', desc: '严格信息保密，正规渠道申请，100%合规' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">办理流程</h2>
            <p className="text-muted max-w-2xl mx-auto">简单四步，轻松获得ITIN</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '咨询评估', desc: '免费咨询，评估您的情况和需求' },
              { step: '02', title: '准备材料', desc: '指导您准备所需申请材料' },
              { step: '03', title: '提交申请', desc: '专业团队代为提交IRS申请' },
              { step: '04', title: '获得ITIN', desc: '4-8周后收到ITIN号码' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-12 h-12 bg-accent-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-gray-200" />
                )}
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">准备好办理ITIN了吗？</h2>
          <p className="text-primary-200 mb-8 text-lg">
            免费咨询，无隐形费用。专业团队为您保驾护航。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact/"
              className="w-full sm:w-auto px-8 py-3.5 bg-accent-400 text-white font-semibold rounded-xl hover:bg-accent-500 transition-all hover:shadow-lg"
            >
              立即咨询
            </Link>
            <Link
              href="/referral/"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              推荐朋友赚奖励
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

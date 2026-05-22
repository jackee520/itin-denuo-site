import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ITIN代办服务 | 美国个人纳税识别号申请 - 德诺商务',
  description: '专业ITIN个人纳税识别号代办，无需赴美，全程中文服务，4-8周完成。适合开美国银行账户、申请信用卡、报税等场景。',
}

export default function ITINPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-700 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">ITIN代办服务</h1>
          <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto">
            专业办理美国个人纳税识别号（Individual Taxpayer Identification Number），
            无需亲自赴美，全程中文服务。
          </p>
        </div>
      </section>

      {/* What is ITIN */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">什么是ITIN？</h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <p className="text-muted leading-relaxed mb-4">
              ITIN（Individual Taxpayer Identification Number）是美国国税局（IRS）发放的个人纳税识别号码，
              专门为没有资格获得社会安全号码（SSN）但需要向美国报税的个人设立。
            </p>
            <p className="text-muted leading-relaxed">
              ITIN是一个9位数号码，格式与SSN相同（XXX-XX-XXXX），以数字9开头。
              它不授予在美国合法工作的权利，也不影响移民身份，仅用于税务申报目的。
            </p>
          </div>
        </div>
      </section>

      {/* Who needs it */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">谁需要ITIN？</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🏦', title: '开设美国银行账户', desc: '许多美国银行要求提供ITIN或SSN才能开户' },
              { icon: '💳', title: '申请美国信用卡', desc: '建立美国信用记录，申请信用卡必备' },
              { icon: '📊', title: '美国税务申报', desc: '非居民或无SSN人士向IRS报税需要ITIN' },
              { icon: '🏠', title: '投资美国房产', desc: '出租或出售美国房产时需要税务身份' },
              { icon: '💼', title: '接收美国收入', desc: '从美国公司或平台获取收入需要税务身份' },
              { icon: '🎓', title: '其他场景', desc: '保险理赔、遗产继承等需要税务身份的场合' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-surface transition-colors">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">办理流程</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: '免费咨询', desc: '联系我们，了解您的具体情况和需求，确认是否需要ITIN。' },
              { step: '2', title: '材料准备', desc: '根据指导准备护照复印件等必要材料，我们提供详细的材料清单。' },
              { step: '3', title: '表格填写', desc: '我们协助您填写W-7申请表格，确保信息准确无误。' },
              { step: '4', title: '提交申请', desc: '将申请材料提交至IRS，或通过授权代理人（CAA）代办。' },
              { step: '5', title: '等待审批', desc: 'IRS处理时间通常为4-8周，期间我们会跟踪进度。' },
              { step: '6', title: '获得ITIN', desc: '收到ITIN通知信，您的ITIN号码正式生效。' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-accent-400 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required documents */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">所需材料</h2>
          <div className="bg-surface rounded-2xl p-6 md:p-8">
            <ul className="space-y-4">
              {[
                '有效护照原件或经认证的复印件',
                'W-7 申请表格（我们协助填写）',
                '美国联邦税表（1040/1040-NR）',
                '证明非居民身份的相关文件',
                '如适用：美国收入证明文件',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-accent-400 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted text-sm">
              * 具体材料清单可能因个人情况不同而有所差异，咨询后我们会提供专属材料清单。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-500 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">准备好办理ITIN了吗？</h2>
          <p className="text-primary-200 mb-6">免费咨询，无隐形费用，专业团队全程服务</p>
          <Link
            href="/contact/"
            className="inline-block px-8 py-3.5 bg-accent-400 text-white font-semibold rounded-xl hover:bg-accent-500 transition-all"
          >
            立即咨询 →
          </Link>
        </div>
      </section>
    </>
  )
}

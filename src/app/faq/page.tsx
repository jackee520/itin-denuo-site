'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

const faqs = [
  {
    category: 'ITIN基础',
    items: [
      {
        q: '什么是ITIN？',
        a: 'ITIN（Individual Taxpayer Identification Number）是美国国税局（IRS）发放的个人纳税识别号码，专门为没有资格获得社会安全号码（SSN）但需要向美国报税的个人设立。它是一个9位数号码，格式为XXX-XX-XXXX，以数字9开头。',
      },
      {
        q: 'ITIN和SSN有什么区别？',
        a: 'SSN（社会安全号码）是给美国公民、永久居民和有工作许可的人的。ITIN是给需要报税但没有资格获得SSN的人。ITIN不授权在美国工作，也不影响移民身份，仅用于税务目的。',
      },
      {
        q: '谁需要申请ITIN？',
        a: '需要向美国报税但没有SSN的非居民外国人、美国公民的非居民配偶/家属、在美国有收入的非居民等都需要ITIN。常见场景包括：开设美国银行账户、申请信用卡、投资美国房产、从美国平台获取收入等。',
      },
      {
        q: 'ITIN有有效期吗？',
        a: '是的，ITIN有过期机制。如果ITIN在最近三个纳税年度中的任何一个没有用于报税，该ITIN将在该年度12月31日到期。此外，特定数字段的ITIN也有固定到期日。过期后需要更新（Renewal）。',
      },
    ],
  },
  {
    category: '办理相关',
    items: [
      {
        q: '办理ITIN需要多长时间？',
        a: 'IRS处理ITIN申请通常需要4-8周。旺季（1月-4月）可能需要更长时间。通过CAA（认证验收代理人）代办可以加快流程，因为无需邮寄护照原件。',
      },
      {
        q: '需要亲自去美国吗？',
        a: '不需要。通过我们的CAA（认证验收代理人）服务，您无需亲自赴美。我们会协助您准备所有材料，并通过正规渠道提交申请。',
      },
      {
        q: '办理费用是多少？',
        a: '我们的服务费用根据办理方式不同而有所差异。基础代办服务费用请咨询我们获取最新报价。无隐形费用，价格透明。',
      },
      {
        q: '需要提供护照原件吗？',
        a: '通过CAA代办方式，通常只需提供护照的经认证复印件，无需邮寄护照原件。这大大降低了风险和不便。',
      },
      {
        q: '申请被拒绝怎么办？',
        a: 'ITIN申请被拒绝的常见原因包括：材料不完整、信息不一致、无法验证身份等。我们会仔细审核您的材料，最大程度避免被拒。如遇特殊情况，我们会协助您补充材料重新申请。',
      },
    ],
  },
  {
    category: '费用与安全',
    items: [
      {
        q: '服务费用包含哪些？',
        a: '服务费用包含：咨询评估、材料审核、W-7表格填写指导、申请提交、进度跟踪、ITIN通知转达等全流程服务。不含IRS可能收取的其他费用。',
      },
      {
        q: '我的个人信息安全吗？',
        a: '绝对安全。我们严格遵守数据保护法规，所有个人信息加密存储，仅用于ITIN申请目的。申请完成后，我们会按规定妥善处理您的材料。',
      },
      {
        q: '付款方式有哪些？',
        a: '支持微信支付、支付宝、银行转账等多种方式。我们也可以根据您的需求提供其他支付选项。',
      },
    ],
  },
  {
    category: '邀请奖励',
    items: [
      {
        q: '如何参与邀请奖励计划？',
        a: '联系我们获取专属推荐码和推荐链接，将链接分享给需要办理ITIN的朋友。朋友通过您的链接提交咨询并成功办理后，双方均可获得奖励。',
      },
      {
        q: '推荐奖励是多少？',
        a: '推荐人每成功推荐一位客户可获得¥200现金奖励，被推荐人首次办理可享受¥100优惠。推荐人数无上限。',
      },
      {
        q: '奖励如何发放？',
        a: '推荐成功后，每月1日和15日统一结算，结算后3个工作日内通过微信、支付宝或银行转账发放。',
      },
      {
        q: '被推荐人需要使用推荐链接吗？',
        a: '是的，被推荐人需要通过您的推荐链接访问网站，或在提交表单时填写您的推荐码，系统才能记录推荐关系。',
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-700 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">常见问题</h1>
          <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto">
            关于ITIN办理和邀请奖励的常见问题解答
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {faqs.map((category, ci) => (
            <div key={ci} className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.items.map((item, ii) => {
                  const key = `${ci}-${ii}`
                  const isOpen = openItems[key]
                  return (
                    <div key={ii} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-surface transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.q}</span>
                        <svg
                          className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4">
                          <p className="text-muted leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-primary-500 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">还有其他问题？</h2>
          <p className="text-primary-200 mb-6">随时联系我们，我们将为您一一解答</p>
          <a
            href="/contact/"
            className="inline-block px-8 py-3.5 bg-accent-400 text-white font-semibold rounded-xl hover:bg-accent-500 transition-all"
          >
            联系我们 →
          </a>
        </div>
      </section>
    </>
  )
}

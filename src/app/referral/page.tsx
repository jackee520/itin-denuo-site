import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '邀请奖励计划 | 推荐朋友赚现金 - 德诺商务',
  description: '推荐朋友办理ITIN，成功后双方均可获得现金奖励。分享越多，奖励越多，无上限。',
}

export default function ReferralPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-accent-400 to-accent-600 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <span className="text-lg">🎁</span>
            <span className="text-sm">邀请好友 · 双方获益</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">邀请奖励计划</h1>
          <p className="text-lg md:text-xl text-accent-100 max-w-2xl mx-auto">
            推荐朋友办理ITIN，每成功推荐一位，您和朋友都将获得现金奖励。
            分享越多，赚得越多，无上限！
          </p>
        </div>
      </section>

      {/* Reward rules */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">奖励规则</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                👤
              </div>
              <h3 className="font-semibold text-lg mb-2">推荐人奖励</h3>
              <p className="text-3xl font-bold text-primary-500 mb-2">¥200</p>
              <p className="text-muted text-sm">每成功推荐一位客户</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                🎉
              </div>
              <h3 className="font-semibold text-lg mb-2">被推荐人优惠</h3>
              <p className="text-3xl font-bold text-primary-500 mb-2">¥100</p>
              <p className="text-muted text-sm">首次办理立减</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                ♾️
              </div>
              <h3 className="font-semibold text-lg mb-2">无上限</h3>
              <p className="text-3xl font-bold text-primary-500 mb-2">无限</p>
              <p className="text-muted text-sm">推荐人数不设上限</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">如何参与</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: '获取专属链接', desc: '联系我们获取您的专属邀请链接，链接中包含您的唯一推荐码。', icon: '🔗' },
              { step: '2', title: '分享给朋友', desc: '将链接通过微信、Telegram、短信等方式分享给需要办理ITIN的朋友。', icon: '📤' },
              { step: '3', title: '朋友通过链接咨询', desc: '朋友点击您的链接访问网站，提交咨询表单时系统自动记录推荐关系。', icon: '📝' },
              { step: '4', title: '朋友成功办理', desc: '朋友完成ITIN办理并支付服务费用后，推荐关系正式生效。', icon: '✅' },
              { step: '5', title: '双方获得奖励', desc: '推荐人获得¥200现金奖励，被推荐人享受¥100优惠。奖励通过微信/支付宝发放。', icon: '💰' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent-400 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                  </div>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example link */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">邀请链接示例</h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <p className="text-muted mb-4">您的专属邀请链接格式如下：</p>
            <div className="bg-surface rounded-xl p-4 font-mono text-sm break-all">
              <span className="text-muted">https://itin.denuo.site/?ref=</span>
              <span className="text-accent-500 font-semibold">您的推荐码</span>
            </div>
            <p className="text-muted mt-4 text-sm">
              * 推荐码在您联系我们后由我们分配，确保唯一性和可追踪性。
            </p>
            <p className="text-muted mt-2 text-sm">
              * 用户通过此链接访问网站后，推荐码会自动保存在浏览器中，提交表单时自动带上。
            </p>
          </div>
        </div>
      </section>

      {/* Settlement */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">奖励结算</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-2xl p-6">
              <h3 className="font-semibold mb-3">结算周期</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>每月1日和15日统一结算</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>被推荐人完成付款后开始计算</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>结算后3个工作日内发放</span>
                </li>
              </ul>
            </div>
            <div className="bg-surface rounded-2xl p-6">
              <h3 className="font-semibold mb-3">发放方式</h3>
              <ul className="space-y-2 text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>微信转账（推荐）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>支付宝转账</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-400 mt-1">•</span>
                  <span>银行转账（大额推荐）</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent-400 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">立即开始推荐</h2>
          <p className="text-accent-100 mb-6">联系我们获取专属推荐码，开始赚取奖励</p>
          <Link
            href="/contact/"
            className="inline-block px-8 py-3.5 bg-white text-accent-500 font-semibold rounded-xl hover:bg-gray-100 transition-all"
          >
            获取推荐码 →
          </Link>
        </div>
      </section>
    </>
  )
}

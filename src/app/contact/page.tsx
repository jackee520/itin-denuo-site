'use client'

import { useState, useEffect } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    wechat: '',
    telegram: '',
    email: '',
    service: '',
    hasRef: '',
    refCode: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const ref = localStorage.getItem('ref_code')
    if (ref) {
      setFormData(prev => ({ ...prev, refCode: ref, hasRef: '是' }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Google Forms submission URL - replace with actual form URL
    const GOOGLE_FORM_URL = 'YOUR_GOOGLE_FORM_URL'
    const formUrl = new URL(GOOGLE_FORM_URL)

    // Map form fields to Google Form entry IDs
    // These need to be replaced with actual entry IDs from your Google Form
    const entries: Record<string, string> = {
      'entry.1111111111': formData.name,
      'entry.2222222222': formData.wechat,
      'entry.3333333333': formData.telegram,
      'entry.4444444444': formData.email,
      'entry.5555555555': formData.service,
      'entry.6666666666': formData.hasRef,
      'entry.7777777777': formData.refCode,
      'entry.8888888888': formData.notes,
    }

    Object.entries(entries).forEach(([key, value]) => {
      formUrl.searchParams.append(key, value)
    })

    try {
      // Submit to Google Forms via hidden iframe
      const iframe = document.createElement('iframe')
      iframe.name = 'hidden_iframe'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)

      const form = document.createElement('form')
      form.action = GOOGLE_FORM_URL
      form.method = 'POST'
      form.target = 'hidden_iframe'

      Object.entries(entries).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = value
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()

      setTimeout(() => {
        document.body.removeChild(form)
        document.body.removeChild(iframe)
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 1000)
    } catch (error) {
      setIsSubmitting(false)
      alert('提交出错，请稍后重试或直接联系我们。')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-500 to-primary-700 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">联系我们</h1>
          <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto">
            免费咨询，专业解答。填写表单或直接联系，我们随时为您服务。
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">在线咨询</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    ✅
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">提交成功！</h3>
                  <p className="text-green-700 mb-4">
                    感谢您的咨询，我们会在24小时内与您联系。
                  </p>
                  <p className="text-green-600 text-sm">
                    您也可以直接通过下方联系方式联系我们，获取更快回复。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="您的姓名"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">微信号</label>
                      <input
                        type="text"
                        value={formData.wechat}
                        onChange={(e) => setFormData(prev => ({ ...prev, wechat: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="您的微信号"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telegram</label>
                      <input
                        type="text"
                        value={formData.telegram}
                        onChange={(e) => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">想办理的服务 *</label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">请选择服务</option>
                      <option value="ITIN代办">ITIN代办</option>
                      <option value="ITIN更新">ITIN更新</option>
                      <option value="邀请奖励咨询">邀请奖励咨询</option>
                      <option value="其他服务">其他服务</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">是否有推荐人</label>
                    <select
                      value={formData.hasRef}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasRef: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">请选择</option>
                      <option value="是">是</option>
                      <option value="否">否</option>
                    </select>
                  </div>

                  {formData.hasRef === '是' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">推荐码</label>
                      <input
                        type="text"
                        value={formData.refCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, refCode: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="请输入推荐码"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                      placeholder="请描述您的具体需求或问题..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3.5 bg-accent-400 text-white font-semibold rounded-xl hover:bg-accent-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '提交中...' : '提交咨询'}
                  </button>

                  <p className="text-muted text-xs text-center">
                    提交即表示您同意我们收集您的信息用于咨询服务。您的信息将被严格保密。
                  </p>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">直接联系</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💬</span>
                    <h3 className="font-semibold">微信</h3>
                  </div>
                  <p className="text-muted">扫码添加或搜索微信号</p>
                  <p className="text-primary-500 font-medium mt-1">待添加</p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📱</span>
                    <h3 className="font-semibold">Telegram</h3>
                  </div>
                  <p className="text-muted">点击链接直接对话</p>
                  <a href="https://t.me/denuo_service" className="text-primary-500 font-medium mt-1 block hover:underline">
                    @denuo_service
                  </a>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📧</span>
                    <h3 className="font-semibold">Email</h3>
                  </div>
                  <p className="text-muted">发送邮件咨询</p>
                  <a href="mailto:contact@denuo.site" className="text-primary-500 font-medium mt-1 block hover:underline">
                    contact@denuo.site
                  </a>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🐦</span>
                    <h3 className="font-semibold">X (Twitter)</h3>
                  </div>
                  <p className="text-muted">关注最新动态</p>
                  <a href="https://x.com/denuo_service" className="text-primary-500 font-medium mt-1 block hover:underline">
                    @denuo_service
                  </a>
                </div>
              </div>

              <div className="mt-6 bg-accent-50 rounded-xl p-5 border border-accent-200">
                <h3 className="font-semibold mb-2">⏰ 服务时间</h3>
                <p className="text-muted text-sm">
                  周一至周日 9:00 - 21:00（北京时间）
                  <br />
                  通常24小时内回复，紧急问题请通过Telegram联系。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

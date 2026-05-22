'use client'

import { useState, useEffect } from 'react'

type FormData = {
  // 基本信息
  name: string
  gender: string
  birthday: string
  phone: string
  email: string
  country: string
  liveCountry: string
  birthProvince: string
  
  // 证件信息
  idNumber: string
  idIssuer: string
  idValidFrom: string
  idValidTo: string
  idAddress: string
  zipCode: string
  province: string
  city: string
  district: string
  detailedAddress: string
  ethnicity: string
  
  // 驾驶证
  driverLicenseFrom: string
  driverLicenseTo: string
  
  // 签证信息
  visaType: string
  visaNumber: string
  visaValidFrom: string
  visaValidTo: string
  
  // 护照信息
  passportNationality: string
  passportNumber: string
  passportExpiry: string
  
  // 其他
  consultant: string
  orderNumber: string
  appliedBefore: string
  itinPurpose: string[]
  hasBrokerAccount: string
  hasUSProperty: string
  hasUSBank: string
  hasUSCompany: string
  studyInUS: string
  hasUSAddress: string
  mailingAddress: string
  lastEntryUS: string
  refCode: string
  notes: string
}

const initialData: FormData = {
  name: '', gender: '', birthday: '', phone: '', email: '', country: '中国',
  liveCountry: '', birthProvince: '', idNumber: '', idIssuer: '', idValidFrom: '',
  idValidTo: '', idAddress: '', zipCode: '', province: '', city: '', district: '',
  detailedAddress: '', ethnicity: '', driverLicenseFrom: '', driverLicenseTo: '',
  visaType: '', visaNumber: '', visaValidFrom: '', visaValidTo: '',
  passportNationality: '', passportNumber: '', passportExpiry: '',
  consultant: '', orderNumber: '', appliedBefore: '', itinPurpose: [],
  hasBrokerAccount: '', hasUSProperty: '', hasUSBank: '', hasUSCompany: '',
  studyInUS: '', hasUSAddress: '', mailingAddress: '', lastEntryUS: '',
  refCode: '', notes: '',
}

const tabs = [
  { id: 'basic', label: '基本信息', icon: '👤' },
  { id: 'id', label: '证件信息', icon: '🪪' },
  { id: 'visa', label: '签证信息', icon: '✈️' },
  { id: 'passport', label: '护照信息', icon: '📕' },
  { id: 'other', label: '其他信息', icon: '📋' },
]

const purposeOptions = ['个人报税', '夫妻联合报税', '申请美卡', '跨境电商', '其他']

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState<FormData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [files, setFiles] = useState<Record<string, File | null>>({
    idFront: null, idBack: null, driverLicense: null,
    visaPhoto: null, passport: null, otherDocs: null,
  })

  useEffect(() => {
    const ref = localStorage.getItem('ref_code')
    if (ref) setFormData(prev => ({ ...prev, refCode: ref }))
  }, [])

  const update = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const togglePurpose = (p: string) => {
    setFormData(prev => ({
      ...prev,
      itinPurpose: prev.itinPurpose.includes(p)
        ? prev.itinPurpose.filter(x => x !== p)
        : [...prev.itinPurpose, p]
    }))
  }

  const handleFileChange = (field: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(r => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const tabIdx = tabs.findIndex(t => t.id === activeTab)

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">提交成功！</h3>
        <p className="text-green-700 mb-4">感谢您的信息，我们会在24小时内与您联系。</p>
        <p className="text-green-600 text-sm mb-6">您也可以直接通过下方联系方式联系我们，获取更快回复。</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://t.me/denuo_service" className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors text-sm font-medium">Telegram 咨询</a>
          <a href="mailto:contact@denuo.site" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">发送邮件</a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[400px]">
        {/* 基本信息 */}
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">👤 基本信息</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="姓名 *" value={formData.name} onChange={v => update('name', v)} placeholder="请输入姓名" />
              <div>
                <Label>性别 *</Label>
                <select value={formData.gender} onChange={e => update('gender', e.target.value)} className="input">
                  <option value="">请选择</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <Field label="出生日期 *" type="date" value={formData.birthday} onChange={v => update('birthday', v)} />
              <Field label="民族" value={formData.ethnicity} onChange={v => update('ethnicity', v)} placeholder="民族" />
              <Field label="电话号码 *" type="tel" value={formData.phone} onChange={v => update('phone', v)} placeholder="请填写手机号码" />
              <Field label="Email *" type="email" value={formData.email} onChange={v => update('email', v)} placeholder="请填写邮箱地址" />
              <Field label="国家 *" value={formData.country} onChange={v => update('country', v)} placeholder="中国" />
              <Field label="现居国家 *" value={formData.liveCountry} onChange={v => update('liveCountry', v)} placeholder="请填写" />
              <Field label="出生省份 *" value={formData.birthProvince} onChange={v => update('birthProvince', v)} placeholder="请填写" />
            </div>
          </div>
        )}

        {/* 证件信息 */}
        {activeTab === 'id' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">🪪 证件信息</h3>
            <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">⚠️ 身份证和驾驶证至少上传一样！</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FileField label="身份证正面" onChange={f => handleFileChange('idFront', f)} />
              <FileField label="身份证背面" onChange={f => handleFileChange('idBack', f)} />
              <FileField label="驾驶证" onChange={f => handleFileChange('driverLicense', f)} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="姓名 *" value={formData.name} onChange={v => update('name', v)} placeholder="姓名" disabled />
              <Field label="身份证号码" value={formData.idNumber} onChange={v => update('idNumber', v)} placeholder="请填写身份证号码" />
              <Field label="签发机关" value={formData.idIssuer} onChange={v => update('idIssuer', v)} placeholder="签发机关" />
              <Field label="出生日期 *" type="date" value={formData.birthday} onChange={v => update('birthday', v)} disabled />
              <Field label="证件住址 *" value={formData.idAddress} onChange={v => update('idAddress', v)} placeholder="住址" />
              <Field label="邮编 *" value={formData.zipCode} onChange={v => update('zipCode', v)} placeholder="请填写邮编" />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Field label="省" value={formData.province} onChange={v => update('province', v)} placeholder="省" />
              <Field label="市" value={formData.city} onChange={v => update('city', v)} placeholder="市" />
              <Field label="区" value={formData.district} onChange={v => update('district', v)} placeholder="区" />
              <Field label="详细地址" value={formData.detailedAddress} onChange={v => update('detailedAddress', v)} placeholder="详细地址" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="身份证有效期起" type="date" value={formData.idValidFrom} onChange={v => update('idValidFrom', v)} />
              <Field label="身份证有效期止" type="date" value={formData.idValidTo} onChange={v => update('idValidTo', v)} />
              <Field label="驾驶证有效期起" type="date" value={formData.driverLicenseFrom} onChange={v => update('driverLicenseFrom', v)} />
              <Field label="驾驶证有效期至" type="date" value={formData.driverLicenseTo} onChange={v => update('driverLicenseTo', v)} />
            </div>
          </div>
        )}

        {/* 签证信息 */}
        {activeTab === 'visa' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">✈️ 签证信息</h3>
            <FileField label="签证照片" onChange={f => handleFileChange('visaPhoto', f)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="签证类型" value={formData.visaType} onChange={v => update('visaType', v)} placeholder="请填写签证类型" />
              <Field label="签证号码" value={formData.visaNumber} onChange={v => update('visaNumber', v)} placeholder="请填写签证号码" />
              <Field label="签证有效期起" type="date" value={formData.visaValidFrom} onChange={v => update('visaValidFrom', v)} />
              <Field label="签证有效期止" type="date" value={formData.visaValidTo} onChange={v => update('visaValidTo', v)} />
            </div>
          </div>
        )}

        {/* 护照信息 */}
        {activeTab === 'passport' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">📕 护照信息</h3>
            <FileField label="护照 *" onChange={f => handleFileChange('passport', f)} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="国籍 *" value={formData.passportNationality} onChange={v => update('passportNationality', v)} placeholder="请填写国籍" />
              <Field label="护照号码" value={formData.passportNumber} onChange={v => update('passportNumber', v)} placeholder="护照的唯一编号" />
              <Field label="护照有效期止" type="date" value={formData.passportExpiry} onChange={v => update('passportExpiry', v)} />
            </div>
          </div>
        )}

        {/* 其他信息 */}
        {activeTab === 'other' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-lg mb-4">📋 其他信息</h3>
            
            <RadioGroup label="是否申请过税号 *" value={formData.appliedBefore} onChange={v => update('appliedBefore', v)} options={['是', '否']} />
            
            <div>
              <Label>申请ITIN的原因/用途 *</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {purposeOptions.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePurpose(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                      formData.itinPurpose.includes(p)
                        ? 'bg-primary-500 text-white border-primary-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RadioGroup label="有券商账户" value={formData.hasBrokerAccount} onChange={v => update('hasBrokerAccount', v)} options={['是', '否']} />
              <RadioGroup label="有美国的房产" value={formData.hasUSProperty} onChange={v => update('hasUSProperty', v)} options={['是', '否']} />
              <RadioGroup label="有美国银行" value={formData.hasUSBank} onChange={v => update('hasUSBank', v)} options={['是', '否']} />
              <RadioGroup label="有美国的公司" value={formData.hasUSCompany} onChange={v => update('hasUSCompany', v)} options={['是', '否']} />
              <RadioGroup label="在美国工作或学习" value={formData.studyInUS} onChange={v => update('studyInUS', v)} options={['是', '否']} />
              <RadioGroup label="是否有美国地址 *" value={formData.hasUSAddress} onChange={v => update('hasUSAddress', v)} options={['是', '否']} />
            </div>

            <Field label="Mailing Address 邮寄地址 *" value={formData.mailingAddress} onChange={v => update('mailingAddress', v)} placeholder="如果有美国地址填美国地址，无，请填国内邮寄地址" />
            <Field label="最近一次入境美国时间" type="date" value={formData.lastEntryUS} onChange={v => update('lastEntryUS', v)} />

            <FileField label="其他相关附件" onChange={f => handleFileChange('otherDocs', f)} />

            <Field label="推荐码" value={formData.refCode} onChange={v => update('refCode', v)} placeholder="如有推荐码请填写" />
            
            <div>
              <Label>备注</Label>
              <textarea
                value={formData.notes}
                onChange={e => update('notes', e.target.value)}
                rows={3}
                className="input resize-none"
                placeholder="其他需要补充的信息..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation & Submit */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={() => setActiveTab(tabs[Math.max(0, tabIdx - 1)].id)}
          disabled={tabIdx === 0}
          className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
        >
          ← 上一步
        </button>
        
        {tabIdx < tabs.length - 1 ? (
          <button
            type="button"
            onClick={() => setActiveTab(tabs[tabIdx + 1].id)}
            className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            下一步 →
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-accent-400 text-white rounded-xl hover:bg-accent-500 transition-colors disabled:opacity-50 text-sm font-semibold"
          >
            {isSubmitting ? '提交中...' : '提交信息'}
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        提交即表示您同意我们收集您的信息用于咨询服务。您的信息将被严格保密。
      </p>
    </form>
  )
}

// --- Helper components ---

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
}

function Field({ label, value, onChange, placeholder, type = 'text', disabled = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; disabled?: boolean
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm disabled:bg-gray-50 disabled:text-gray-400"
      />
    </div>
  )
}

function FileField({ label, onChange }: { label: string; onChange: (f: File | null) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all">
        <span className="text-gray-400">📎</span>
        <span className="text-sm text-gray-500">点击上传文件</span>
        <input type="file" className="hidden" onChange={e => onChange(e.target.files?.[0] || null)} />
      </label>
    </div>
  )
}

function RadioGroup({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-lg text-sm border transition-all ${
              value === opt
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

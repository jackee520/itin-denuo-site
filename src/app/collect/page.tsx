'use client'

import { useState, useEffect } from 'react'

type FormData = {
  name: string; gender: string; birthday: string; phone: string; email: string
  country: string; liveCountry: string; birthProvince: string
  idNumber: string; idIssuer: string; idValidFrom: string; idValidTo: string
  idAddress: string; zipCode: string; province: string; city: string
  district: string; detailedAddress: string; ethnicity: string
  driverLicenseFrom: string; driverLicenseTo: string
  visaType: string; visaNumber: string; visaValidFrom: string; visaValidTo: string
  passportNationality: string; passportNumber: string; passportExpiry: string
  consultant: string; orderNumber: string; appliedBefore: string
  itinPurpose: string[]; hasBrokerAccount: string; hasUSProperty: string
  hasUSBank: string; hasUSCompany: string; studyInUS: string
  hasUSAddress: string; mailingAddress: string; lastEntryUS: string
  refCode: string; notes: string
}

const empty: FormData = {
  name:'',gender:'',birthday:'',phone:'',email:'',country:'中国',
  liveCountry:'',birthProvince:'',idNumber:'',idIssuer:'',idValidFrom:'',
  idValidTo:'',idAddress:'',zipCode:'',province:'',city:'',district:'',
  detailedAddress:'',ethnicity:'',driverLicenseFrom:'',driverLicenseTo:'',
  visaType:'',visaNumber:'',visaValidFrom:'',visaValidTo:'',
  passportNationality:'',passportNumber:'',passportExpiry:'',
  consultant:'',orderNumber:'',appliedBefore:'',itinPurpose:[],
  hasBrokerAccount:'',hasUSProperty:'',hasUSBank:'',hasUSCompany:'',
  studyInUS:'',hasUSAddress:'',mailingAddress:'',lastEntryUS:'',
  refCode:'',notes:'',
}

const tabs = [
  { id:'basic',label:'基本信息',icon:'👤' },
  { id:'id',label:'证件信息',icon:'🪪' },
  { id:'visa',label:'签证信息',icon:'✈️' },
  { id:'passport',label:'护照信息',icon:'📕' },
  { id:'other',label:'其他信息',icon:'📋' },
]
const purposeOpts = ['个人报税','夫妻联合报税','申请美卡','跨境电商','其他']

// ⚠️ 替换为你的 Web3Forms Access Key
// 获取方式：打开 https://web3forms.com → 输入 jackeeyu520@gmail.com → 验证邮箱 → 复制 Access Key
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'

export default function CollectPage() {
  const [tab, setTab] = useState('basic')
  const [form, setForm] = useState<FormData>(empty)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref) {
      localStorage.setItem('ref_code', ref)
      setForm(p => ({ ...p, refCode: ref }))
    }
  }, [])

  const up = (k: keyof FormData, v: any) => setForm(p => ({ ...p, [k]: v }))
  const toggleP = (p: string) => setForm(prev => ({
    ...prev, itinPurpose: prev.itinPurpose.includes(p) ? prev.itinPurpose.filter(x=>x!==p) : [...prev.itinPurpose, p]
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = { ...form, submittedAt: new Date().toISOString() }

    // Send to Web3Forms → arrives in your email
    if (WEB3FORMS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `📝 新的信息收集 - ${form.name || '未填姓名'}`,
            from_name: '德诺商务 信息收集表',
            ...payload,
          }),
        })
      } catch {}
    }

    // Also save locally as backup
    const key = 'itin_submissions'
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push(payload)
    localStorage.setItem(key, JSON.stringify(existing))

    setSubmitting(false)
    setDone(true)
  }

  const i = tabs.findIndex(t=>t.id===tab)

  if (done) return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-sm border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">提交成功！</h2>
        <p className="text-muted mb-6">感谢您的配合，我们会尽快处理您的申请。</p>
        <p className="text-sm text-muted">如有疑问，请联系您的专属顾问。</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-primary-500 text-white py-6">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-500 font-bold text-sm">德</span>
            </div>
            <span className="font-semibold text-lg">德诺商务</span>
          </div>
          <h1 className="text-xl font-bold">📝 信息收集表</h1>
          <p className="text-primary-200 text-sm mt-1">请如实填写以下信息，用于办理 ITIN 申请</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
            {tabs.map(t => (
              <button key={t.id} type="button" onClick={()=>setTab(t.id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  tab===t.id ? 'bg-primary-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}>
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm min-h-[380px]">
            {tab==='basic' && <BasicSection form={form} up={up} />}
            {tab==='id' && <IdSection form={form} up={up} />}
            {tab==='visa' && <VisaSection form={form} up={up} />}
            {tab==='passport' && <PassportSection form={form} up={up} />}
            {tab==='other' && <OtherSection form={form} up={up} toggleP={toggleP} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-5">
            <button type="button" onClick={()=>setTab(tabs[Math.max(0,i-1)].id)} disabled={i===0}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-40 text-sm font-medium">
              ← 上一步
            </button>
            {i < tabs.length-1 ? (
              <button type="button" onClick={()=>setTab(tabs[i+1].id)}
                className="px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 text-sm font-medium">
                下一步 →
              </button>
            ) : (
              <button type="submit" disabled={submitting}
                className="px-6 py-2 bg-accent-400 text-white rounded-xl hover:bg-accent-500 disabled:opacity-50 text-sm font-semibold">
                {submitting ? '提交中...' : '提交信息'}
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            您的信息将被严格保密，仅用于 ITIN 申请服务。
          </p>
        </form>
      </div>
    </div>
  )
}

// --- Helper components ---

function L({children}:{children:React.ReactNode}) {
  return <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
}
function F({label,value,onChange,ph,type='text',disabled=false}:{
  label:string;value:string;onChange:(v:string)=>void;ph?:string;type?:string;disabled?:boolean
}) {
  return <div><L>{label}</L>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} disabled={disabled}
      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm disabled:bg-gray-50"/></div>
}
function R({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
  return <div><L>{label}</L>
    <div className="flex gap-2 mt-1">{options.map(o=>
      <button key={o} type="button" onClick={()=>onChange(o)}
        className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${value===o?'bg-primary-500 text-white border-primary-500':'bg-white text-gray-600 border-gray-200'}`}>{o}</button>
    )}</div></div>
}

function BasicSection({form,up}:{form:FormData;up:(k:keyof FormData,v:any)=>void}) {
  return <div className="space-y-4">
    <h3 className="font-semibold text-lg">👤 基本信息</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <F label="姓名 *" value={form.name} onChange={v=>up('name',v)} ph="请输入姓名"/>
      <div><L>性别 *</L>
        <select value={form.gender} onChange={e=>up('gender',e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm"><option value="">请选择</option><option>男</option><option>女</option></select></div>
      <F label="出生日期 *" type="date" value={form.birthday} onChange={v=>up('birthday',v)}/>
      <F label="民族" value={form.ethnicity} onChange={v=>up('ethnicity',v)} ph="民族"/>
      <F label="电话号码 *" type="tel" value={form.phone} onChange={v=>up('phone',v)} ph="手机号码"/>
      <F label="Email *" type="email" value={form.email} onChange={v=>up('email',v)} ph="邮箱地址"/>
      <F label="国家 *" value={form.country} onChange={v=>up('country',v)} ph="中国"/>
      <F label="现居国家 *" value={form.liveCountry} onChange={v=>up('liveCountry',v)} ph="请填写"/>
      <F label="出生省份 *" value={form.birthProvince} onChange={v=>up('birthProvince',v)} ph="请填写"/>
    </div>
  </div>
}

function IdSection({form,up}:{form:FormData;up:(k:keyof FormData,v:any)=>void}) {
  return <div className="space-y-4">
    <h3 className="font-semibold text-lg">🪪 证件信息</h3>
    <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">⚠️ 身份证和驾驶证至少填写一样</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <F label="身份证号码" value={form.idNumber} onChange={v=>up('idNumber',v)} ph="身份证号码"/>
      <F label="签发机关" value={form.idIssuer} onChange={v=>up('idIssuer',v)} ph="签发机关"/>
      <F label="姓名 *" value={form.name} onChange={v=>up('name',v)} ph="姓名" disabled/>
      <F label="出生日期 *" type="date" value={form.birthday} onChange={v=>up('birthday',v)} disabled/>
      <F label="证件住址 *" value={form.idAddress} onChange={v=>up('idAddress',v)} ph="住址"/>
      <F label="邮编 *" value={form.zipCode} onChange={v=>up('zipCode',v)} ph="邮编"/>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <F label="省" value={form.province} onChange={v=>up('province',v)} ph="省"/>
      <F label="市" value={form.city} onChange={v=>up('city',v)} ph="市"/>
      <F label="区" value={form.district} onChange={v=>up('district',v)} ph="区"/>
      <F label="详细地址" value={form.detailedAddress} onChange={v=>up('detailedAddress',v)} ph="详细地址"/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <F label="身份证有效期起" type="date" value={form.idValidFrom} onChange={v=>up('idValidFrom',v)}/>
      <F label="身份证有效期止" type="date" value={form.idValidTo} onChange={v=>up('idValidTo',v)}/>
      <F label="驾驶证有效期起" type="date" value={form.driverLicenseFrom} onChange={v=>up('driverLicenseFrom',v)}/>
      <F label="驾驶证有效期至" type="date" value={form.driverLicenseTo} onChange={v=>up('driverLicenseTo',v)}/>
    </div>
  </div>
}

function VisaSection({form,up}:{form:FormData;up:(k:keyof FormData,v:any)=>void}) {
  return <div className="space-y-4">
    <h3 className="font-semibold text-lg">✈️ 签证信息</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <F label="签证类型" value={form.visaType} onChange={v=>up('visaType',v)} ph="签证类型"/>
      <F label="签证号码" value={form.visaNumber} onChange={v=>up('visaNumber',v)} ph="签证号码"/>
      <F label="签证有效期起" type="date" value={form.visaValidFrom} onChange={v=>up('visaValidFrom',v)}/>
      <F label="签证有效期止" type="date" value={form.visaValidTo} onChange={v=>up('visaValidTo',v)}/>
    </div>
  </div>
}

function PassportSection({form,up}:{form:FormData;up:(k:keyof FormData,v:any)=>void}) {
  return <div className="space-y-4">
    <h3 className="font-semibold text-lg">📕 护照信息</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <F label="国籍 *" value={form.passportNationality} onChange={v=>up('passportNationality',v)} ph="国籍"/>
      <F label="护照号码" value={form.passportNumber} onChange={v=>up('passportNumber',v)} ph="护照号码"/>
      <F label="护照有效期止" type="date" value={form.passportExpiry} onChange={v=>up('passportExpiry',v)}/>
    </div>
  </div>
}

function OtherSection({form,up,toggleP}:{form:FormData;up:(k:keyof FormData,v:any)=>void;toggleP:(p:string)=>void}) {
  return <div className="space-y-5">
    <h3 className="font-semibold text-lg">📋 其他信息</h3>
    <R label="是否申请过税号 *" value={form.appliedBefore} onChange={v=>up('appliedBefore',v)} options={['是','否']}/>
    <div><L>申请ITIN的原因/用途 *</L>
      <div className="flex flex-wrap gap-2 mt-1">{purposeOpts.map(p=>
        <button key={p} type="button" onClick={()=>toggleP(p)}
          className={`px-3 py-1.5 rounded-lg text-sm border ${form.itinPurpose.includes(p)?'bg-primary-500 text-white border-primary-500':'bg-white text-gray-600 border-gray-200'}`}>{p}</button>
      )}</div></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <R label="有券商账户" value={form.hasBrokerAccount} onChange={v=>up('hasBrokerAccount',v)} options={['是','否']}/>
      <R label="有美国的房产" value={form.hasUSProperty} onChange={v=>up('hasUSProperty',v)} options={['是','否']}/>
      <R label="有美国银行" value={form.hasUSBank} onChange={v=>up('hasUSBank',v)} options={['是','否']}/>
      <R label="有美国的公司" value={form.hasUSCompany} onChange={v=>up('hasUSCompany',v)} options={['是','否']}/>
      <R label="在美国工作或学习" value={form.studyInUS} onChange={v=>up('studyInUS',v)} options={['是','否']}/>
      <R label="是否有美国地址 *" value={form.hasUSAddress} onChange={v=>up('hasUSAddress',v)} options={['是','否']}/>
    </div>
    <F label="Mailing Address *" value={form.mailingAddress} onChange={v=>up('mailingAddress',v)} ph="有美国地址填美国地址，无则填国内地址"/>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <F label="最近一次入境美国" type="date" value={form.lastEntryUS} onChange={v=>up('lastEntryUS',v)}/>
      <F label="推荐码" value={form.refCode} onChange={v=>up('refCode',v)} ph="如有推荐码请填写"/>
    </div>
    <div><L>备注</L>
      <textarea value={form.notes} onChange={e=>up('notes',e.target.value)} rows={3}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none text-sm resize-none" placeholder="其他需要补充的信息..."/></div>
  </div>
}

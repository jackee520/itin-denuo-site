'use client'

import { useState, useEffect } from 'react'

type Submission = Record<string, any>

export default function AdminPage() {
  const [subs, setSubs] = useState<Submission[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (authed) {
      const data = JSON.parse(localStorage.getItem('itin_submissions') || '[]')
      setSubs(data)
    }
  }, [authed])

  if (!authed) return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-center mb-6">🔐 管理后台</h1>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'&&password==='deno2024')setAuthed(true)}}
          placeholder="输入管理密码" className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4 text-sm"/>
        <button onClick={()=>{if(password==='deno2024')setAuthed(true)}}
          className="w-full py-3 bg-primary-500 text-white rounded-xl font-medium text-sm">登录</button>
        <p className="text-xs text-gray-400 text-center mt-3">默认密码：deno2024</p>
      </div>
    </div>
  )

  const fieldLabel: Record<string, string> = {
    name:'姓名',gender:'性别',birthday:'出生日期',phone:'电话',email:'Email',
    country:'国家',liveCountry:'现居国家',birthProvince:'出生省份',
    idNumber:'身份证号码',idIssuer:'签发机关',idValidFrom:'证件有效期起',idValidTo:'证件有效期止',
    idAddress:'证件住址',zipCode:'邮编',province:'省',city:'市',district:'区',
    detailedAddress:'详细地址',ethnicity:'民族',
    driverLicenseFrom:'驾驶证有效期起',driverLicenseTo:'驾驶证有效期至',
    visaType:'签证类型',visaNumber:'签证号码',visaValidFrom:'签证有效期起',visaValidTo:'签证有效期止',
    passportNationality:'国籍',passportNumber:'护照号码',passportExpiry:'护照有效期止',
    consultant:'专属顾问',orderNumber:'订单编号',appliedBefore:'是否申请过税号',
    itinPurpose:'申请原因',hasBrokerAccount:'有券商账户',hasUSProperty:'有美国房产',
    hasUSBank:'有美国银行',hasUSCompany:'有美国公司',studyInUS:'在美工作学习',
    hasUSAddress:'有美国地址',mailingAddress:'邮寄地址',lastEntryUS:'最近入境美国',
    refCode:'推荐码',notes:'备注',submittedAt:'提交时间',
  }

  const skip = ['consultant','orderNumber']

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-primary-500 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">📋 提交记录 ({subs.length})</h1>
          <button onClick={()=>{setAuthed(false);setPassword('')}}
            className="px-3 py-1.5 bg-white/20 rounded-lg text-sm">退出</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {subs.length===0 ? (
          <div className="text-center py-20 text-muted">
            <div className="text-4xl mb-4">📭</div>
            <p>暂无提交记录</p>
            <p className="text-sm mt-2">将 /collect/ 链接发给客户，填写后记录会保存在浏览器中</p>
          </div>
        ) : (
          <div className="space-y-3">
            {subs.map((s, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={()=>setSelected(selected===idx?null:idx)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-surface transition-colors text-left">
                  <div>
                    <span className="font-semibold">{s.name || '未填姓名'}</span>
                    <span className="text-muted text-sm ml-3">{s.phone || s.email || '无联系方式'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted">{s.submittedAt ? new Date(s.submittedAt).toLocaleString('zh-CN') : ''}</span>
                    <svg className={`w-4 h-4 text-muted transition-transform ${selected===idx?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </button>
                {selected===idx && (
                  <div className="px-5 pb-4 border-t border-gray-100 pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {Object.entries(s).filter(([k])=>!skip.includes(k)).map(([k,v])=>(
                        <div key={k} className="py-1">
                          <span className="text-xs text-muted">{fieldLabel[k]||k}</span>
                          <div className="text-sm text-gray-900">
                            {Array.isArray(v) ? v.join('、') : (v||'-')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 flex gap-3">
              <button onClick={()=>{
                const csv = [
                  Object.values(fieldLabel).join(','),
                  ...subs.map(s=>Object.keys(fieldLabel).map(k=>`"${(s[k]||'').toString().replace(/"/g,'""')}"`).join(','))
                ].join('\n')
                const blob = new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'})
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href=url;a.download='itin_submissions.csv';a.click()
              }} className="px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-medium">导出 CSV</button>
              <button onClick={()=>{
                if(confirm('确定清空所有记录？')){localStorage.removeItem('itin_submissions');setSubs([]);setSelected(null)}
              }} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-200">清空记录</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

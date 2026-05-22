'use client'

import { useState, useEffect, useRef } from 'react'

type FormData = {
  idNumber: string; idIssuer: string
  driverLicenseFrom: string; driverLicenseTo: string
  birthday: string; idValidFrom: string; idValidTo: string; ethnicity: string
  name: string; gender: string; namePinyin: string
  country: string; idAddress: string; zipCode: string
  province: string; city: string; district: string; detailedAddress: string
  visaType: string; visaNumber: string; visaValidFrom: string; visaValidTo: string
  passportNationality: string; passportNumber: string; passportExpiry: string
  consultant: string; orderNumber: string
  appliedBefore: string; itinPurpose: string[]
  hasBrokerAccount: string; hasUSProperty: string; hasUSBank: string
  hasUSCompany: string; studyInUS: string; hasUSAddress: string
  mailingAddress: string; lastEntryUS: string; birthProvince: string
  phone: string; email: string; liveCountry: string
  refCode: string; notes: string
}

type FileState = {
  idFront: File|null; idBack: File|null; driverLicense: File|null
  visaPhoto: File|null; passport: File|null; otherDocs: File|null
}

const empty: FormData = {
  idNumber:'',idIssuer:'',driverLicenseFrom:'',driverLicenseTo:'',
  birthday:'',idValidFrom:'',idValidTo:'',ethnicity:'',
  name:'',gender:'',namePinyin:'',country:'中国',idAddress:'',zipCode:'',
  province:'',city:'',district:'',detailedAddress:'',
  visaType:'',visaNumber:'',visaValidFrom:'',visaValidTo:'',
  passportNationality:'',passportNumber:'',passportExpiry:'',
  consultant:'',orderNumber:'',
  appliedBefore:'',itinPurpose:[],
  hasBrokerAccount:'',hasUSProperty:'',hasUSBank:'',hasUSCompany:'',
  studyInUS:'',hasUSAddress:'',mailingAddress:'',lastEntryUS:'',
  birthProvince:'',phone:'',email:'',liveCountry:'',refCode:'',notes:'',
}
const emptyFiles: FileState = { idFront:null,idBack:null,driverLicense:null,visaPhoto:null,passport:null,otherDocs:null }

const tabs = [
  { id:'id',label:'证件信息',icon:'🪪' },
  { id:'visa',label:'签证信息',icon:'✈️' },
  { id:'passport',label:'护照信息',icon:'📕' },
  { id:'other',label:'其他',icon:'📋' },
]
const purposeOpts = ['个人报税','夫妻联合报税','申请美卡','跨境电商','其他']

const requiredFields: Record<string, (keyof FormData)[]> = {
  id: ['name','gender','birthday','country','idAddress','zipCode'],
  other: ['appliedBefore','hasUSAddress','mailingAddress','liveCountry','birthProvince','phone','email'],
}

const WEB3FORMS_KEY = 'd6ea2243-f877-4061-aaf6-f4fb86f1ea7c'

export default function CollectPage() {
  const [tab, setTab] = useState('id')
  const [form, setForm] = useState<FormData>(empty)
  const [files, setFiles] = useState<FileState>(emptyFiles)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref) { localStorage.setItem('ref_code', ref); setForm(p=>({...p,refCode:ref})) }
  }, [])

  const up = (k: keyof FormData, v: any) => { setForm(p=>({...p,[k]:v})); setErrors([]) }

  const validate = (): boolean => {
    const reqs = requiredFields[tab] || []
    const labels: Record<string,string> = {
      name:'姓名',gender:'性别',birthday:'出生日期',country:'国家',
      idAddress:'证件住址',zipCode:'邮编',appliedBefore:'是否申请过税号',
      hasUSAddress:'是否有美国地址',mailingAddress:'邮寄地址',
      liveCountry:'现居国家',birthProvince:'出生省份',phone:'电话号码',email:'Email',
    }
    const missing = reqs.filter(f => !form[f] || (typeof form[f]==='string' && !(form[f] as string).trim()))
    if (missing.length > 0) { setErrors(missing.map(f=>labels[f]||f)); return false }
    return true
  }

  const next = () => { if (!validate()) return; const i = tabs.findIndex(t=>t.id===tab); if (i < tabs.length-1) setTab(tabs[i+1].id) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    for (const t of tabs) { if (requiredFields[t.id]) { setTab(t.id); if (!validate()) return } }
    setSubmitting(true)
    const payload = { ...form, submittedAt: new Date().toISOString() }
    try {
      await fetch('https://api.web3forms.com/submit', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ access_key:WEB3FORMS_KEY, subject:`📝 新的信息收集 - ${form.name||'未填姓名'}`, from_name:'德诺商务 信息收集表', ...payload }),
      })
    } catch {}
    const key='itin_submissions'; const existing=JSON.parse(localStorage.getItem(key)||'[]'); existing.push(payload); localStorage.setItem(key,JSON.stringify(existing))
    setSubmitting(false); setDone(true)
  }

  const toPinyin = () => {
    if (!form.name) return
    const surnames: Record<string,string> = {'赵':'Zhao','钱':'Qian','孙':'Sun','李':'Li','周':'Zhou','吴':'Wu','郑':'Zheng','王':'Wang','冯':'Feng','陈':'Chen','蒋':'Jiang','沈':'Shen','韩':'Han','杨':'Yang','朱':'Zhu','秦':'Qin','许':'Xu','何':'He','吕':'Lv','施':'Shi','张':'Zhang','孔':'Kong','曹':'Cao','严':'Yan','金':'Jin','魏':'Wei','陶':'Tao','姜':'Jiang','谢':'Xie','邹':'Zou','苏':'Su','潘':'Pan','葛':'Ge','范':'Fan','彭':'Peng','鲁':'Lu','韦':'Wei','马':'Ma','苗':'Miao','方':'Fang','俞':'Yu','任':'Ren','袁':'Yuan','柳':'Liu','唐':'Tang','罗':'Luo','薛':'Xue','贺':'He','倪':'Ni','汤':'Tang','殷':'Yin','毕':'Bi','郝':'Hao','安':'An','常':'Chang','于':'Yu','傅':'Fu','齐':'Qi','康':'Kang','余':'Yu','元':'Yuan','顾':'Gu','孟':'Meng','黄':'Huang','穆':'Mu','萧':'Xiao','尹':'Yin','姚':'Yao','邵':'Shao','汪':'Wang','祁':'Qi','毛':'Mao','禹':'Yu','米':'Mi','贝':'Bei','明':'Mang','计':'Ji','成':'Cheng','戴':'Dai','宋':'Song','庞':'Pang','熊':'Xiong','纪':'Ji','舒':'Shu','屈':'Qu','项':'Xiang','祝':'Zhu','董':'Dong','梁':'Liang','杜':'Du','阮':'Ruan','蓝':'Lan','席':'Xi','季':'Ji','强':'Qiang','贾':'Jia','路':'Lu','娄':'Lou','江':'Jiang','童':'Tong','颜':'Yan','郭':'Guo','梅':'Mei','林':'Lin','钟':'Zhong','徐':'Xu','邱':'Qiu','高':'Gao','夏':'Xia','蔡':'Cai','田':'Tian','樊':'Fan','胡':'Hu','凌':'Ling','万':'Wan','柯':'Ke','管':'Guan','卢':'Lu','莫':'Mo','房':'Fang','干':'Gan','解':'Xie','应':'Ying','宗':'Zong','丁':'Ding','邓':'Deng','郁':'Yu','单':'Shan','杭':'Hang','洪':'Hong','包':'Bao','诸':'Zhu','左':'Zuo','石':'Shi','崔':'Cui','吉':'Ji','龚':'Gong','程':'Cheng','邢':'Xing','裴':'Pei','陆':'Lu','荣':'Rong','翁':'Weng','羊':'Yang','惠':'Hui','甄':'Zhen','曲':'Qu','封':'Feng','芮':'Rui','靳':'Jin','段':'Duan','富':'Fu','巫':'Wu','乌':'Wu','焦':'Jiao','巴':'Ba','弓':'Gong','牧':'Mu','山':'Shan','谷':'Gu','车':'Che','侯':'Hou','全':'Quan','班':'Ban','仰':'Yang','秋':'Qiu','仲':'Zhong','伊':'Yi','宫':'Gong','宁':'Ning','仇':'Qiu','栾':'Luan','甘':'Gan','厉':'Li','戎':'Rong','祖':'Zu','武':'Wu','符':'Fu','刘':'Liu','景':'Jing','龙':'Long','叶':'Ye','司':'Si','黎':'Li','白':'Bai','怀':'Huai','蒲':'Pu','从':'Cong','索':'Suo','赖':'Lai','卓':'Zhuo','蔺':'Lin','屠':'Tu','蒙':'Meng','池':'Chu','乔':'Qiao','双':'Shuang','闻':'Wen','党':'Dang','翟':'Zhai','谭':'Tan','贡':'Gong','劳':'Lao','姬':'Ji','申':'Shen','冉':'Ran','宰':'Zai','雍':'Yong','桑':'Sang','桂':'Gui','濮':'Pu','牛':'Niu','寿':'Shou','通':'Tong','边':'Bian','燕':'Yan','冀':'Ji','浦':'Pu','尚':'Shang','农':'Nong','温':'Wen','别':'Bie','庄':'Zhuang','晏':'Yan','柴':'Chai','瞿':'Qu','阎':'Yan','充':'Chong','慕':'Mu','连':'Lian','茹':'Ru','习':'Xi','艾':'Ai','鱼':'Yu','容':'Rong','向':'Xiang','古':'Gu','易':'Yi','慎':'Shen','戈':'Ge','廖':'Liao','庾':'Yu','居':'Ju','衡':'Heng','步':'Bu','都':'Du','耿':'Geng','满':'Man','弘':'Hong','匡':'Kuang','国':'Guo','文':'Wen','寇':'Kou','广':'Guang','禄':'Lu','东':'Dong','欧':'Ou','沃':'Wo','利':'Li','蔚':'Yu','越':'Yue','隆':'Long','师':'Shi','巩':'Gong','聂':'Nie','晁':'Chao','勾':'Gou','敖':'Ao','融':'Rong','冷':'Leng','辛':'Xin','那':'Na','简':'Jin','饶':'Rao','空':'Kong','曾':'Zeng','母':'Mu','沙':'Sha','养':'Yang','鞠':'Ju','须':'Xu','丰':'Feng','巢':'Chao','关':'Guan','相':'Xiang','查':'Cha','后':'Hou','荆':'Jing','红':'Hong','游':'You','权':'Quan','盖':'Gai','益':'Yi','桓':'Huan','公':'Gong','仉':'Zhang','督':'Du','晋':'Jin','楚':'Chu','闫':'Yan','法':'Fa','鄢':'Yan','涂':'Tu','钦':'Qin','归':'Gui','海':'Hai','岳':'Yue','帅':'Shuai','亢':'Kang','况':'Kuang','有':'You','琴':'Qin','商':'Shang','牟':'Mu','佘':'She','伯':'Bo','赏':'Shang','墨':'Mo','哈':'Ha','谯':'Qiao','笪':'Da','年':'Nian','爱':'Ai','阳':'Yang','佟':'Tong','言':'Yan','福':'Fu','夏侯':'Xiahou','东方':'Dongfang','皇甫':'Huangfu','尉迟':'Yuchi','公孙':'Gongsun','慕容':'Murong','长孙':'Zhangsun','宇文':'Yuwen','司徒':'Situ','端木':'Duanmu','独孤':'Dugu'}
    const surname = form.name.charAt(0)
    const given = form.name.slice(1)
    up('namePinyin', `${surnames[surname]||surname} ${given}`)
  }

  const splitAddress = () => {
    if (!form.idAddress) return
    const provinces = ['北京','天津','上海','重庆','河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','四川','贵州','云南','陕西','甘肃','青海','台湾','内蒙古','广西','西藏','宁夏','新疆','香港','澳门']
    let p='',c='',d='',rest=form.idAddress
    for (const prov of provinces) { if (rest.startsWith(prov)) { p=prov; rest=rest.slice(prov.length).replace(/^(省|市|自治区|壮族自治区|回族自治区|维吾尔自治区)/,''); break } }
    const cm=rest.match(/^(.{2,5}?)(市|地区|州|盟)/); if(cm){c=cm[1]+cm[2];rest=rest.slice(cm[0].length)}
    const dm=rest.match(/^(.{2,5}?)(区|县|市|旗)/); if(dm){d=dm[1]+dm[2];rest=rest.slice(dm[0].length)}
    setForm(prev=>({...prev,province:p||prev.province,city:c||prev.city,district:d||prev.district,detailedAddress:rest||prev.detailedAddress}))
  }

  const translateAddress = () => {
    if (!form.idAddress) return
    const r:[RegExp,string][] = [[/省/g,' Province'],[/市/g,' City'],[/区/g,' District'],[/县/g,' County'],[/镇/g,' Town'],[/乡/g,' Township'],[/村/g,' Village'],[/路/g,' Road'],[/街/g,' Street'],[/巷/g,' Lane'],[/号/g,' No.'],[/楼/g,' Building'],[/室/g,' Room'],[/栋/g,' Building'],[/单元/g,' Unit']]
    let addr = form.idAddress; for (const [re,rep] of r) addr = addr.replace(re, rep)
    up('detailedAddress', addr)
  }

  const toggleP = (p: string) => setForm(prev => ({...prev, itinPurpose: prev.itinPurpose.includes(p) ? prev.itinPurpose.filter(x=>x!==p) : [...prev.itinPurpose, p]}))
  const handleFile = (key: keyof FileState, f: File|null) => setFiles(p=>({...p,[key]:f}))

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">信息收集表</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-8">
        <form onSubmit={handleSubmit}>
          {/* Tabs - clean style matching reference */}
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            {tabs.map(t=>(
              <button key={t.id} type="button" onClick={()=>{setTab(t.id);setErrors([])}}
                className={`pb-3 text-sm font-medium transition-all border-b-2 ${
                  tab===t.id ? 'text-primary-500 border-primary-500' : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Error messages */}
          {errors.length>0 && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <span className="font-semibold">⚠️ 请填写必填项：</span>{errors.join('、')}
            </div>
          )}

          {/* Tab content */}
          {tab==='id' && <IdTab form={form} up={up} files={files} handleFile={handleFile} toPinyin={toPinyin} splitAddress={splitAddress} translateAddress={translateAddress} />}
          {tab==='visa' && <VisaTab form={form} up={up} files={files} handleFile={handleFile} />}
          {tab==='passport' && <PassportTab form={form} up={up} files={files} handleFile={handleFile} />}
          {tab==='other' && <OtherTab form={form} up={up} toggleP={toggleP} files={files} handleFile={handleFile} />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button type="button" onClick={()=>{setTab(tabs[Math.max(0,i-1)].id);setErrors([])}} disabled={i===0}
              className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 text-sm font-medium">
              ← 上一步
            </button>
            {i < tabs.length-1 ? (
              <button type="button" onClick={next}
                className="px-5 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm font-medium">
                下一步 →
              </button>
            ) : (
              <button type="submit" disabled={submitting}
                className="px-8 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 text-sm font-semibold">
                {submitting?'提交中...':'提交'}
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">您的信息将被严格保密，仅用于 ITIN 申请服务。</p>
        </form>
      </div>
    </div>
  )
}

// ---- Helper components ----

function L({children,r}:{children:React.ReactNode;r?:boolean}) {
  return <label className="block text-sm text-gray-600 mb-1.5">{r&&<span className="text-red-500 mr-0.5">*</span>}{children}</label>
}
function I({label,value,onChange,ph,type='text',disabled=false,r=false}:{
  label:string;value:string;onChange:(v:string)=>void;ph?:string;type?:string;disabled?:boolean;r?:boolean
}) {
  return <div><L r={r}>{label}</L>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} disabled={disabled}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all disabled:bg-gray-50 ${r&&!value.trim()?'border-red-300':'border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20'}`}/></div>
}
function Sel({label,value,onChange,options,r=false}:{label:string;value:string;onChange:(v:string)=>void;options:string[];r?:boolean}) {
  return <div><L r={r}>{label}</L>
    <select value={value} onChange={e=>onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none appearance-none bg-white ${r&&!value?'border-red-300':'border-gray-200'}`}>
      <option value="">请选择</option>{options.map(o=><option key={o}>{o}</option>)}</select></div>
}
function DateI({label,value,onChange,r=false}:{label:string;value:string;onChange:(v:string)=>void;r?:boolean}) {
  return <div><L r={r}>{label}</L>
    <input type="date" value={value} onChange={e=>onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none ${r&&!value?'border-red-300':'border-gray-200'}`}/></div>
}
function Btn({children,onClick}:{children:React.ReactNode;onClick:()=>void}) {
  return <button type="button" onClick={onClick}
    className="px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">{children}</button>
}
function Radio({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
  return <div><L>{label}</L>
    <div className="flex gap-3 mt-1">{options.map(o=>
      <button key={o} type="button" onClick={()=>onChange(o)}
        className={`px-4 py-2 rounded-lg text-sm border ${value===o?'bg-primary-500 text-white border-primary-500':'bg-white text-gray-600 border-gray-200'}`}>{o}</button>
    )}</div></div>
}
function FileUp({label,onChange,required=false}:{label:string;onChange:(f:File|null)=>void;required?:boolean}) {
  const [fname, setFname] = useState('')
  return <div>
    <L r={required}>{label}</L>
    <div className="flex gap-2">
      <label className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all flex-1">
        <span className="text-gray-400">📎</span>
        <span className="text-sm text-gray-500">{fname||'添加附件'}</span>
        <input type="file" className="hidden" onChange={e=>{const f=e.target.files?.[0]||null;onChange(f);setFname(f?f.name:'')}}/>
      </label>
      <button type="button" className="px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50" title="手机上传">
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"/></svg>
      </button>
    </div>
  </div>
}

// ---- Tab sections ----

function IdTab({form,up,files,handleFile,toPinyin,splitAddress,translateAddress}:{
  form:FormData;up:(k:keyof FormData,v:any)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void
  toPinyin:()=>void;splitAddress:()=>void;translateAddress:()=>void
}) {
  return <div className="space-y-5">
    <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg font-medium">⚠️ 身份证和驾驶证至少上传一样！</p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <FileUp label="身份证正面" onChange={f=>handleFile('idFront',f)}/>
      <FileUp label="身份证背面" onChange={f=>handleFile('idBack',f)}/>
      <FileUp label="驾驶证" onChange={f=>handleFile('driverLicense',f)}/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <I label="身份证号码" value={form.idNumber} onChange={v=>up('idNumber',v)} ph="请填写文本内容"/>
      <I label="签发机关（身份证）" value={form.idIssuer} onChange={v=>up('idIssuer',v)} ph="签发机关"/>
      <DateI label="驾驶证有效期起" value={form.driverLicenseFrom} onChange={v=>up('driverLicenseFrom',v)}/>
      <DateI label="驾驶证有效期至" value={form.driverLicenseTo} onChange={v=>up('driverLicenseTo',v)}/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <DateI label="出生日期" value={form.birthday} onChange={v=>up('birthday',v)} r/>
      <DateI label="身份证有效期限起始日期" value={form.idValidFrom} onChange={v=>up('idValidFrom',v)}/>
      <DateI label="身份证有效期限截止日期" value={form.idValidTo} onChange={v=>up('idValidTo',v)}/>
      <I label="民族" value={form.ethnicity} onChange={v=>up('ethnicity',v)} ph="民族"/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
      <I label="姓名" value={form.name} onChange={v=>up('name',v)} ph="姓名" r/>
      <Sel label="性别" value={form.gender} onChange={v=>up('gender',v)} options={['男','女']} r/>
      <div><L>姓名转拼音</L><Btn onClick={toPinyin}>转换拼音</Btn>
        {form.namePinyin && <p className="text-xs text-primary-500 mt-1">{form.namePinyin}</p>}</div>
      <div><L>拆分地址</L><Btn onClick={splitAddress}>拆分地址</Btn></div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
      <I label="国家" value={form.country} onChange={v=>up('country',v)} ph="中国" r/>
      <I label="证件住址" value={form.idAddress} onChange={v=>up('idAddress',v)} ph="住址" r/>
      <I label="邮编" value={form.zipCode} onChange={v=>up('zipCode',v)} ph="请填写文本内容" r/>
      <div><L>翻译地址</L><Btn onClick={translateAddress}>翻译为英文</Btn></div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <I label="省" value={form.province} onChange={v=>up('province',v)} ph="请填写文本内容"/>
      <I label="市" value={form.city} onChange={v=>up('city',v)} ph="请填写文本内容"/>
      <I label="区" value={form.district} onChange={v=>up('district',v)} ph="请填写文本内容"/>
      <I label="详细地址" value={form.detailedAddress} onChange={v=>up('detailedAddress',v)} ph="请填写文本内容"/>
    </div>
  </div>
}

function VisaTab({form,up,files,handleFile}:{form:FormData;up:(k:keyof FormData,v:any)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void}) {
  return <div className="space-y-5">
    <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">💡 如果没有美签直接下一步</p>
    <FileUp label="签证照片" onChange={f=>handleFile('visaPhoto',f)}/>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <I label="签证类型" value={form.visaType} onChange={v=>up('visaType',v)} ph="请填写文本内容"/>
      <I label="签证号码" value={form.visaNumber} onChange={v=>up('visaNumber',v)} ph="请填写文本内容"/>
      <DateI label="签证有效期起" value={form.visaValidFrom} onChange={v=>up('visaValidFrom',v)}/>
      <DateI label="签证有效期止" value={form.visaValidTo} onChange={v=>up('visaValidTo',v)}/>
    </div>
  </div>
}

function PassportTab({form,up,files,handleFile}:{form:FormData;up:(k:keyof FormData,v:any)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void}) {
  return <div className="space-y-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FileUp label="护照" onChange={f=>handleFile('passport',f)} required/>
      <I label="国籍" value={form.passportNationality} onChange={v=>up('passportNationality',v)} ph="请填写文本内容" r/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <I label="护照号码" value={form.passportNumber} onChange={v=>up('passportNumber',v)} ph="护照的唯一编号"/>
      <DateI label="护照有效期止" value={form.passportExpiry} onChange={v=>up('passportExpiry',v)}/>
    </div>
  </div>
}

function OtherTab({form,up,toggleP,files,handleFile}:{form:FormData;up:(k:keyof FormData,v:any)=>void;toggleP:(p:string)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void}) {
  return <div className="space-y-5">
    {/* Top: consultant + order number */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Sel label="专属顾问" value={form.consultant} onChange={v=>up('consultant',v)} options={['顾问A','顾问B','顾问C']} r/>
      <I label="订单编号" value={form.orderNumber} onChange={v=>up('orderNumber',v)} ph="请填写数值" r/>
    </div>

    <FileUp label="其他相关附件" onChange={f=>handleFile('otherDocs',f)}/>

    {/* Multi-select purpose */}
    <div><L r>申请ITIN的原因/用途</L>
      <div className="flex flex-wrap gap-2 mt-1">{purposeOpts.map(p=>
        <label key={p} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border cursor-pointer transition-all ${form.itinPurpose.includes(p)?'bg-primary-50 border-primary-300 text-primary-700':'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
          <input type="checkbox" checked={form.itinPurpose.includes(p)} onChange={()=>toggleP(p)} className="rounded"/>
          {p}
        </label>
      )}</div></div>

    <Radio label="是否申请过税号" value={form.appliedBefore} onChange={v=>up('appliedBefore',v)} options={['是','否']}/>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Radio label="有券商账户" value={form.hasBrokerAccount} onChange={v=>up('hasBrokerAccount',v)} options={['是','否']}/>
      <Radio label="有美国的房产" value={form.hasUSProperty} onChange={v=>up('hasUSProperty',v)} options={['是','否']}/>
      <Radio label="有美国银行" value={form.hasUSBank} onChange={v=>up('hasUSBank',v)} options={['是','否']}/>
      <Radio label="有美国的公司" value={form.hasUSCompany} onChange={v=>up('hasUSCompany',v)} options={['是','否']}/>
      <Radio label="在美国工作或学习" value={form.studyInUS} onChange={v=>up('studyInUS',v)} options={['是','否']}/>
      <Radio label="是否有美国地址" value={form.hasUSAddress} onChange={v=>up('hasUSAddress',v)} options={['是','否']}/>
    </div>

    <I label="Mailing Address 邮寄地址" value={form.mailingAddress} onChange={v=>up('mailingAddress',v)} ph="如果有美国地址请填写美国地址，无，请填写国内邮寄地址" r/>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <I label="现居国家" value={form.liveCountry} onChange={v=>up('liveCountry',v)} ph="请填写文本内容" r/>
      <I label="出生省份" value={form.birthProvince} onChange={v=>up('birthProvince',v)} ph="请填写文本内容" r/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <DateI label="最近一次入境美国时间" value={form.lastEntryUS} onChange={v=>up('lastEntryUS',v)}/>
      <I label="电话号码" type="tel" value={form.phone} onChange={v=>up('phone',v)} ph="请填写手机号码" r/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <I label="Email" type="email" value={form.email} onChange={v=>up('email',v)} ph="请填写邮箱地址" r/>
      <I label="推荐码" value={form.refCode} onChange={v=>up('refCode',v)} ph="如有推荐码请填写"/>
    </div>

    <div><L>备注</L>
      <textarea value={form.notes} onChange={e=>up('notes',e.target.value)} rows={3}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none text-sm resize-none" placeholder="其他需要补充的信息..."/></div>
  </div>
}

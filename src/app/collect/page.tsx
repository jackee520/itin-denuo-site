'use client'

import { useState, useEffect } from 'react'

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
  { id:'id',label:'证件信息' },
  { id:'visa',label:'签证信息' },
  { id:'passport',label:'护照信息' },
  { id:'other',label:'其他' },
]
const purposeOpts = ['个人报税','夫妻联合报税','申请美卡','跨境电商','其他']

const requiredFields: Record<string, (keyof FormData)[]> = {
  id: ['name','gender','birthday','country','idAddress','zipCode'],
  other: ['appliedBefore','hasUSAddress','mailingAddress','liveCountry','birthProvince','phone','email'],
}

const WEB3FORMS_KEY = 'd6ea2243-f877-4061-aaf6-f4fb86f1ea7c'
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/jackeeyu520@gmail.com'

// Province/City/District English mapping
const provinceEn: Record<string,string> = {
  '北京':'Beijing','天津':'Tianjin','上海':'Shanghai','重庆':'Chongqing',
  '河北':'Hebei','山西':'Shanxi','辽宁':'Liaoning','吉林':'Jilin','黑龙江':'Heilongjiang',
  '江苏':'Jiangsu','浙江':'Zhejiang','安徽':'Anhui','福建':'Fujian','江西':'Jiangxi',
  '山东':'Shandong','河南':'Henan','湖北':'Hubei','湖南':'Hunan','广东':'Guangdong',
  '海南':'Hainan','四川':'Sichuan','贵州':'Guizhou','云南':'Yunnan','陕西':'Shaanxi',
  '甘肃':'Gansu','青海':'Qinghai','台湾':'Taiwan','内蒙古':'Inner Mongolia',
  '广西':'Guangxi','西藏':'Tibet','宁夏':'Ningxia','新疆':'Xinjiang',
  '香港':'Hong Kong','澳门':'Macau',
}
const cityEn: Record<string,string> = {
  '武汉':'Wuhan','孝感':'Xiaogan','北京':'Beijing','上海':'Shanghai','广州':'Guangzhou',
  '深圳':'Shenzhen','成都':'Chengdu','杭州':'Hangzhou','南京':'Nanjing','重庆':'Chongqing',
  '天津':'Tianjin','西安':'Xian','苏州':'Suzhou','郑州':'Zhengzhou','长沙':'Changsha',
  '青岛':'Qingdao','大连':'Dalian','宁波':'Ningbo','厦门':'Xiamen','福州':'Fuzhou',
  '济南':'Jinan','合肥':'Hefei','昆明':'Kunming','哈尔滨':'Harbin','长春':'Changchun',
  '沈阳':'Shenyang','南昌':'Nanchang','贵阳':'Guiyang','南宁':'Nanning','兰州':'Lanzhou',
  '太原':'Taiyuan','石家庄':'Shijiazhuang','乌鲁木齐':'Urumqi','呼和浩特':'Hohhot',
  '拉萨':'Lhasa','海口':'Haikou','银川':'Yinchuan','西宁':'Xining',
}
const districtSuffix: Record<string,string> = {
  '区':'District','县':'County','市':'City','旗':'Banner','盟':'League',
}

// Province list for address splitting
const provinces = ['北京','天津','上海','重庆','河北','山西','辽宁','吉林','黑龙江','江苏','浙江','安徽','福建','江西','山东','河南','湖北','湖南','广东','海南','四川','贵州','云南','陕西','甘肃','青海','台湾','内蒙古','广西','西藏','宁夏','新疆','香港','澳门']

export default function CollectPage() {
  const [tab, setTab] = useState('id')
  const [form, setForm] = useState<FormData>(empty)
  const [files, setFiles] = useState<FileState>(emptyFiles)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [submitResult, setSubmitResult] = useState<{success:boolean;error:string}>({success:false,error:''})
  const [errors, setErrors] = useState<string[]>([])
  const [datePicker, setDatePicker] = useState<{field:keyof FormData;year:number;month:number;day:number}|null>(null)

  useEffect(() => {
    document.body.style.overflowX = 'hidden'
    document.body.style.touchAction = 'pan-y'
    document.documentElement.style.overflowX = 'hidden'
    const ref = new URLSearchParams(window.location.search).get('ref')
    if (ref) { localStorage.setItem('ref_code', ref); setForm(p=>({...p,refCode:ref})) }
    return () => { document.body.style.overflowX = ''; document.body.style.touchAction = ''; document.documentElement.style.overflowX = '' }
  }, [])

  const up = (k: keyof FormData, v: any) => { setForm(p=>({...p,[k]:v})); setErrors([]) }

  const validateTab = (tabId: string): boolean => {
    const reqs = requiredFields[tabId] || []
    const labels: Record<string,string> = {name:'姓名',gender:'性别',birthday:'出生日期',country:'国家',idAddress:'证件住址',zipCode:'邮编',appliedBefore:'是否申请过税号',hasUSAddress:'是否有美国地址',mailingAddress:'邮寄地址',liveCountry:'现居国家',birthProvince:'出生省份',phone:'电话号码',email:'Email'}
    const missing = reqs.filter(f => !form[f] || (typeof form[f]==='string' && !(form[f] as string).trim()))
    if (missing.length > 0) { setErrors(missing.map(f=>labels[f]||f)); return false }
    return true
  }

  const next = () => {
    if (!validateTab(tab)) return
    const i = tabs.findIndex(t=>t.id===tab)
    if (i < tabs.length-1) { setTab(tabs[i+1].id); setErrors([]); window.scrollTo(0, 0) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validate ALL tabs, collect errors, don't switch tabs during validation
    const labels: Record<string,string> = {name:'姓名',gender:'性别',birthday:'出生日期',country:'国家',idAddress:'证件住址',zipCode:'邮编',appliedBefore:'是否申请过税号',hasUSAddress:'是否有美国地址',mailingAddress:'邮寄地址',liveCountry:'现居国家',birthProvince:'出生省份',phone:'电话号码',email:'Email'}
    const allErrors: string[] = []
    let firstErrorTab = ''
    for (const t of tabs) {
      const reqs = requiredFields[t.id] || []
      const missing = reqs.filter(f => !form[f] || (typeof form[f]==='string' && !(form[f] as string).trim()))
      if (missing.length > 0) {
        allErrors.push(...missing.map(f=>labels[f]||f))
        if (!firstErrorTab) firstErrorTab = t.id
      }
    }
    if (allErrors.length > 0) {
      setErrors(allErrors)
      setTab(firstErrorTab)
      window.scrollTo(0, 0)
      return
    }
    setSubmitting(true)
    const payload = { ...form, submittedAt: new Date().toISOString() }
    let web3Success = false
    let errorMsg = ''
    try {
      // Use FormData for file upload support
      const formData = new FormData()
      formData.append('_subject', `📝 新的信息收集 - ${form.name || '未填姓名'}`)
      formData.append('_template', 'table')
      formData.append('_captcha', 'false')
      // Add all form fields
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value))
        }
      })
      // Add files
      if (files.idFront) formData.append('ID_Front', files.idFront)
      if (files.idBack) formData.append('ID_Back', files.idBack)
      if (files.driverLicense) formData.append('Drivers_License', files.driverLicense)
      if (files.visaPhoto) formData.append('Visa_Photo', files.visaPhoto)
      if (files.passport) formData.append('Passport', files.passport)
      if (files.otherDocs) formData.append('Other_Documents', files.otherDocs)

      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
      const data = await res.json()
      web3Success = data.success === true || data.success === 'true'
      if (!web3Success) errorMsg = data.message || '提交失败'
    } catch (err: any) {
      errorMsg = err.message || '网络错误'
    }
    // Always save to localStorage as backup
    const key = 'itin_submissions'
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push({ ...payload, web3Success, errorMsg, savedAt: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(existing))
    setSubmitting(false)
    setSubmitResult({ success: web3Success, error: errorMsg })
    setDone(true)
  }

  // ---- 姓名转拼音 ----
  const toPinyin = () => {
    if (!form.name) return
    const s:Record<string,string>={'赵':'Zhao','钱':'Qian','孙':'Sun','李':'Li','周':'Zhou','吴':'Wu','郑':'Zheng','王':'Wang','冯':'Feng','陈':'Chen','蒋':'Jiang','沈':'Shen','韩':'Han','杨':'Yang','朱':'Zhu','秦':'Qin','许':'Xu','何':'He','吕':'Lv','施':'Shi','张':'Zhang','孔':'Kong','曹':'Cao','严':'Yan','金':'Jin','魏':'Wei','陶':'Tao','姜':'Jiang','谢':'Xie','邹':'Zou','苏':'Su','潘':'Pan','葛':'Ge','范':'Fan','彭':'Peng','鲁':'Lu','韦':'Wei','马':'Ma','苗':'Miao','方':'Fang','俞':'Yu','任':'Ren','袁':'Yuan','柳':'Liu','唐':'Tang','罗':'Luo','薛':'Xue','贺':'He','倪':'Ni','汤':'Tang','殷':'Yin','毕':'Bi','郝':'Hao','安':'An','常':'Chang','于':'Yu','傅':'Fu','齐':'Qi','康':'Kang','余':'Yu','元':'Yuan','顾':'Gu','孟':'Meng','黄':'Huang','穆':'Mu','萧':'Xiao','尹':'Yin','姚':'Yao','邵':'Shao','汪':'Wang','祁':'Qi','毛':'Mao','禹':'Yu','米':'Mi','贝':'Bei','计':'Ji','成':'Cheng','戴':'Dai','宋':'Song','庞':'Pang','熊':'Xiong','纪':'Ji','舒':'Shu','屈':'Qu','项':'Xiang','祝':'Zhu','董':'Dong','梁':'Liang','杜':'Du','阮':'Ruan','蓝':'Lan','席':'Xi','季':'Ji','强':'Qiang','贾':'Jia','路':'Lu','娄':'Lou','江':'Jiang','童':'Tong','颜':'Yan','郭':'Guo','梅':'Mei','林':'Lin','钟':'Zhong','徐':'Xu','邱':'Qiu','高':'Gao','夏':'Xia','蔡':'Cai','田':'Tian','樊':'Fan','胡':'Hu','凌':'Ling','万':'Wan','柯':'Ke','管':'Guan','卢':'Lu','莫':'Mo','房':'Fang','干':'Gan','解':'Xie','应':'Ying','丁':'Ding','邓':'Deng','郁':'Yu','单':'Shan','杭':'Hang','洪':'Hong','包':'Bao','左':'Zuo','石':'Shi','崔':'Cui','吉':'Ji','龚':'Gong','程':'Cheng','邢':'Xing','裴':'Pei','陆':'Lu','荣':'Rong','翁':'Weng','羊':'Yang','惠':'Hui','甄':'Zhen','曲':'Qu','封':'Feng','靳':'Jin','段':'Duan','富':'Fu','焦':'Jiao','巴':'Ba','弓':'Gong','牧':'Mu','山':'Shan','谷':'Gu','车':'Che','侯':'Hou','全':'Quan','班':'Ban','仰':'Yang','秋':'Qiu','仲':'Zhong','伊':'Yi','宫':'Gong','宁':'Ning','仇':'Qiu','栾':'Luan','甘':'Gan','厉':'Li','戎':'Rong','祖':'Zu','武':'Wu','符':'Fu','刘':'Liu','景':'Jing','龙':'Long','叶':'Ye','司':'Si','黎':'Li','白':'Bai','怀':'Huai','蒲':'Pu','从':'Cong','索':'Suo','赖':'Lai','卓':'Zhuo','蔺':'Lin','屠':'Tu','蒙':'Meng','池':'Chu','乔':'Qiao','双':'Shuang','闻':'Wen','党':'Dang','翟':'Zhai','谭':'Tan','贡':'Gong','劳':'Lao','逄':'Pang','姬':'Ji','申':'Shen','扶':'Fu','堵':'Du','冉':'Ran','宰':'Zai','郦':'Li','雍':'Yong','却':'Que','璩':'Qu','桑':'Sang','桂':'Gui','濮':'Pu','牛':'Niu','寿':'Shou','通':'Tong','边':'Bian','扈':'Hu','燕':'Yan','冀':'Ji','郏':'Jia','浦':'Pu','尚':'Shang','农':'Nong','温':'Wen','别':'Bie','庄':'Zhuang','晏':'Yan','柴':'Chai','瞿':'Qu','阎':'Yan','充':'Chong','慕':'Mu','连':'Lian','茹':'Ru','习':'Xi','宦':'Huan','艾':'Ai','鱼':'Yu','容':'Rong','向':'Xiang','古':'Gu','易':'Yi','慎':'Shen','戈':'Ge','廖':'Liao','庾':'Yu','终':'Zhong','暨':'Ji','居':'Ju','衡':'Heng','步':'Bu','都':'Du','耿':'Geng','满':'Man','弘':'Hong','匡':'Kuang','国':'Guo','文':'Wen','寇':'Kou','广':'Guang','禄':'Lu','阙':'Que','东':'Dong','殴':'Ou','殳':'Shu','沃':'Wo','利':'Li','蔚':'Yu','越':'Yue','夔':'Kui','隆':'Long','师':'Shi','巩':'Gong','厍':'She','聂':'Nie','晁':'Chao','勾':'Gou','敖':'Ao','融':'Rong','冷':'Leng','訾':'Zi','辛':'Xin','阚':'Kan','那':'Na','简':'Jian','饶':'Rao','空':'Kong','曾':'Zeng','母':'Mu','沙':'Sha','乜':'Nie','养':'Yang','鞠':'Ju','须':'Xu','丰':'Feng','巢':'Chao','关':'Guan','蒯':'Kuai','相':'Xiang','查':'Cha','后':'Hou','荆':'Jing','红':'Hong','游':'You','竺':'Zhu','权':'Quan','逯':'Lu','盖':'Gai','益':'Yi','桓':'Huan','公':'Gong','晋':'Jin'}
    up('namePinyin', `${s[form.name.charAt(0)]||form.name.charAt(0)} ${form.name.slice(1)}`)
  }

  // ---- 拆分地址 ----
  const splitAddress = () => {
    if (!form.idAddress) return
    let p='',c='',d='',rest=form.idAddress
    for (const prov of provinces) { if (rest.startsWith(prov)) { p=prov; rest=rest.slice(prov.length).replace(/^(省|市|自治区|壮族自治区|回族自治区|维吾尔自治区)/,''); break } }
    const cm=rest.match(/^(.{2,5}?)(市|地区|州|盟)/); if(cm){c=cm[1]+cm[2];rest=rest.slice(cm[0].length)}
    const dm=rest.match(/^(.{2,5}?)(区|县|市|旗)/); if(dm){d=dm[1]+dm[2];rest=rest.slice(dm[0].length)}
    setForm(prev=>({...prev,province:p||prev.province,city:c||prev.city,district:d||prev.district,detailedAddress:rest.trim()||prev.detailedAddress}))
  }

  // ---- 翻译地址为纯英文并拆分 ----
  const translateAddress = () => {
    if (!form.idAddress) return
    let pEn='',cEn='',dEn='',detailEn=''

    let rest = form.idAddress
    for (const [cn,en] of Object.entries(provinceEn)) {
      if (rest.startsWith(cn)) { pEn=en; rest=rest.slice(cn.length).replace(/^(省|市|自治区|壮族自治区|回族自治区|维吾尔自治区)/,''); break }
    }
    for (const [cn,en] of Object.entries(cityEn)) {
      if (rest.startsWith(cn)) { cEn=en; rest=rest.slice(cn.length).replace(/^(市|地区|州|盟)/,''); break }
    }
    if (!cEn) {
      const cm=rest.match(/^(.{2,5}?)(市|地区|州|盟)/); if(cm){cEn=cm[1];rest=rest.slice(cm[0].length)}
    }
    const dm=rest.match(/^(.{2,5}?)(区|县|旗|盟)/)
    if(dm){dEn=dm[1];rest=rest.slice(dm[0].length)}

    detailEn = rest
    const wordReps:[RegExp,string][]=[[/路/g,' Road'],[/街/g,' Street'],[/巷/g,' Lane'],[/弄/g,' Alley'],[/村/g,' Village'],[/小区/g,' Community'],[/花园/g,' Garden'],[/广场/g,' Plaza'],[/大厦/g,' Tower'],[/公寓/g,' Apartment']]
    for (const [re,rep] of wordReps) detailEn=detailEn.replace(re,rep)
    detailEn = detailEn.replace(/[\u4e00-\u9fff]/g,' ').replace(/\s+/g,' ').trim()

    setForm(prev=>({
      ...prev,
      province: pEn || prev.province,
      city: cEn || prev.city,
      district: dEn || prev.district,
      detailedAddress: detailEn || prev.detailedAddress,
    }))
  }

  const toggleP = (p: string) => setForm(prev => ({...prev, itinPurpose: prev.itinPurpose.includes(p) ? prev.itinPurpose.filter(x=>x!==p) : [...prev.itinPurpose, p]}))
  const handleFile = (key: keyof FileState, f: File|null) => setFiles(p=>({...p,[key]:f}))

  // ---- Custom Date Picker ----
  const openDatePicker = (field: keyof FormData) => {
    const val = form[field]
    if (val && typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [y,m,d] = val.split('-').map(Number)
      setDatePicker({field,year:y,month:m,day:d})
    } else {
      setDatePicker({field,year:1990,month:1,day:1})
    }
  }
  const confirmDate = () => {
    if (!datePicker) return
    const {field,year,month,day} = datePicker
    up(field, `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`)
    setDatePicker(null)
  }
  const removeDate = () => {
    if (!datePicker) return
    up(datePicker.field, '')
    setDatePicker(null)
  }
  const daysInMonth = (y:number,m:number) => new Date(y,m,0).getDate()

  const i = tabs.findIndex(t=>t.id===tab)

  if (done) return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ${submitResult.success ? 'bg-green-100' : 'bg-yellow-100'}`}>
          {submitResult.success ? '✅' : '⚠️'}
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {submitResult.success ? '提交成功！' : '已收到您的信息'}
        </h2>
        {submitResult.success ? (
          <p className="text-gray-500 mb-6">感谢您的配合，我们会尽快处理您的申请。</p>
        ) : (
          <div className="mb-6">
            <p className="text-gray-500 mb-2">您的信息已保存，但邮件通知发送失败。</p>
            <p className="text-xs text-gray-400 bg-gray-50 p-2 rounded">错误：{submitResult.error || '未知错误'}</p>
            <p className="text-sm text-gray-500 mt-2">请直接联系我们确认收到。</p>
          </div>
        )}
        <p className="text-sm text-gray-400">如有疑问，请联系您的专属顾问。</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 max-w-[100vw] overflow-x-hidden">
      {/* Blue header bar */}
      <div className="bg-blue-500 h-1.5 w-full" />

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Title */}
        <h1 className="text-xl font-bold text-gray-900 mb-5">信息收集表</h1>

        <form onSubmit={handleSubmit} className="touch-pan-y">
          {/* Tabs */}
          <div className="flex gap-5 mb-5 border-b border-gray-200 overflow-x-auto">
            {tabs.map(t=>(
              <button key={t.id} type="button" onClick={()=>{setTab(t.id);setErrors([]);window.scrollTo(0,0)}}
                className={`pb-2.5 text-sm whitespace-nowrap border-b-2 transition-all ${
                  tab===t.id ? 'text-gray-900 border-blue-500 font-medium' : 'text-gray-400 border-transparent'
                }`}>{t.label}</button>
            ))}
          </div>

          {errors.length>0 && (
            <div className="mb-4 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              ⚠️ 请填写：{errors.join('、')}
            </div>
          )}

          {tab==='id' && <IdTab form={form} up={up} files={files} handleFile={handleFile} splitAddress={splitAddress} openDatePicker={openDatePicker}/>}
          {tab==='visa' && <VisaTab form={form} up={up} files={files} handleFile={handleFile} openDatePicker={openDatePicker}/>}
          {tab==='passport' && <PassportTab form={form} up={up} files={files} handleFile={handleFile} openDatePicker={openDatePicker}/>}
          {tab==='other' && <OtherTab form={form} up={up} toggleP={toggleP} files={files} handleFile={handleFile} openDatePicker={openDatePicker}/>}

          <div className="flex items-center justify-between mt-6">
            <button type="button" onClick={()=>{setTab(tabs[Math.max(0,i-1)].id);setErrors([]);window.scrollTo(0,0)}} disabled={i===0}
              className="px-4 py-2.5 text-gray-500 text-sm disabled:opacity-30">← 上一步</button>
            {i < tabs.length-1 ? (
              <button type="button" onClick={next} className="px-6 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium">下一步 →</button>
            ) : (
              <button type="submit" disabled={submitting} className="px-8 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-medium disabled:opacity-50">
                {submitting?'提交中...':'提交'}</button>
            )}
          </div>
        </form>
      </div>

      {/* Date Picker Modal - Scroll Wheel Style */}
      {datePicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={()=>setDatePicker(null)}>
          <div className="bg-white rounded-t-2xl w-full max-w-md" onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <button type="button" onClick={()=>setDatePicker(null)} className="text-sm text-gray-400 px-2 py-1">取消</button>
              <div className="flex items-center gap-3">
                <button type="button" onClick={removeDate} className="text-sm text-red-500 px-2 py-1">移除</button>
                <button type="button" onClick={confirmDate} className="text-sm text-blue-500 font-semibold px-2 py-1">确定</button>
              </div>
            </div>

            {/* Field label */}
            <div className="text-center py-2">
              <span className="text-sm font-medium text-gray-700">
                {datePicker.field==='birthday'?'出生日期':datePicker.field==='idValidFrom'?'身份证有效期限起始日期':datePicker.field==='idValidTo'?'身份证有效期限截止日期':datePicker.field==='driverLicenseFrom'?'驾驶证有效期起':datePicker.field==='driverLicenseTo'?'驾驶证有效期至':datePicker.field==='visaValidFrom'?'签证有效期起':datePicker.field==='visaValidTo'?'签证有效期止':datePicker.field==='passportExpiry'?'护照有效期止':datePicker.field==='lastEntryUS'?'最近一次入境美国时间':'选择日期'}
              </span>
            </div>

            {/* Scroll wheels */}
            <div className="flex items-center justify-center px-4 pb-6 relative">
              {/* Selection highlight bar */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-10 bg-gray-50 rounded-lg pointer-events-none border border-gray-100" style={{zIndex:0}}/>

              {/* Year wheel */}
              <div className="flex-1 relative" style={{zIndex:1}}>
                <div className="h-40 overflow-y-auto scroll-smooth snap-y snap-mandatory" style={{scrollPaddingTop:'60px',scrollPaddingBottom:'60px'}}
                  onScroll={e=>{
                    const el=e.currentTarget; const items=el.querySelectorAll('[data-y]')
                    const center=el.scrollTop+80
                    let closest=0; let minDist=Infinity
                    items.forEach((it,idx)=>{const d=Math.abs((it as HTMLElement).offsetTop+20-center); if(d<minDist){minDist=d;closest=idx}})
                    const val=parseInt(items[closest]?.getAttribute('data-y')||'0')
                    if(val && datePicker && val!==datePicker.year) setDatePicker(p=>p?{...p,year:val}:null)
                  }}>
                  <div className="h-16"/>{/* spacer */}
                  {Array.from({length:120},(_,k)=>2030-k).map(y=>(
                    <div key={y} data-y={y} className={`h-10 flex items-center justify-center text-base snap-center transition-all ${datePicker.year===y?'text-gray-900 font-bold text-lg':'text-gray-300'}`}>
                      {y}
                    </div>
                  ))}
                  <div className="h-16"/>{/* spacer */}
                </div>
              </div>

              {/* Year label */}
              <span className="text-xs text-gray-400 mx-1 relative" style={{zIndex:1}}>年</span>

              {/* Month wheel */}
              <div className="flex-1 relative" style={{zIndex:1}}>
                <div className="h-40 overflow-y-auto scroll-smooth snap-y snap-mandatory" style={{scrollPaddingTop:'60px',scrollPaddingBottom:'60px'}}
                  onScroll={e=>{
                    const el=e.currentTarget; const items=el.querySelectorAll('[data-m]')
                    const center=el.scrollTop+80
                    let closest=0; let minDist=Infinity
                    items.forEach((it,idx)=>{const d=Math.abs((it as HTMLElement).offsetTop+20-center); if(d<minDist){minDist=d;closest=idx}})
                    const val=parseInt(items[closest]?.getAttribute('data-m')||'0')
                    if(val && datePicker && val!==datePicker.month) setDatePicker(p=>p?{...p,month:val}:null)
                  }}>
                  <div className="h-16"/>
                  {Array.from({length:12},(_,k)=>k+1).map(m=>(
                    <div key={m} data-m={m} className={`h-10 flex items-center justify-center text-base snap-center transition-all ${datePicker.month===m?'text-gray-900 font-bold text-lg':'text-gray-300'}`}>
                      {String(m).padStart(2,'0')}
                    </div>
                  ))}
                  <div className="h-16"/>
                </div>
              </div>

              {/* Month label */}
              <span className="text-xs text-gray-400 mx-1 relative" style={{zIndex:1}}>月</span>

              {/* Day wheel */}
              <div className="flex-1 relative" style={{zIndex:1}}>
                <div className="h-40 overflow-y-auto scroll-smooth snap-y snap-mandatory" style={{scrollPaddingTop:'60px',scrollPaddingBottom:'60px'}}
                  onScroll={e=>{
                    const el=e.currentTarget; const items=el.querySelectorAll('[data-d]')
                    const center=el.scrollTop+80
                    let closest=0; let minDist=Infinity
                    items.forEach((it,idx)=>{const d=Math.abs((it as HTMLElement).offsetTop+20-center); if(d<minDist){minDist=d;closest=idx}})
                    const val=parseInt(items[closest]?.getAttribute('data-d')||'0')
                    if(val && datePicker && val!==datePicker.day) setDatePicker(p=>p?{...p,day:val}:null)
                  }}>
                  <div className="h-16"/>
                  {Array.from({length:daysInMonth(datePicker.year,datePicker.month)},(_,k)=>k+1).map(d=>(
                    <div key={d} data-d={d} className={`h-10 flex items-center justify-center text-base snap-center transition-all ${datePicker.day===d?'text-gray-900 font-bold text-lg':'text-gray-300'}`}>
                      {String(d).padStart(2,'0')}
                    </div>
                  ))}
                  <div className="h-16"/>
                </div>
              </div>

              {/* Day label */}
              <span className="text-xs text-gray-400 mx-1 relative" style={{zIndex:1}}>日</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ---- Helpers ----

function L({children,r}:{children:React.ReactNode;r?:boolean}) {
  return <label className="block text-sm text-gray-500 mb-1">{r&&<span className="text-red-500 mr-0.5">*</span>}{children}</label>
}
function I({label,value,onChange,ph,type='text',disabled=false,r=false}:{label:string;value:string;onChange:(v:string)=>void;ph?:string;type?:string;disabled?:boolean;r?:boolean}) {
  return <div><L r={r}>{label}</L>
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} disabled={disabled}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none disabled:bg-gray-50 ${r&&!value.trim()?'border-red-300':'border-gray-200 focus:border-blue-500'}`}/></div>
}
function Sel({label,value,onChange,options,r=false}:{label:string;value:string;onChange:(v:string)=>void;options:string[];r?:boolean}) {
  return <div><L r={r}>{label}</L>
    <select value={value} onChange={e=>onChange(e.target.value)}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none appearance-none bg-white ${r&&!value?'border-red-300':'border-gray-200'}`}>
      <option value="">请选择</option>{options.map(o=><option key={o}>{o}</option>)}</select></div>
}
function DateField({label,value,onClick,r=false}:{label:string;value:string;onClick:()=>void;r?:boolean}) {
  return <div><L r={r}>{label}</L>
    <button type="button" onClick={onClick}
      className={`w-full px-3 py-2.5 rounded-lg border text-sm text-left flex items-center justify-between ${r&&!value?'border-red-300':'border-gray-200'}`}>
      <span className={value?'text-gray-900':'text-gray-400'}>{value||'请选择日期'}</span>
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    </button></div>
}
function Btn({children,onClick}:{children:React.ReactNode;onClick:()=>void}) {
  return <button type="button" onClick={onClick}
    className="px-3 py-2 rounded-lg text-xs border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">{children}</button>
}
function Radio({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}) {
  return <div><L>{label}</L>
    <div className="flex gap-2 mt-1">{options.map(o=>
      <button key={o} type="button" onClick={()=>onChange(o)}
        className={`flex-1 py-2.5 rounded-lg text-sm border text-center ${value===o?'bg-blue-500 text-white border-blue-500':'bg-white text-gray-600 border-gray-200'}`}>{o}</button>
    )}</div></div>
}
function FileUp({label,onChange,required=false}:{label:string;onChange:(f:File|null)=>void;required?:boolean}) {
  const [fname, setFname] = useState('')
  return <div>
    <L r={required}>{label}</L>
    <label className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 w-full">
      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
      <span className="text-sm text-gray-500 truncate flex-1">{fname||'Add files'}</span>
      <input type="file" className="hidden" onChange={e=>{const f=e.target.files?.[0]||null;onChange(f);setFname(f?f.name:'')}}/>
    </label>
  </div>
}

// ---- Tab sections ----

function IdTab({form,up,files,handleFile,splitAddress,openDatePicker}:{
  form:FormData;up:(k:keyof FormData,v:any)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void
  splitAddress:()=>void;openDatePicker:(f:keyof FormData)=>void
}) {
  return <div className="space-y-4">
    {/* Warning - match chuhaiji style: bold text, no background */}
    <p className="text-sm font-bold text-gray-900">身份证和驾驶证至少上传一样！</p>

    {/* Upload areas - 3 columns on desktop, 1 column on mobile */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <FileUp label="身份证正面" onChange={f=>handleFile('idFront',f)}/>
      <FileUp label="身份证背面" onChange={f=>handleFile('idBack',f)}/>
      <FileUp label="驾驶证" onChange={f=>handleFile('driverLicense',f)}/>
    </div>

    {/* Text inputs - 4 columns on desktop, 2 on tablet, 1 on mobile */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <I label="身份证号码" value={form.idNumber} onChange={v=>up('idNumber',v)} ph="请填写文本内容"/>
      <I label="签发机关（身份证）" value={form.idIssuer} onChange={v=>up('idIssuer',v)} ph="签发机关"/>
      <DateField label="驾驶证有效期起" value={form.driverLicenseFrom} onClick={()=>openDatePicker('driverLicenseFrom')}/>
      <DateField label="驾驶证有效期至" value={form.driverLicenseTo} onClick={()=>openDatePicker('driverLicenseTo')}/>
    </div>

    {/* Single column fields */}
    <DateField label="出生日期" value={form.birthday} onClick={()=>openDatePicker('birthday')} r/>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <DateField label="身份证有效期限起始日期" value={form.idValidFrom} onClick={()=>openDatePicker('idValidFrom')}/>
      <DateField label="身份证有效期限截止日期" value={form.idValidTo} onClick={()=>openDatePicker('idValidTo')}/>
    </div>

    <I label="民族" value={form.ethnicity} onChange={v=>up('ethnicity',v)} ph="民族"/>
    <I label="姓名" value={form.name} onChange={v=>up('name',v)} ph="姓名" r/>
    <Sel label="性别" value={form.gender} onChange={v=>up('gender',v)} options={['男','女']} r/>

    <I label="国家" value={form.country} onChange={v=>up('country',v)} ph="中国" r/>
    <I label="证件住址" value={form.idAddress} onChange={v=>up('idAddress',v)} ph="住址" r/>
    <I label="邮编" value={form.zipCode} onChange={v=>up('zipCode',v)} ph="请填写文本内容" r/>

    <div className="flex gap-3">
      <Btn onClick={splitAddress}>拆分地址</Btn>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <I label="省" value={form.province} onChange={v=>up('province',v)} ph="请填写文本内容"/>
      <I label="市" value={form.city} onChange={v=>up('city',v)} ph="请填写文本内容"/>
      <I label="区" value={form.district} onChange={v=>up('district',v)} ph="请填写文本内容"/>
      <I label="详细地址" value={form.detailedAddress} onChange={v=>up('detailedAddress',v)} ph="请填写文本内容"/>
    </div>
  </div>
}

function VisaTab({form,up,files,handleFile,openDatePicker}:{form:FormData;up:(k:keyof FormData,v:any)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void;openDatePicker:(f:keyof FormData)=>void}) {
  return <div className="space-y-4">
    <p className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">💡 如果没有美签直接下一步</p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <FileUp label="签证照片" onChange={f=>handleFile('visaPhoto',f)}/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <I label="签证类型" value={form.visaType} onChange={v=>up('visaType',v)} ph="请填写文本内容"/>
      <I label="签证号码" value={form.visaNumber} onChange={v=>up('visaNumber',v)} ph="请填写文本内容"/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <DateField label="签证有效期起" value={form.visaValidFrom} onClick={()=>openDatePicker('visaValidFrom')}/>
      <DateField label="签证有效期止" value={form.visaValidTo} onClick={()=>openDatePicker('visaValidTo')}/>
    </div>
  </div>
}

function PassportTab({form,up,files,handleFile,openDatePicker}:{form:FormData;up:(k:keyof FormData,v:any)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void;openDatePicker:(f:keyof FormData)=>void}) {
  return <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <FileUp label="护照" onChange={f=>handleFile('passport',f)} required/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <I label="国籍" value={form.passportNationality} onChange={v=>up('passportNationality',v)} ph="请填写文本内容" r/>
      <I label="护照号码" value={form.passportNumber} onChange={v=>up('passportNumber',v)} ph="护照的唯一编号"/>
      <DateField label="护照有效期止" value={form.passportExpiry} onClick={()=>openDatePicker('passportExpiry')}/>
    </div>
  </div>
}

function OtherTab({form,up,toggleP,files,handleFile,openDatePicker}:{form:FormData;up:(k:keyof FormData,v:any)=>void;toggleP:(p:string)=>void;files:FileState;handleFile:(k:keyof FileState,f:File|null)=>void;openDatePicker:(f:keyof FormData)=>void}) {
  return <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Sel label="专属顾问" value={form.consultant} onChange={v=>up('consultant',v)} options={['顾问A','顾问B','顾问C']} r/>
      <I label="订单编号" value={form.orderNumber} onChange={v=>up('orderNumber',v)} ph="请填写数值" r/>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <FileUp label="其他相关附件" onChange={f=>handleFile('otherDocs',f)}/>
    </div>

    <div><L r>申请ITIN的原因/用途</L>
      <div className="flex flex-wrap gap-2 mt-1">{purposeOpts.map(p=>
        <label key={p} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border cursor-pointer ${form.itinPurpose.includes(p)?'bg-blue-50 border-blue-300 text-blue-700':'bg-white border-gray-200 text-gray-600'}`}>
          <input type="checkbox" checked={form.itinPurpose.includes(p)} onChange={()=>toggleP(p)} className="rounded"/>
          {p}
        </label>
      )}</div></div>

    <Radio label="是否申请过税号" value={form.appliedBefore} onChange={v=>up('appliedBefore',v)} options={['是','否']}/>
    <Radio label="有券商账户" value={form.hasBrokerAccount} onChange={v=>up('hasBrokerAccount',v)} options={['是','否']}/>
    <Radio label="有美国的房产" value={form.hasUSProperty} onChange={v=>up('hasUSProperty',v)} options={['是','否']}/>
    <Radio label="有美国银行" value={form.hasUSBank} onChange={v=>up('hasUSBank',v)} options={['是','否']}/>
    <Radio label="有美国的公司" value={form.hasUSCompany} onChange={v=>up('hasUSCompany',v)} options={['是','否']}/>
    <Radio label="在美国工作或学习" value={form.studyInUS} onChange={v=>up('studyInUS',v)} options={['是','否']}/>
    <Radio label="是否有美国地址" value={form.hasUSAddress} onChange={v=>up('hasUSAddress',v)} options={['是','否']}/>

    <I label="Mailing Address 邮寄地址" value={form.mailingAddress} onChange={v=>up('mailingAddress',v)} ph="如果有美国地址请填写美国地址，无，请填写国内邮寄地址" r/>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <I label="现居国家" value={form.liveCountry} onChange={v=>up('liveCountry',v)} ph="请填写文本内容" r/>
      <I label="出生省份" value={form.birthProvince} onChange={v=>up('birthProvince',v)} ph="请填写文本内容" r/>
    </div>
    <DateField label="最近一次入境美国时间" value={form.lastEntryUS} onClick={()=>openDatePicker('lastEntryUS')}/>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <I label="电话号码" type="tel" value={form.phone} onChange={v=>up('phone',v)} ph="请填写手机号码" r/>
      <I label="Email" type="email" value={form.email} onChange={v=>up('email',v)} ph="请填写邮箱地址" r/>
    </div>
    <I label="推荐码" value={form.refCode} onChange={v=>up('refCode',v)} ph="如有推荐码请填写"/>
    <div><L>备注</L>
      <textarea value={form.notes} onChange={e=>up('notes',e.target.value)} rows={3}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 outline-none text-sm resize-none" placeholder="其他需要补充的信息..."/></div>
  </div>
}

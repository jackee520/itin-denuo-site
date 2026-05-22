import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-500 font-bold text-sm">德</span>
              </div>
              <span className="font-semibold text-lg">德诺商务</span>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed">
              专业ITIN代办服务，为华人提供美国税务一站式解决方案。
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">服务项目</h3>
            <ul className="space-y-2 text-primary-200 text-sm">
              <li><Link href="/itin/" className="hover:text-white transition-colors">ITIN代办</Link></li>
              <li><Link href="/referral/" className="hover:text-white transition-colors">邀请奖励</Link></li>
              <li><Link href="/faq/" className="hover:text-white transition-colors">常见问题</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">资源</h3>
            <ul className="space-y-2 text-primary-200 text-sm">
              <li><Link href="/faq/" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact/" className="hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">联系方式</h3>
            <ul className="space-y-2 text-primary-200 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contact@denuo.site</span>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <span>微信：待添加</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>Telegram：@denuo_service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-200 text-sm">
            © {new Date().getFullYear()} 德诺商务服务. 保留所有权利.
          </p>
          <div className="flex items-center gap-4 text-primary-200 text-sm">
            <Link href="/faq/" className="hover:text-white transition-colors">隐私政策</Link>
            <span>·</span>
            <Link href="/faq/" className="hover:text-white transition-colors">服务条款</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

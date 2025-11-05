import { Facebook, Mail, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-white">Marts BD Digital</p>
            <p className="mt-3 text-sm text-slate-400">
              বাংলাদেশের সেরা ডিজিটাল পণ্য ও সাবস্ক্রিপশন মার্কেটপ্লেস। নিরাপদ পেমেন্ট এবং দ্রুত লাইসেন্স ডেলিভারি আমাদের অঙ্গীকার।
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">দ্রুত লিংক</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link to="#products" className="hover:text-primary-200">
                জনপ্রিয় পণ্য
              </Link>
              <Link to="/admin" className="hover:text-primary-200">
                অ্যাডমিন প্যানেল
              </Link>
              <a href="mailto:support@martsbd.com" className="hover:text-primary-200">
                ইমেইল সাপোর্ট
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">যোগাযোগ করুন</p>
            <div className="mt-3 flex flex-col gap-3 text-sm">
              <a href="tel:+8801XXXXXXX" className="flex items-center gap-2 hover:text-primary-200">
                <PhoneCall className="h-4 w-4" /> +880 1X XXX XXXX
              </a>
              <a href="mailto:support@martsbd.com" className="flex items-center gap-2 hover:text-primary-200">
                <Mail className="h-4 w-4" /> support@martsbd.com
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-primary-200">
                <Facebook className="h-4 w-4" /> Facebook Community
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Marts BD Digital. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  )
}

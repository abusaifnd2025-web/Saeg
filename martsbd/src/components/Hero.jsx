import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Hero = ({ onCartOpen }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            <Zap className="h-4 w-4" />
            ডিজিটাল পণ্যের গতি ও নির্ভরতার নতুন মানদণ্ড
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            মিনিটেই ডিজিটাল লাইসেন্স, সাবস্ক্রিপশন &amp; সার্ভিস ডেলিভারি
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">
            Marts BD ডিজাইন করা হয়েছে বাংলাদেশের ডিজিটাল ক্রেতাদের জন্য। রিয়েল-টাইম ইনভেন্টরি,
            স্বচ্ছ মূল্য এবং দ্রুত ডেলিভারির মাধ্যমে আপনার গ্রাহককে দিন প্রিমিয়াম অভিজ্ঞতা।
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onCartOpen}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-500"
            >
              জনপ্রিয় পণ্য দেখুন
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="#features"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-200 hover:text-primary-600"
            >
              কেন Marts BD?
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary-500" />
              ২৪/৭ সাপোর্ট
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary-500" />
              তাৎক্ষণিক ডেলিভারি
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary-500" />
              MFS পেমেন্ট সাপোর্ট
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-6 top-6 h-24 w-24 rounded-full bg-primary-200/40 blur-3xl" />
          <div className="absolute -right-6 bottom-6 h-24 w-24 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-primary-500/10">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-primary-600">লাইভ অর্ডার আপডেট</p>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p>• Canva Pro 1 Year — সফল ডেলিভারি ✅</p>
                  <p>• Netflix UHD Profile — পেমেন্ট কনফার্ম হচ্ছে ⏳</p>
                  <p>• Grammarly Premium — নতুন অর্ডার</p>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-5 text-white">
                <p className="text-sm uppercase tracking-wide">আজকের অফার</p>
                <p className="mt-3 text-2xl font-bold">Envato Elements মাত্র ৳১২০০</p>
                <p className="mt-2 text-sm text-primary-100">লাইসেন্স কী তাৎক্ষণিক পাঠানো হবে</p>
              </div>
              <div className="rounded-2xl border border-dashed border-primary-200 p-4 text-sm text-slate-500">
                <p className="font-semibold text-primary-600">গ্রাহক আস্থা</p>
                <p className="mt-2">৫,০০০+ অর্ডার ও ৪.৯★ রেটিং এর গর্বিত মালিক</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { paymentMethods } from '../lib/mockData.js'

export const PaymentOptions = () => {
  return (
    <section id="payments" className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">বাংলাদেশের জনপ্রিয় পেমেন্ট মেথড</h2>
            <p className="mt-3 text-sm text-slate-500">
              গ্রাহকের সুবিধার কথা মাথায় রেখে Marts BD সম্পূর্ণভাবে MFS কেন্দ্রিক। প্রতিটি অর্ডারের জন্য স্পষ্ট নির্দেশনা ও কনফার্মেশন প্রসেস দেওয়া হয়।
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center shadow-sm"
                >
                  <div className="text-3xl">{method.icon}</div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{method.label}</h3>
                  <p className="mt-2 text-xs text-slate-500">{method.instructions}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-500 to-primary-600 p-8 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-primary-100">চেকআউট ফ্লো</p>
            <h3 className="mt-4 text-2xl font-semibold">৩ ধাপে দ্রুত অর্ডার</h3>
            <ol className="mt-6 space-y-4 text-sm text-primary-50">
              <li>
                <span className="font-semibold text-white">১. পণ্য নির্বাচন</span> — কার্টে অ্যাড করুন এবং অর্ডার সারাংশ নিশ্চিত করুন।
              </li>
              <li>
                <span className="font-semibold text-white">২. কনট্যাক্ট &amp; পেমেন্ট</span> — নাম, মোবাইল, ইমেইল এবং পেমেন্ট মেথড নির্বাচন করুন।
              </li>
              <li>
                <span className="font-semibold text-white">৩. ডেলিভারি</span> — পেমেন্ট কনফার্ম হলেই লাইসেন্স কি / সাবস্ক্রিপশন ইনস্ট্যান্ট ডেলিভারি।
              </li>
            </ol>
            <div className="mt-8 rounded-2xl bg-white/10 p-4 text-sm">
              <p className="font-semibold text-white">নিরাপত্তা সেকশন</p>
              <p className="mt-2 text-primary-100">
                প্রতিটি পেমেন্টের পর স্বয়ংক্রিয় টিকেট জেনারেট হয়। অ্যাডমিন প্যানেল থেকে অর্ডারের স্ট্যাটাস আপডেট করা যায়।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { BadgeCheck, CloudLightning, Database, LayoutDashboard, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: LayoutDashboard,
    title: 'ডায়নামিক প্রোডাক্ট গ্রিড',
    description: 'Firestore থেকে রিয়েল-টাইম ডাটা নিয়ে স্বয়ংক্রিয়ভাবে পণ্য আপডেট প্রদর্শন।',
  },
  {
    icon: Database,
    title: 'স্মার্ট ইনভেন্টরি ম্যানেজমেন্ট',
    description: 'CRUD সাপোর্ট সহ অ্যাডমিন প্যানেল যার মাধ্যমে কোড ছাড়াই ইনভেন্টরি পরিচালনা।',
  },
  {
    icon: CloudLightning,
    title: 'সুপার ফাস্ট লোডিং',
    description: 'React + Vite + Tailwind আর্কিটেকচারে মিলিসেকেন্ডে পেজ লোড ও স্মুথ অভিজ্ঞতা।',
  },
  {
    icon: ShieldCheck,
    title: 'নিরাপদ পেমেন্ট ফ্লো',
    description: 'Bkash, Nagad, Rocket সহ জনপ্রিয় MFS সার্ভিস দিয়ে সহজ পেমেন্ট নির্দেশনা।',
  },
  {
    icon: BadgeCheck,
    title: 'অর্ডার ট্র্যাকিং',
    description: 'অ্যাডমিন প্যানেল থেকে অর্ডার স্ট্যাটাস পরিবর্তন ও গ্রাহককে ইনস্ট্যান্ট আপডেট।',
  },
]

export const FeatureHighlights = () => {
  return (
    <section id="features" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">কেন গ্রাহকরা Marts BD পছন্দ করে</h2>
          <p className="mt-2 text-sm text-slate-500">
            ইউজার এক্সপেরিয়েন্স, নিরাপত্তা ও পারফরম্যান্সের আদর্শ সমন্বয়ে তৈরি সম্পূর্ণ সমাধান।
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <feature.icon className="h-10 w-10 text-primary-500" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

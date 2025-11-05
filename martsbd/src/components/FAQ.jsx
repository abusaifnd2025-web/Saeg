const faqs = [
  {
    question: 'পেমেন্ট করার কতক্ষণ পর পণ্য ডেলিভারি পাব?',
    answer:
      'Bkash / Nagad / Rocket পেমেন্ট কনফার্ম হলেই ১০-১৫ মিনিটের মধ্যে আপনার ইমেইলে লাইসেন্স কী পাঠানো হবে। বিশেষ ক্ষেত্রে সর্বোচ্চ ১ ঘণ্টা লাগতে পারে।',
  },
  {
    question: 'আমি কি ট্রায়াল বা শেয়ার্ড অ্যাকাউন্ট পাব?',
    answer:
      'আমাদের সকল সাবস্ক্রিপশন অফিসিয়াল পেইড অ্যাকাউন্ট থেকে ম্যানেজ করা হয়। আপনার জন্য ব্যক্তিগত বা সিকিউর প্রোফাইল আমরা অ্যাসাইন করি।',
  },
  {
    question: 'অ্যাডমিন প্যানেলে কিভাবে প্রবেশ করব?',
    answer:
      'অ্যাডমিন প্যানেলে প্রবেশ করতে প্রিসেট পাসকোড ব্যবহার করতে হবে। নিরাপত্তার জন্য .env ফাইলে আপনার নিজস্ব পাসকোড সেট করুন।',
  },
  {
    question: 'পণ্য শিপ স্ট্যাটাস কোথায় দেখব?',
    answer:
      'অ্যাডমিন প্যানেল থেকে প্রতিটি অর্ডারের স্ট্যাটাস (Pending, Processing, Completed) ম্যানেজ করা যায়। গ্রাহক ইমেইলে আপডেট পেয়ে থাকবেন।',
  },
]

export const FAQ = () => {
  return (
    <section id="contact" className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">প্রায়শই জিজ্ঞাসিত প্রশ্ন</h2>
          <p className="mt-2 text-sm text-slate-300">
            আরও প্রশ্ন থাকলে আমাদের সাপোর্ট টিম ২৪/৭ প্রস্তুত। Messenger / WhatsApp-এ ইনবক্স করুন।
          </p>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-primary-400/60"
            >
              <summary className="cursor-pointer text-lg font-semibold text-white group-open:text-primary-200">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-slate-200">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

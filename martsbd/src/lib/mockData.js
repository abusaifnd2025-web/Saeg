export const mockProducts = [
  {
    id: '1',
    name: 'Premium Canva Pro Subscription',
    price: 850,
    category: 'Design Tools',
    description: 'Access Canva Pro features with team sharing, brand kits, and unlimited storage for 12 months.',
    imageUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Envato Elements Shared Account',
    price: 1200,
    category: 'Creative Assets',
    description: 'Unlimited digital assets, fonts, templates, and stock media with a shared monthly plan.',
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Grammarly Premium 3-Month Access',
    price: 650,
    category: 'Productivity',
    description: 'Advanced grammar checking, plagiarism detection, and tone suggestions for professional writing.',
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Netflix UHD Shared Profile',
    price: 550,
    category: 'Entertainment',
    description: '4K UHD streaming on Netflix with dedicated profile management and monthly renewal.',
    imageUrl:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
]

export const mockOrders = []

export const paymentMethods = [
  {
    id: 'bkash',
    label: 'Bkash',
    icon: '🇧🇩',
    instructions: 'Bkash Personal: 01XXXXXXXXX. Send money with reference “MartsBD”.',
  },
  {
    id: 'nagad',
    label: 'Nagad',
    icon: '💳',
    instructions: 'Nagad Merchant: 01XXXXXXXXX. Use your order ID in the reference.',
  },
  {
    id: 'rocket',
    label: 'Rocket',
    icon: '🚀',
    instructions: 'Rocket Agent: 01XXXXXXXXX. Confirm payment via screenshot upload.',
  },
]

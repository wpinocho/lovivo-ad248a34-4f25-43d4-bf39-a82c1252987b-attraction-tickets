import { supabase } from './supabase'
import { STORE_ID } from './config'

/**
 * Backend Setup Utilities
 * Use these functions to configure your store's backend
 */

// Store Settings Configuration
export const setupStoreSettings = async () => {
  const settings = {
    store_id: STORE_ID,
    currency_code: 'USD',
    store_language: 'en',
    date_format: 'MM/DD/YYYY',
    
    // Shipping Coverage - US States
    shipping_coverage: {
      countries: [
        {
          name: 'United States',
          code: 'US',
          states: [
            'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
            'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
            'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
            'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
            'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
            'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
          ],
          shipping_rates: {
            'Florida': { base: 0, per_item: 0 },
            'California': { base: 5, per_item: 0 },
            'New York': { base: 5, per_item: 0 },
            'Texas': { base: 5, per_item: 0 },
            // Default for other states
            'default': { base: 5, per_item: 0 }
          }
        }
      ]
    },
    
    // Pickup Locations - Will Call options
    pickup_locations: [
      {
        id: 'orlando-office',
        name: 'Orlando Will Call Center',
        address: '5483 International Drive, Orlando, FL 32819',
        hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
        instructions: 'Pick up your tickets at our Orlando location. Bring valid ID and order confirmation.'
      },
      {
        id: 'miami-office',
        name: 'Miami Will Call Center',
        address: '1401 Brickell Ave, Miami, FL 33131',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat-Sun: 10:00 AM - 4:00 PM',
        instructions: 'Pick up your tickets at our Miami location. Bring valid ID and order confirmation.'
      }
    ],
    
    // Delivery Expectations
    delivery_expectations: [
      {
        id: 'standard-email',
        name: 'Email Delivery (Recommended)',
        description: 'Tickets delivered to your email within 1 hour',
        eta: 'Within 1 hour',
        price: 0,
        hasPrice: false
      },
      {
        id: 'express-mail',
        name: 'Express Shipping',
        description: 'Physical tickets shipped via FedEx Express',
        eta: '1-2 business days',
        price: 19.99,
        hasPrice: true
      },
      {
        id: 'standard-mail',
        name: 'Standard Shipping',
        description: 'Physical tickets via USPS Priority Mail',
        eta: '3-5 business days',
        price: 9.99,
        hasPrice: true
      }
    ],
    
    // Social Links
    social_links: {
      facebook: 'https://facebook.com/tickethub',
      instagram: 'https://instagram.com/tickethub',
      twitter: 'https://twitter.com/tickethub',
      youtube: 'https://youtube.com/@tickethub'
    },
    
    // Logos
    logos: {
      main: '/logo.jpg',
      icon: '/logo.jpg'
    }
  }

  // Upsert store settings
  const { data, error } = await supabase
    .from('store_settings')
    .upsert(settings, { onConflict: 'store_id' })
    .select()
    .single()

  if (error) {
    console.error('Error setting up store settings:', error)
    throw error
  }

  console.log('✅ Store settings configured:', data)
  return data
}

// Create Discount Codes
export const createDiscountCodes = async () => {
  const discounts = [
    {
      store_id: STORE_ID,
      code: 'WELCOME10',
      title: 'Welcome Discount',
      description: '10% off your first order',
      discount_type: 'percentage',
      value: 10,
      active: true,
      minimum_amount: 0
    },
    {
      store_id: STORE_ID,
      code: 'SUMMER20',
      title: 'Summer Sale',
      description: '20% off all tickets',
      discount_type: 'percentage',
      value: 20,
      active: true,
      minimum_amount: 100
    },
    {
      store_id: STORE_ID,
      code: 'FAMILY25',
      title: 'Family Package Deal',
      description: '$25 off orders over $200',
      discount_type: 'fixed_amount',
      value: 25,
      active: true,
      minimum_amount: 200
    },
    {
      store_id: STORE_ID,
      code: 'SAVE50',
      title: 'Big Savings',
      description: '$50 off orders over $300',
      discount_type: 'fixed_amount',
      value: 50,
      active: true,
      minimum_amount: 300
    }
  ]

  const results = []
  for (const discount of discounts) {
    const { data, error } = await supabase
      .from('discounts')
      .upsert(discount, { onConflict: 'store_id,code' })
      .select()
      .single()

    if (error) {
      console.error(`Error creating discount ${discount.code}:`, error)
    } else {
      console.log(`✅ Created discount: ${discount.code}`)
      results.push(data)
    }
  }

  return results
}

// Setup all backend features at once
export const setupBackend = async () => {
  console.log('🚀 Setting up backend...')
  
  try {
    const settings = await setupStoreSettings()
    const discounts = await createDiscountCodes()
    
    console.log('✅ Backend setup complete!')
    return {
      settings,
      discounts,
      success: true
    }
  } catch (error) {
    console.error('❌ Backend setup failed:', error)
    throw error
  }
}

// Stripe Payment Configuration Helper
export const stripeConfig = {
  // Payment methods to enable
  paymentMethods: ['card'],
  
  // Currency
  currency: 'usd',
  
  // Success/Cancel URLs (update these for your domain)
  getSuccessUrl: (orderId: string) => `${window.location.origin}/thank-you/${orderId}`,
  getCancelUrl: () => `${window.location.origin}/checkout`,
  
  // Stripe fee structure (for reference)
  fees: {
    percentage: 2.9,
    fixed: 0.30
  }
}

// Tax Configuration (add tax rates as needed)
export const taxConfig = {
  // US tax rates by state (example - update with actual rates)
  rates: {
    'Florida': 0.06,
    'California': 0.0725,
    'New York': 0.04,
    'Texas': 0.0625,
    // Add more states as needed
  },
  
  // Default tax rate if state not found
  default: 0.00 // Attraction tickets often tax-exempt or included in price
}
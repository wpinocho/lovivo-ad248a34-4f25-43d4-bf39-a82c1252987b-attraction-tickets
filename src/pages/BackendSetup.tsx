import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { setupBackend } from '@/lib/backend-setup'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle2, Settings, Tag, CreditCard, MapPin, Mail } from 'lucide-react'

/**
 * Backend Setup Page
 * Run this once to configure your store's backend settings
 */

export default function BackendSetup() {
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const { toast } = useToast()

  const handleSetup = async () => {
    setLoading(true)
    try {
      await setupBackend()
      setCompleted(true)
      toast({
        title: 'Backend Setup Complete! 🎉',
        description: 'Your store is now fully configured and ready to accept orders.',
        duration: 5000
      })
    } catch (error) {
      console.error('Setup error:', error)
      toast({
        title: 'Setup Failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <EcommerceTemplate>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Backend Setup</h1>
            <p className="text-muted-foreground text-lg">
              Configure your attraction tickets store backend
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            {/* Store Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Store Settings</CardTitle>
                    <CardDescription>Currency, language, and regional settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Currency: USD
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Language: English
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Date Format: MM/DD/YYYY
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Shipping Configuration */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Shipping & Delivery</CardTitle>
                    <CardDescription>Ticket delivery methods and pickup locations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Email Delivery (Free, within 1 hour)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Express Shipping ($19.99, 1-2 days)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Standard Shipping ($9.99, 3-5 days)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Will Call: Orlando & Miami locations
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Discount Codes */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Tag className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Discount Codes</CardTitle>
                    <CardDescription>Promotional codes for customer savings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <strong>WELCOME10</strong> - 10% off first order
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <strong>SUMMER20</strong> - 20% off $100+ orders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <strong>FAMILY25</strong> - $25 off $200+ orders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <strong>SAVE50</strong> - $50 off $300+ orders
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Payment Processing */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 p-2 rounded-lg">
                    <CreditCard className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <CardTitle>Payment Processing</CardTitle>
                    <CardDescription>Stripe integration for secure payments</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Stripe configured and ready
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Credit/Debit cards accepted
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Secure checkout with SSL
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    PCI compliant payment processing
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Order Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Order Notifications</CardTitle>
                    <CardDescription>Automatic email confirmations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Order confirmation emails
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Ticket delivery emails
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    Order status updates
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Setup Button */}
          <div className="text-center">
            {!completed ? (
              <div className="space-y-4">
                <Button
                  size="lg"
                  onClick={handleSetup}
                  disabled={loading}
                  className="text-lg px-8 py-6"
                >
                  {loading ? 'Setting up...' : '🚀 Setup Backend Now'}
                </Button>
                <p className="text-sm text-muted-foreground">
                  This will configure all backend settings for your store
                </p>
              </div>
            ) : (
              <div className="bg-success/10 border-2 border-success rounded-lg p-8">
                <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-success mb-2">Setup Complete! 🎉</h2>
                <p className="text-muted-foreground mb-4">
                  Your store is now fully configured and ready to accept orders.
                </p>
                <Button
                  size="lg"
                  onClick={() => window.location.href = '/'}
                  className="mt-4"
                >
                  Go to Store
                </Button>
              </div>
            )}
          </div>

          {/* Documentation */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">What Gets Configured:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Store Settings:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Currency (USD)</li>
                  <li>• US shipping zones (all 50 states)</li>
                  <li>• Pickup locations (Orlando, Miami)</li>
                  <li>• Delivery methods (email, express, standard)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Marketing:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Discount codes (4 promo codes)</li>
                  <li>• Social media links</li>
                  <li>• Newsletter integration ready</li>
                  <li>• Customer accounts enabled</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EcommerceTemplate>
  )
}
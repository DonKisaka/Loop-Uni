import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Users, Recycle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-800 font-medium mb-4">
                Student-Exclusive Marketplace
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Campus Trading
                <span className="block text-indigo-600 mt-2">Made Simple</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-4">
                Buy and sell pre-loved goods within Daystar University&apos;s trusted student community. 
                Safe, sustainable, and convenient transactions right on campus.
              </p>
            </div>
            <div className="space-x-4 mt-6">
              <Link href="/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Made by Students, for Students
            </h2>
            <p className="mt-4 text-gray-600 md:text-lg max-w-[700px] mx-auto">
              Everything you need to buy and sell safely within your campus community
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 lg:gap-12 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold">Trusted Community</h3>
              <p className="text-gray-600">
                Connect with verified Daystar students. No strangers, just fellow students who understand your needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all">
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Safe & Local</h3>
              <p className="text-gray-600">
                Meet on campus, verify transactions with codes, and complete deals safely within your community.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Recycle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold">Sustainable Choice</h3>
              <p className="text-gray-600">
                Give items a second life and reduce waste. Help build a circular economy on campus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Trading?
              </h2>
              <p className="mx-auto max-w-[600px] text-indigo-100 md:text-xl">
                Join hundreds of Daystar students buying and selling on campus. It&apos;s free and takes less than a minute to sign up.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/signup">
                <Button size="lg" variant="outline" className="bg-white cursor-pointer
                 text-indigo-600 hover:bg-gray-100 border-white">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              How It Works
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-4 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-2">
                1
              </div>
              <h3 className="font-semibold">Sign Up</h3>
              <p className="text-sm text-gray-600">
                Verify your Daystar email to join the marketplace
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-2">
                2
              </div>
              <h3 className="font-semibold">List or Browse</h3>
              <p className="text-sm text-gray-600">
                Post items or explore categories tailored to students
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-2">
                3
              </div>
              <h3 className="font-semibold">Connect & Chat</h3>
              <p className="text-sm text-gray-600">
                Message sellers or buyers directly to arrange meetup
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl mb-2">
                4
              </div>
              <h3 className="font-semibold">Complete Deal</h3>
              <p className="text-sm text-gray-600">
                Meet safely on campus and finalize the transaction
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

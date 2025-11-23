import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className='w-full border-b border-gray-200 bg-white shadow-md py-2 max-md:hidden'>
        <div className='container mx-auto px-4 flex gap-10 items-center'>
            <Link href="/">
                <Image src="/loopuni.png" alt="LoopUni Logo" width={50} height={50} />
            </Link>

            <div className='flex items-center gap-4 ml-auto'>
                <div className='flex items-center space-x-4'>
                    <Link href="/signin">
                        <Button variant="outline" className='cursor-pointer hover:bg-gray-100'>
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="outline" className='bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'>
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;

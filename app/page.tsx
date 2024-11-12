'use client'
import { useState, useEffect } from 'react'
import { ArrowRight, Leaf, LeafyGreen, Recycle,  Coins, MapPin, } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import bg from '/public/en.jpg'
import Link from 'next/link'

import { getRecentReports, getAllRewards, getWasteCollectionTasks } from '@/utils/db/actions'
const poppins = Poppins({ 
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

function AnimatedGlobe() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-pulse"></div>
      <div className="absolute inset-2 rounded-full bg-green-400 opacity-40 animate-ping"></div>
      <div className="absolute inset-4 rounded-full bg-green-300 opacity-60 animate-spin"></div>
      <div className="absolute inset-6 rounded-full bg-green-200 opacity-80 animate-bounce"></div>
      <LeafyGreen className="absolute inset-0 m-auto h-16 w-16 text-green-600 animate-pulse"/>
      
    </div>
  )
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [impactData, setImpactData] = useState({
    wasteCollected: 0,
    reportsSubmitted: 0,
    tokensEarned: 0,
    co2Offset: 0
  });

  

  useEffect(() => {
    async function fetchImpactData() {
      try {
        const reports = await getRecentReports(100);  
        const rewards = await getAllRewards();
        const tasks = await getWasteCollectionTasks(100);  

        const wasteCollected = tasks.reduce((total, task) => {
          const match = task.amount.match(/(\d+(\.\d+)?)/);
          const amount = match ? parseFloat(match[0]) : 0;
          return total + amount;
        }, 0);

        const reportsSubmitted = reports.length;
        const tokensEarned = rewards.reduce((total, reward) => total + (reward.points || 0), 0);
        const co2Offset = wasteCollected * 0.5;  

        setImpactData({
          wasteCollected: Math.round(wasteCollected * 10) / 10,
          reportsSubmitted,
          tokensEarned,
          co2Offset: Math.round(co2Offset * 10) / 10
        });
      } catch (error) {
        console.error("Error fetching impact data:", error);
       
        setImpactData({
          wasteCollected: 0,
          reportsSubmitted: 0,
          tokensEarned: 0,
          co2Offset: 0
        });
      }
    }

    fetchImpactData();
  }, []);

  const login = () => {
    setLoggedIn(true);
  };
  const imageStyle = {
    borderRadius: '20px',
    border: '1px solid #fff',
  }

  return (

    <div className={` bg-grey-400 container mx-auto  ${poppins.className}`}>
      <section className="text-center ">
      <h1 className="text-20 font-mideum mb-2 text-blacktracking-tight ">
         EcoSort <span className="text-green-600">Your Environment Your Responsibility</span>
      </h1>
     
      
      <Image
      className="border-l-4  border-r-4 border-blue-500"
       src={bg}
       style={imageStyle}
       width={1400}
       height={1400}
       
      alt="Picture of the author"
      />
     
     {!loggedIn ? (
          <Button onClick={login} className=" mt-4 pt-4 cursor-pointerbg-green-600 mb-8 hover:bg-green-700 text-white text-lg rounded-2 font-medium py-6 px-10  transition-all duration-300 ease-in-out transform hover:scale-105">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Link href="/report">
            <Button className=" mt-4 cursor-pointerbg-green-600 hover:bg-green-700 text-white text-lg py-6 px-10 rounded-2 font-medium transition-all duration-300 ease-in-out transform hover:scale-105">
              Report Waste
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        )}
     
      
      
       
        
      </section>
      
      
      
      <section className="bg-grey-400 p-10 rounded-3xl shadow-lg mb-20 ">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-6 border-l-4  border-r-4 border-blue-500">
          <ImpactCard title="Waste Collected" value={`${impactData.wasteCollected} kg`} icon={Recycle} />
          <ImpactCard title="Reports Submitted" value={impactData.reportsSubmitted.toString()} icon={MapPin} />
          <ImpactCard title="Tokens Earned" value={impactData.tokensEarned.toString()} icon={Coins} />
          <ImpactCard title="CO2 Offset" value={`${impactData.co2Offset} kg`} icon={Leaf} />
        </div>
      </section>

   
    </div>
  )
}

function ImpactCard({ title, value, icon: Icon }: { title: string; value: string | number; icon: React.ElementType }) {
  const formattedValue = typeof value === 'number' ? value.toLocaleString('en-US', { maximumFractionDigits: 1 }) : value;
  
  return (
    <div className="p-6 rounded-xl bg-gray-50 border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-md">
      <Icon className="h-10 w-10 text-green-500 mb-4" />
      <p className="text-3xl font-bold mb-2 text-gray-800">{formattedValue}</p>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}



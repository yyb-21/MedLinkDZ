import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import RecentAnnonces from '../components/home/RecentAnnonces';
import HowItWorks from '../components/home/HowItWorks';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <RecentAnnonces />
      <HowItWorks />
    </div>
  );
}

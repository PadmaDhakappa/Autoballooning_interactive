import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import DrawingSection from './components/DrawingSection'
import InspectionTable from './components/InspectionTable'
import Features from './components/Features'
import Benefits from './components/Benefits'
import Footer from './components/Footer'

export default function App() {
  const [selectedBalloon, setSelectedBalloon] = useState(null)

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans">
      <Navbar />
      <Hero />
      <DrawingSection
        selectedBalloon={selectedBalloon}
        setSelectedBalloon={setSelectedBalloon}
      />
      <InspectionTable
        selectedBalloon={selectedBalloon}
        setSelectedBalloon={setSelectedBalloon}
      />
      <Features />
      <Benefits />
      <Footer />
    </div>
  )
}

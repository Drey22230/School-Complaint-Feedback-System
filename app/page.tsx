import Header from './components/header';   
import Hero from './components/hero';
import HowItWorks from './components/howitworks';
import  Features from './components/features';
import Footer from './components/footer';
export default function Home() {
  return (
    <>
    <div className="bg-gray-200">
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
    </>
  );
}
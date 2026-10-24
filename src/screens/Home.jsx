import React from "react";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ContainerFinder from "@/components/home/ContainerFinder";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import AboutPreview from "@/components/home/AboutPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularProducts from "@/components/home/PopularProducts";
import ConditionGuide from "@/components/home/ConditionGuide";
import HowItWorks from "@/components/home/HowItWorks";
import DeliverySection from "@/components/home/DeliverySection";
import CustomConversions from "@/components/home/CustomConversions";
import Industries from "@/components/home/Industries";
import Locations from "@/components/home/Locations";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ContainerFinder />
      <FeaturedCategories />
      <AboutPreview />
      <WhyChooseUs />
      <PopularProducts />
      <ConditionGuide />
      <HowItWorks />
      <DeliverySection />
      <CustomConversions />
      <Industries />
      <Locations />
      <FAQ />
      <FinalCTA />
    </>
  );
}
import { About, BackgroundGrid, ContactUs, Container, FAQs, Footer, Header, Hero } from "./_components";

export default function Home() {
  return <div className="min-h-screen relative">
    <BackgroundGrid />
    {/* <GradientMeshBackground /> */}
    <Header />
    <Container>
      <Hero />
      <FAQs />
      <About />
      <ContactUs />
    </Container>

    <Footer />
  </div>
}
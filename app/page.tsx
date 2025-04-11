import Image from "next/image"
import { PhoneIcon as WhatsApp, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import CategorySection from "@/components/category-section"

// Dados de exemplo para os produtos
const bolos = [
  {
    id: "bolo-1",
    name: "Bolo de Chocolate",
    description: "Delicioso bolo de chocolate com cobertura especial",
    price: "Sob consulta",
    imageSrc: "/bolo-de-choco.jpg?height=300&width=300",
    category: "Bolos",
  },
  {
    id: "bolo-2",
    name: "Bolo de Cenoura",
    description: "Bolo de cenoura com cobertura de chocolate",
    price: "Sob consulta",
    imageSrc: "/bolo-de-cenoura.jpg?height=300&width=300",
    category: "Bolos",
  },
  {
    id: "bolo-3",
    name: "Bolo de festa",
    description: "Bolo recheado com morangos frescos e chantilly",
    price: "Sob consulta",
    imageSrc: "/bolo-de-festa-decorado.jpg?height=300&width=300",
    category: "Bolos",
  },
  {
    id: "bolo-4",
    name: "Bolo de Coco",
    description: "Bolo de coco com cobertura de leite condensado",
    price: "Sob consulta",
    imageSrc: "/bolo_coco.webp?height=300&width=300",
    category: "Bolos",
  },
]

const salgados = [
  {
    id: "salgado-1",
    name: "Coxinha",
    description: "Coxinha de frango cremosa",
    price: "Sob consulta",
    imageSrc: "/coxinha-de-frango.jpg?height=300&width=300",
    category: "Salgados",
  },
  {
    id: "salgado-2",
    name: "Empada",
    description: "Empada de frango com massa especial",
    price: "Sob consulta",
    imageSrc: "/empada.jpg?height=300&width=300",
    category: "Salgados",
  },
  {
    id: "salgado-3",
    name: "Kibe",
    description: "Kibe recheado com queijo",
    price: "Sob consulta",
    imageSrc: "/kibe.jpg?height=300&width=300",
    category: "Salgados",
  },
  {
    id: "salgado-4",
    name: "Pastel",
    description: "Pastel de carne com massa crocante",
    price: "Sob consulta",
    imageSrc: "/pastel-de-carne.jpg?height=300&width=300",
    category: "Salgados",
  },
]

const doces = [
  {
    id: "doce-1",
    name: "Brigadeiro",
    description: "Brigadeiro gourmet com chocolate belga",
    price: "Sob consulta",
    imageSrc: "/brigadeiro.jpg?height=300&width=300",
    category: "Doces",
  },
  {
    id: "doce-2",
    name: "Pudim",
    description: "Pudim de leite condensado cremoso",
    price: "Sob consulta",
    imageSrc: "/pudim.jpg?height=300&width=300",
    category: "Doces",
  },
  {
    id: "doce-3",
    name: "Mousse de Maracujá",
    description: "Mousse de maracujá com calda especial",
    price: "Sob consulta",
    imageSrc: "/mouse-de-maracuja.jpg?height=300&width=300",
    category: "Doces",
  },
  {
    id: "doce-4",
    name: "Beijinho",
    description: "Beijinho de coco com cravinho",
    price: "Sob consulta",
    imageSrc: "/beijinho-de-coco-2.webp?height=300&width=300",
    category: "Doces",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none text-white mb-6">
            Deliciosos <span className="text-kln-green">Bolos, Salgados e Doces</span> para Todas as Ocasiões
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
            Sabor e qualidade que você só encontra na KLN-Lanches. Aceitamos encomendas para festas e eventos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-kln-green hover:bg-kln-green/80 text-black font-bold" size="lg" asChild>
              <a href="#produtos">Ver Produtos</a>
            </Button>
            <Button
              variant="outline"
              className="border-kln-green text-kln-green hover:bg-kln-green/10"
              size="lg"
              asChild
            >
              <a href="https://wa.me/5561992639087" target="_blank" rel="noopener noreferrer">
                <WhatsApp className="mr-2 h-5 w-5" />
                Fazer Pedido
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Produtos Destaque */}
      <section id="produtos" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-kln-green">
              Nossos Produtos
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Confira nossa variedade de produtos feitos com ingredientes selecionados e muito carinho.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-lg border border-kln-green/20 bg-black text-white">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 group-hover:from-black/70 group-hover:to-black/90 transition-all duration-300" />
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/bolofesta.jpg?height=300&width=500"
                  alt="Bolos"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="relative p-6">
                <h3 className="text-2xl font-bold text-kln-green mb-2">Bolos</h3>
                <p className="text-gray-300 mb-4">Bolos deliciosos para aniversários, festas e ocasiões especiais.</p>
                <Button className="bg-kln-green hover:bg-kln-green/80 text-black font-bold" asChild>
                  <a href="#bolos">Ver Bolos</a>
                </Button>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border border-kln-green/20 bg-black text-white">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 group-hover:from-black/70 group-hover:to-black/90 transition-all duration-300" />
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/varios_salgados.jpg?height=300&width=500"
                  alt="Salgados"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="relative p-6">
                <h3 className="text-2xl font-bold text-kln-green mb-2">Salgados</h3>
                <p className="text-gray-300 mb-4">Salgados fresquinhos e saborosos para seu lanche ou evento.</p>
                <Button className="bg-kln-green hover:bg-kln-green/80 text-black font-bold" asChild>
                  <a href="#salgados">Ver Salgados</a>
                </Button>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border border-kln-green/20 bg-black text-white">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 group-hover:from-black/70 group-hover:to-black/90 transition-all duration-300" />
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/docefesta.jpg?height=300&width=500"
                  alt="Doces"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="relative p-6">
                <h3 className="text-2xl font-bold text-kln-green mb-2">Doces</h3>
                <p className="text-gray-300 mb-4">Doces irresistíveis para adoçar seu dia ou sua festa.</p>
                <Button className="bg-kln-green hover:bg-kln-green/80 text-black font-bold" asChild>
                  <a href="#doces">Ver Doces</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bolos Section */}
      <CategorySection
        id="bolos"
        title="Bolos"
        description="Nossos bolos são preparados com ingredientes selecionados e muito carinho. Perfeitos para qualquer ocasião."
      >
        {bolos.map((bolo) => (
          <ProductCard key={bolo.id} {...bolo} />
        ))}
      </CategorySection>

      {/* Salgados Section */}
      <CategorySection
        id="salgados"
        title="Salgados"
        description="Salgados fresquinhos e saborosos, feitos diariamente para garantir a melhor qualidade."
      >
        {salgados.map((salgado) => (
          <ProductCard key={salgado.id} {...salgado} />
        ))}
      </CategorySection>

      {/* Doces Section */}
      <CategorySection
        id="doces"
        title="Doces"
        description="Doces deliciosos para adoçar seu dia ou complementar sua festa com muito sabor."
      >
        {doces.map((doce) => (
          <ProductCard key={doce.id} {...doce} />
        ))}
      </CategorySection>

      {/* Encomendas Section */}
      <section id="encomendas" className="py-12 md:py-16 bg-black text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-kln-green mb-4">
                Faça sua Encomenda
              </h2>
              <p className="text-gray-300 mb-6">
                Aceitamos encomendas para festas, eventos corporativos, aniversários e ocasiões especiais. Entre em
                contato conosco pelo WhatsApp e faça seu pedido com antecedência.
              </p>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-start">
                  <span className="text-kln-green mr-2">✓</span>
                  <span>Bolos personalizados para aniversários</span>
                </li>
                <li className="flex items-start">
                  <span className="text-kln-green mr-2">✓</span>
                  <span>Kits de salgados para festas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-kln-green mr-2">✓</span>
                  <span>Doces para eventos corporativos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-kln-green mr-2">✓</span>
                  <span>Opções para lanchar e tomar café com pão de queijo quentinho na hora</span>
                </li>
              </ul>
              <Button className="bg-kln-green hover:bg-kln-green/80 text-black font-bold" size="lg" asChild>
                <a href="https://wa.me/5561992639087" target="_blank" rel="noopener noreferrer">
                  <WhatsApp className="mr-2 h-5 w-5" />
                  Fazer Pedido pelo WhatsApp
                </a>
              </Button>
            </div>
            <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] rounded-lg overflow-hidden">
              <Image src="/whatsapp-icon.png?height=600&width=600" alt="Encomendas" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-kln-green">
              Onde Nos Encontrar
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Visite nossa loja ou entre em contato para fazer seu pedido.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black text-white rounded-lg p-6 border border-kln-green/20">
              <h3 className="text-xl font-bold text-kln-green mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <WhatsApp className="h-5 w-5 mr-3 text-kln-green" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-gray-300">(61) 99263-9087</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-kln-green" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-gray-300">
                      Quadra P loja 2, Chácara 21
                      <br />
                      Setor Coimbra
                      <br />
                      Águas de Goiás - GO
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!4v1744393312307!6m8!1m7!1syE1bXSe01uH7JR8Fz_-CXA!2m2!1d-15.74747314551815!2d-48.25150129707544!3f293.75906!4f0!5f0.7820865974627469"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Localização KLN Lanches"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: string
  imageSrc: string
  category: string
}

export default function ProductCard({ id, name, description, price, imageSrc, category }: ProductCardProps) {
  // Função para formatar o link do WhatsApp com a mensagem
  const formatWhatsAppLink = () => {
    const message = `Olá! Gostaria de encomendar: ${name} (${category}) por ${price}`
    return `https://wa.me/5561992639087?text=${encodeURIComponent(message)}`
  }

  return (
    <Card className="product-card overflow-hidden border border-kln-green/20 bg-black text-white">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold text-kln-green">{name}</CardTitle>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-xl font-bold text-white">{price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-kln-green hover:bg-kln-green/80 text-black font-bold" asChild>
          <a href={formatWhatsAppLink()} target="_blank" rel="noopener noreferrer">
            Encomendar
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}


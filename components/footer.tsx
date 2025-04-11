import Link from "next/link"
import { Facebook, Instagram, MapPin, Phone, PhoneIcon as WhatsApp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-kln-green/20">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-kln-green mb-4">KLN-Lanches</h3>
            <p className="text-gray-300 mb-4">
              Deliciosos bolos, salgados e doces para todas as ocasiões. Aceitamos encomendas!
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-gray-300 hover:text-kln-green"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-300 hover:text-kln-green"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://wa.me/5561992639087"
                className="text-gray-300 hover:text-kln-green"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <WhatsApp className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>

          </div>
          <div>
            <h3 className="text-lg font-bold text-kln-green mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-kln-green" />
                <p className="text-gray-300">WhatsApp: (61) 99263-9087</p>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-kln-green" />
                <p className="text-gray-300">
                  Quadra P loja, Chácara 21
                  <br />
                  Setor Coimbra
                  <br />
                  Águas de Goiás - GO
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-kln-green mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Segunda a Sexta: 8h às 19h</li>
              <li>Sábado: 8h às 18h</li>
              
            </ul>
          </div>
        </div>
        <div className="border-t border-kln-green/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KLN-Lanches. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}


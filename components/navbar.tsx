"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-kln-green/20">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden">
            {/* Placeholder para logo - substituir com a logo real */}
            <div className="absolute inset-0 flex items-center justify-center bg-kln-green text-black font-bold text-xl rounded-full">
              KLN
            </div>
          </div>
          <span className="text-xl font-bold text-white">KLN-Lanches</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="#produtos" className="text-sm font-medium text-white hover:text-kln-green transition-colors">
            Produtos
          </Link>
          <Link href="#bolos" className="text-sm font-medium text-white hover:text-kln-green transition-colors">
            Bolos
          </Link>
          <Link href="#salgados" className="text-sm font-medium text-white hover:text-kln-green transition-colors">
            Salgados
          </Link>
          <Link href="#doces" className="text-sm font-medium text-white hover:text-kln-green transition-colors">
            Doces
          </Link>
          <Link href="#encomendas" className="text-sm font-medium text-white hover:text-kln-green transition-colors">
            Encomendas
          </Link>
          <Link href="#contato" className="text-sm font-medium text-white hover:text-kln-green transition-colors">
            Contato
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-kln-green"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black border-b border-kln-green/20 p-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                href="#produtos"
                className="text-sm font-medium text-white hover:text-kln-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </Link>
              <Link
                href="#bolos"
                className="text-sm font-medium text-white hover:text-kln-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Bolos
              </Link>
              <Link
                href="#salgados"
                className="text-sm font-medium text-white hover:text-kln-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Salgados
              </Link>
              <Link
                href="#doces"
                className="text-sm font-medium text-white hover:text-kln-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Doces
              </Link>
              <Link
                href="#encomendas"
                className="text-sm font-medium text-white hover:text-kln-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Encomendas
              </Link>
              <Link
                href="#contato"
                className="text-sm font-medium text-white hover:text-kln-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


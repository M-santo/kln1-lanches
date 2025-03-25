import type { ReactNode } from "react"

interface CategorySectionProps {
  id: string
  title: string
  description: string
  children: ReactNode
}

export default function CategorySection({ id, title, description, children }: CategorySectionProps) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-kln-green">{title}</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{children}</div>
      </div>
    </section>
  )
}


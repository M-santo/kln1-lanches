"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Globe, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data para top sites com domínio PPDF
const mockTopSites = [
  {
    id: 1,
    domain: "www.ppdf.df.gov.br",
    visits: 1250,
    bandwidth: "2.5 GB",
    users: 85,
    avgTime: "2m 15s",
  },
  {
    id: 2,
    domain: "intranet.ppdf.df.gov.br",
    visits: 980,
    bandwidth: "1.8 GB",
    users: 72,
    avgTime: "8m 40s",
  },
  {
    id: 3,
    domain: "mail.ppdf.df.gov.br",
    visits: 850,
    bandwidth: "1.2 GB",
    users: 65,
    avgTime: "5m 10s",
  },
  {
    id: 4,
    domain: "google.com",
    visits: 720,
    bandwidth: "3.7 GB",
    users: 48,
    avgTime: "4m 25s",
  },
  {
    id: 5,
    domain: "youtube.com",
    visits: 580,
    bandwidth: "15.8 GB",
    users: 42,
    avgTime: "3m 15s",
  },
  {
    id: 6,
    domain: "sistemas.ppdf.df.gov.br",
    visits: 450,
    bandwidth: "0.9 GB",
    users: 35,
    avgTime: "6m 50s",
  },
  {
    id: 7,
    domain: "gov.br",
    visits: 320,
    bandwidth: "0.7 GB",
    users: 28,
    avgTime: "5m 20s",
  },
  {
    id: 8,
    domain: "sei.df.gov.br",
    visits: 290,
    bandwidth: "0.8 GB",
    users: 25,
    avgTime: "3m 45s",
  },
  {
    id: 9,
    domain: "files.ppdf.df.gov.br",
    visits: 260,
    bandwidth: "2.1 GB",
    users: 22,
    avgTime: "5m 30s",
  },
  {
    id: 10,
    domain: "portal.ppdf.df.gov.br",
    visits: 230,
    bandwidth: "0.7 GB",
    users: 20,
    avgTime: "2m 50s",
  },
]

export default function TopSites() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("visits")
  const [sortDirection, setSortDirection] = useState("desc")
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  // Filter sites based on search term
  const filteredSites = mockTopSites.filter((site) => {
    return site.domain.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Sort sites based on sort field and direction
  const sortedSites = [...filteredSites].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1
    } else {
      return a[sortField] < b[sortField] ? 1 : -1
    }
  })

  // Paginate sites
  const paginatedSites = sortedSites.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const totalPages = Math.ceil(filteredSites.length / itemsPerPage)

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Get max visits for progress bar
  const maxVisits = Math.max(...mockTopSites.map((site) => site.visits))

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar sites..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                  onClick={() => handleSort("domain")}
                >
                  Domínio
                  {sortField === "domain" &&
                    (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                  onClick={() => handleSort("visits")}
                >
                  Visitas
                  {sortField === "visits" &&
                    (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                  onClick={() => handleSort("bandwidth")}
                >
                  Tráfego
                  {sortField === "bandwidth" &&
                    (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                  onClick={() => handleSort("users")}
                >
                  Usuários
                  {sortField === "users" &&
                    (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 p-0 h-auto font-semibold"
                  onClick={() => handleSort("avgTime")}
                >
                  Tempo Médio
                  {sortField === "avgTime" &&
                    (sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSites.length > 0 ? (
              paginatedSites.map((site, index) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">{(page - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className={site.domain.includes("ppdf.df.gov.br") ? "font-medium text-blue-600" : ""}>
                        {site.domain}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{site.visits.toLocaleString()}</div>
                      <Progress value={(site.visits / maxVisits) * 100} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>{site.bandwidth}</TableCell>
                  <TableCell>{site.users}</TableCell>
                  <TableCell>{site.avgTime}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum site encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <div className="text-sm text-muted-foreground">
            Página {page} de {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </div>
      )}
    </div>
  )
}


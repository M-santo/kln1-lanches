"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Clock, Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data para incidentes específicos da rede PPDF com datas atualizadas para 2025
const mockIncidents = [
  {
    id: "INC-001",
    type: "Queda de Conexão",
    host: "Router Principal (10.248.138.40)",
    location: "Sala de Servidores",
    time: "2025-03-20 14:32",
    duration: "5m 23s",
    cause: "Sobrecarga de Tráfego",
    resolution: "Reinício Automático",
    status: "resolved",
  },
  {
    id: "INC-002",
    type: "Latência Alta",
    host: "Switch Core (10.248.138.6)",
    location: "Rack 2, Andar 1",
    time: "2025-03-22 09:15",
    duration: "12m 07s",
    cause: "Configuração Incorreta",
    resolution: "Ajuste de QoS",
    status: "resolved",
  },
  {
    id: "INC-003",
    type: "Perda de Pacotes",
    host: "Servidor de Arquivos (10.248.138.12)",
    location: "Datacenter",
    time: "2025-03-23 16:45",
    duration: "8m 52s",
    cause: "Interface de Rede Defeituosa",
    resolution: "Substituição de Hardware",
    status: "resolved",
  },
  {
    id: "INC-004",
    type: "DNS Indisponível",
    host: "Servidor DNS (10.248.138.11)",
    location: "Rack 1, Andar 1",
    time: "2025-03-24 11:20",
    duration: "15m 30s",
    cause: "Serviço Travado",
    resolution: "Reinício do Serviço",
    status: "resolved",
  },
  {
    id: "INC-005",
    type: "Queda de Conexão",
    host: "Router Andar 1 (10.248.138.42)",
    location: "Área de Escritório",
    time: "2025-03-24 13:05",
    duration: "3m 45s",
    cause: "Interferência de Sinal",
    resolution: "Mudança de Canal",
    status: "resolved",
  },
  {
    id: "INC-006",
    type: "Degradação de Desempenho",
    host: "Firewall (10.248.138.5)",
    location: "Sala de Servidores",
    time: "2025-03-24 10:30",
    duration: "25m 12s",
    cause: "Ataque DDoS",
    resolution: "Bloqueio de IPs Maliciosos",
    status: "resolved",
  },
  {
    id: "INC-007",
    type: "Falha de DHCP",
    host: "Servidor DHCP (10.248.138.10)",
    location: "Datacenter",
    time: "2025-03-25 08:45",
    duration: "10m 18s",
    cause: "Pool de IPs Esgotado",
    resolution: "Expansão do Range de IPs",
    status: "resolved",
  },
  {
    id: "INC-008",
    type: "Servidor Offline",
    host: "Servidor de Backup (10.248.139.15)",
    location: "Datacenter",
    time: "2025-03-25 10:30",
    duration: "Contínuo",
    cause: "Falha de Hardware",
    resolution: "Pendente",
    status: "pending",
  },
  {
    id: "INC-009",
    type: "Acesso Não Autorizado",
    host: "Estação de Trabalho (10.248.138.100)",
    location: "Departamento de TI",
    time: "2025-03-24 15:20",
    duration: "2m 10s",
    cause: "Tentativa de Login Suspeita",
    resolution: "Bloqueio de Conta",
    status: "resolved",
  },
  {
    id: "INC-010",
    type: "Falha de Autenticação",
    host: "Servidor Web (10.248.138.11)",
    location: "Datacenter",
    time: "2025-03-23 09:45",
    duration: "45m 30s",
    cause: "Certificado Expirado",
    resolution: "Renovação de Certificado",
    status: "resolved",
  },
]

export default function IncidentsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [page, setPage] = useState(1)
  const itemsPerPage = 5

  // Filter incidents based on search term and filter type
  const filteredIncidents = mockIncidents.filter((incident) => {
    const matchesSearch =
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.cause.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === "all" ||
      (filterType === "connection" && incident.type.includes("Conexão")) ||
      (filterType === "performance" && (incident.type.includes("Latência") || incident.type.includes("Desempenho"))) ||
      (filterType === "service" &&
        (incident.type.includes("DNS") || incident.type.includes("DHCP") || incident.type.includes("Servidor"))) ||
      (filterType === "security" && (incident.type.includes("Acesso") || incident.type.includes("Autenticação")))

    return matchesSearch && matchesFilter
  })

  // Paginate incidents
  const paginatedIncidents = filteredIncidents.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage)

  const handleExportReport = () => {
    // In a real app, this would generate and download a CSV or PDF report
    alert("Relatório exportado com sucesso!")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar incidentes..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="connection">Conexão</SelectItem>
              <SelectItem value="performance">Desempenho</SelectItem>
              <SelectItem value="service">Serviços</SelectItem>
              <SelectItem value="security">Segurança</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={handleExportReport}>
          <Download className="h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Quando</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Causa</TableHead>
              <TableHead>Resolução</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedIncidents.length > 0 ? (
              paginatedIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>{incident.host}</TableCell>
                  <TableCell>{incident.time}</TableCell>
                  <TableCell>{incident.duration}</TableCell>
                  <TableCell>{incident.cause}</TableCell>
                  <TableCell>{incident.resolution}</TableCell>
                  <TableCell>
                    {incident.status === "resolved" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolvido
                      </Badge>
                    ) : incident.status === "pending" ? (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Pendente
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Crítico
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhum incidente encontrado.
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


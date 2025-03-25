"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, LogIn, LogOut, RefreshCw, Search } from "lucide-react"

// Mock data para o histórico de conexões com datas atualizadas para 2025
const mockConnectionHistory = [
  {
    id: "CONN-001",
    deviceId: "DEV-001",
    deviceName: "Router Principal",
    deviceIp: "10.248.138.40",
    eventType: "connect",
    timestamp: "2025-03-24T08:30:00Z",
  },
  {
    id: "CONN-002",
    deviceId: "DEV-002",
    deviceName: "Router Secundário",
    deviceIp: "10.248.138.41",
    eventType: "connect",
    timestamp: "2025-03-24T08:35:00Z",
  },
  {
    id: "CONN-003",
    deviceId: "DEV-015",
    deviceName: "Estação de Trabalho - TI",
    deviceIp: "10.248.138.100",
    eventType: "connect",
    timestamp: "2025-03-24T09:00:00Z",
  },
  {
    id: "CONN-004",
    deviceId: "DEV-013",
    deviceName: "Impressora - Administrativo",
    deviceIp: "10.248.138.80",
    eventType: "connect",
    timestamp: "2025-03-24T09:15:00Z",
  },
  {
    id: "CONN-005",
    deviceId: "DEV-003",
    deviceName: "Router Andar 1",
    deviceIp: "10.248.138.42",
    eventType: "disconnect",
    timestamp: "2025-03-24T14:30:00Z",
  },
  {
    id: "CONN-006",
    deviceId: "DEV-003",
    deviceName: "Router Andar 1",
    deviceIp: "10.248.138.42",
    eventType: "connect",
    timestamp: "2025-03-24T14:35:00Z",
  },
  {
    id: "CONN-007",
    deviceId: "DEV-016",
    deviceName: "Estação de Trabalho - Diretoria",
    deviceIp: "10.248.138.101",
    eventType: "connect",
    timestamp: "2025-03-25T08:15:00Z",
  },
]

export default function ConnectionLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [connections, setConnections] = useState(mockConnectionHistory)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const itemsPerPage = 10

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simula uma atualização dos dados
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  // Filter connections based on search term
  const filteredConnections = connections.filter((conn) => {
    return (
      conn.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conn.deviceIp.includes(searchTerm) ||
      conn.eventType.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Paginate connections
  const paginatedConnections = filteredConnections.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const totalPages = Math.ceil(filteredConnections.length / itemsPerPage)

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar conexões..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          <span className="sr-only">Atualizar</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Dispositivo</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Evento</TableHead>
              <TableHead>Horário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Carregando histórico de conexões...
                </TableCell>
              </TableRow>
            ) : paginatedConnections.length > 0 ? (
              paginatedConnections.map((conn) => (
                <TableRow key={conn.id}>
                  <TableCell className="font-medium">{conn.id}</TableCell>
                  <TableCell>{conn.deviceName}</TableCell>
                  <TableCell>{conn.deviceIp}</TableCell>
                  <TableCell>
                    {conn.eventType === "connect" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 flex w-fit items-center"
                      >
                        <LogIn className="h-3 w-3 mr-1" />
                        Conexão
                      </Badge>
                    ) : conn.eventType === "disconnect" ? (
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-700 border-orange-200 flex w-fit items-center"
                      >
                        <LogOut className="h-3 w-3 mr-1" />
                        Desconexão
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 flex w-fit items-center"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Restaurado
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(conn.timestamp)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhuma conexão encontrada.
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


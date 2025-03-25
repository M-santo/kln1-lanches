"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Laptop,
  MoreHorizontal,
  Printer,
  Router,
  Search,
  Server,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Função para gerar um MAC válido e consistente baseado no IP
function generateConsistentMAC(ip) {
  // Extrai o último octeto do IP
  const lastOctet = Number.parseInt(ip.split(".").pop(), 10)

  // Cria um MAC baseado no último octeto para manter consistência
  const macParts = [
    "00",
    "1A",
    "B2",
    "C3",
    "D4",
    (lastOctet < 16 ? "0" : "") + lastOctet.toString(16).toUpperCase(),
    (lastOctet * 2 < 16 ? "0" : "") + (lastOctet * 2).toString(16).toUpperCase(),
  ]

  return macParts.join(":")
}

// Data atual para uso nos dispositivos
const currentDate = new Date().toISOString()
// Data de instalação (início de 2025)
const installDate = "2025-01-15T08:30:00Z"

// Mock data para dispositivos com IPs e MACs corrigidos e datas atualizadas para 2025
const mockDevices = [
  {
    id: "DEV-001",
    name: "Router Principal",
    ip: "10.248.138.40",
    mac: "00:1A:B2:C3:D4:28",
    type: "router",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "120 MB/s",
    location: "Sala de Servidores",
    hostname: "gateway.ppdf.df.gov.br",
  },
  {
    id: "DEV-002",
    name: "Router Secundário",
    ip: "10.248.138.41",
    mac: "00:1A:B2:C3:D4:29",
    type: "router",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "85 MB/s",
    location: "Sala de Servidores",
    hostname: "router2.ppdf.df.gov.br",
  },
  {
    id: "DEV-003",
    name: "Router Andar 1",
    ip: "10.248.138.42",
    mac: "00:1A:B2:C3:D4:2A",
    type: "router",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "65 MB/s",
    location: "Andar 1",
    hostname: "router-a1.ppdf.df.gov.br",
  },
  {
    id: "DEV-004",
    name: "Router Andar 2",
    ip: "10.248.138.43",
    mac: "00:1A:B2:C3:D4:2B",
    type: "router",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "55 MB/s",
    location: "Andar 2",
    hostname: "router-a2.ppdf.df.gov.br",
  },
  {
    id: "DEV-005",
    name: "Router Andar 3",
    ip: "10.248.138.44",
    mac: "00:1A:B2:C3:D4:2C",
    type: "router",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "45 MB/s",
    location: "Andar 3",
    hostname: "router-a3.ppdf.df.gov.br",
  },
  {
    id: "DEV-006",
    name: "Router Sala de Reuniões",
    ip: "10.248.138.45",
    mac: "00:1A:B2:C3:D4:2D",
    type: "router",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "30 MB/s",
    location: "Sala de Reuniões",
    hostname: "router-sr.ppdf.df.gov.br",
  },
  {
    id: "DEV-007",
    name: "Router Auditório",
    ip: "10.248.138.46",
    mac: "00:1A:B2:C3:D4:2E",
    type: "router",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "25 MB/s",
    location: "Auditório",
    hostname: "router-aud.ppdf.df.gov.br",
  },
  {
    id: "DEV-008",
    name: "Servidor DHCP",
    ip: "10.248.138.10",
    mac: "00:1A:B2:C3:D4:0A",
    type: "server",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "45 MB/s",
    location: "Datacenter",
    hostname: "dhcp.ppdf.df.gov.br",
  },
  {
    id: "DEV-009",
    name: "Servidor DNS",
    ip: "10.248.138.11",
    mac: "00:1A:B2:C3:D4:0B",
    type: "server",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "30 MB/s",
    location: "Datacenter",
    hostname: "dns.ppdf.df.gov.br",
  },
  {
    id: "DEV-010",
    name: "Firewall",
    ip: "10.248.138.5",
    mac: "00:1A:B2:C3:D4:05",
    type: "firewall",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "95 MB/s",
    location: "Sala de Servidores",
    hostname: "firewall.ppdf.df.gov.br",
  },
  {
    id: "DEV-011",
    name: "Switch Principal",
    ip: "10.248.138.6",
    mac: "00:1A:B2:C3:D4:06",
    type: "switch",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "250 MB/s",
    location: "Sala de Servidores",
    hostname: "switch-core.ppdf.df.gov.br",
  },
  {
    id: "DEV-012",
    name: "Servidor de Arquivos",
    ip: "10.248.138.12",
    mac: "00:1A:B2:C3:D4:0C",
    type: "server",
    status: "online",
    firstSeen: installDate,
    lastSeen: currentDate,
    traffic: "75 MB/s",
    location: "Datacenter",
    hostname: "files.ppdf.df.gov.br",
  },
  {
    id: "DEV-013",
    name: "Impressora - Administrativo",
    ip: "10.248.138.80",
    mac: "00:1A:B2:C3:D4:50",
    type: "printer",
    status: "online",
    firstSeen: "2025-01-15T09:00:00Z",
    lastSeen: currentDate,
    traffic: "2 MB/s",
    location: "Setor Administrativo",
    hostname: "printer-adm.ppdf.df.gov.br",
  },
  {
    id: "DEV-014",
    name: "Impressora - Diretoria",
    ip: "10.248.138.81",
    mac: "00:1A:B2:C3:D4:51",
    type: "printer",
    status: "online",
    firstSeen: "2025-01-15T09:00:00Z",
    lastSeen: currentDate,
    traffic: "1.5 MB/s",
    location: "Diretoria",
    hostname: "printer-dir.ppdf.df.gov.br",
  },
  {
    id: "DEV-015",
    name: "Estação de Trabalho - TI",
    ip: "10.248.138.100",
    mac: "00:1A:B2:C3:D4:64",
    type: "computer",
    status: "online",
    firstSeen: "2025-01-15T09:00:00Z",
    lastSeen: currentDate,
    traffic: "18 MB/s",
    location: "Departamento de TI",
    hostname: "ti-pc.ppdf.df.gov.br",
  },
  {
    id: "DEV-016",
    name: "Estação de Trabalho - Diretoria",
    ip: "10.248.138.101",
    mac: "00:1A:B2:C3:D4:65",
    type: "computer",
    status: "online",
    firstSeen: "2025-01-15T09:00:00Z",
    lastSeen: currentDate,
    traffic: "12 MB/s",
    location: "Diretoria",
    hostname: "dir-pc.ppdf.df.gov.br",
  },
]

export default function DevicesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [devices, setDevices] = useState(mockDevices)
  const [loading, setLoading] = useState(false)
  const itemsPerPage = 6

  // Filter devices based on search term
  const filteredDevices = devices.filter((device) => {
    return (
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.ip.includes(searchTerm) ||
      device.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (device.hostname && device.hostname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (device.location && device.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  // Paginate devices
  const paginatedDevices = filteredDevices.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage)

  // Get icon based on device type
  const getDeviceIcon = (type) => {
    switch (type) {
      case "router":
        return <Router className="h-4 w-4" />
      case "switch":
        return <Server className="h-4 w-4" />
      case "server":
        return <Server className="h-4 w-4" />
      case "access_point":
        return <Wifi className="h-4 w-4" />
      case "firewall":
        return <Server className="h-4 w-4" />
      case "computer":
        return <Laptop className="h-4 w-4" />
      case "printer":
        return <Printer className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      default:
        return <Laptop className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar dispositivos..."
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
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Dispositivo</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Hostname</TableHead>
              <TableHead>MAC</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Tráfego</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Carregando dispositivos...
                </TableCell>
              </TableRow>
            ) : paginatedDevices.length > 0 ? (
              paginatedDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">{device.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device.type)}
                      <span>{device.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{device.ip}</TableCell>
                  <TableCell>{device.hostname || "-"}</TableCell>
                  <TableCell className="font-mono text-xs">{device.mac}</TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell>{device.traffic}</TableCell>
                  <TableCell>
                    {device.status === "online" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Online
                      </Badge>
                    ) : device.status === "warning" ? (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Alerta
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Offline
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Ações</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Reiniciar</DropdownMenuItem>
                        <DropdownMenuItem>Bloquear</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Nenhum dispositivo encontrado.
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


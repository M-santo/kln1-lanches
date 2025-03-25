"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Bell, CheckCircle, Clock, HardDrive, Network, RefreshCw, WifiOff } from "lucide-react"
import NetworkStatus from "./network-status"
import IncidentsList from "./incidents-list"
import TopSites from "./top-sites"
import DevicesList from "./devices-list"
import NetworkMap from "./network-map"
import ConnectionLog from "./connection-log"

export default function NetworkDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [networkStatus, setNetworkStatus] = useState({
    status: "online",
    uptime: "5d 12h 34m",
    connectedDevices: 14,
    bandwidth: "85 Mbps",
    latency: "15 ms",
    domain: "ppdf.df.gov.br",
    networkRange: "10.248.138.0/23",
    lastIncident: {
      type: "Queda de Conexão",
      host: "Router Principal (10.248.138.40)",
      time: "2 dias atrás",
      resolution: "Reinício Automático",
    },
    newConnections: 2,
  })
  const [isScanning, setIsScanning] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [newDevices, setNewDevices] = useState([])
  const [showNewDevicesAlert, setShowNewDevicesAlert] = useState(false)
  const [trafficAnalysis, setTrafficAnalysis] = useState({
    anomalies: [
      {
        type: "Tráfego Excessivo",
        severity: "medium",
        source: "10.248.138.100",
        timestamp: new Date().toISOString(),
      },
    ],
    topTalkers: [
      {
        ip: "10.248.138.12",
        hostname: "files.ppdf.df.gov.br",
        trafficVolume: "75 MB/s",
        percentOfTotal: 25,
      },
      {
        ip: "10.248.138.11",
        hostname: "dns.ppdf.df.gov.br",
        trafficVolume: "60 MB/s",
        percentOfTotal: 20,
      },
    ],
  })

  const handleScanNetwork = async () => {
    setIsScanning(true)
    try {
      // Simula o escaneamento da rede
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simula a detecção de novos dispositivos
      const mockNewDevices = [
        {
          id: "DEV-017",
          name: "Novo Computador",
          ip: "10.248.138.102",
          type: "computer",
        },
      ]

      setNewDevices(mockNewDevices)
      setShowNewDevicesAlert(true)
    } catch (error) {
      console.error("Network scan failed:", error)
    } finally {
      setIsScanning(false)
    }
  }

  const handleRestoreNetwork = async () => {
    setIsRestoring(true)
    try {
      // Simula a restauração da rede
      await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
      console.error("Network restoration failed:", error)
    } finally {
      setIsRestoring(false)
    }
  }

  const dismissNewDevicesAlert = () => {
    setShowNewDevicesAlert(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rede PPDF - Monitoramento</h1>
          <p className="text-muted-foreground">
            Monitoramento da rede {networkStatus.networkRange} ({networkStatus.domain})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleScanNetwork}
            disabled={isScanning}
            className="flex items-center gap-2"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Escaneando...</span>
              </>
            ) : (
              <>
                <Network className="h-4 w-4" />
                <span>Escanear Rede</span>
              </>
            )}
          </Button>
          <Button
            onClick={handleRestoreNetwork}
            disabled={isRestoring || networkStatus.status === "online"}
            className="flex items-center gap-2"
          >
            {isRestoring ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Restaurando...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                <span>Restaurar Rede</span>
              </>
            )}
          </Button>
        </div>
      </header>

      {networkStatus.status === "offline" && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Problema de Rede Detectado</AlertTitle>
          <AlertDescription>
            A rede está atualmente offline. O sistema está tentando restaurar a conexão automaticamente.
          </AlertDescription>
        </Alert>
      )}

      {showNewDevicesAlert && newDevices.length > 0 && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Bell className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Novos Dispositivos Detectados</AlertTitle>
          <AlertDescription className="text-blue-700">
            {newDevices.length} novo(s) dispositivo(s) encontrado(s) na rede:
            <ul className="mt-2 list-disc list-inside">
              {newDevices.map((device) => (
                <li key={device.id}>
                  {device.name} ({device.ip}) - {device.type}
                </li>
              ))}
            </ul>
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 text-blue-700 border-blue-300 hover:bg-blue-100"
            onClick={dismissNewDevicesAlert}
          >
            Dispensar
          </Button>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status da Rede</CardTitle>
            {networkStatus.status === "online" ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
            ) : networkStatus.status === "offline" ? (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Degradado
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {networkStatus.status === "online"
                ? "Operacional"
                : networkStatus.status === "offline"
                  ? "Inoperante"
                  : "Desempenho Reduzido"}
            </div>
            <p className="text-xs text-muted-foreground">Última verificação: {new Date().toLocaleTimeString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivos Conectados</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStatus.connectedDevices}</div>
            <p className="text-xs text-muted-foreground">
              {networkStatus.newConnections > 0 && `+${networkStatus.newConnections} na última hora`}
              {networkStatus.newConnections === 0 && "Nenhuma nova conexão na última hora"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo de Atividade</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStatus.uptime}</div>
            <p className="text-xs text-muted-foreground">Desde o último reinício</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="incidents">Incidentes</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="connections">Conexões</TabsTrigger>
          <TabsTrigger value="sites">Sites Acessados</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Mapa da Rede</CardTitle>
                <CardDescription>Visualização da topologia da rede {networkStatus.domain}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <NetworkMap />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Desempenho</CardTitle>
                <CardDescription>Monitoramento em tempo real</CardDescription>
              </CardHeader>
              <CardContent>
                <NetworkStatus bandwidth={networkStatus.bandwidth} latency={networkStatus.latency} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Anomalias Detectadas</CardTitle>
                <CardDescription>Problemas potenciais na rede</CardDescription>
              </CardHeader>
              <CardContent>
                {trafficAnalysis.anomalies && trafficAnalysis.anomalies.length > 0 ? (
                  <div className="space-y-4">
                    {trafficAnalysis.anomalies.map((anomaly, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 rounded-md bg-red-50 border border-red-200"
                      >
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <div className="font-medium text-red-800">{anomaly.type}</div>
                          <div className="text-sm text-red-700">
                            Origem: {anomaly.source} | Severidade:{" "}
                            {anomaly.severity === "high" ? "Alta" : anomaly.severity === "medium" ? "Média" : "Baixa"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24 text-muted-foreground">
                    Nenhuma anomalia detectada
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Incidentes</CardTitle>
              <CardDescription>Registro completo de problemas e resoluções</CardDescription>
            </CardHeader>
            <CardContent>
              <IncidentsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="devices">
          <Card>
            <CardHeader>
              <CardTitle>Dispositivos na Rede</CardTitle>
              <CardDescription>Todos os dispositivos conectados à rede {networkStatus.domain}</CardDescription>
            </CardHeader>
            <CardContent>
              <DevicesList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Log de Conexões</CardTitle>
              <CardDescription>Histórico de conexões e desconexões na rede</CardDescription>
            </CardHeader>
            <CardContent>
              <ConnectionLog />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sites">
          <Card>
            <CardHeader>
              <CardTitle>Sites Mais Acessados</CardTitle>
              <CardDescription>Análise de tráfego por domínio</CardDescription>
            </CardHeader>
            <CardContent>
              <TopSites />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


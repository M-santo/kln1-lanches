"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Laptop, Maximize2, Minimize2, Router, Server, Wifi } from "lucide-react"

export default function NetworkMap() {
  const canvasRef = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Network topology data for PPDF network with corrected IPs
  const networkData = {
    nodes: [
      {
        id: "router1",
        type: "router",
        x: 400,
        y: 100,
        label: "Router Principal",
        ip: "10.248.138.40",
        status: "online",
      },
      {
        id: "router2",
        type: "router",
        x: 300,
        y: 150,
        label: "Router Secundário",
        ip: "10.248.138.41",
        status: "online",
      },
      { id: "router3", type: "router", x: 500, y: 150, label: "Router Andar 1", ip: "10.248.138.42", status: "online" },
      { id: "router4", type: "router", x: 600, y: 200, label: "Router Andar 2", ip: "10.248.138.43", status: "online" },
      { id: "router5", type: "router", x: 200, y: 200, label: "Router Andar 3", ip: "10.248.138.44", status: "online" },
      {
        id: "router6",
        type: "router",
        x: 300,
        y: 250,
        label: "Router Sala Reuniões",
        ip: "10.248.138.45",
        status: "online",
      },
      {
        id: "router7",
        type: "router",
        x: 500,
        y: 250,
        label: "Router Auditório",
        ip: "10.248.138.46",
        status: "online",
      },
      { id: "switch1", type: "switch", x: 250, y: 200, label: "Switch Core", ip: "10.248.138.6", status: "online" },
      {
        id: "server1",
        type: "server",
        x: 150,
        y: 300,
        label: "Servidor Arquivos",
        ip: "10.248.138.12",
        status: "online",
      },
      { id: "server2", type: "server", x: 250, y: 300, label: "Servidor DNS", ip: "10.248.138.11", status: "online" },
      { id: "server3", type: "server", x: 350, y: 300, label: "Servidor DHCP", ip: "10.248.138.10", status: "online" },
      { id: "firewall", type: "firewall", x: 450, y: 300, label: "Firewall", ip: "10.248.138.5", status: "online" },
      { id: "pc1", type: "computer", x: 150, y: 400, label: "PC TI", ip: "10.248.138.100", status: "online" },
      { id: "pc2", type: "computer", x: 250, y: 400, label: "PC Diretoria", ip: "10.248.138.101", status: "online" },
      {
        id: "printer1",
        type: "printer",
        x: 350,
        y: 400,
        label: "Impressora Adm",
        ip: "10.248.138.80",
        status: "online",
      },
      {
        id: "printer2",
        type: "printer",
        x: 450,
        y: 400,
        label: "Impressora Dir",
        ip: "10.248.138.81",
        status: "online",
      },
    ],
    edges: [
      { from: "router1", to: "switch1" },
      { from: "router1", to: "router2" },
      { from: "router1", to: "router3" },
      { from: "router2", to: "router4" },
      { from: "router2", to: "router5" },
      { from: "router3", to: "router6" },
      { from: "router3", to: "router7" },
      { from: "switch1", to: "server1" },
      { from: "switch1", to: "server2" },
      { from: "switch1", to: "server3" },
      { from: "switch1", to: "firewall" },
      { from: "router5", to: "pc1" },
      { from: "router6", to: "pc2" },
      { from: "router5", to: "printer1" },
      { from: "router6", to: "printer2" },
    ],
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const dpr = window.devicePixelRatio || 1

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply zoom
    ctx.save()
    ctx.scale(zoom, zoom)

    // Draw edges
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 2

    networkData.edges.forEach((edge) => {
      const fromNode = networkData.nodes.find((node) => node.id === edge.from)
      const toNode = networkData.nodes.find((node) => node.id === edge.to)

      if (fromNode && toNode) {
        ctx.beginPath()
        ctx.moveTo(fromNode.x / zoom, fromNode.y / zoom)
        ctx.lineTo(toNode.x / zoom, toNode.y / zoom)

        // If one of the nodes is offline, use dashed line
        if (fromNode.status === "offline" || toNode.status === "offline") {
          ctx.setLineDash([5, 3])
        } else if (fromNode.status === "warning" || toNode.status === "warning") {
          ctx.setLineDash([8, 2])
          ctx.strokeStyle = "#fbbf24"
        } else {
          ctx.setLineDash([])
          ctx.strokeStyle = "#d1d5db"
        }

        ctx.stroke()
        ctx.setLineDash([])
        ctx.strokeStyle = "#d1d5db"
      }
    })

    // Draw nodes
    networkData.nodes.forEach((node) => {
      const x = node.x / zoom
      const y = node.y / zoom
      const radius = 20

      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI)

      if (node.status === "online") {
        ctx.fillStyle = "#f9fafb"
        ctx.strokeStyle = "#10b981"
      } else if (node.status === "warning") {
        ctx.fillStyle = "#f9fafb"
        ctx.strokeStyle = "#fbbf24"
      } else {
        ctx.fillStyle = "#f9fafb"
        ctx.strokeStyle = "#ef4444"
      }

      ctx.lineWidth = 2
      ctx.fill()
      ctx.stroke()

      // Draw icon
      ctx.fillStyle = node.status === "online" ? "#111827" : node.status === "warning" ? "#92400e" : "#9ca3af"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      let icon = "?"
      switch (node.type) {
        case "router":
          icon = "🌐"
          break
        case "switch":
          icon = "🔄"
          break
        case "server":
          icon = "🖥️"
          break
        case "access_point":
          icon = "📡"
          break
        case "computer":
          icon = "💻"
          break
        case "printer":
          icon = "🖨️"
          break
        case "mobile":
          icon = "📱"
          break
        case "tv":
          icon = "📺"
          break
        case "firewall":
          icon = "🔒"
          break
      }

      ctx.fillText(icon, x, y)

      // Draw label with IP
      ctx.font = "12px sans-serif"
      ctx.fillStyle = "#4b5563"
      ctx.fillText(node.label, x, y + radius + 15)
      ctx.font = "10px sans-serif"
      ctx.fillText(node.ip, x, y + radius + 30)
    })

    ctx.restore()
  }, [zoom, networkData, isFullscreen])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6" : ""}`}>
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <Maximize2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleToggleFullscreen}>
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
      <div className="w-full h-[400px]">
        <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-xs text-muted-foreground">Alerta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs text-muted-foreground">Offline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Router className="h-4 w-4 mr-1" />
            <span className="text-xs text-muted-foreground">Router</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Server className="h-4 w-4 mr-1" />
            <span className="text-xs text-muted-foreground">Servidor/Switch</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Wifi className="h-4 w-4 mr-1" />
            <span className="text-xs text-muted-foreground">Access Point</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Laptop className="h-4 w-4 mr-1" />
            <span className="text-xs text-muted-foreground">Computador</span>
          </div>
        </div>
      </div>
    </div>
  )
}


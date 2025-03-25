"use client"

import { useEffect, useState } from "react"
import { Activity, Gauge } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface NetworkStatusProps {
  bandwidth: string
  latency: string
}

export default function NetworkStatus({ bandwidth, latency }: NetworkStatusProps) {
  const [bandwidthValue, setBandwidthValue] = useState(0)
  const [latencyValue, setLatencyValue] = useState(0)

  useEffect(() => {
    // Parse the bandwidth string to get a numeric value
    const bwMatch = bandwidth.match(/(\d+)/)
    if (bwMatch) {
      setBandwidthValue(Math.min(Number.parseInt(bwMatch[1], 10), 100))
    }

    // Parse the latency string to get a numeric value
    const latMatch = latency.match(/(\d+)/)
    if (latMatch) {
      // Convert latency to a percentage (assuming 200ms is 100%)
      const latencyPercent = Math.min((Number.parseInt(latMatch[1], 10) / 200) * 100, 100)
      setLatencyValue(latencyPercent)
    }
  }, [bandwidth, latency])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Largura de Banda</span>
          </div>
          <span className="text-sm font-medium">{bandwidth}</span>
        </div>
        <Progress value={bandwidthValue} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {bandwidthValue < 30 ? "Baixa utilização" : bandwidthValue < 70 ? "Utilização moderada" : "Alta utilização"}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Gauge className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Latência</span>
          </div>
          <span className="text-sm font-medium">{latency}</span>
        </div>
        <Progress value={latencyValue} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {latencyValue < 30 ? "Excelente" : latencyValue < 70 ? "Aceitável" : "Problemática"}
        </p>
      </div>
    </div>
  )
}


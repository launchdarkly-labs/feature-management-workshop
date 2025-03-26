"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Clock } from "lucide-react"

export default function GeneratorPage() {
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentIteration, setCurrentIteration] = useState(0)
  const totalIterations = 500
  const [isStopped, setIsStopped] = useState(false)
  const stopRef = useRef(false)

  // Time tracking
  const startTimeRef = useRef<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(0)
  const [iterationsPerSecond, setIterationsPerSecond] = useState(0)

  // Update time calculations every 100ms during generation
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isGenerating && startTimeRef.current) {
      intervalId = setInterval(() => {
        // Calculate elapsed time
        const currentTime = Date.now()
        const elapsed = Math.floor((currentTime - startTimeRef.current!) / 1000)
        setElapsedTime(elapsed)

        // Calculate iterations per second
        const ips = elapsed > 0 ? currentIteration / elapsed : 0
        setIterationsPerSecond(ips)

        // Calculate estimated time remaining
        if (currentIteration > 0) {
          const timePerIteration = elapsed / currentIteration
          const remainingIterations = totalIterations - currentIteration
          const remaining = timePerIteration * remainingIterations
          setEstimatedTimeRemaining(Math.ceil(remaining))
        }
      }, 100)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isGenerating, currentIteration, totalIterations])

  const startGenerator = async () => {
    // Reset states
    setProgress(0)
    setCurrentIteration(0)
    setIsComplete(false)
    setIsGenerating(true)
    setIsStopped(false)
    stopRef.current = false

    // Reset time tracking
    startTimeRef.current = Date.now()
    setElapsedTime(0)
    setEstimatedTimeRemaining(0)
    setIterationsPerSecond(0)

    // Simulate 500 iterations with progress updates
    for (let i = 1; i <= totalIterations; i++) {
      // Check if stopped
      if (stopRef.current) {
        setIsGenerating(false)
        break
      }

      await new Promise((resolve) => setTimeout(resolve, 10)) // Simulate work
      setCurrentIteration(i)
      setProgress(Math.floor((i / totalIterations) * 100))

      // If this is the last iteration, mark as complete
      if (i === totalIterations) {
        setIsComplete(true)
        setIsGenerating(false)
      }
    }
  }

  const stopGenerator = () => {
    stopRef.current = true
    setIsStopped(true)
  }

  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    if (seconds === Number.POSITIVE_INFINITY || isNaN(seconds)) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Iteration Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progress</span>
              <Badge
                variant={isComplete ? "success" : isStopped ? "destructive" : "outline"}
                className={isComplete ? "bg-green-500 hover:bg-green-600" : isStopped ? "bg-destructive" : ""}
              >
                {isComplete ? "Complete" : isStopped ? "Stopped" : `${progress}%`}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Iterations: {currentIteration}/{totalIterations}
            </span>
            <span>{progress}%</span>
          </div>

          {/* Time estimation section */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4" />
              <span>Time Estimation</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Elapsed:</span>
                <span className="ml-2 font-mono">{formatTime(elapsedTime)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Remaining:</span>
                <span className="ml-2 font-mono">{isGenerating ? formatTime(estimatedTimeRemaining) : "00:00"}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Est:</span>
                <span className="ml-2 font-mono">
                  {isGenerating
                    ? formatTime(elapsedTime + estimatedTimeRemaining)
                    : isComplete
                      ? formatTime(elapsedTime)
                      : "00:00"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Speed:</span>
                <span className="ml-2 font-mono">{iterationsPerSecond.toFixed(1)}/s</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          {isGenerating ? (
            <>
              <Button onClick={stopGenerator} variant="destructive" className="w-1/2">
                Stop
              </Button>
              <Button disabled className="w-1/2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </Button>
            </>
          ) : (
            <Button onClick={startGenerator} className="w-full">
              {isComplete ? "Generate Again" : isStopped ? "Resume Generator" : "Start Generator"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}


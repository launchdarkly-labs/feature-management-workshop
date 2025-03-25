"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export default function GeneratorPage() {
  const [progress, setProgress] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentIteration, setCurrentIteration] = useState(0)
  const totalIterations = 500

  const startGenerator = async () => {
    // Reset states
    setProgress(0)
    setCurrentIteration(0)
    setIsComplete(false)
    setIsGenerating(true)

    // Simulate 500 iterations with progress updates
    for (let i = 1; i <= totalIterations; i++) {
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
                variant={isComplete ? "success" : "outline"}
                className={isComplete ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {isComplete ? "Complete" : `${progress}%`}
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
        </CardContent>
        <CardFooter>
          <Button onClick={startGenerator} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : isComplete ? (
              "Generate Again"
            ) : (
              "Start Generator"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


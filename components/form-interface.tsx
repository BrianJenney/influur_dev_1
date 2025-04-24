"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SpotifySearch from "./spotify-search"
import BudgetSlider from "./budget-slider"
import RegionSelector from "./region-selector"
import InfluencerList from "./influencer-list"
import { Loader2 } from "lucide-react"

export default function FormInterface() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    song: "",
    budget: 5000,
    region: "",
  })

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setStep(4) // Show influencers
    }, 1500)
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select a Song</CardTitle>
            </CardHeader>
            <CardContent>
              <SpotifySearch />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Set Campaign Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetSlider />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Target Region</CardTitle>
            </CardHeader>
            <CardContent>
              <RegionSelector />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Create Campaign"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Recommended Influencers</CardTitle>
            </CardHeader>
            <CardContent>
              <InfluencerList />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button type="button">Send Proposals</Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Music, Edit } from "lucide-react"

interface ProposalDraftProps {
  onComplete?: () => void
  campaignData?: any
}

export default function ProposalDraft({ onComplete, campaignData }: ProposalDraftProps) {
  const [editMode, setEditMode] = useState(false)
  const [proposalText, setProposalText] = useState(generateProposalText(campaignData))

  function generateProposalText(data: any) {
    if (!data) return ""

    const { name, song, goal, region } = data

    return `Dear Influencer,

We're excited to invite you to be part of our "${name}" campaign featuring "${song?.name}" by ${song?.artist}.

Campaign Goal: ${goal?.description}

We believe your unique style and audience would be perfect for this campaign. We're looking for creative ${getContentTypeByGoal(goal?.type)} that showcases the song in an authentic way that resonates with your followers.

The recommended clip for this song is from 0:45 to 1:15, which features the catchy chorus and beat drop that we believe will work well for social content.

Please let us know if you're interested in participating in this campaign.

Best regards,
The ${name} Team`
  }

  function getContentTypeByGoal(goalType: string) {
    switch (goalType) {
      case "awareness":
        return "content that maximizes visibility"
      case "engagement":
        return "interactive content that encourages likes, comments, and shares"
      case "conversion":
        return "content that drives listeners to stream the song"
      default:
        return "content"
    }
  }

  const handleSubmit = () => {
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-4">
        <Tabs defaultValue="proposal">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
            <TabsTrigger value="clip">Recommended Clip</TabsTrigger>
          </TabsList>

          <TabsContent value="proposal" className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Proposal Draft</h3>
              <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
                <Edit className="h-4 w-4 mr-2" />
                {editMode ? "Preview" : "Edit"}
              </Button>
            </div>

            {editMode ? (
              <Textarea
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            ) : (
              <div className="whitespace-pre-wrap border rounded-md p-4 bg-muted/50 min-h-[300px]">{proposalText}</div>
            )}
          </TabsContent>

          <TabsContent value="clip" className="space-y-4 pt-4">
            <h3 className="font-semibold">Recommended Song Clip</h3>

            <div className="border rounded-md p-4 bg-muted/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{campaignData?.song?.name}</div>
                  <div className="text-sm text-muted-foreground">{campaignData?.song?.artist}</div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Recommended Clip: 0:45 - 1:15</p>
                <p className="text-sm text-muted-foreground">
                  This section features the catchy chorus and beat drop, making it perfect for
                  {campaignData?.goal?.type === "engagement"
                    ? " creating engaging content that encourages interaction."
                    : campaignData?.goal?.type === "conversion"
                      ? " driving listeners to stream the full song."
                      : " maximizing visibility and recognition."}
                </p>

                <div className="h-4 w-full bg-muted-foreground/20 rounded-full mt-4 relative">
                  <div className="absolute h-full w-[25%] bg-primary rounded-full left-[45%]"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0:00</span>
                  <span>0:45</span>
                  <span>1:15</span>
                  <span>3:00</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={handleSubmit} className="w-full">
          Send Proposals to Influencers
        </Button>
      </CardContent>
    </Card>
  )
}
